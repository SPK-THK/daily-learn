// 本机多账号：把除了账号元数据和主题之外的 dl.* 键按账号隔离。
// 必须在 src/app.js 之前执行（main.ts 的 import 顺序保证）。

export type Account = {
  id: string;
  name: string;
  avatar: string;
  pinHash?: string;
  pinSalt?: string;
  createdAt: number;
};

export type AccountInput = {
  name: string;
  avatar?: string;
  pin?: string | null;
};

const ACCOUNTS_KEY = 'dl.accounts';
const ACTIVE_KEY = 'dl.account.active';
const GLOBAL_KEYS = new Set([ACCOUNTS_KEY, ACTIVE_KEY, 'dl.theme']);
const NS = 'dl.a.';

const native = {
  getItem: Storage.prototype.getItem,
  setItem: Storage.prototype.setItem,
  removeItem: Storage.prototype.removeItem,
  key: Storage.prototype.key,
  clear: Storage.prototype.clear,
  length: Object.getOwnPropertyDescriptor(Storage.prototype, 'length')!.get!,
};

const rawGet = (key: string) => native.getItem.call(window.localStorage, key);
const rawSet = (key: string, value: string) => native.setItem.call(window.localStorage, key, value);
const rawRemove = (key: string) => native.removeItem.call(window.localStorage, key);

function readAccounts(): Account[] {
  try {
    const list = JSON.parse(rawGet(ACCOUNTS_KEY) || '[]');
    if (!Array.isArray(list)) return [];
    return list.filter((a) => a && typeof a.id === 'string' && typeof a.name === 'string');
  } catch {
    return [];
  }
}

function writeAccounts(list: Account[]) {
  rawSet(ACCOUNTS_KEY, JSON.stringify(list));
}

function uid(): string {
  const c = window.crypto as Crypto | undefined;
  if (c && typeof c.randomUUID === 'function') return c.randomUUID();
  return 'a' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

function setActiveRaw(id: string) {
  rawSet(ACTIVE_KEY, id);
}

function ensureAccounts(): Account[] {
  let list = readAccounts();
  if (!list.length) {
    const id = uid();
    const account: Account = { id, name: '我的账号', avatar: '我', createdAt: Date.now() };
    // 旧版数据全部迁移到默认账号
    const keys: string[] = [];
    const len = native.length.call(window.localStorage) as number;
    for (let i = 0; i < len; i++) {
      const k = native.key.call(window.localStorage, i);
      if (k) keys.push(k);
    }
    for (const key of keys) {
      if (!key.startsWith('dl.') || GLOBAL_KEYS.has(key) || key.startsWith(NS)) continue;
      const value = rawGet(key);
      if (value != null) rawSet(`${NS}${id}.${key.slice(3)}`, value);
      rawRemove(key);
    }
    list = [account];
    writeAccounts(list);
    setActiveRaw(id);
  }
  let active = rawGet(ACTIVE_KEY);
  if (!active || !list.some((a) => a.id === active)) {
    active = list[0].id;
    setActiveRaw(active);
  }
  return list;
}

const accounts = ensureAccounts();
let activeId = rawGet(ACTIVE_KEY) || accounts[0]!.id;

function scoped(key: string): string {
  if (!key.startsWith('dl.') || GLOBAL_KEYS.has(key)) return key;
  return `${NS}${activeId}.${key.slice(3)}`;
}

function visibleKeys(): { raw: string; name: string }[] {
  const prefix = `${NS}${activeId}.`;
  const out: { raw: string; name: string }[] = [];
  const len = native.length.call(window.localStorage) as number;
  for (let i = 0; i < len; i++) {
    const key = native.key.call(window.localStorage, i);
    if (!key) continue;
    if (key.startsWith(prefix)) out.push({ raw: key, name: 'dl.' + key.slice(prefix.length) });
    else if (key === 'dl.theme') out.push({ raw: key, name: key });
  }
  return out;
}

// 拦截 localStorage，让业务代码继续用 dl.*，实际落到当前账号
const proto = Storage.prototype as any;
proto.getItem = function (this: Storage, key: string) {
  return this === window.localStorage
    ? native.getItem.call(this, scoped(String(key)))
    : native.getItem.call(this, key);
};
proto.setItem = function (this: Storage, key: string, value: string) {
  return this === window.localStorage
    ? native.setItem.call(this, scoped(String(key)), String(value))
    : native.setItem.call(this, key, value);
};
proto.removeItem = function (this: Storage, key: string) {
  return this === window.localStorage
    ? native.removeItem.call(this, scoped(String(key)))
    : native.removeItem.call(this, key);
};
proto.clear = function (this: Storage) {
  if (this !== window.localStorage) return native.clear.call(this);
  for (const item of visibleKeys()) native.removeItem.call(this, item.raw);
};
proto.key = function (this: Storage, index: number) {
  if (this !== window.localStorage) return native.key.call(this, index);
  const list = visibleKeys();
  return list[index] ? list[index].name : null;
};
try {
  Object.defineProperty(proto, 'length', {
    configurable: true,
    get(this: Storage) {
      if (this !== window.localStorage) return native.length.call(this);
      return visibleKeys().length;
    },
  });
} catch {
  // 极端情况下枚举会包含原始键，但不影响账号数据隔离
}

function normalizeName(name: string): string {
  return String(name || '').trim().slice(0, 12);
}
function normalizeAvatar(avatar: string, name: string): string {
  const v = String(avatar || '').trim();
  return (v || name.slice(0, 1) || '我').slice(0, 2);
}

async function hashPin(pin: string, salt: string): Promise<string> {
  const text = `${salt}:${pin}`;
  if (window.crypto && window.crypto.subtle) {
    const buf = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = ((h ^ text.charCodeAt(i)) * 16777619) >>> 0;
  return 'fnv' + h.toString(16);
}

export const accountStore = {
  list(): Account[] {
    return readAccounts();
  },
  active(): Account {
    const list = readAccounts();
    return (list.find((a) => a.id === activeId) || list[0]) as Account;
  },
  activeId(): string {
    return activeId;
  },
  switchTo(id: string): boolean {
    const list = readAccounts();
    if (!list.some((a) => a.id === id)) return false;
    setActiveRaw(id);
    return true;
  },
  async create(input: AccountInput): Promise<Account> {
    const name = normalizeName(input.name) || '新账号';
    const account: Account = {
      id: uid(),
      name,
      avatar: normalizeAvatar(input.avatar || '', name),
      createdAt: Date.now(),
    };
    const pin = String(input.pin || '').trim();
    if (pin) {
      const salt = uid().slice(0, 12);
      account.pinSalt = salt;
      account.pinHash = await hashPin(pin, salt);
    }
    const list = readAccounts();
    list.push(account);
    writeAccounts(list);
    return account;
  },
  async update(id: string, input: AccountInput): Promise<Account | null> {
    const list = readAccounts();
    const idx = list.findIndex((a) => a.id === id);
    if (idx < 0) return null;
    const account = list[idx];
    if (input.name != null) account.name = normalizeName(input.name) || account.name;
    if (input.avatar != null) account.avatar = normalizeAvatar(input.avatar, account.name);
    if (input.pin === null) {
      delete account.pinHash;
      delete account.pinSalt;
    } else if (typeof input.pin === 'string' && input.pin.trim()) {
      const salt = uid().slice(0, 12);
      account.pinSalt = salt;
      account.pinHash = await hashPin(input.pin.trim(), salt);
    }
    list[idx] = account;
    writeAccounts(list);
    return account;
  },
  remove(id: string): boolean {
    let list = readAccounts();
    if (list.length <= 1) return false;
    const prefix = `${NS}${id}.`;
    const len = native.length.call(window.localStorage) as number;
    const keys: string[] = [];
    for (let i = 0; i < len; i++) {
      const k = native.key.call(window.localStorage, i);
      if (k && k.startsWith(prefix)) keys.push(k);
    }
    keys.forEach((k) => rawRemove(k));
    list = list.filter((a) => a.id !== id);
    writeAccounts(list);
    if (activeId === id) {
      setActiveRaw(list[0].id);
    }
    return true;
  },
  async verifyPin(id: string, pin: string): Promise<boolean> {
    const account = readAccounts().find((a) => a.id === id);
    if (!account || !account.pinHash || !account.pinSalt) return true;
    return (await hashPin(String(pin), account.pinSalt)) === account.pinHash;
  },
};

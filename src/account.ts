import { accountStore, type AccountInput } from './storage';

const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );

export function initAccountUI() {
  if (document.getElementById('account-dialog')) return;

  const topActions = document.querySelector('.top-actions');
  const topBtn = document.createElement('button');
  topBtn.type = 'button';
  topBtn.className = 'account-btn js-account';
  topBtn.title = '账号';
  topBtn.setAttribute('aria-label', '账号');
  topActions?.insertBefore(topBtn, topActions.firstChild);

  const sideBrand = document.querySelector('.side-brand');
  const sideBtn = document.createElement('button');
  sideBtn.type = 'button';
  sideBtn.className = 'side-profile js-account';
  sideBtn.title = '账号';
  sideBtn.setAttribute('aria-label', '账号');
  sideBrand?.appendChild(sideBtn);

  const dlg = document.createElement('dialog');
  dlg.id = 'account-dialog';
  dlg.className = 'guide-dialog account-dialog';
  dlg.innerHTML = `
    <div class="guide-head">
      <h2>👤 账号</h2>
      <button type="button" class="icon-btn" data-close aria-label="关闭">✕</button>
    </div>
    <div class="account-current" id="account-current"></div>
    <div class="account-list" id="account-list"></div>
    <div class="row-gap account-actions">
      <button type="button" class="btn primary" id="account-new">＋ 新建账号</button>
      <button type="button" class="btn" id="account-edit">编辑当前</button>
    </div>
    <button type="button" class="btn ghost account-delete" id="account-delete">删除当前账号</button>
    <div class="account-form hidden" id="account-form">
      <label>昵称<input id="account-name" maxlength="12" autocomplete="off" placeholder="例如：我的账号" /></label>
      <label>头像<input id="account-avatar" maxlength="2" autocomplete="off" placeholder="1–2 个字或 emoji" /></label>
      <label>PIN（可选，4 位数字）<input id="account-pin" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="留空则不设置" /></label>
      <label class="account-check hidden" id="account-pin-clear-wrap"><input type="checkbox" id="account-pin-clear" /> 清除已有 PIN</label>
      <div class="row-gap">
        <button type="button" class="btn" id="account-cancel">取消</button>
        <button type="button" class="btn primary" id="account-save">保存</button>
      </div>
      <p class="hint" id="account-form-msg"></p>
    </div>
    <p class="hint account-note">每个账号的单词进度、阅读记录、自选股和学习统计相互独立；数据只保存在本机。切换账号后页面会刷新。</p>
  `;
  document.body.appendChild(dlg);

  const pinDlg = document.createElement('dialog');
  pinDlg.id = 'pin-dialog';
  pinDlg.className = 'guide-dialog pin-dialog';
  pinDlg.innerHTML = `
    <div class="guide-head">
      <h2>🔒 输入 PIN</h2>
      <button type="button" class="icon-btn" data-close aria-label="关闭">✕</button>
    </div>
    <p class="hint" id="pin-hint"></p>
    <input id="pin-input" class="account-pin-input" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="4 位数字" />
    <p class="hint pin-err" id="pin-err"></p>
    <button type="button" class="pin-forgot" id="pin-forgot">忘记 PIN？</button>
    <div class="row-gap">
      <button type="button" class="btn" id="pin-cancel">取消</button>
      <button type="button" class="btn primary" id="pin-ok">确认</button>
    </div>
  `;
  document.body.appendChild(pinDlg);

  const currentEl = dlg.querySelector<HTMLDivElement>('#account-current')!;
  const listEl = dlg.querySelector<HTMLDivElement>('#account-list')!;
  const form = dlg.querySelector<HTMLDivElement>('#account-form')!;
  const nameInput = dlg.querySelector<HTMLInputElement>('#account-name')!;
  const avatarInput = dlg.querySelector<HTMLInputElement>('#account-avatar')!;
  const pinInput = dlg.querySelector<HTMLInputElement>('#account-pin')!;
  const pinClear = dlg.querySelector<HTMLInputElement>('#account-pin-clear')!;
  const pinClearWrap = dlg.querySelector<HTMLLabelElement>('#account-pin-clear-wrap')!;
  const formMsg = dlg.querySelector<HTMLParagraphElement>('#account-form-msg')!;
  const editBtn = dlg.querySelector<HTMLButtonElement>('#account-edit')!;
  const deleteBtn = dlg.querySelector<HTMLButtonElement>('#account-delete')!;

  const pinHint = pinDlg.querySelector<HTMLParagraphElement>('#pin-hint')!;
  const pinErr = pinDlg.querySelector<HTMLParagraphElement>('#pin-err')!;
  const pinField = pinDlg.querySelector<HTMLInputElement>('#pin-input')!;
  const pinForgot = pinDlg.querySelector<HTMLButtonElement>('#pin-forgot')!;

  let editingId: string | null = null;
  let pinTarget: string | null = null;

  function render() {
    const accounts = accountStore.list();
    const current = accountStore.active();
    if (topBtn) {
      topBtn.textContent = current.avatar;
      topBtn.title = `账号：${current.name}`;
    }
    if (sideBtn) {
      sideBtn.innerHTML = `<span class="ac-avatar">${esc(current.avatar)}</span><span class="ac-meta"><b>${esc(
        current.name,
      )}</b><small>切换账号</small></span>`;
    }
    currentEl.innerHTML = `<div class="account-avatar-lg">${esc(current.avatar)}</div>
      <div class="account-current-meta"><b>${esc(current.name)}</b><span class="hint">当前账号${
        current.pinHash ? ' · 已设 PIN' : ''
      }</span></div>`;
    listEl.innerHTML = accounts
      .map(
        (a) => `<button type="button" class="account-row ${a.id === current.id ? 'active' : ''}" data-id="${esc(
          a.id,
        )}">
          <span class="ac-avatar sm">${esc(a.avatar)}</span>
          <span class="ac-name">${esc(a.name)}</span>
          ${a.pinHash ? '<span class="ac-tag">PIN</span>' : ''}
          ${a.id === current.id ? '<span class="ac-tag">当前</span>' : '<span class="ac-go">切换 ›</span>'}
        </button>`,
      )
      .join('');
    listEl.querySelectorAll<HTMLButtonElement>('.account-row').forEach((row) => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-id');
        if (id) switchAccount(id);
      });
    });
    deleteBtn.disabled = accounts.length <= 1;
  }

  function openDialog() {
    editingId = null;
    form.classList.add('hidden');
    formMsg.textContent = '';
    render();
    if (!dlg.open) dlg.showModal();
  }

  function showForm(mode: 'create' | 'edit') {
    const current = accountStore.active();
    editingId = mode === 'edit' ? current.id : null;
    form.classList.remove('hidden');
    formMsg.textContent = '';
    if (mode === 'edit') {
      nameInput.value = current.name;
      avatarInput.value = current.avatar;
      pinInput.value = '';
      pinInput.placeholder = '留空保持原 PIN';
      pinClear.checked = false;
      pinClearWrap.classList.toggle('hidden', !current.pinHash);
    } else {
      nameInput.value = '';
      avatarInput.value = '';
      pinInput.value = '';
      pinInput.placeholder = '留空则不设置';
      pinClear.checked = false;
      pinClearWrap.classList.add('hidden');
    }
    nameInput.focus();
  }

  async function switchAccount(id: string) {
    if (id === accountStore.activeId()) return;
    const target = accountStore.list().find((a) => a.id === id);
    if (!target) return;
    if (target.pinHash) {
      pinTarget = id;
      pinHint.textContent = `切换到「${target.name}」需要 4 位 PIN`;
      pinErr.textContent = '';
      pinField.value = '';
      if (!pinDlg.open) pinDlg.showModal();
      setTimeout(() => pinField.focus(), 60);
      return;
    }
    accountStore.switchTo(id);
    location.reload();
  }

  async function confirmPin() {
    if (!pinTarget) return;
    const pin = pinField.value.trim();
    if (!/^\d{4}$/.test(pin)) {
      pinErr.textContent = '请输入 4 位数字 PIN';
      return;
    }
    const ok = await accountStore.verifyPin(pinTarget, pin);
    if (!ok) {
      pinErr.textContent = 'PIN 不正确';
      pinField.select();
      return;
    }
    accountStore.switchTo(pinTarget);
    location.reload();
  }

  async function saveForm() {
    const name = nameInput.value.trim();
    if (!name) {
      formMsg.textContent = '请填写昵称';
      nameInput.focus();
      return;
    }
    if (name.length > 12) {
      formMsg.textContent = '昵称最多 12 个字';
      return;
    }
    const avatar = avatarInput.value.trim() || name.slice(0, 1);
    if ([...avatar].length > 2) {
      formMsg.textContent = '头像最多 2 个字符';
      return;
    }
    const pin = pinInput.value.trim();
    if (pin && !/^\d{4}$/.test(pin)) {
      formMsg.textContent = 'PIN 需要是 4 位数字';
      return;
    }
    if (editingId) {
      const patch: AccountInput = { name, avatar };
      if (pin) patch.pin = pin;
      if (pinClear.checked) patch.pin = null;
      await accountStore.update(editingId, patch);
      editingId = null;
      form.classList.add('hidden');
      render();
      return;
    }
    const account = await accountStore.create({ name, avatar, pin });
    accountStore.switchTo(account.id);
    location.reload();
  }

  document.querySelectorAll<HTMLButtonElement>('.js-account').forEach((b) =>
    b.addEventListener('click', openDialog),
  );
  dlg.querySelector('[data-close]')?.addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) dlg.close();
  });
  dlg.querySelector('#account-new')?.addEventListener('click', () => showForm('create'));
  editBtn.addEventListener('click', () => showForm('edit'));
  dlg.querySelector('#account-cancel')?.addEventListener('click', () => {
    form.classList.add('hidden');
    formMsg.textContent = '';
  });
  dlg.querySelector('#account-save')?.addEventListener('click', () => void saveForm());
  deleteBtn.addEventListener('click', () => {
    const current = accountStore.active();
    if (accountStore.list().length <= 1) return;
    if (!window.confirm(`删除账号「${current.name}」？该账号的学习数据会一并删除，且无法恢复。`)) return;
    if (accountStore.remove(current.id)) location.reload();
  });
  pinInput.addEventListener('input', () => {
    pinInput.value = pinInput.value.replace(/\D/g, '').slice(0, 4);
  });

  pinDlg.querySelector('[data-close]')?.addEventListener('click', () => pinDlg.close());
  pinDlg.querySelector('#pin-cancel')?.addEventListener('click', () => pinDlg.close());
  pinDlg.querySelector('#pin-ok')?.addEventListener('click', () => void confirmPin());
  pinDlg.addEventListener('click', (e) => {
    if (e.target === pinDlg) pinDlg.close();
  });
  pinField.addEventListener('input', () => {
    pinField.value = pinField.value.replace(/\D/g, '').slice(0, 4);
  });
  pinField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      void confirmPin();
    }
  });
  pinForgot.addEventListener('click', () => {
    if (!pinTarget) return;
    const target = accountStore.list().find((a) => a.id === pinTarget);
    if (!target) return;
    if (!window.confirm(`重置「${target.name}」的 PIN？学习数据会保留。`)) return;
    accountStore.clearPin(pinTarget);
    accountStore.switchTo(pinTarget);
    location.reload();
  });

  render();
}

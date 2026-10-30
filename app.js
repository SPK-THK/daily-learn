(()=>{var Q=t=>`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;function rt(t,e=new Date){let s=new Date(e);return s.setDate(s.getDate()+t),Q(s)}function G(t,e,s){let n=t&&t[s];return!!n&&e.every(o=>n[o])}function V(t,e,s=new Date){let n=G(t,e,Q(s))?0:-1,o=0;for(;G(t,e,rt(n,s));)o+=1,n-=1;return o}function Z(t){try{let e=JSON.parse(t);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}var Lt=[{id:"english_words",icon:"\u{1F4D6}",label:"\u80CC\u5B8C\u4ECA\u65E5\u5355\u8BCD",how:"\u5728\u300C\u82F1\u8BED\u300D\u9875\u5B8C\u6210\u65B0\u8BCD\u4E0E\u590D\u4E60",tab:"english"},{id:"english_reading",icon:"\u{1F4F0}",label:"\u8BFB\u5B8C\u4E00\u7BC7\u53CC\u8BED\u77ED\u6587",how:"\u5728\u300C\u82F1\u8BED\u300D\u9875\u6807\u8BB0\u5DF2\u8BFB",tab:"english"},{id:"stock_review",icon:"\u{1F4C8}",label:"\u590D\u76D8\u81EA\u9009\u80A1",how:"\u5728\u300C\u80A1\u7968\u300D\u9875\u5237\u65B0\u884C\u60C5",tab:"stock"}],xt="dl.habit.log",M=Lt.map(t=>t.id),ce=[{icon:"\u2328\uFE0F",title:"\u952E\u76D8\u64CD\u4F5C",desc:"\u80CC\u5355\u8BCD\u65F6\uFF1A\u7A7A\u683C\u7FFB\u9762\uFF0C1 \u53C8\u5FD8\u4E86\uFF0C2 \u8BB0\u4F4F\u4E86",tone:"tone-blue"},{icon:"\u{1F50A}",title:"\u70B9\u5587\u53ED\u542C\u53D1\u97F3",desc:"\u5355\u8BCD\u3001\u642D\u914D\u3001\u91D1\u53E5\u548C\u8BCD\u6C47\u8868\u90FD\u652F\u6301\u6717\u8BFB",tone:"tone-green"},{icon:"\u{1F4BE}",title:"\u6362\u8BBE\u5907\u5148\u5907\u4EFD",desc:"\u300C\u4F7F\u7528\u6559\u7A0B\u300D\u2192 \u5BFC\u51FA\u5907\u4EFD\uFF0C\u53EF\u8FC1\u79FB\u5230\u65B0\u8BBE\u5907",tone:"tone-amber"}],Et=()=>Q(new Date),re=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5);async function Dt(t,e){let s=Z(localStorage.getItem(xt)),n=null;try{let m=(await fetch("/english/content/quotes.json").then(y=>y.json())).quotes||[];m.length&&(n=m[re()%m.length])}catch{}o(),c(),e.addEventListener("dl:task",()=>{o(),c(),a()});function o(){let l=Et(),m=s[l]||(s[l]={});localStorage.getItem(`dl.english.wordsDone.${l}`)==="1"&&(m.english_words=1),localStorage.getItem(`dl.english.reading.${l}`)&&(m.english_reading=1),localStorage.getItem(`dl.stock.review.${l}`)==="1"&&(m.stock_review=1)}function c(){let l=Object.keys(s).sort().slice(-60);s=Object.fromEntries(l.map(m=>[m,s[m]])),localStorage.setItem(xt,JSON.stringify(s))}function a(){let l=Et(),m=M.filter(f=>s[l]&&s[l][f]),y=V(s,M),k=[...Array(7)].map((f,E)=>{let j=rt(E-6),I=s[j]||{},N=M.filter(u=>I[u]).length;return{d:j,count:N,done:N===M.length,today:j===l}}),d=k.reduce((f,E)=>f+E.count,0),D=k.filter(f=>f.done).length,v=226,q=v*(1-m.length/M.length);t.innerHTML=`
      <div class="card streak-card">
        <div class="streak-row">
          <div class="ring-wrap">
            <svg class="ring" viewBox="0 0 84 84">
              <circle class="ring-bg" cx="42" cy="42" r="36"></circle>
              <circle class="ring-fg" cx="42" cy="42" r="36"
                stroke-dasharray="${v}" stroke-dashoffset="${q}"></circle>
            </svg>
            <div class="ring-label"><b>${m.length}</b>/${M.length}</div>
          </div>
          <div class="streak-info">
            <p class="hint">\u8FDE\u7EED\u5168\u90E8\u5B8C\u6210</p>
            <div class="streak-num">\u{1F525} ${y} <small>\u5929</small></div>
            <p class="hint">${G(s,M,l)?"\u4ECA\u65E5\u6253\u5361\u5B8C\u6210 \u{1F389}":`\u8FD8\u5DEE ${M.length-m.length} \u9879\u5B8C\u6210\u6253\u5361`}</p>
          </div>
        </div>
        <div class="week-strip">
          ${k.map(f=>`<div class="wd ${f.done?"done":""} ${f.today?"today":""}" title="${f.d}">${Number(f.d.slice(8))}<i></i></div>`).join("")}
        </div>
      </div>
      <div class="card tasks-card">
        <h2 class="card-title">\u4ECA\u65E5\u4EFB\u52A1</h2>
        ${Lt.map(f=>{let E=s[l]&&s[l][f.id];return`
            <div class="habit-task ${E?"done":""}" ${E?"":`data-goto="${f.tab}" role="button" tabindex="0"`}>
              <span class="dot ${E?"done":""}">${E?"\u2713":""}</span>
              <div class="task-text"><b>${f.icon} ${f.label}</b><span class="hint">${f.how}</span></div>
              <span class="tag ${E?"done":""}">${E?"\u5DF2\u5B8C\u6210":"\u5F85\u5B8C\u6210"}</span>
              ${E?"":'<span class="task-chevron" aria-hidden="true">\u203A</span>'}
            </div>`}).join("")}
      </div>
      <div class="card tips-card">
        <h2 class="card-title">\u5C0F\u8D34\u58EB</h2>
        ${ce.map(f=>`
          <div class="tip-row">
            <span class="tip-ico ${f.tone}">${f.icon}</span>
            <div><b>${f.title}</b><span class="hint">${f.desc}</span></div>
          </div>`).join("")}
      </div>
      <div class="card week-card">
        <div class="row-between">
          <h2 class="card-title">\u672C\u5468\u8282\u594F</h2>
          <button class="btn small ghost week-more" data-stats>\u5B8C\u6574\u7EDF\u8BA1 \u203A</button>
        </div>
        <div class="week-bars">
          ${k.map(f=>{let E="\u65E5\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D"[new Date(f.d+"T00:00:00").getDay()];return`<div class="week-bar ${f.today?"today":""}" title="${f.d} \xB7 \u5B8C\u6210 ${f.count}/3">
              <div class="week-track"><i class="week-fill lv-${f.count}" style="height:${f.count/M.length*100}%"></i></div>
              <span>${E}</span>
            </div>`}).join("")}
        </div>
        <p class="hint">\u672C\u5468\u5B8C\u6210 ${d}/${7*M.length} \u9879 \xB7 ${D}/7 \u5929\u5168\u52E4</p>
      </div>
      ${n?`
      <div class="card today-quote">
        <div class="today-quote-mark" aria-hidden="true">\u201C</div>
        <p class="today-quote-en">${n.en}</p>
        <p class="today-quote-zh">${n.zh}</p>
        <p class="hint">\u2014\u2014 ${n.who}</p>
      </div>`:""}
      <p class="hint footnote">\u4E09\u9879\u5168\u90E8\u5B8C\u6210\u5373\u89C6\u4E3A\u5F53\u65E5\u6253\u5361\u6210\u529F\uFF1B\u70B9\u51FB\u5F85\u5B8C\u6210\u4EFB\u52A1\u53EF\u76F4\u63A5\u8DF3\u8F6C\u3002</p>
    `}function $(l){let m=l.closest(".habit-task[data-goto]");m&&e.dispatchEvent(new CustomEvent("dl:nav",{detail:{tab:m.getAttribute("data-goto")}}))}t.addEventListener("click",l=>{if(l.target.closest("[data-stats]")){e.dispatchEvent(new CustomEvent("dl:nav",{detail:{tab:"stats"}}));return}$(l.target)}),t.addEventListener("keydown",l=>{l.key!=="Enter"&&l.key!==" "||!l.target.closest(".habit-task[data-goto]")||(l.preventDefault(),$(l.target))}),a()}var lt=/^(sh|sz)\d{6}$/;function qt(t,e){try{let s=JSON.parse(t);if(Array.isArray(s)){let n=[...new Set(s.filter(o=>typeof o=="string"&&lt.test(o)))];if(n.length)return n}}catch{}return[...e]}var dt="dl.stock.watchlist",At="dl.stock.lessonsDone",le=["sh600519","sz300750","sz002594","sh601318","sz000858","sh600036"],de=()=>{let t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`};async function Tt(t,e){let{lessons:s}=await fetch("/stock/lessons.json").then(r=>r.json()),n=qt(localStorage.getItem(dt),le),o=[],c="quotes",a=null,$={},l=null,m={},y=null;t.innerHTML=`
    <div class="subnav">
      <button data-view="quotes">\u81EA\u9009\u884C\u60C5</button>
      <button data-view="lessons">\u5165\u95E8\u6559\u7A0B</button>
    </div>
    <div id="st-body"></div>
  `;let k=t.querySelector("#st-body"),d=t.querySelector(".subnav");function D(){localStorage.setItem(dt,JSON.stringify(n))}localStorage.getItem(dt)===null&&D();function v(){try{return JSON.parse(localStorage.getItem(At)||"{}")}catch{return{}}}function q(r){localStorage.setItem(At,JSON.stringify(r))}function f(){localStorage.setItem(`dl.stock.review.${de()}`,"1"),e.dispatchEvent(new CustomEvent("dl:task",{detail:{id:"stock_review"}}))}function E(){let r=new Date,b=r.getDay();if(b===0||b===6)return!1;let x=r.getHours()*60+r.getMinutes();return x>=9*60+15&&x<=15*60+5}setInterval(()=>{c!=="quotes"||document.hidden||typeof y!="function"||E()&&y()},6e4);function j(){d.querySelectorAll("button").forEach(r=>r.classList.toggle("active",r.getAttribute("data-view")===c)),c==="quotes"?I():N()}function I(){k.innerHTML=`
      <div class="card">
        <div class="row-between">
          <h2 class="card-title">\u81EA\u9009\u884C\u60C5 <span class="hint">\u7EA2\u6DA8\u7EFF\u8DCC</span></h2>
          <button id="st-refresh" class="btn small">\u5237\u65B0</button>
        </div>
        <div id="st-meta" class="hint meta-line">\u52A0\u8F7D\u4E2D\u2026</div>
        <div id="st-summary" class="chip-row"></div>
        <div id="st-list" class="quote-list"></div>
        <div class="add-row">
          <input id="st-code" placeholder="\u52A0\u81EA\u9009\uFF1Ash600519 / sz300750" autocomplete="off" />
          <button id="st-add" class="btn small">\u6DFB\u52A0</button>
        </div>
      </div>
      <p class="hint footnote">\u70B9\u51FB\u4EFB\u610F\u4E00\u884C\u5C55\u5F00\u8FD1 30 \u65E5\u8D70\u52BF\uFF1B\u5F53\u65E5\u6210\u529F\u5237\u65B0\u4E00\u6B21\u884C\u60C5\uFF0C\u5373\u5B8C\u6210\u300C\u590D\u76D8\u81EA\u9009\u80A1\u300D\u6253\u5361\u4EFB\u52A1\u3002</p>
    `;let r=i=>k.querySelector(i);function b(){let i=o.filter(g=>g.changePct>0).length,h=o.filter(g=>g.changePct<0).length,S=o.length-i-h;r("#st-summary").innerHTML=o.length?`<span class="chip up-chip">\u6DA8 ${i}</span><span class="chip flat-chip">\u5E73 ${S}</span><span class="chip down-chip">\u8DCC ${h}</span>`:"",r("#st-list").innerHTML=o.length?'<div class="q-head"><span>\u80A1\u7968</span><span>\u6700\u65B0\u4EF7</span><span>\u6DA8\u8DCC</span><span></span></div>'+o.map(g=>{let L=g.changePct>0?"up":g.changePct<0?"down":"flat",F=g.changePct==null?"--":`${g.changePct>0?"+":""}${g.changePct.toFixed(2)}%`,Y=g.change==null?"--":`${g.change>0?"+":""}${g.change.toFixed(2)}`,H=l===g.code,O=m[g.code],ct=H?O&&O.length?x(O):'<p class="hint k-err">K\u7EBF\u83B7\u53D6\u5931\u8D25\uFF0C\u7A0D\u540E\u70B9\u51FB\u91CD\u8BD5</p>':"";return`
              <div class="quote-row ${H?"expanded":""}" data-code="${g.code}">
                <div class="q-name"><b>${g.name}</b><span class="hint">${g.code}</span></div>
                <div class="q-price ${L}">${g.price==null?"\u505C\u724C":g.price.toFixed(2)}</div>
                <div class="q-chg"><span class="pill ${L}">${F}</span><span class="hint">${Y}</span></div>
                <button class="q-del" title="\u5220\u9664" data-del="${g.code}">\xD7</button>
              </div>${H?`<div class="k-card">${ct}</div>`:""}`}).join(""):'<p class="hint">\u6682\u65E0\u81EA\u9009\u80A1\uFF0C\u8BF7\u5728\u4E0B\u65B9\u6DFB\u52A0\uFF08\u5982 sh600519\uFF09\u3002</p>',r("#st-meta").textContent=o.length?`\u66F4\u65B0\u4E8E ${new Date(o[0].serverTime).toLocaleTimeString("zh-CN")}${E()?" \xB7 \u4EA4\u6613\u65F6\u6BB5\u81EA\u52A8\u5237\u65B0":""}`:"\u6DFB\u52A0\u81EA\u9009\u80A1\u540E\u70B9\u51FB\u5237\u65B0"}function x(i){let h=i.map(C=>C.close),S=360,g=130,L=12,F=Math.min(...h),Y=Math.max(...h),H=Y-F||1,O=C=>L+C*(S-2*L)/Math.max(h.length-1,1),ct=C=>g-L-(C-F)/H*(g-2*L),wt=h.map((C,St)=>`${St?"L":"M"}${O(St).toFixed(1)} ${ct(C).toFixed(1)}`).join(" "),ae=`${wt} L ${O(h.length-1).toFixed(1)} ${g-L} L ${L} ${g-L} Z`,R=(h[h.length-1]-h[0])/h[0]*100,ie=R>0?"up":R<0?"down":"flat",X=R>0?"#e03131":R<0?"#2f9e44":"#8a93a6",yt="kg"+Math.random().toString(36).slice(2,8),kt=O(h.length-1).toFixed(1),oe=[.25,.5,.75].map(C=>`<line x1="${L}" y1="${(g-L-C*(g-2*L)).toFixed(1)}"
           x2="${S-L}" y2="${(g-L-C*(g-2*L)).toFixed(1)}"></line>`).join("");return`
        <div class="row-between k-meta">
          <span class="hint">\u8FD1 ${i.length} \u65E5\u6536\u76D8\u4EF7</span>
          <span class="hint k-range" title="${i[0].date} ~ ${i[i.length-1].date}">${i[0].date.slice(5)} ~ ${i[i.length-1].date.slice(5)}</span>
        </div>
        <svg class="kchart" viewBox="0 0 ${S} ${g}" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="${yt}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${X}" stop-opacity=".22"/>
              <stop offset="1" stop-color="${X}" stop-opacity=".02"/>
            </linearGradient>
          </defs>
          <g class="k-grid">${oe}</g>
          <path d="${ae}" fill="url(#${yt})"></path>
          <path d="${wt}" fill="none" stroke="${X}" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"></path>
          <line class="k-lastline" x1="${kt}" y1="${L}" x2="${kt}" y2="${g-L}" stroke="${X}"></line>
        </svg>
        <div class="row-between k-meta k-meta-bottom">
          <span class="${ie} k-pct">\u533A\u95F4 ${R>0?"+":""}${R.toFixed(2)}%</span>
          <span class="hint">\u6700\u4F4E ${F.toFixed(2)} \xB7 \u6700\u9AD8 ${Y.toFixed(2)}</span>
        </div>`}function p(i,h=1e4){let S=new AbortController,g=setTimeout(()=>S.abort(),h);return fetch(i,{signal:S.signal}).finally(()=>clearTimeout(g))}async function A(i){let h=n.find(S=>S.endsWith(i))||i;try{let S=await p(`/api/kline?code=${encodeURIComponent(h)}&days=30`).then(g=>g.json());m[i]=Array.isArray(S)&&S.length?S:[]}catch{m[i]=[]}}async function T(){r("#st-meta").textContent="\u5237\u65B0\u4E2D\u2026";try{let h=await(await p("/api/quotes?codes="+encodeURIComponent(n.join(",")))).json();if(h.error)throw new Error(h.error);o=h,b(),f()}catch(i){r("#st-meta").textContent=`\u884C\u60C5\u83B7\u53D6\u5931\u8D25\uFF1A${i.message==="The user aborted a request."?"\u8BF7\u6C42\u8D85\u65F6":i.message}\uFF08\u8BF7\u68C0\u67E5\u7F51\u7EDC\uFF09`}}r("#st-refresh").addEventListener("click",T),r("#st-list").addEventListener("click",async i=>{if(i.target.closest(".q-del")){let g=i.target.getAttribute("data-del");if(!g)return;n=n.filter(L=>L!==g&&!L.endsWith(g)),o=o.filter(L=>L.code!==g),l===g&&(l=null),D(),b();return}let h=i.target.closest(".quote-row");if(!h)return;let S=h.getAttribute("data-code");if(S){if(l===S){l=null,b();return}l=S,m[S]||(b(),await A(S)),b()}}),r("#st-add").addEventListener("click",()=>{let i=r("#st-code"),h=i.value.trim().toLowerCase();if(!lt.test(h)){i.value="",i.placeholder="\u683C\u5F0F\uFF1Ash600519 \u6216 sz300750";return}n.includes(h)||(n.push(h),D(),T()),i.value=""}),y=T,T()}function N(){if(a!==null)return u();let r=v(),b=s.filter(p=>r[p.id]).length,x=s.find(p=>!r[p.id]);k.innerHTML=`
      <div class="card lesson-list">
        <div class="row-between">
          <h2 class="card-title">\u80A1\u7968\u5165\u95E8 \xB7 \u96F6\u57FA\u7840 8 \u8BFE</h2>
          <span class="tag ${b===s.length?"done":""}">${b}/${s.length} \u5DF2\u5B66</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${b/s.length*100}%"></div></div>
        <p class="hint lesson-intro">\u6BCF\u8BFE\u7EA6 3-5 \u5206\u949F\uFF1A\u6B63\u6587 \u2192 \u8981\u70B9 \u2192 \u5C0F\u6D4B\u9A8C\u3002${x?"\u5EFA\u8BAE\u4ECE\u300C\u7EE7\u7EED\u5B66\u300D\u5F00\u59CB\u3002":"\u5168\u90E8\u5B66\u5B8C\uFF0C\u6BD5\u4E1A\uFF01\u{1F393}"}</p>
        ${s.map((p,A)=>`
          <div class="lesson-item" data-lesson="${p.id}">
            <div class="lesson-row">
              <span class="num ${r[p.id]?"done":""}">${r[p.id]?"\u2713":A+1}</span>
              <div class="lesson-text">
                <b>${p.title}</b>
                <span class="hint">\u7EA6 ${p.minutes} \u5206\u949F \xB7 ${p.quiz.length} \u9898\u5C0F\u6D4B\u9A8C</span>
              </div>
              <span class="tag ${p===x?"rec":r[p.id]?"done":""}">${p===x?"\u7EE7\u7EED\u5B66":r[p.id]?"\u5DF2\u5B66\u5B8C":"\u672A\u5B66"}</span>
            </div>
          </div>`).join("")}
      </div>
    `,k.querySelectorAll(".lesson-item").forEach(p=>p.addEventListener("click",()=>{a=p.getAttribute("data-lesson"),$={},N()}))}function u(){let r=s.find(p=>p.id===a),x=!!v()[r.id];k.innerHTML=`
      <div class="card">
        <button class="btn small ghost" id="ls-back">\u2190 \u8FD4\u56DE\u8BFE\u7A0B\u5217\u8868</button>
        <h2 class="lesson-title">${r.title}</h2>
        <p class="hint">\u7B2C ${s.indexOf(r)+1} \u8BFE \xB7 \u7EA6 ${r.minutes} \u5206\u949F</p>
        ${r.sections.map(p=>`<div class="lesson-sec"><h4>${p.h}</h4><p>${p.p}</p></div>`).join("")}
        <div class="points-box">
          <h4>\u{1F3AF} \u672C\u8BFE\u8981\u70B9</h4>
          <ul>${r.points.map(p=>`<li>${p}</li>`).join("")}</ul>
        </div>
      </div>
      <div class="card">
        <h3 class="quiz-head">\u270F\uFE0F \u5C0F\u6D4B\u9A8C\uFF08${r.quiz.length} \u9898\uFF09</h3>
        ${r.quiz.map((p,A)=>w(p,A)).join("")}
      </div>
      <div class="card center finish-card">
        <button class="btn primary" id="ls-done" ${x?"disabled":""}>${x?"\u672C\u8BFE\u5DF2\u5B66\u5B8C \u2713":"\u6807\u8BB0\u5B66\u5B8C\u8FD9\u8BFE"}</button>
      </div>
    `,k.querySelector("#ls-back").addEventListener("click",()=>{a=null,N()}),k.querySelector("#ls-done").addEventListener("click",()=>{let p=v();p[r.id]=1,q(p),a=null,N()}),k.querySelectorAll(".opt").forEach(p=>p.addEventListener("click",()=>{let A=Number(p.getAttribute("data-q"));if($[A]!==void 0)return;let T=r.quiz[A],i=Number(p.getAttribute("data-opt"));$[A]=i;let h=k.querySelector(`.quiz-q[data-qi="${A}"]`);h.querySelectorAll(".opt").forEach(S=>{let g=Number(S.getAttribute("data-opt"));g===T.a?S.classList.add("correct"):g===i&&S.classList.add("wrong"),S.classList.add("locked")}),h.querySelector(".explain").classList.remove("hidden")}))}function w(r,b){return`
      <div class="quiz-q" data-qi="${b}">
        <p class="quiz-title">${b+1}. ${r.q}</p>
        ${r.options.map((x,p)=>`<button class="opt" data-q="${b}" data-opt="${p}">${"ABCD"[p]}. ${x}</button>`).join("")}
        <div class="explain hidden">\u{1F4A1} ${r.explain}</div>
      </div>`}d.addEventListener("click",r=>{let b=r.target.getAttribute("data-view");b&&(c=b,b==="lessons"&&(a=null),j())}),j()}var jt=[1,2,4,7,15],ut=jt.length;function ue(t){return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}function It(t,e,s=new Date){let n=e?Math.min(t+1,ut):1,o=new Date(s);return o.setDate(o.getDate()+jt[n-1]),{box:n,due:ue(o)}}function Ct(t){try{let e=JSON.parse(t);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function Mt(t,e,s,n=10){let o=e.filter(a=>t[a.w]&&t[a.w].due<=s).sort((a,$)=>t[a.w].due<t[$.w].due?-1:1).map(a=>a.w),c=e.filter(a=>!t[a.w]).slice(0,n).map(a=>a.w);return{date:s,queue:[...o,...c],idx:0}}function pt(t){let e=/^(.+?)\s+([\u4e00-\u9fff].*)$/.exec(t);return e?{en:e[1],zh:e[2]}:{en:t,zh:""}}var Nt="dl.english.progress",Ot="dl.english.today",pe=10,B=()=>{let t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`},_t=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5),tt=null,zt=null;function ht(t){let e=document.getElementById("dl-toast");e||(e=document.createElement("div"),e.id="dl-toast",e.className="app-toast",document.body.appendChild(e)),e.textContent=t,e.classList.add("show"),clearTimeout(zt),zt=setTimeout(()=>e.classList.remove("show"),2400)}function he(){if(!window.speechSynthesis)return null;let e=(speechSynthesis.getVoices()||[]).filter(s=>/^en([-_]|$)/i.test(s.lang));return e.find(s=>/google|samantha|karen|daniel|microsoft.*english/i.test(s.name))||e[0]||null}function Rt(t){if(!("speechSynthesis"in window)||typeof SpeechSynthesisUtterance>"u"){ht("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u6717\u8BFB");return}try{speechSynthesis.cancel();let e=new SpeechSynthesisUtterance(t);e.lang="en-US",e.rate=.9,e.pitch=1;let s=he();s&&(e.voice=s),e.onerror=()=>ht("\u6717\u8BFB\u5931\u8D25\uFF1A\u8BF7\u68C0\u67E5\u7F51\u7EDC\u6216\u7CFB\u7EDF\u8BED\u97F3"),speechSynthesis.speak(e)}catch{ht("\u6717\u8BFB\u5931\u8D25\uFF1A\u8BF7\u68C0\u67E5\u7F51\u7EDC\u6216\u7CFB\u7EDF\u8BED\u97F3")}}function _(t){let e=String(t||"").trim();if(e){if(navigator.onLine!==!1)try{tt&&(tt.pause(),tt=null);let s=new Audio("https://dict.youdao.com/dictvoice?audio="+encodeURIComponent(e)+"&type=2");tt=s;let n=!1,o=()=>{n||(n=!0,Rt(e))};s.onerror=o;let c=s.play();c&&typeof c.catch=="function"&&c.catch(o);return}catch{}Rt(e)}}async function ge(t){try{return await navigator.clipboard.writeText(t),!0}catch{}try{let e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();let s=document.execCommand("copy");return e.remove(),s}catch{return!1}}async function Bt(t,e){let[s,n,o]=await Promise.all([fetch("/english/data/wordbank.json").then(u=>u.json()),fetch("/english/content/articles.json").then(u=>u.json()).then(u=>u.articles),fetch("/english/content/quotes.json").then(u=>u.json()).then(u=>u.quotes)]),c=Ct(localStorage.getItem(Nt)),a=JSON.parse(localStorage.getItem(Ot)||"null"),$="words",l=-1;(!a||a.date!==B())&&(a=Mt(c,s,B(),pe),y());function m(){localStorage.setItem(Nt,JSON.stringify(c))}function y(){localStorage.setItem(Ot,JSON.stringify(a))}function k(){localStorage.getItem(`dl.english.wordsDone.${B()}`)!=="1"&&(localStorage.setItem(`dl.english.wordsDone.${B()}`,"1"),e.dispatchEvent(new CustomEvent("dl:task",{detail:{id:"english_words"}})))}t.innerHTML=`
    <div class="subnav">
      <button data-view="words">\u80CC\u5355\u8BCD</button>
      <button data-view="reading">\u53CC\u8BED\u9605\u8BFB</button>
      <button data-view="quote">\u6BCF\u65E5\u4E00\u53E5</button>
      <button data-view="bank">\u8BCD\u5E93</button>
    </div>
    <div id="en-body"></div>
  `;let d=t.querySelector("#en-body"),D=t.querySelector(".subnav");function v(){D.querySelectorAll("button").forEach(u=>u.classList.toggle("active",u.getAttribute("data-view")===$)),$==="words"?j():$==="reading"?I():$==="bank"?E():N()}let q="",f=null;function E(){let u=q.trim().toLowerCase(),w=u?s.filter(i=>i.w.toLowerCase().includes(u)||i.zh.includes(u)||i.tag.includes(u)):s,r=i=>!!c[i],b=i=>c[i]?c[i].box:0,x=f&&w.some(i=>i.w===f)?f:null,p=x?s.find(i=>i.w===x):null;d.innerHTML=`
      <div class="card">
        <div class="row-between">
          <h2 class="card-title">\u8BCD\u5E93 <span class="hint">${s.length} \u8BCD \xB7 \u5DF2\u5B66 ${s.filter(i=>r(i.w)).length}</span></h2>
        </div>
        <div class="search-box">
          <input id="bk-q" placeholder="\u641C\u7D22\u5355\u8BCD / \u4E2D\u6587 / \u5206\u7C7B\uFF08\u5982\uFF1A\u725B\u5E02\u3001\u8D22\u7ECF\uFF09" value="${q.replace(/"/g,"&quot;")}" autocomplete="off" />
          ${q?'<button id="bk-clear" class="btn small ghost">\u6E05\u7A7A</button>':""}
        </div>
        <p class="hint">${u?`\u5339\u914D ${w.length} \u4E2A`:"\u6309\u8BCD\u5E93\u987A\u5E8F\uFF0C\u6BCF\u5929\u81EA\u52A8\u5B66 10 \u4E2A\u65B0\u8BCD\uFF1B\u8FD9\u91CC\u53EF\u968F\u65F6\u67E5\u9605\u4EFB\u4F55\u8BCD\u3002"}</p>
      </div>
      ${p?`
        <div class="card word-detail">
          <div class="row-between">
            <span class="tag">${p.tag} \xB7 ${r(p.w)?`\u5DF2\u5B66\xB7\u7B2C${b(p.w)}\u76D2`:"\u672A\u5B66"}</span>
            <button class="icon-btn" id="bk-tts" title="\u53D1\u97F3">\u{1F50A}</button>
          </div>
          <h2 class="word">${p.w}</h2>
          <p class="hint">${p.pos}</p>
          <p class="word-zh">${p.zh}</p>
          <div class="ex-block">
            <p class="word-ex">${p.ex}</p>
            <p class="word-ex-zh hint">${p.exZh}</p>
          </div>
          <div class="detail-block">
            <h4>\u{1F4CC} \u5E38\u7528\u642D\u914D</h4>
            <div class="chips">${p.phrases.map(i=>{let h=pt(i);return`<span class="chip phrase-chip" data-say="${h.en}">\u{1F50A} ${h.en} <em>${h.zh}</em></span>`}).join("")}</div>
          </div>
          <div class="detail-block tip-block">
            <h4>\u{1F4A1} \u8BB0\u5FC6\u70B9</h4>
            <p>${p.tip}</p>
          </div>
        </div>`:""}
      <div class="card bank-list">
        ${w.length?w.map(i=>`
          <div class="bank-row ${i.w===x?"open":""}" data-w="${i.w}">
            <span class="dot ${r(i.w)?"done":""}">${r(i.w)?"\u2713":""}</span>
            <div class="bank-text"><b>${i.w}</b><span class="hint">${i.zh}</span></div>
            <span class="tag ${i.w===x?"done":""}">${i.w===x?"\u6536\u8D77":"\u8BE6\u89E3"}</span>
          </div>`).join(""):'<p class="hint center-text">\u6CA1\u6709\u5339\u914D\u7684\u5355\u8BCD</p>'}
      </div>`;let A=d.querySelector("#bk-q");A.addEventListener("input",()=>{q=A.value,E();let i=d.querySelector("#bk-q");i.focus(),i.setSelectionRange(i.value.length,i.value.length)});let T=d.querySelector("#bk-clear");T&&T.addEventListener("click",()=>{q="",E()}),d.querySelector("#bk-tts")&&d.querySelector("#bk-tts").addEventListener("click",()=>_(x)),d.querySelectorAll(".phrase-chip").forEach(i=>i.addEventListener("click",()=>_(i.getAttribute("data-say")))),d.querySelectorAll(".bank-row").forEach(i=>i.addEventListener("click",()=>{let h=i.getAttribute("data-w");f=f===h?null:h,E()}))}function j(){if(a.idx>=a.queue.length){k();let i=Object.keys(c).length,h=Object.values(c).filter(S=>S.box>=ut).length;d.innerHTML=`
        <div class="card center">
          <div class="big-emoji">\u{1F389}</div>
          <h2>\u4ECA\u65E5\u5355\u8BCD\u5DF2\u5B8C\u6210</h2>
          <div class="stat-row">
            <span class="chip">\u8BCD\u5E93\u8FDB\u5EA6 ${i}/${s.length}</span>
            <span class="chip">\u5DF2\u6BD5\u4E1A ${h} \u8BCD</span>
          </div>
          <p class="hint">\u660E\u5929\u4F1A\u6309\u9057\u5FD8\u66F2\u7EBF\u5B89\u6392\u590D\u4E60\u3002<br/>\u53EF\u4EE5\u5230\u300C\u8BCD\u5E93\u300D\u968F\u65F6\u67E5\u9605\u4EFB\u4F55\u8BCD\u7684\u642D\u914D\u4E0E\u8BB0\u5FC6\u70B9\u3002</p>
        </div>`;return}let u=s.find(i=>i.w===a.queue[a.idx]),w=!c[u.w],r=w?0:c[u.w].box;d.innerHTML=`
      <div class="card flashcard">
        <div class="fc-progress">${a.queue.map((i,h)=>`<i class="${h<a.idx?"done":h===a.idx?"cur":""}"></i>`).join("")}</div>
        <div class="row-between">
          <span class="tag">${u.tag} \xB7 ${w?"\u65B0\u8BCD":`\u590D\u4E60\xB7\u7B2C${r}\u76D2`}</span>
          <button class="icon-btn" id="tts-word" title="\u53D1\u97F3">\u{1F50A}</button>
        </div>
        <div class="fc-body">
          <h2 class="word">${u.w}</h2>
          <p class="hint fc-pos">${u.pos}</p>
          <p class="hint fc-tip">\u5148\u56DE\u60F3\u5B83\u7684\u4E2D\u6587\u610F\u601D\uFF0C\u518D\u663E\u793A\u7B54\u6848</p>
          <div id="fc-back" class="hidden">
            <p class="word-zh">${u.zh}</p>
            <div class="ex-block">
              <p class="word-ex">${u.ex}</p>
              <p class="word-ex-zh hint">${u.exZh}</p>
            </div>
            <div class="detail-block">
              <h4>\u{1F4CC} \u5E38\u7528\u642D\u914D</h4>
              <div class="chips">${u.phrases.map(i=>{let{en:h,zh:S}=pt(i);return`<span class="chip phrase-chip" data-say="${h}">\u{1F50A} ${h} <em>${S}</em></span>`}).join("")}</div>
            </div>
            <div class="detail-block tip-block">
              <h4>\u{1F4A1} \u8BB0\u5FC6\u70B9</h4>
              <p>${u.tip}</p>
            </div>
          </div>
        </div>
        <div class="stack">
          <button class="btn primary" id="flip">\u663E\u793A\u7B54\u6848</button>
          <div class="row-gap hidden" id="grade">
            <button class="btn danger" id="wrong">\u53C8\u5FD8\u4E86</button>
            <button class="btn ok" id="right">\u8BB0\u4F4F\u4E86</button>
          </div>
        </div>
      </div>
      <p class="hint center-text">\u7B2C ${a.idx+1} / ${a.queue.length} \u4E2A</p>
      <p class="kbd-hint center-text"><kbd>\u7A7A\u683C</kbd> \u7FFB\u9762 \xB7 <kbd>1</kbd> \u53C8\u5FD8\u4E86 \xB7 <kbd>2</kbd> \u8BB0\u4F4F\u4E86</p>
    `;let b=d.querySelector("#fc-back"),x=d.querySelector("#flip"),p=d.querySelector("#grade"),A=d.querySelector(".fc-tip");d.querySelector("#tts-word").addEventListener("click",()=>_(u.w)),x.addEventListener("click",()=>{b.classList.remove("hidden"),A&&A.classList.add("hidden"),x.classList.add("hidden"),p.classList.remove("hidden"),_(u.w)}),d.querySelectorAll(".phrase-chip").forEach(i=>i.addEventListener("click",()=>_(i.getAttribute("data-say")))),d.querySelector("#wrong").addEventListener("click",()=>T(!1)),d.querySelector("#right").addEventListener("click",()=>T(!0));function T(i){let h=c[u.w]||{box:0,due:""};c[u.w]=It(h.box,i),m(),a.idx+=1,y(),j()}}function I(){if(l>=0){let w=n[l],r=localStorage.getItem(`dl.english.reading.${B()}`);d.innerHTML=`
        <div class="card">
          <button class="btn small ghost" id="rd-back">\u2190 \u8FD4\u56DE\u5217\u8868</button>
          <h2 class="card-title">${w.title}</h2>
          <p class="hint">\u7EA6 ${w.minutes} \u5206\u949F \xB7 \u6BB5\u843D\u5BF9\u7167 + \u8BB2\u89E3</p>
          ${w.paras.map(b=>`<p class="rd-en">${b.en}</p><p class="rd-zh hint">${b.zh}</p>`).join("")}
          <div class="notes-block">
            <h4>\u{1F4DD} \u8BED\u6CD5\u4E0E\u8868\u8FBE\u8BB2\u89E3</h4>
            <ul>${w.notes.map(b=>`<li>${b}</li>`).join("")}</ul>
          </div>
          <h4 class="vocab-head">\u{1F50A} \u8BCD\u6C47\u8868\uFF08\u70B9\u51FB\u53D1\u97F3\uFF09</h4>
          <div class="vocab">${w.vocab.map(b=>`<span class="chip vocab-chip" data-say="${b.w}">\u{1F50A} ${b.w} ${b.zh}</span>`).join("")}</div>
          <button class="btn primary" id="rd-done" ${r===w.id?"disabled":""}>
            ${r===w.id?"\u4ECA\u65E5\u5DF2\u8BFB \u2713":"\u6807\u8BB0\u5DF2\u8BFB\uFF0C\u5B8C\u6210\u6253\u5361"}</button>
        </div>`,d.querySelector("#rd-back").addEventListener("click",()=>{l=-1,I()}),d.querySelector("#rd-done").addEventListener("click",()=>{localStorage.setItem(`dl.english.reading.${B()}`,w.id),e.dispatchEvent(new CustomEvent("dl:task",{detail:{id:"english_reading"}})),I()}),d.querySelector(".vocab").addEventListener("click",b=>{let x=b.target.getAttribute("data-say");x&&_(x)});return}let u=_t()%n.length;d.innerHTML=`
      <div class="card rd-list">
        <div class="rd-list-head">
          <div>
            <h2 class="card-title">\u53CC\u8BED\u9605\u8BFB</h2>
            <p class="hint">\u6BCF\u5929\u4E00\u7BC7\u8D22\u7ECF\u77ED\u6587\uFF0C\u6BB5\u843D\u5BF9\u7167 + \u8BB2\u89E3</p>
          </div>
          <span class="tag">${n.length} \u7BC7</span>
        </div>
        ${n.map((w,r)=>`
          <button class="rd-row" data-open="${r}">
            <span class="rd-main">
              <span class="rd-top">
                <b class="rd-title">${w.title}</b>
                ${r===u?'<span class="tag rec">\u4ECA\u65E5\u63A8\u8350</span>':""}
              </span>
              <span class="hint">\u7EA6 ${w.minutes} \u5206\u949F \xB7 ${w.vocab.length} \u4E2A\u8BCD\u6C47</span>
            </span>
            <span class="rd-go">\u9605\u8BFB \u203A</span>
          </button>`).join("")}
      </div>`,d.querySelectorAll("[data-open]").forEach(w=>w.addEventListener("click",()=>{l=Number(w.getAttribute("data-open")),I()}))}function N(){let u=o[_t()%o.length];d.innerHTML=`
      <div class="card center quote-card">
        <div class="quote-mark" aria-hidden="true">\u201C</div>
        <p class="quote-en">${u.en}</p>
        <p class="word-zh">${u.zh}</p>
        <p class="hint">\u2014\u2014 ${u.who}</p>
        <div class="row-gap quote-actions">
          <button class="btn primary" id="tts-quote">\u{1F50A} \u8DDF\u8BFB\u4E00\u904D</button>
          <button class="btn" id="copy-quote">\u{1F4CB} \u590D\u5236</button>
        </div>
      </div>`,d.querySelector("#tts-quote").addEventListener("click",()=>_(u.en)),d.querySelector("#copy-quote").addEventListener("click",async()=>{let w=d.querySelector("#copy-quote"),r=await ge(`${u.en}
${u.zh}
\u2014\u2014 ${u.who}`);w.textContent=r?"\u2705 \u5DF2\u590D\u5236":"\u274C \u590D\u5236\u5931\u8D25",setTimeout(()=>{w.textContent="\u{1F4CB} \u590D\u5236"},1500)})}D.addEventListener("click",u=>{let w=u.target.getAttribute("data-view");w&&($=w,w==="reading"&&(l=-1),v())}),document.addEventListener("keydown",u=>{if($!=="words")return;let w=document.activeElement&&document.activeElement.tagName;w==="INPUT"||w==="TEXTAREA"||(u.code==="Space"&&document.getElementById("flip")?(u.preventDefault(),document.getElementById("flip").click()):u.key==="1"&&document.getElementById("wrong")?(u.preventDefault(),document.getElementById("wrong").click()):u.key==="2"&&document.getElementById("right")&&(u.preventDefault(),document.getElementById("right").click()))}),v()}var Ft=t=>String(t).padStart(2,"0");function z(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function Ht(t,e=new Date){let s=/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/.exec(String(t||""));if(!s)return String(t||"");let[,n,o,c,a,$]=s,l=`${e.getFullYear()}-${Ft(e.getMonth()+1)}-${Ft(e.getDate())}`;return`${n}-${o}-${c}`===l?`${a}:${$}`:Number(n)===e.getFullYear()?`${o}-${c} ${a}:${$}`:`${n}-${o}-${c} ${a}:${$}`}function gt(t,e=30){let s=new Set;return(Array.isArray(t)?t:[]).filter(n=>n&&n.title&&/^https?:\/\//i.test(String(n.url||""))).filter(n=>{let o=String(n.id||n.title);return s.has(o)?!1:(s.add(o),!0)}).slice(0,e).map(n=>({id:String(n.id||n.title),title:String(n.title).trim(),digest:String(n.digest||"").replace(/^【[^】]*】\s*/,"").trim(),time:String(n.time||"").trim(),url:String(n.url)}))}function Pt(t){try{let e=JSON.parse(t);if(e&&Array.isArray(e.items))return{updatedAt:Number(e.updatedAt)||0,items:gt(e.items)}}catch{}return{updatedAt:0,items:[]}}var Ut="dl.news.cache",ve=5*60*1e3;function Wt(t,e){let s=Pt(localStorage.getItem(Ut)),n=s.items,o=s.updatedAt,c=!1,a="",$=!1;function l(){try{localStorage.setItem(Ut,JSON.stringify({updatedAt:o,items:n}))}catch{}}function m(){if(!o)return"";let d=new Date(o),D=d.toDateString()===new Date().toDateString(),v=`${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;return D?v:`${d.getMonth()+1}-${d.getDate()} ${v}`}async function y(d=!1){if(!c){if(!d&&navigator.onLine===!1){k();return}c=!0,a="",k();try{let v=await(await fetch("/api/news",{cache:"no-store"})).json();if(v.error)throw new Error(v.error);let q=gt(v.items);q.length&&(n=q,o=Number(v.updatedAt)||Date.now(),l())}catch{a=navigator.onLine===!1?"\u5F53\u524D\u65E0\u7F51\u7EDC\uFF0C\u663E\u793A\u4E0A\u6B21\u7F13\u5B58":"\u65B0\u95FB\u52A0\u8F7D\u5931\u8D25\uFF0C\u663E\u793A\u4E0A\u6B21\u7F13\u5B58"}c=!1,k()}}function k(){let d=[];m()&&d.push(`\u66F4\u65B0\u4E8E ${m()}`),c&&d.push("\u5237\u65B0\u4E2D\u2026"),a&&d.push(a),!o&&!c&&d.push("\u7B49\u5F85\u52A0\u8F7D"),t.innerHTML=`
      <div class="card news-head">
        <div class="row-between">
          <div>
            <h2 class="card-title">\u8D22\u7ECF\u5FEB\u8BAF <span class="news-live">7\xD724</span></h2>
            <p class="hint">${z(d.join(" \xB7 "))}</p>
          </div>
          <button id="news-refresh" class="btn small" ${c?"disabled":""}>\u5237\u65B0</button>
        </div>
      </div>
      ${n.length?`
        <div class="news-grid">
          ${n.map(D=>`
            <a class="card news-item" href="${z(D.url)}" target="_blank" rel="noopener noreferrer">
              <div class="news-meta">
                <span class="news-time">${z(Ht(D.time))}</span>
                <span class="news-src">\u4E1C\u65B9\u8D22\u5BCC</span>
              </div>
              <h3 class="news-title">${z(D.title)}</h3>
              ${D.digest?`<p class="hint news-digest">${z(D.digest)}</p>`:""}
              <span class="news-more">\u9605\u8BFB\u539F\u6587 \u203A</span>
            </a>`).join("")}
        </div>`:`
        <div class="card news-empty">
          <div class="big-emoji">\u{1F4F0}</div>
          <p class="hint">${c?"\u6B63\u5728\u83B7\u53D6\u6700\u65B0\u5FEB\u8BAF\u2026":z(a||"\u6682\u65E0\u5FEB\u8BAF")}</p>
          ${c?"":'<button class="btn small" data-retry>\u91CD\u8BD5</button>'}
        </div>`}
    `}t.addEventListener("click",d=>{(d.target.closest("#news-refresh")||d.target.closest("[data-retry]"))&&y(!0)}),e.addEventListener("dl:show",d=>{$=!!(d.detail&&d.detail.id==="news"),$&&y()}),setInterval(()=>{$&&!document.hidden&&y()},ve),k(),y()}var et="dl.english.reading.",vt=/^(\d{4})-(\d{2})-(\d{2})$/,nt=(t=new Date)=>`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;function at(t){let e=vt.exec(String(t??""));if(!e)return null;let s=Number(e[1]),n=Number(e[2])-1,o=Number(e[3]),c=Date.UTC(s,n,o),a=new Date(c);return a.getUTCFullYear()!==s||a.getUTCMonth()!==n||a.getUTCDate()!==o?null:Math.floor(c/864e5)}function st(t){let e=new Date(Number(t)*864e5);return`${e.getUTCFullYear()}-${String(e.getUTCMonth()+1).padStart(2,"0")}-${String(e.getUTCDate()).padStart(2,"0")}`}function U(t){try{let e=JSON.parse(t);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function Jt(t,e){return!t||!e.length?0:e.filter(s=>t[s]).length}function P(t,e,s){if(!e.length)return!1;let n=t&&t[s];return!!n&&e.every(o=>n[o])}function fe(t,e,s=new Date){let n=at(nt(s));if(n===null)return 0;let o=0,c=P(t,e,st(n))?n:n-1;for(;P(t,e,st(c));)o+=1,c-=1;return o}function me(t,e){if(!e.length||!t)return 0;let s=Object.keys(t).filter(a=>P(t,e,a)).map(at).filter(a=>a!==null).sort((a,$)=>a-$),n=0,o=0,c=null;for(let a of s)o=c!==null&&a===c+1?o+1:1,o>n&&(n=o),c=a;return n}function Kt(t,e,s=new Date,n=8){let o=nt(s),c=at(o),a=(s.getDay()+6)%7,$=c-a-(n-1)*7,l=[];for(let m=0;m<n*7;m++){let y=st($+m),k=Jt(t&&t[y],e);l.push({date:y,count:k,total:e.length,complete:P(t,e,y),future:y>o,today:y===o})}return{cells:l,weeks:n,start:l[0].date,end:l[l.length-1].date}}function $e(t,e,s=new Date){let n=at(nt(s)),o=0,c=0;for(let a=6;a>=0;a--){let $=Jt(t&&t[st(n-a)],e);o+=$,e.length&&$===e.length&&(c+=1)}return{done:o,total:7*e.length,completeDays:c}}function be(t,e=0){let s=[0,0,0,0,0,0];for(let o of Object.values(t||{})){let c=o&&Number(o.box),a=Number.isInteger(c)&&c>=1&&c<=5?c:1;s[a]+=1}let n=s.slice(1).reduce((o,c)=>o+c,0);return s[0]=Math.max(0,(Number(e)||0)-n),{counts:s,learned:n,mastered:s[5],fresh:s[0]}}function we(t,e=new Date){let s=nt(e);return Object.values(t||{}).filter(n=>n&&typeof n.due=="string"&&vt.test(n.due)&&n.due<=s).length}function Yt(t){let e=new Set;for(let s of t||[]){if(typeof s!="string"||!s.startsWith(et))continue;let n=s.slice(et.length);vt.test(n)&&e.add(n)}return e.size}function Xt(t,e=new Date){let{log:s={},taskIds:n=[],progress:o={},bankTotal:c=0,lessonsDone:a=0,lessonsTotal:$=0,readingDays:l=0}=t||{},m=be(o,c),y=$e(s,n,e);return{totalDays:Object.keys(s||{}).filter(d=>P(s,n,d)).length,currentStreak:fe(s,n,e),maxStreak:me(s,n),weekDone:y.done,weekTotal:y.total,weekCompleteDays:y.completeDays,weekRate:y.total?Math.round(y.done/y.total*100):0,learned:m.learned,mastered:m.mastered,fresh:m.fresh,boxes:m.counts,dueToday:we(o,e),readingDays:l,lessonsDone:Math.max(0,Number(a)||0),lessonsTotal:Math.max(0,Number($)||0),bankTotal:Math.max(0,Number(c)||0)}}var ye=[{id:"first_day",icon:"\u{1F331}",title:"\u542F\u7A0B",desc:"\u5B8C\u6210\u7B2C 1 \u5929\u5168\u90E8\u4EFB\u52A1",metric:"totalDays",target:1},{id:"streak3",icon:"\u{1F525}",title:"\u5C0F\u6709\u575A\u6301",desc:"\u8FDE\u7EED\u6253\u5361 3 \u5929",metric:"maxStreak",target:3},{id:"streak7",icon:"\u26A1",title:"\u4E00\u5468\u4E0D\u65AD",desc:"\u8FDE\u7EED\u6253\u5361 7 \u5929",metric:"maxStreak",target:7},{id:"streak30",icon:"\u{1F3C6}",title:"\u4E60\u60EF\u6210\u81EA\u7136",desc:"\u8FDE\u7EED\u6253\u5361 30 \u5929",metric:"maxStreak",target:30},{id:"words10",icon:"\u{1F4DA}",title:"\u8BCD\u6C47\u8D77\u6B65",desc:"\u5B66\u8FC7 10 \u4E2A\u5355\u8BCD",metric:"learned",target:10},{id:"words50",icon:"\u{1F9E0}",title:"\u8BCD\u6C47\u8FDB\u9636",desc:"\u5B66\u8FC7 50 \u4E2A\u5355\u8BCD",metric:"learned",target:50},{id:"master20",icon:"\u{1F393}",title:"\u878D\u4F1A\u8D2F\u901A",desc:"20 \u4E2A\u5355\u8BCD\u8FDB\u5165\u7B2C 5 \u76D2",metric:"mastered",target:20},{id:"read5",icon:"\u{1F4F0}",title:"\u9605\u8BFB\u6210\u4E60",desc:"\u8BFB\u5B8C 5 \u7BC7\u53CC\u8BED\u77ED\u6587",metric:"readingDays",target:5},{id:"lessons8",icon:"\u{1F4C8}",title:"\u6295\u8D44\u5165\u95E8",desc:"\u5B66\u5B8C 8 \u8282\u80A1\u7968\u8BFE\u7A0B",metric:"lessonsDone",target:8}];function Gt(t){return ye.map(e=>{let s=Number(t&&t[e.metric])||0,n=Math.min(s,e.target);return{...e,cur:n,unlocked:s>=e.target}})}var Qt=["english_words","english_reading","stock_review"],ke=["\u672A\u5B66","1 \u5929","2 \u5929","4 \u5929","7 \u5929","15 \u5929"];async function Vt(t,e){let[s,n]=await Promise.all([fetch("/english/data/wordbank.json").then(a=>a.json()),fetch("/stock/lessons.json").then(a=>a.json()).then(a=>a.lessons)]);function o(){let a=U(localStorage.getItem("dl.habit.log")),$=U(localStorage.getItem("dl.english.progress")),l=U(localStorage.getItem("dl.stock.lessonsDone")),m=n.filter(k=>l[k.id]).length,y=Yt(Object.keys(localStorage).filter(k=>k.startsWith(et)&&localStorage.getItem(k)));return Xt({log:a,taskIds:Qt,progress:$,bankTotal:s.length,lessonsDone:m,lessonsTotal:n.length,readingDays:y},new Date)}function c(){let a=o(),$=Kt(U(localStorage.getItem("dl.habit.log")),Qt,new Date,8),l=Gt(a),m=l.filter(v=>v.unlocked).length,y=a.bankTotal?Math.round(a.learned/a.bankTotal*100):0,k=a.boxes.slice(1),d=Math.max(...k,1),D=a.totalDays===0&&a.learned===0;t.innerHTML=`
      <div class="card stats-hero">
        <div class="row-between">
          <h2 class="card-title">\u5B66\u4E60\u7EDF\u8BA1</h2>
          <span class="tag">\u6700\u8FD1 60 \u5929</span>
        </div>
        ${D?'<p class="hint stats-empty">\u8FD8\u6CA1\u6709\u5B66\u4E60\u8BB0\u5F55\u3002\u53BB\u300C\u4ECA\u65E5\u300D\u5B8C\u6210\u4E00\u9879\u4EFB\u52A1\uFF0C\u8FD9\u91CC\u4F1A\u81EA\u52A8\u957F\u51FA\u4F60\u7684\u5B66\u4E60\u66F2\u7EBF\u3002</p>':""}
        <div class="stat-grid">
          <div class="stat-tile"><b>${a.currentStreak}</b><span>\u5F53\u524D\u8FDE\u51FB</span></div>
          <div class="stat-tile"><b>${a.maxStreak}</b><span>\u6700\u957F\u8FDE\u51FB</span></div>
          <div class="stat-tile"><b>${a.totalDays}</b><span>\u7D2F\u8BA1\u6253\u5361</span></div>
          <div class="stat-tile"><b>${a.weekRate}%</b><span>\u672C\u5468\u5B8C\u6210\u7387</span></div>
        </div>
        <div class="week-line">
          <span class="hint">\u672C\u5468\u5B8C\u6210 ${a.weekDone}/${a.weekTotal} \u9879</span>
          <span class="hint">${a.weekCompleteDays}/7 \u5929\u5168\u52E4</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${a.weekRate}%"></div></div>
      </div>

      <div class="card cal-card">
        <div class="row-between">
          <h2 class="card-title">\u6253\u5361\u65E5\u5386</h2>
          <span class="hint">${$.start.slice(5)} ~ ${$.end.slice(5)}</span>
        </div>
        <div class="heat-wrap">
          <div class="heat-grid" role="img" aria-label="\u6700\u8FD1 8 \u5468\u6253\u5361\u65E5\u5386">
            ${["\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D","\u65E5"].map((v,q)=>`<span class="hw" style="grid-column:1;grid-row:${q+1}">${v}</span>`).join("")}
            ${$.cells.map((v,q)=>{let f=Math.floor(q/7),E=q%7,j=v.future?"future":"lv-"+v.count,I=v.future?"\u672A\u5230":v.complete?"\u5DF2\u5B8C\u6210":`\u5B8C\u6210 ${v.count}/${v.total}`;return`<i class="heat-cell ${j} ${v.today?"today":""}"
                style="grid-column:${f+2};grid-row:${E+1}" title="${v.date} \xB7 ${I}"></i>`}).join("")}
          </div>
        </div>
        <div class="heat-legend">
          <span class="hint">\u5C11</span>
          <i class="heat-cell lv-0"></i><i class="heat-cell lv-1"></i>
          <i class="heat-cell lv-2"></i><i class="heat-cell lv-3"></i>
          <span class="hint">\u591A</span>
          <span class="hint legend-note">\u6BCF\u683C\u4E00\u5929\uFF0C\u989C\u8272\u8D8A\u6DF1\u5B8C\u6210\u4EFB\u52A1\u8D8A\u591A</span>
        </div>
      </div>

      <div class="card vocab-card">
        <div class="row-between">
          <h2 class="card-title">\u8BCD\u6C47\u8FDB\u5EA6</h2>
          <span class="tag ${a.dueToday?"rec":"done"}">${a.dueToday?`\u5F85\u590D\u4E60 ${a.dueToday}`:"\u590D\u4E60\u5DF2\u6E05\u7A7A"}</span>
        </div>
        <p class="hint vocab-total"><b>${a.learned}</b> / ${a.bankTotal} \u8BCD\u5DF2\u5B66 \xB7 \u6BD5\u4E1A ${a.mastered} \u4E2A</p>
        <div class="progress-track"><div class="progress-fill" style="width:${y}%"></div></div>
        <p class="hint box-cap">\u6309\u590D\u4E60\u95F4\u9694\uFF08\u76D2\uFF09\u5206\u5E03</p>
        <div class="box-bars">
          ${k.map((v,q)=>{let f=q+1;return`
            <div class="box-row">
              <span class="box-name">${ke[f]}</span>
              <div class="box-track"><i class="box-fill b${f}" style="width:${v/d*100}%"></i></div>
              <b>${v}</b>
            </div>`}).join("")}
        </div>
        <p class="hint box-note">\u672A\u5B66 ${a.fresh} \u4E2A\uFF0C\u4F1A\u6309\u8BCD\u5E93\u987A\u5E8F\u8FDB\u5165\u6BCF\u65E5\u65B0\u8BCD\u961F\u5217\u3002</p>
      </div>

      <div class="card foot-card">
        <h2 class="card-title">\u5B66\u4E60\u8DB3\u8FF9</h2>
        <div class="stat-grid">
          <div class="stat-tile"><b>${a.readingDays}</b><span>\u8BFB\u5B8C\u6587\u7AE0</span></div>
          <div class="stat-tile"><b>${a.lessonsDone}/${a.lessonsTotal}</b><span>\u80A1\u7968\u8BFE\u7A0B</span></div>
          <div class="stat-tile"><b>${a.mastered}</b><span>\u6BD5\u4E1A\u5355\u8BCD</span></div>
        </div>
      </div>

      <div class="card ach-card">
        <div class="row-between">
          <h2 class="card-title">\u6210\u5C31</h2>
          <span class="hint">${m}/${l.length} \u5DF2\u89E3\u9501</span>
        </div>
        <div class="ach-grid">
          ${l.map(v=>`
            <div class="ach ${v.unlocked?"unlocked":""}">
              <div class="ach-top">
                <span class="ach-icon">${v.icon}</span>
                <span class="ach-state">${v.unlocked?"\u2713":`${v.cur}/${v.target}`}</span>
              </div>
              <b>${v.title}</b>
              <span class="hint">${v.desc}</span>
              <div class="progress-track sm">
                <div class="progress-fill" style="width:${Math.round(v.cur/v.target*100)}%"></div>
              </div>
            </div>`).join("")}
        </div>
      </div>
    `}e.addEventListener("dl:task",c),e.addEventListener("dl:show",a=>{a.detail&&a.detail.id==="stats"&&c()}),c()}var Zt="dl.";function te(t){let e={};for(let s=0;s<t.length;s++){let n=t.key(s);n&&n.startsWith(Zt)&&(e[n]=t.getItem(n))}return{app:"daily-learn",version:1,exportedAt:new Date().toISOString(),data:e}}function ee(t,e){if(!t||t.app!=="daily-learn"||typeof t.data!="object"||t.data===null)throw new Error("\u4E0D\u662F\u6709\u6548\u7684\u6BCF\u65E5\u8FDB\u5316\u5907\u4EFD\u6587\u4EF6");let s=Object.keys(t.data).filter(n=>n.startsWith(Zt)&&typeof t.data[n]=="string");return s.forEach(n=>e.setItem(n,t.data[n])),s.length}var ot=new EventTarget,mt=[{id:"today",init:Dt},{id:"stock",init:Tt},{id:"english",init:Bt},{id:"news",init:Wt},{id:"stats",init:Vt}],se=document.getElementById("view"),K={};mt.forEach(t=>{let e=document.createElement("div");e.className="pane hidden",e.id=`pane-${t.id}`,se.appendChild(e),K[t.id]=e});var $t=document.createElement("footer");$t.className="app-footer";$t.innerHTML="<span>\u6BCF\u65E5\u8FDB\u5316 \xB7 \u82F1\u8BED \xD7 \u80A1\u7968</span><span>\u6BCF\u5929\u4E00\u70B9\u70B9\uFF0C\u957F\u671F\u4E3B\u4E49</span>";se.appendChild($t);function bt(t){mt.forEach(e=>K[e.id].classList.toggle("hidden",e.id!==t)),document.querySelectorAll(".tabbar button[data-tab]").forEach(e=>e.classList.toggle("active",e.getAttribute("data-tab")===t)),ot.dispatchEvent(new CustomEvent("dl:show",{detail:{id:t}}))}document.querySelectorAll(".tabbar button[data-tab]").forEach(t=>t.addEventListener("click",()=>bt(t.getAttribute("data-tab"))));ot.addEventListener("dl:nav",t=>{let e=t.detail&&t.detail.tab;e&&K[e]&&bt(e)});var Se=t=>e=>{K[t.id].innerHTML=`<div class="card"><p class="hint">\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF1A${e&&e.message||e}</p></div>`};mt.forEach(t=>{Promise.resolve().then(()=>t.init(K[t.id],ot)).catch(Se(t))});bt("today");var it=new Date,xe=`${it.getMonth()+1}\u6708${it.getDate()}\u65E5 \u5468${"\u65E5\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D"[it.getDay()]}`;document.querySelectorAll(".js-date").forEach(t=>{t.textContent=xe});var W=it.getHours(),Ee=W<5?"\u591C\u6DF1\u4E86\uFF0C":W<9?"\u65E9\u4E0A\u597D\uFF0C":W<12?"\u4E0A\u5348\u597D\uFF0C":W<14?"\u4E2D\u5348\u597D\uFF0C":W<18?"\u4E0B\u5348\u597D\uFF0C":"\u665A\u4E0A\u597D\uFF0C";document.querySelectorAll(".js-greet").forEach(t=>{t.textContent=Ee});var Le=["english_words","english_reading","stock_review"];function ne(){let t=V(Z(localStorage.getItem("dl.habit.log")),Le);document.querySelectorAll(".js-streak").forEach(e=>{e.textContent=`\u{1F525} ${t} \u5929`,e.classList.toggle("lit",t>0)})}ne();ot.addEventListener("dl:task",ne);var J=document.getElementById("guide-dialog");document.querySelectorAll(".js-guide-btn").forEach(t=>t.addEventListener("click",()=>J.showModal()));document.getElementById("guide-close").addEventListener("click",()=>J.close());J.addEventListener("click",t=>{t.target===J&&J.close()});var ft=document.getElementById("data-msg");document.getElementById("data-export").addEventListener("click",()=>{let t=te(localStorage),e=Object.keys(t.data).length,s=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(s),n.download=`daily-learn-backup-${new Date().toISOString().slice(0,10)}.json`,n.click(),URL.revokeObjectURL(n.href),ft.textContent=`\u2705 \u5DF2\u5BFC\u51FA ${e} \u9879\u8BB0\u5F55`});document.getElementById("data-import-btn").addEventListener("click",()=>{document.getElementById("data-import-file").click()});document.getElementById("data-import-file").addEventListener("change",async t=>{let e=t.target.files[0];if(t.target.value="",!!e)try{let s=JSON.parse(await e.text()),n=ee(s,localStorage);ft.textContent=`\u2705 \u5DF2\u5BFC\u5165 ${n} \u9879\u8BB0\u5F55\uFF0C\u6B63\u5728\u5237\u65B0\u9875\u9762\u2026`,setTimeout(()=>location.reload(),800)}catch(s){ft.textContent=`\u274C \u5BFC\u5165\u5931\u8D25\uFF1A${s&&s.message||s}`}});})();

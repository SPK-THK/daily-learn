(()=>{var Q=t=>`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;function lt(t,e=new Date){let s=new Date(e);return s.setDate(s.getDate()+t),Q(s)}function V(t,e,s){let n=t&&t[s];return!!n&&e.every(c=>n[c])}function Z(t,e,s=new Date){let n=V(t,e,Q(s))?0:-1,c=0;for(;V(t,e,lt(n,s));)c+=1,n-=1;return c}function tt(t){try{let e=JSON.parse(t);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}var qt=[{id:"english_words",icon:"\u{1F4D6}",label:"\u80CC\u5B8C\u4ECA\u65E5\u5355\u8BCD",how:"\u5728\u300C\u82F1\u8BED\u300D\u9875\u5B8C\u6210\u65B0\u8BCD\u4E0E\u590D\u4E60",tab:"english"},{id:"english_reading",icon:"\u{1F4F0}",label:"\u8BFB\u5B8C\u4E00\u7BC7\u53CC\u8BED\u77ED\u6587",how:"\u5728\u300C\u82F1\u8BED\u300D\u9875\u6807\u8BB0\u5DF2\u8BFB",tab:"english"},{id:"stock_review",icon:"\u{1F4C8}",label:"\u590D\u76D8\u81EA\u9009\u80A1",how:"\u5728\u300C\u80A1\u7968\u300D\u9875\u5237\u65B0\u884C\u60C5",tab:"stock"}],Lt="dl.habit.log",_=qt.map(t=>t.id),ue=[{icon:"\u2328\uFE0F",title:"\u952E\u76D8\u64CD\u4F5C",desc:"\u80CC\u5355\u8BCD\u65F6\uFF1A\u7A7A\u683C\u7FFB\u9762\uFF0C1 \u53C8\u5FD8\u4E86\uFF0C2 \u8BB0\u4F4F\u4E86",tone:"tone-blue"},{icon:"\u{1F50A}",title:"\u70B9\u5587\u53ED\u542C\u53D1\u97F3",desc:"\u5355\u8BCD\u3001\u642D\u914D\u3001\u91D1\u53E5\u548C\u8BCD\u6C47\u8868\u90FD\u652F\u6301\u6717\u8BFB",tone:"tone-green"},{icon:"\u{1F4BE}",title:"\u6362\u8BBE\u5907\u5148\u5907\u4EFD",desc:"\u300C\u4F7F\u7528\u6559\u7A0B\u300D\u2192 \u5BFC\u51FA\u5907\u4EFD\uFF0C\u53EF\u8FC1\u79FB\u5230\u65B0\u8BBE\u5907",tone:"tone-amber"}],Dt=()=>Q(new Date),pe=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5);async function At(t,e){let s=tt(localStorage.getItem(Lt)),n=null;try{let h=(await fetch("/english/content/quotes.json").then(S=>S.json())).quotes||[];h.length&&(n=h[pe()%h.length])}catch{}c(),d(),e.addEventListener("dl:task",()=>{c(),d(),a()});function c(){let u=Dt(),h=s[u]||(s[u]={});localStorage.getItem(`dl.english.wordsDone.${u}`)==="1"&&(h.english_words=1),localStorage.getItem(`dl.english.reading.${u}`)&&(h.english_reading=1),localStorage.getItem(`dl.stock.review.${u}`)==="1"&&(h.stock_review=1)}function d(){let u=Object.keys(s).sort().slice(-60);s=Object.fromEntries(u.map(h=>[h,s[h]])),localStorage.setItem(Lt,JSON.stringify(s))}function a(){let u=Dt(),h=_.filter(v=>s[u]&&s[u][v]),S=Z(s,_),E=[...Array(7)].map((v,D)=>{let C=lt(D-6),M=s[C]||{},T=_.filter(i=>M[i]).length;return{d:C,count:T,done:T===_.length,today:C===u}}),g=E.reduce((v,D)=>v+D.count,0),N=E.filter(v=>v.done).length,b=226,q=b*(1-h.length/_.length);t.innerHTML=`
      <div class="card streak-card">
        <div class="streak-row">
          <div class="ring-wrap">
            <svg class="ring" viewBox="0 0 84 84">
              <circle class="ring-bg" cx="42" cy="42" r="36"></circle>
              <circle class="ring-fg" cx="42" cy="42" r="36"
                stroke-dasharray="${b}" stroke-dashoffset="${q}"></circle>
            </svg>
            <div class="ring-label"><b>${h.length}</b>/${_.length}</div>
          </div>
          <div class="streak-info">
            <p class="hint">\u8FDE\u7EED\u5168\u90E8\u5B8C\u6210</p>
            <div class="streak-num">\u{1F525} ${S} <small>\u5929</small></div>
            <p class="hint">${V(s,_,u)?"\u4ECA\u65E5\u6253\u5361\u5B8C\u6210 \u{1F389}":`\u8FD8\u5DEE ${_.length-h.length} \u9879\u5B8C\u6210\u6253\u5361`}</p>
          </div>
        </div>
        <div class="week-strip">
          ${E.map(v=>`<div class="wd ${v.done?"done":""} ${v.today?"today":""}" title="${v.d}">${Number(v.d.slice(8))}<i></i></div>`).join("")}
        </div>
      </div>
      <div class="card tasks-card">
        <h2 class="card-title">\u4ECA\u65E5\u4EFB\u52A1</h2>
        ${qt.map(v=>{let D=s[u]&&s[u][v.id];return`
            <div class="habit-task ${D?"done":""}" ${D?"":`data-goto="${v.tab}" role="button" tabindex="0"`}>
              <span class="dot ${D?"done":""}">${D?"\u2713":""}</span>
              <div class="task-text"><b>${v.icon} ${v.label}</b><span class="hint">${v.how}</span></div>
              <span class="tag ${D?"done":""}">${D?"\u5DF2\u5B8C\u6210":"\u5F85\u5B8C\u6210"}</span>
              ${D?"":'<span class="task-chevron" aria-hidden="true">\u203A</span>'}
            </div>`}).join("")}
      </div>
      <div class="card tips-card">
        <h2 class="card-title">\u5C0F\u8D34\u58EB</h2>
        ${ue.map(v=>`
          <div class="tip-row">
            <span class="tip-ico ${v.tone}">${v.icon}</span>
            <div><b>${v.title}</b><span class="hint">${v.desc}</span></div>
          </div>`).join("")}
      </div>
      <div class="card week-card">
        <div class="row-between">
          <h2 class="card-title">\u672C\u5468\u8282\u594F</h2>
          <button class="btn small ghost week-more" data-stats>\u5B8C\u6574\u7EDF\u8BA1 \u203A</button>
        </div>
        <div class="week-bars">
          ${E.map(v=>{let D="\u65E5\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D"[new Date(v.d+"T00:00:00").getDay()];return`<div class="week-bar ${v.today?"today":""}" title="${v.d} \xB7 \u5B8C\u6210 ${v.count}/3">
              <div class="week-track"><i class="week-fill lv-${v.count}" style="height:${v.count/_.length*100}%"></i></div>
              <span>${D}</span>
            </div>`}).join("")}
        </div>
        <p class="hint">\u672C\u5468\u5B8C\u6210 ${g}/${7*_.length} \u9879 \xB7 ${N}/7 \u5929\u5168\u52E4</p>
      </div>
      ${n?`
      <div class="card today-quote">
        <div class="today-quote-mark" aria-hidden="true">\u201C</div>
        <p class="today-quote-en">${n.en}</p>
        <p class="today-quote-zh">${n.zh}</p>
        <p class="hint">\u2014\u2014 ${n.who}</p>
      </div>`:""}
      <p class="hint footnote">\u4E09\u9879\u5168\u90E8\u5B8C\u6210\u5373\u89C6\u4E3A\u5F53\u65E5\u6253\u5361\u6210\u529F\uFF1B\u70B9\u51FB\u5F85\u5B8C\u6210\u4EFB\u52A1\u53EF\u76F4\u63A5\u8DF3\u8F6C\u3002</p>
    `}function $(u){let h=u.closest(".habit-task[data-goto]");h&&e.dispatchEvent(new CustomEvent("dl:nav",{detail:{tab:h.getAttribute("data-goto")}}))}t.addEventListener("click",u=>{if(u.target.closest("[data-stats]")){e.dispatchEvent(new CustomEvent("dl:nav",{detail:{tab:"stats"}}));return}$(u.target)}),t.addEventListener("keydown",u=>{u.key!=="Enter"&&u.key!==" "||!u.target.closest(".habit-task[data-goto]")||(u.preventDefault(),$(u.target))}),a()}var dt=/^(sh|sz)\d{6}$/;function Tt(t,e){try{let s=JSON.parse(t);if(Array.isArray(s)){let n=[...new Set(s.filter(c=>typeof c=="string"&&dt.test(c)))];if(n.length)return n}}catch{}return[...e]}var ut="dl.stock.watchlist",It="dl.stock.lessonsDone",he=["sh600519","sz300750","sz002594","sh601318","sz000858","sh600036"],ge=()=>{let t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`};async function jt(t,e){let{lessons:s}=await fetch("/stock/lessons.json").then(l=>l.json()),n=Tt(localStorage.getItem(ut),he),c=[],d="quotes",a=null,$="\u5168\u90E8",u={},h=null,S={},E=null;t.innerHTML=`
    <div class="subnav">
      <button data-view="quotes">\u81EA\u9009\u884C\u60C5</button>
      <button data-view="lessons">\u5165\u95E8\u6559\u7A0B</button>
    </div>
    <div id="st-body"></div>
  `;let g=t.querySelector("#st-body"),N=t.querySelector(".subnav");function b(){localStorage.setItem(ut,JSON.stringify(n))}localStorage.getItem(ut)===null&&b();function q(){try{return JSON.parse(localStorage.getItem(It)||"{}")}catch{return{}}}function v(l){localStorage.setItem(It,JSON.stringify(l))}function D(){localStorage.setItem(`dl.stock.review.${ge()}`,"1"),e.dispatchEvent(new CustomEvent("dl:task",{detail:{id:"stock_review"}}))}function C(){let l=new Date,w=l.getDay();if(w===0||w===6)return!1;let y=l.getHours()*60+l.getMinutes();return y>=9*60+15&&y<=15*60+5}setInterval(()=>{d!=="quotes"||document.hidden||typeof E!="function"||C()&&E()},6e4);function M(){N.querySelectorAll("button").forEach(l=>l.classList.toggle("active",l.getAttribute("data-view")===d)),d==="quotes"?T():i()}function T(){g.innerHTML=`
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
    `;let l=p=>g.querySelector(p);function w(){let p=c.filter(f=>f.changePct>0).length,k=c.filter(f=>f.changePct<0).length,L=c.length-p-k;l("#st-summary").innerHTML=c.length?`<span class="chip up-chip">\u6DA8 ${p}</span><span class="chip flat-chip">\u5E73 ${L}</span><span class="chip down-chip">\u8DCC ${k}</span>`:"",l("#st-list").innerHTML=c.length?'<div class="q-head"><span>\u80A1\u7968</span><span>\u6700\u65B0\u4EF7</span><span>\u6DA8\u8DCC</span><span></span></div>'+c.map(f=>{let A=f.changePct>0?"up":f.changePct<0?"down":"flat",H=f.changePct==null?"--":`${f.changePct>0?"+":""}${f.changePct.toFixed(2)}%`,X=f.change==null?"--":`${f.change>0?"+":""}${f.change.toFixed(2)}`,P=h===f.code,z=S[f.code],rt=P?z&&z.length?y(z):'<p class="hint k-err">K\u7EBF\u83B7\u53D6\u5931\u8D25\uFF0C\u7A0D\u540E\u70B9\u51FB\u91CD\u8BD5</p>':"";return`
              <div class="quote-row ${P?"expanded":""}" data-code="${f.code}">
                <div class="q-name"><b>${f.name}</b><span class="hint">${f.code}</span></div>
                <div class="q-price ${A}">${f.price==null?"\u505C\u724C":f.price.toFixed(2)}</div>
                <div class="q-chg"><span class="pill ${A}">${H}</span><span class="hint">${X}</span></div>
                <button class="q-del" title="\u5220\u9664" data-del="${f.code}">\xD7</button>
              </div>${P?`<div class="k-card">${rt}</div>`:""}`}).join(""):'<p class="hint">\u6682\u65E0\u81EA\u9009\u80A1\uFF0C\u8BF7\u5728\u4E0B\u65B9\u6DFB\u52A0\uFF08\u5982 sh600519\uFF09\u3002</p>',l("#st-meta").textContent=c.length?`\u66F4\u65B0\u4E8E ${new Date(c[0].serverTime).toLocaleTimeString("zh-CN")}${C()?" \xB7 \u4EA4\u6613\u65F6\u6BB5\u81EA\u52A8\u5237\u65B0":""}`:"\u6DFB\u52A0\u81EA\u9009\u80A1\u540E\u70B9\u51FB\u5237\u65B0"}function y(p){let k=p.map(O=>O.close),L=360,f=130,A=12,H=Math.min(...k),X=Math.max(...k),P=X-H||1,z=O=>A+O*(L-2*A)/Math.max(k.length-1,1),rt=O=>f-A-(O-H)/P*(f-2*A),kt=k.map((O,Et)=>`${Et?"L":"M"}${z(Et).toFixed(1)} ${rt(O).toFixed(1)}`).join(" "),re=`${kt} L ${z(k.length-1).toFixed(1)} ${f-A} L ${A} ${f-A} Z`,B=(k[k.length-1]-k[0])/k[0]*100,le=B>0?"up":B<0?"down":"flat",G=B>0?"#e03131":B<0?"#2f9e44":"#8a93a6",St="kg"+Math.random().toString(36).slice(2,8),xt=z(k.length-1).toFixed(1),de=[.25,.5,.75].map(O=>`<line x1="${A}" y1="${(f-A-O*(f-2*A)).toFixed(1)}"
           x2="${L-A}" y2="${(f-A-O*(f-2*A)).toFixed(1)}"></line>`).join("");return`
        <div class="row-between k-meta">
          <span class="hint">\u8FD1 ${p.length} \u65E5\u6536\u76D8\u4EF7</span>
          <span class="hint k-range" title="${p[0].date} ~ ${p[p.length-1].date}">${p[0].date.slice(5)} ~ ${p[p.length-1].date.slice(5)}</span>
        </div>
        <svg class="kchart" viewBox="0 0 ${L} ${f}" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="${St}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${G}" stop-opacity=".22"/>
              <stop offset="1" stop-color="${G}" stop-opacity=".02"/>
            </linearGradient>
          </defs>
          <g class="k-grid">${de}</g>
          <path d="${re}" fill="url(#${St})"></path>
          <path d="${kt}" fill="none" stroke="${G}" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"></path>
          <line class="k-lastline" x1="${xt}" y1="${A}" x2="${xt}" y2="${f-A}" stroke="${G}"></line>
        </svg>
        <div class="row-between k-meta k-meta-bottom">
          <span class="${le} k-pct">\u533A\u95F4 ${B>0?"+":""}${B.toFixed(2)}%</span>
          <span class="hint">\u6700\u4F4E ${H.toFixed(2)} \xB7 \u6700\u9AD8 ${X.toFixed(2)}</span>
        </div>`}function x(p,k=1e4){let L=new AbortController,f=setTimeout(()=>L.abort(),k);return fetch(p,{signal:L.signal}).finally(()=>clearTimeout(f))}async function I(p){let k=n.find(L=>L.endsWith(p))||p;try{let L=await x(`/api/kline?code=${encodeURIComponent(k)}&days=30`).then(f=>f.json());S[p]=Array.isArray(L)&&L.length?L:[]}catch{S[p]=[]}}async function o(){l("#st-meta").textContent="\u5237\u65B0\u4E2D\u2026";try{let k=await(await x("/api/quotes?codes="+encodeURIComponent(n.join(",")))).json();if(k.error)throw new Error(k.error);c=k,w(),D()}catch(p){l("#st-meta").textContent=`\u884C\u60C5\u83B7\u53D6\u5931\u8D25\uFF1A${p.message==="The user aborted a request."?"\u8BF7\u6C42\u8D85\u65F6":p.message}\uFF08\u8BF7\u68C0\u67E5\u7F51\u7EDC\uFF09`}}l("#st-refresh").addEventListener("click",o),l("#st-list").addEventListener("click",async p=>{if(p.target.closest(".q-del")){let f=p.target.getAttribute("data-del");if(!f)return;n=n.filter(A=>A!==f&&!A.endsWith(f)),c=c.filter(A=>A.code!==f),h===f&&(h=null),b(),w();return}let k=p.target.closest(".quote-row");if(!k)return;let L=k.getAttribute("data-code");if(L){if(h===L){h=null,w();return}h=L,S[L]||(w(),await I(L)),w()}}),l("#st-add").addEventListener("click",()=>{let p=l("#st-code"),k=p.value.trim().toLowerCase();if(!dt.test(k)){p.value="",p.placeholder="\u683C\u5F0F\uFF1Ash600519 \u6216 sz300750";return}n.includes(k)||(n.push(k),b(),o()),p.value=""}),E=o,o()}function i(){if(a!==null)return r();let l=q(),w=s.filter(o=>l[o.id]).length,y=s.find(o=>!l[o.id]),x=["\u5168\u90E8",...new Set(s.map(o=>o.category).filter(Boolean))],I=$==="\u5168\u90E8"?s:s.filter(o=>o.category===$);g.innerHTML=`
      <div class="card lesson-list">
        <div class="row-between">
          <h2 class="card-title">\u80A1\u7968\u5165\u95E8 \xB7 \u96F6\u57FA\u7840 8 \u8BFE</h2>
          <span class="tag ${w===s.length?"done":""}">${w}/${s.length} \u5DF2\u5B66</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${w/s.length*100}%"></div></div>
        <p class="hint lesson-intro">\u6BCF\u8BFE\u7EA6 3-5 \u5206\u949F\uFF1A\u6B63\u6587 \u2192 \u8981\u70B9 \u2192 \u5C0F\u6D4B\u9A8C\u3002${y?"\u5EFA\u8BAE\u4ECE\u300C\u7EE7\u7EED\u5B66\u300D\u5F00\u59CB\u3002":"\u5168\u90E8\u5B66\u5B8C\uFF0C\u6BD5\u4E1A\uFF01\u{1F393}"}</p>
        <div class="lesson-filters">
          ${x.map(o=>`
            <button class="filter-chip ${o===$?"active":""}" data-cat="${o}">
              ${o}<em>${o==="\u5168\u90E8"?s.length:s.filter(p=>p.category===o).length}</em>
            </button>`).join("")}
        </div>
        ${I.map(o=>`
          <div class="lesson-item" data-lesson="${o.id}">
            <div class="lesson-row">
              <span class="num ${l[o.id]?"done":""}">${l[o.id]?"\u2713":s.indexOf(o)+1}</span>
              <div class="lesson-text">
                <b>${o.title}</b>
                <span class="hint">${o.category} \xB7 \u7EA6 ${o.minutes} \u5206\u949F \xB7 ${o.quiz.length} \u9898\u5C0F\u6D4B\u9A8C</span>
              </div>
              <span class="tag ${o===y?"rec":l[o.id]?"done":""}">${o===y?"\u7EE7\u7EED\u5B66":l[o.id]?"\u5DF2\u5B66\u5B8C":"\u672A\u5B66"}</span>
            </div>
          </div>`).join("")}
        ${I.length?"":'<p class="hint center-text">\u8BE5\u5206\u7C7B\u6682\u65E0\u8BFE\u7A0B</p>'}
      </div>
    `,g.querySelectorAll(".filter-chip").forEach(o=>o.addEventListener("click",()=>{$=o.getAttribute("data-cat"),i()})),g.querySelectorAll(".lesson-item").forEach(o=>o.addEventListener("click",()=>{a=o.getAttribute("data-lesson"),u={},i()}))}function r(){let l=s.find(x=>x.id===a),y=!!q()[l.id];g.innerHTML=`
      <div class="card">
        <button class="btn small ghost" id="ls-back">\u2190 \u8FD4\u56DE\u8BFE\u7A0B\u5217\u8868</button>
        <h2 class="lesson-title">${l.title}</h2>
        <p class="hint">\u7B2C ${s.indexOf(l)+1} \u8BFE \xB7 \u7EA6 ${l.minutes} \u5206\u949F</p>
        ${l.sections.map(x=>`<div class="lesson-sec"><h4>${x.h}</h4><p>${x.p}</p></div>`).join("")}
        <div class="points-box">
          <h4>\u{1F3AF} \u672C\u8BFE\u8981\u70B9</h4>
          <ul>${l.points.map(x=>`<li>${x}</li>`).join("")}</ul>
        </div>
      </div>
      <div class="card">
        <h3 class="quiz-head">\u270F\uFE0F \u5C0F\u6D4B\u9A8C\uFF08${l.quiz.length} \u9898\uFF09</h3>
        ${l.quiz.map((x,I)=>m(x,I)).join("")}
      </div>
      <div class="card center finish-card">
        <button class="btn primary" id="ls-done" ${y?"disabled":""}>${y?"\u672C\u8BFE\u5DF2\u5B66\u5B8C \u2713":"\u6807\u8BB0\u5B66\u5B8C\u8FD9\u8BFE"}</button>
      </div>
    `,g.querySelector("#ls-back").addEventListener("click",()=>{a=null,i()}),g.querySelector("#ls-done").addEventListener("click",()=>{let x=q();x[l.id]=1,v(x),a=null,i()}),g.querySelectorAll(".opt").forEach(x=>x.addEventListener("click",()=>{let I=Number(x.getAttribute("data-q"));if(u[I]!==void 0)return;let o=l.quiz[I],p=Number(x.getAttribute("data-opt"));u[I]=p;let k=g.querySelector(`.quiz-q[data-qi="${I}"]`);k.querySelectorAll(".opt").forEach(L=>{let f=Number(L.getAttribute("data-opt"));f===o.a?L.classList.add("correct"):f===p&&L.classList.add("wrong"),L.classList.add("locked")}),k.querySelector(".explain").classList.remove("hidden")}))}function m(l,w){return`
      <div class="quiz-q" data-qi="${w}">
        <p class="quiz-title">${w+1}. ${l.q}</p>
        ${l.options.map((y,x)=>`<button class="opt" data-q="${w}" data-opt="${x}">${"ABCD"[x]}. ${y}</button>`).join("")}
        <div class="explain hidden">\u{1F4A1} ${l.explain}</div>
      </div>`}N.addEventListener("click",l=>{let w=l.target.getAttribute("data-view");w&&(d=w,w==="lessons"&&(a=null),M())}),M()}var Ct=[1,2,4,7,15],pt=Ct.length;function ve(t){return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}function Mt(t,e,s=new Date){let n=e?Math.min(t+1,pt):1,c=new Date(s);return c.setDate(c.getDate()+Ct[n-1]),{box:n,due:ve(c)}}function Nt(t){try{let e=JSON.parse(t);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function Ot(t,e,s,n=10){let c=e.filter(a=>t[a.w]&&t[a.w].due<=s).sort((a,$)=>t[a.w].due<t[$.w].due?-1:1).map(a=>a.w),d=e.filter(a=>!t[a.w]).slice(0,n).map(a=>a.w);return{date:s,queue:[...c,...d],idx:0}}function ht(t){let e=/^(.+?)\s+([\u4e00-\u9fff].*)$/.exec(t);return e?{en:e[1],zh:e[2]}:{en:t,zh:""}}var _t="dl.english.progress",zt="dl.english.today",fe=10,F=()=>{let t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`},Rt=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5),et=null,Bt=null;function gt(t){let e=document.getElementById("dl-toast");e||(e=document.createElement("div"),e.id="dl-toast",e.className="app-toast",document.body.appendChild(e)),e.textContent=t,e.classList.add("show"),clearTimeout(Bt),Bt=setTimeout(()=>e.classList.remove("show"),2400)}function me(){if(!window.speechSynthesis)return null;let e=(speechSynthesis.getVoices()||[]).filter(s=>/^en([-_]|$)/i.test(s.lang));return e.find(s=>/google|samantha|karen|daniel|microsoft.*english/i.test(s.name))||e[0]||null}function Ft(t){if(!("speechSynthesis"in window)||typeof SpeechSynthesisUtterance>"u"){gt("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u6717\u8BFB");return}try{speechSynthesis.cancel();let e=new SpeechSynthesisUtterance(t);e.lang="en-US",e.rate=.9,e.pitch=1;let s=me();s&&(e.voice=s),e.onerror=()=>gt("\u6717\u8BFB\u5931\u8D25\uFF1A\u8BF7\u68C0\u67E5\u7F51\u7EDC\u6216\u7CFB\u7EDF\u8BED\u97F3"),speechSynthesis.speak(e)}catch{gt("\u6717\u8BFB\u5931\u8D25\uFF1A\u8BF7\u68C0\u67E5\u7F51\u7EDC\u6216\u7CFB\u7EDF\u8BED\u97F3")}}function R(t){let e=String(t||"").trim();if(e){if(navigator.onLine!==!1)try{et&&(et.pause(),et=null);let s=new Audio("https://dict.youdao.com/dictvoice?audio="+encodeURIComponent(e)+"&type=2");et=s;let n=!1,c=()=>{n||(n=!0,Ft(e))};s.onerror=c;let d=s.play();d&&typeof d.catch=="function"&&d.catch(c);return}catch{}Ft(e)}}async function $e(t){try{return await navigator.clipboard.writeText(t),!0}catch{}try{let e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();let s=document.execCommand("copy");return e.remove(),s}catch{return!1}}async function Ht(t,e){let[s,n,c]=await Promise.all([fetch("/english/data/wordbank.json").then(i=>i.json()),fetch("/english/content/articles.json").then(i=>i.json()).then(i=>i.articles),fetch("/english/content/quotes.json").then(i=>i.json()).then(i=>i.quotes)]),d=Nt(localStorage.getItem(_t)),a=JSON.parse(localStorage.getItem(zt)||"null"),$="words",u=-1;(!a||a.date!==F())&&(a=Ot(d,s,F(),fe),S());function h(){localStorage.setItem(_t,JSON.stringify(d))}function S(){localStorage.setItem(zt,JSON.stringify(a))}function E(){localStorage.getItem(`dl.english.wordsDone.${F()}`)!=="1"&&(localStorage.setItem(`dl.english.wordsDone.${F()}`,"1"),e.dispatchEvent(new CustomEvent("dl:task",{detail:{id:"english_words"}})))}t.innerHTML=`
    <div class="subnav">
      <button data-view="words">\u80CC\u5355\u8BCD</button>
      <button data-view="reading">\u53CC\u8BED\u9605\u8BFB</button>
      <button data-view="quote">\u6BCF\u65E5\u4E00\u53E5</button>
      <button data-view="bank">\u8BCD\u5E93</button>
    </div>
    <div id="en-body"></div>
  `;let g=t.querySelector("#en-body"),N=t.querySelector(".subnav");function b(){N.querySelectorAll("button").forEach(i=>i.classList.toggle("active",i.getAttribute("data-view")===$)),$==="words"?C():$==="reading"?M():$==="bank"?D():T()}let q="",v=null;function D(){let i=q.trim().toLowerCase(),r=i?s.filter(o=>o.w.toLowerCase().includes(i)||o.zh.includes(i)||o.tag.includes(i)):s,m=o=>!!d[o],l=o=>d[o]?d[o].box:0,w=v&&r.some(o=>o.w===v)?v:null,y=w?s.find(o=>o.w===w):null;g.innerHTML=`
      <div class="card">
        <div class="row-between">
          <h2 class="card-title">\u8BCD\u5E93 <span class="hint">${s.length} \u8BCD \xB7 \u5DF2\u5B66 ${s.filter(o=>m(o.w)).length}</span></h2>
        </div>
        <div class="search-box">
          <input id="bk-q" placeholder="\u641C\u7D22\u5355\u8BCD / \u4E2D\u6587 / \u5206\u7C7B\uFF08\u5982\uFF1A\u725B\u5E02\u3001\u8D22\u7ECF\uFF09" value="${q.replace(/"/g,"&quot;")}" autocomplete="off" />
          ${q?'<button id="bk-clear" class="btn small ghost">\u6E05\u7A7A</button>':""}
        </div>
        <p class="hint">${i?`\u5339\u914D ${r.length} \u4E2A`:"\u6309\u8BCD\u5E93\u987A\u5E8F\uFF0C\u6BCF\u5929\u81EA\u52A8\u5B66 10 \u4E2A\u65B0\u8BCD\uFF1B\u8FD9\u91CC\u53EF\u968F\u65F6\u67E5\u9605\u4EFB\u4F55\u8BCD\u3002"}</p>
      </div>
      ${y?`
        <div class="card word-detail">
          <div class="row-between">
            <span class="tag">${y.tag} \xB7 ${m(y.w)?`\u5DF2\u5B66\xB7\u7B2C${l(y.w)}\u76D2`:"\u672A\u5B66"}</span>
            <button class="icon-btn" id="bk-tts" title="\u53D1\u97F3">\u{1F50A}</button>
          </div>
          <h2 class="word">${y.w}</h2>
          <p class="hint">${y.pos}</p>
          <p class="word-zh">${y.zh}</p>
          <div class="ex-block">
            <p class="word-ex">${y.ex}</p>
            <p class="word-ex-zh hint">${y.exZh}</p>
          </div>
          <div class="detail-block">
            <h4>\u{1F4CC} \u5E38\u7528\u642D\u914D</h4>
            <div class="chips">${y.phrases.map(o=>{let p=ht(o);return`<span class="chip phrase-chip" data-say="${p.en}">\u{1F50A} ${p.en} <em>${p.zh}</em></span>`}).join("")}</div>
          </div>
          <div class="detail-block tip-block">
            <h4>\u{1F4A1} \u8BB0\u5FC6\u70B9</h4>
            <p>${y.tip}</p>
          </div>
        </div>`:""}
      <div class="card bank-list">
        ${r.length?r.map(o=>`
          <div class="bank-row ${o.w===w?"open":""}" data-w="${o.w}">
            <span class="dot ${m(o.w)?"done":""}">${m(o.w)?"\u2713":""}</span>
            <div class="bank-text"><b>${o.w}</b><span class="hint">${o.zh}</span></div>
            <span class="tag ${o.w===w?"done":""}">${o.w===w?"\u6536\u8D77":"\u8BE6\u89E3"}</span>
          </div>`).join(""):'<p class="hint center-text">\u6CA1\u6709\u5339\u914D\u7684\u5355\u8BCD</p>'}
      </div>`;let x=g.querySelector("#bk-q");x.addEventListener("input",()=>{q=x.value,D();let o=g.querySelector("#bk-q");o.focus(),o.setSelectionRange(o.value.length,o.value.length)});let I=g.querySelector("#bk-clear");I&&I.addEventListener("click",()=>{q="",D()}),g.querySelector("#bk-tts")&&g.querySelector("#bk-tts").addEventListener("click",()=>R(w)),g.querySelectorAll(".phrase-chip").forEach(o=>o.addEventListener("click",()=>R(o.getAttribute("data-say")))),g.querySelectorAll(".bank-row").forEach(o=>o.addEventListener("click",()=>{let p=o.getAttribute("data-w");v=v===p?null:p,D()}))}function C(){if(a.idx>=a.queue.length){E();let o=Object.keys(d).length,p=Object.values(d).filter(k=>k.box>=pt).length;g.innerHTML=`
        <div class="card center">
          <div class="big-emoji">\u{1F389}</div>
          <h2>\u4ECA\u65E5\u5355\u8BCD\u5DF2\u5B8C\u6210</h2>
          <div class="stat-row">
            <span class="chip">\u8BCD\u5E93\u8FDB\u5EA6 ${o}/${s.length}</span>
            <span class="chip">\u5DF2\u6BD5\u4E1A ${p} \u8BCD</span>
          </div>
          <p class="hint">\u660E\u5929\u4F1A\u6309\u9057\u5FD8\u66F2\u7EBF\u5B89\u6392\u590D\u4E60\u3002<br/>\u53EF\u4EE5\u5230\u300C\u8BCD\u5E93\u300D\u968F\u65F6\u67E5\u9605\u4EFB\u4F55\u8BCD\u7684\u642D\u914D\u4E0E\u8BB0\u5FC6\u70B9\u3002</p>
        </div>`;return}let i=s.find(o=>o.w===a.queue[a.idx]),r=!d[i.w],m=r?0:d[i.w].box;g.innerHTML=`
      <div class="card flashcard">
        <div class="fc-progress">${a.queue.map((o,p)=>`<i class="${p<a.idx?"done":p===a.idx?"cur":""}"></i>`).join("")}</div>
        <div class="row-between">
          <span class="tag">${i.tag} \xB7 ${r?"\u65B0\u8BCD":`\u590D\u4E60\xB7\u7B2C${m}\u76D2`}</span>
          <button class="icon-btn" id="tts-word" title="\u53D1\u97F3">\u{1F50A}</button>
        </div>
        <div class="fc-body">
          <h2 class="word">${i.w}</h2>
          <p class="hint fc-pos">${i.pos}</p>
          <p class="hint fc-tip">\u5148\u56DE\u60F3\u5B83\u7684\u4E2D\u6587\u610F\u601D\uFF0C\u518D\u663E\u793A\u7B54\u6848</p>
          <div id="fc-back" class="hidden">
            <p class="word-zh">${i.zh}</p>
            <div class="ex-block">
              <p class="word-ex">${i.ex}</p>
              <p class="word-ex-zh hint">${i.exZh}</p>
            </div>
            <div class="detail-block">
              <h4>\u{1F4CC} \u5E38\u7528\u642D\u914D</h4>
              <div class="chips">${i.phrases.map(o=>{let{en:p,zh:k}=ht(o);return`<span class="chip phrase-chip" data-say="${p}">\u{1F50A} ${p} <em>${k}</em></span>`}).join("")}</div>
            </div>
            <div class="detail-block tip-block">
              <h4>\u{1F4A1} \u8BB0\u5FC6\u70B9</h4>
              <p>${i.tip}</p>
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
    `;let l=g.querySelector("#fc-back"),w=g.querySelector("#flip"),y=g.querySelector("#grade"),x=g.querySelector(".fc-tip");g.querySelector("#tts-word").addEventListener("click",()=>R(i.w)),w.addEventListener("click",()=>{l.classList.remove("hidden"),x&&x.classList.add("hidden"),w.classList.add("hidden"),y.classList.remove("hidden"),R(i.w)}),g.querySelectorAll(".phrase-chip").forEach(o=>o.addEventListener("click",()=>R(o.getAttribute("data-say")))),g.querySelector("#wrong").addEventListener("click",()=>I(!1)),g.querySelector("#right").addEventListener("click",()=>I(!0));function I(o){let p=d[i.w]||{box:0,due:""};d[i.w]=Mt(p.box,o),h(),a.idx+=1,S(),C()}}function M(){if(u>=0){let r=n[u],m=localStorage.getItem(`dl.english.reading.${F()}`);g.innerHTML=`
        <div class="card">
          <button class="btn small ghost" id="rd-back">\u2190 \u8FD4\u56DE\u5217\u8868</button>
          <h2 class="card-title">${r.title}</h2>
          <p class="hint">\u7EA6 ${r.minutes} \u5206\u949F \xB7 \u6BB5\u843D\u5BF9\u7167 + \u8BB2\u89E3</p>
          ${r.paras.map(l=>`<p class="rd-en">${l.en}</p><p class="rd-zh hint">${l.zh}</p>`).join("")}
          <div class="notes-block">
            <h4>\u{1F4DD} \u8BED\u6CD5\u4E0E\u8868\u8FBE\u8BB2\u89E3</h4>
            <ul>${r.notes.map(l=>`<li>${l}</li>`).join("")}</ul>
          </div>
          <h4 class="vocab-head">\u{1F50A} \u8BCD\u6C47\u8868\uFF08\u70B9\u51FB\u53D1\u97F3\uFF09</h4>
          <div class="vocab">${r.vocab.map(l=>`<span class="chip vocab-chip" data-say="${l.w}">\u{1F50A} ${l.w} ${l.zh}</span>`).join("")}</div>
          <button class="btn primary" id="rd-done" ${m===r.id?"disabled":""}>
            ${m===r.id?"\u4ECA\u65E5\u5DF2\u8BFB \u2713":"\u6807\u8BB0\u5DF2\u8BFB\uFF0C\u5B8C\u6210\u6253\u5361"}</button>
        </div>`,g.querySelector("#rd-back").addEventListener("click",()=>{u=-1,M()}),g.querySelector("#rd-done").addEventListener("click",()=>{localStorage.setItem(`dl.english.reading.${F()}`,r.id),e.dispatchEvent(new CustomEvent("dl:task",{detail:{id:"english_reading"}})),M()}),g.querySelector(".vocab").addEventListener("click",l=>{let w=l.target.getAttribute("data-say");w&&R(w)});return}let i=Rt()%n.length;g.innerHTML=`
      <div class="card rd-list">
        <div class="rd-list-head">
          <div>
            <h2 class="card-title">\u53CC\u8BED\u9605\u8BFB</h2>
            <p class="hint">\u6BCF\u5929\u4E00\u7BC7\u8D22\u7ECF\u77ED\u6587\uFF0C\u6BB5\u843D\u5BF9\u7167 + \u8BB2\u89E3</p>
          </div>
          <span class="tag">${n.length} \u7BC7</span>
        </div>
        ${n.map((r,m)=>`
          <button class="rd-row" data-open="${m}">
            <span class="rd-main">
              <span class="rd-top">
                <b class="rd-title">${r.title}</b>
                ${m===i?'<span class="tag rec">\u4ECA\u65E5\u63A8\u8350</span>':""}
              </span>
              <span class="hint">\u7EA6 ${r.minutes} \u5206\u949F \xB7 ${r.vocab.length} \u4E2A\u8BCD\u6C47</span>
            </span>
            <span class="rd-go">\u9605\u8BFB \u203A</span>
          </button>`).join("")}
      </div>`,g.querySelectorAll("[data-open]").forEach(r=>r.addEventListener("click",()=>{u=Number(r.getAttribute("data-open")),M()}))}function T(){let i=c[Rt()%c.length];g.innerHTML=`
      <div class="card center quote-card">
        <div class="quote-mark" aria-hidden="true">\u201C</div>
        <p class="quote-en">${i.en}</p>
        <p class="word-zh">${i.zh}</p>
        <p class="hint">\u2014\u2014 ${i.who}</p>
        <div class="row-gap quote-actions">
          <button class="btn primary" id="tts-quote">\u{1F50A} \u8DDF\u8BFB\u4E00\u904D</button>
          <button class="btn" id="copy-quote">\u{1F4CB} \u590D\u5236</button>
        </div>
      </div>`,g.querySelector("#tts-quote").addEventListener("click",()=>R(i.en)),g.querySelector("#copy-quote").addEventListener("click",async()=>{let r=g.querySelector("#copy-quote"),m=await $e(`${i.en}
${i.zh}
\u2014\u2014 ${i.who}`);r.textContent=m?"\u2705 \u5DF2\u590D\u5236":"\u274C \u590D\u5236\u5931\u8D25",setTimeout(()=>{r.textContent="\u{1F4CB} \u590D\u5236"},1500)})}N.addEventListener("click",i=>{let r=i.target.getAttribute("data-view");r&&($=r,r==="reading"&&(u=-1),b())}),document.addEventListener("keydown",i=>{if($!=="words")return;let r=document.activeElement&&document.activeElement.tagName;r==="INPUT"||r==="TEXTAREA"||(i.code==="Space"&&document.getElementById("flip")?(i.preventDefault(),document.getElementById("flip").click()):i.key==="1"&&document.getElementById("wrong")?(i.preventDefault(),document.getElementById("wrong").click()):i.key==="2"&&document.getElementById("right")&&(i.preventDefault(),document.getElementById("right").click()))}),b()}var Pt=t=>String(t).padStart(2,"0");function j(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function vt(t,e=new Date){let s=/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/.exec(String(t||""));if(!s)return String(t||"");let[,n,c,d,a,$]=s,u=`${e.getFullYear()}-${Pt(e.getMonth()+1)}-${Pt(e.getDate())}`;return`${n}-${c}-${d}`===u?`${a}:${$}`:Number(n)===e.getFullYear()?`${c}-${d} ${a}:${$}`:`${n}-${c}-${d} ${a}:${$}`}var be=[["\u5B8F\u89C2",/(通胀|CPI|PPI|GDP|央行|利率|降息|加息|降准|财政|政策|汇率|人民币|美联储|非农|就业|国债|收益率|PMI|社融|关税|经济数据)/],["\u516C\u53F8",/(公司|集团|股份|财报|业绩|营收|净利|回购|增持|减持|并购|收购|上市|IPO|退市|股东|董事长|中标|订单)/],["\u5168\u7403",/(美股|纳斯达克|道指|标普|欧洲|日本|韩国|美元|比特币|币安|乌克兰|俄罗斯|特朗普|海外|全球市场)/],["\u5E02\u573A",/(A股|沪指|深成指|创业板|指数|收盘|开盘|涨|跌|板块|资金|成交|北向|港股|恒生|期货|原油|黄金|商品|债市)/]];function Ut(t,e=""){let s=`${t||""} ${e||""}`;for(let[n,c]of be)if(c.test(s))return n;return"\u5176\u4ED6"}function ft(t,e=30){let s=new Set;return(Array.isArray(t)?t:[]).filter(n=>n&&n.title&&/^https?:\/\//i.test(String(n.url||""))).filter(n=>{let c=String(n.id||n.title);return s.has(c)?!1:(s.add(c),!0)}).slice(0,e).map(n=>({id:String(n.id||n.title),title:String(n.title).trim(),digest:String(n.digest||"").replace(/^【[^】]*】\s*/,"").trim(),time:String(n.time||"").trim(),url:String(n.url),content:Array.isArray(n.content)?n.content.filter(c=>typeof c=="string"&&c.trim()).slice(0,40):[],category:Ut(n.title,n.digest)}))}function Wt(t){try{let e=JSON.parse(t);if(e&&Array.isArray(e.items))return{updatedAt:Number(e.updatedAt)||0,items:ft(e.items)}}catch{}return{updatedAt:0,items:[]}}var Jt="dl.news.cache",we=5*60*1e3,Yt=["\u5168\u90E8","\u5B8F\u89C2","\u516C\u53F8","\u5168\u7403","\u5E02\u573A","\u5176\u4ED6"];function Kt(t,e){let s=Wt(localStorage.getItem(Jt)),n=s.items,c=s.updatedAt,d=!1,a="",$=!1,u="\u5168\u90E8",h=null,S=!1,E="";function g(){try{localStorage.setItem(Jt,JSON.stringify({updatedAt:c,items:n}))}catch{}}function N(){if(!c)return"";let i=new Date(c),r=i.toDateString()===new Date().toDateString(),m=`${String(i.getHours()).padStart(2,"0")}:${String(i.getMinutes()).padStart(2,"0")}`;return r?m:`${i.getMonth()+1}-${i.getDate()} ${m}`}function b(){return n.find(i=>i.id===h)||null}async function q(i=!1){if(!d){if(!i&&navigator.onLine===!1){T();return}d=!0,a="",T();try{let m=await(await fetch("/api/news",{cache:"no-store"})).json();if(m.error)throw new Error(m.error);let l=new Map(n.map(y=>[y.id,y])),w=ft(m.items).map(y=>({...y,content:l.get(y.id)&&l.get(y.id).content||y.content||[]}));w.length&&(n=w,c=Number(m.updatedAt)||Date.now(),g())}catch{a=navigator.onLine===!1?"\u5F53\u524D\u65E0\u7F51\u7EDC\uFF0C\u663E\u793A\u4E0A\u6B21\u7F13\u5B58":"\u65B0\u95FB\u52A0\u8F7D\u5931\u8D25\uFF0C\u663E\u793A\u4E0A\u6B21\u7F13\u5B58"}d=!1,h&&!b()&&(h=null),T()}}async function v(i){h=i,E="";let r=b();if(T(),!(!r||r.content.length)){if(navigator.onLine===!1){E="\u79BB\u7EBF\u72B6\u6001\uFF0C\u5148\u770B\u770B\u6458\u8981",T();return}S=!0,T();try{let l=await(await fetch("/api/news/article?url="+encodeURIComponent(r.url),{cache:"no-store"})).json();if(l.error)throw new Error(l.error);if(r.content=Array.isArray(l.paragraphs)?l.paragraphs.filter(Boolean):[],!r.content.length)throw new Error("empty");g()}catch{E="\u5168\u6587\u52A0\u8F7D\u5931\u8D25\uFF0C\u53EF\u67E5\u770B\u539F\u6587"}S=!1,T()}}function D(){let i=Object.fromEntries(Yt.map(r=>[r,r==="\u5168\u90E8"?n.length:n.filter(m=>m.category===r).length]));return`<div class="news-filters">
      ${Yt.map(r=>`<button class="filter-chip ${r===u?"active":""}" data-cat="${r}">${r}<em>${i[r]}</em></button>`).join("")}
    </div>`}function C(i){let r=i.content.length?i.content:i.digest?[i.digest]:[];t.innerHTML=`
      <div class="card news-reader">
        <div class="row-between news-reader-top">
          <button class="btn small ghost" id="news-back">\u2190 \u8FD4\u56DE\u8D44\u8BAF</button>
          <a class="btn small" href="${j(i.url)}" target="_blank" rel="noopener noreferrer">\u67E5\u770B\u539F\u6587</a>
        </div>
        <div class="news-meta">
          <span class="news-time">${j(vt(i.time))}</span>
          <span class="news-src">${j(i.category)} \xB7 \u4E1C\u65B9\u8D22\u5BCC</span>
        </div>
        <h2 class="news-reader-title">${j(i.title)}</h2>
        <div class="news-reader-body">
          ${S?'<p class="hint">\u6B63\u5728\u52A0\u8F7D\u5168\u6587\u2026</p>':""}
          ${!S&&r.length?r.map(m=>`<p>${j(m)}</p>`).join(""):""}
          ${!S&&!r.length?'<p class="hint">\u6682\u65E0\u6B63\u6587\uFF0C\u53EF\u70B9\u51FB\u53F3\u4E0A\u89D2\u67E5\u770B\u539F\u6587\u3002</p>':""}
          ${E?`<p class="hint news-reader-err">${j(E)}</p>`:""}
        </div>
        <p class="hint news-reader-foot">\u5185\u5BB9\u6765\u81EA\u4E1C\u65B9\u8D22\u5BCC 7\xD724 \u5FEB\u8BAF\uFF0C\u4EC5\u4F9B\u5B66\u4E60\u53C2\u8003\u3002</p>
      </div>`}function M(){let i=u==="\u5168\u90E8"?n:n.filter(m=>m.category===u),r=[];N()&&r.push(`\u66F4\u65B0\u4E8E ${N()}`),d&&r.push("\u5237\u65B0\u4E2D\u2026"),a&&r.push(a),!c&&!d&&r.push("\u7B49\u5F85\u52A0\u8F7D"),t.innerHTML=`
      <div class="card news-head">
        <div class="row-between">
          <div>
            <h2 class="card-title">\u8D22\u7ECF\u5FEB\u8BAF <span class="news-live">7\xD724</span></h2>
            <p class="hint">${j(r.join(" \xB7 "))}</p>
          </div>
          <button id="news-refresh" class="btn small" ${d?"disabled":""}>\u5237\u65B0</button>
        </div>
        ${D()}
      </div>
      ${n.length?`
        <div class="news-grid">
          ${i.map(m=>`
            <div class="card news-item" data-open="${j(m.id)}" role="button" tabindex="0">
              <div class="news-meta">
                <span class="news-time">${j(vt(m.time))}</span>
                <span class="news-src">${j(m.category)} \xB7 \u4E1C\u65B9\u8D22\u5BCC</span>
              </div>
              <h3 class="news-title">${j(m.title)}</h3>
              ${m.digest?`<p class="hint news-digest">${j(m.digest)}</p>`:""}
              <span class="news-more">\u9605\u8BFB\u5168\u6587 \u203A</span>
            </div>`).join("")}
        </div>
        ${i.length?"":'<div class="card news-empty"><p class="hint">\u8BE5\u5206\u7C7B\u6682\u65E0\u5FEB\u8BAF</p></div>'}`:`
        <div class="card news-empty">
          <div class="big-emoji">\u{1F4F0}</div>
          <p class="hint">${d?"\u6B63\u5728\u83B7\u53D6\u6700\u65B0\u5FEB\u8BAF\u2026":j(a||"\u6682\u65E0\u5FEB\u8BAF")}</p>
          ${d?"":'<button class="btn small" data-retry>\u91CD\u8BD5</button>'}
        </div>`}
    `}function T(){let i=b();h&&i?C(i):(h=null,M())}t.addEventListener("click",i=>{let r=i.target.closest("[data-cat]");if(r){u=r.getAttribute("data-cat"),h=null,T();return}let m=i.target.closest("[data-open]");if(m){v(m.getAttribute("data-open"));return}if(i.target.closest("#news-back")){h=null,T();return}(i.target.closest("#news-refresh")||i.target.closest("[data-retry]"))&&q(!0)}),t.addEventListener("keydown",i=>{if(i.key!=="Enter"&&i.key!==" ")return;let r=i.target.closest("[data-open]");r&&(i.preventDefault(),v(r.getAttribute("data-open")))}),e.addEventListener("dl:show",i=>{$=!!(i.detail&&i.detail.id==="news"),$&&q()}),setInterval(()=>{$&&!document.hidden&&q()},we),T(),q()}var st="dl.english.reading.",mt=/^(\d{4})-(\d{2})-(\d{2})$/,at=(t=new Date)=>`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;function it(t){let e=mt.exec(String(t??""));if(!e)return null;let s=Number(e[1]),n=Number(e[2])-1,c=Number(e[3]),d=Date.UTC(s,n,c),a=new Date(d);return a.getUTCFullYear()!==s||a.getUTCMonth()!==n||a.getUTCDate()!==c?null:Math.floor(d/864e5)}function nt(t){let e=new Date(Number(t)*864e5);return`${e.getUTCFullYear()}-${String(e.getUTCMonth()+1).padStart(2,"0")}-${String(e.getUTCDate()).padStart(2,"0")}`}function W(t){try{let e=JSON.parse(t);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function Xt(t,e){return!t||!e.length?0:e.filter(s=>t[s]).length}function U(t,e,s){if(!e.length)return!1;let n=t&&t[s];return!!n&&e.every(c=>n[c])}function ye(t,e,s=new Date){let n=it(at(s));if(n===null)return 0;let c=0,d=U(t,e,nt(n))?n:n-1;for(;U(t,e,nt(d));)c+=1,d-=1;return c}function ke(t,e){if(!e.length||!t)return 0;let s=Object.keys(t).filter(a=>U(t,e,a)).map(it).filter(a=>a!==null).sort((a,$)=>a-$),n=0,c=0,d=null;for(let a of s)c=d!==null&&a===d+1?c+1:1,c>n&&(n=c),d=a;return n}function Gt(t,e,s=new Date,n=8){let c=at(s),d=it(c),a=(s.getDay()+6)%7,$=d-a-(n-1)*7,u=[];for(let h=0;h<n*7;h++){let S=nt($+h),E=Xt(t&&t[S],e);u.push({date:S,count:E,total:e.length,complete:U(t,e,S),future:S>c,today:S===c})}return{cells:u,weeks:n,start:u[0].date,end:u[u.length-1].date}}function Se(t,e,s=new Date){let n=it(at(s)),c=0,d=0;for(let a=6;a>=0;a--){let $=Xt(t&&t[nt(n-a)],e);c+=$,e.length&&$===e.length&&(d+=1)}return{done:c,total:7*e.length,completeDays:d}}function xe(t,e=0){let s=[0,0,0,0,0,0];for(let c of Object.values(t||{})){let d=c&&Number(c.box),a=Number.isInteger(d)&&d>=1&&d<=5?d:1;s[a]+=1}let n=s.slice(1).reduce((c,d)=>c+d,0);return s[0]=Math.max(0,(Number(e)||0)-n),{counts:s,learned:n,mastered:s[5],fresh:s[0]}}function Ee(t,e=new Date){let s=at(e);return Object.values(t||{}).filter(n=>n&&typeof n.due=="string"&&mt.test(n.due)&&n.due<=s).length}function Vt(t){let e=new Set;for(let s of t||[]){if(typeof s!="string"||!s.startsWith(st))continue;let n=s.slice(st.length);mt.test(n)&&e.add(n)}return e.size}function Qt(t,e=new Date){let{log:s={},taskIds:n=[],progress:c={},bankTotal:d=0,lessonsDone:a=0,lessonsTotal:$=0,readingDays:u=0}=t||{},h=xe(c,d),S=Se(s,n,e);return{totalDays:Object.keys(s||{}).filter(g=>U(s,n,g)).length,currentStreak:ye(s,n,e),maxStreak:ke(s,n),weekDone:S.done,weekTotal:S.total,weekCompleteDays:S.completeDays,weekRate:S.total?Math.round(S.done/S.total*100):0,learned:h.learned,mastered:h.mastered,fresh:h.fresh,boxes:h.counts,dueToday:Ee(c,e),readingDays:u,lessonsDone:Math.max(0,Number(a)||0),lessonsTotal:Math.max(0,Number($)||0),bankTotal:Math.max(0,Number(d)||0)}}var Le=[{id:"first_day",icon:"\u{1F331}",title:"\u542F\u7A0B",desc:"\u5B8C\u6210\u7B2C 1 \u5929\u5168\u90E8\u4EFB\u52A1",metric:"totalDays",target:1},{id:"streak3",icon:"\u{1F525}",title:"\u5C0F\u6709\u575A\u6301",desc:"\u8FDE\u7EED\u6253\u5361 3 \u5929",metric:"maxStreak",target:3},{id:"streak7",icon:"\u26A1",title:"\u4E00\u5468\u4E0D\u65AD",desc:"\u8FDE\u7EED\u6253\u5361 7 \u5929",metric:"maxStreak",target:7},{id:"streak30",icon:"\u{1F3C6}",title:"\u4E60\u60EF\u6210\u81EA\u7136",desc:"\u8FDE\u7EED\u6253\u5361 30 \u5929",metric:"maxStreak",target:30},{id:"words10",icon:"\u{1F4DA}",title:"\u8BCD\u6C47\u8D77\u6B65",desc:"\u5B66\u8FC7 10 \u4E2A\u5355\u8BCD",metric:"learned",target:10},{id:"words50",icon:"\u{1F9E0}",title:"\u8BCD\u6C47\u8FDB\u9636",desc:"\u5B66\u8FC7 50 \u4E2A\u5355\u8BCD",metric:"learned",target:50},{id:"master20",icon:"\u{1F393}",title:"\u878D\u4F1A\u8D2F\u901A",desc:"20 \u4E2A\u5355\u8BCD\u8FDB\u5165\u7B2C 5 \u76D2",metric:"mastered",target:20},{id:"read5",icon:"\u{1F4F0}",title:"\u9605\u8BFB\u6210\u4E60",desc:"\u8BFB\u5B8C 5 \u7BC7\u53CC\u8BED\u77ED\u6587",metric:"readingDays",target:5},{id:"lessons8",icon:"\u{1F4C8}",title:"\u6295\u8D44\u5165\u95E8",desc:"\u5B66\u5B8C 8 \u8282\u80A1\u7968\u8BFE\u7A0B",metric:"lessonsDone",target:8}];function Zt(t){return Le.map(e=>{let s=Number(t&&t[e.metric])||0,n=Math.min(s,e.target);return{...e,cur:n,unlocked:s>=e.target}})}var te=["english_words","english_reading","stock_review"],De=["\u672A\u5B66","1 \u5929","2 \u5929","4 \u5929","7 \u5929","15 \u5929"];async function ee(t,e){let[s,n]=await Promise.all([fetch("/english/data/wordbank.json").then(a=>a.json()),fetch("/stock/lessons.json").then(a=>a.json()).then(a=>a.lessons)]);function c(){let a=W(localStorage.getItem("dl.habit.log")),$=W(localStorage.getItem("dl.english.progress")),u=W(localStorage.getItem("dl.stock.lessonsDone")),h=n.filter(E=>u[E.id]).length,S=Vt(Object.keys(localStorage).filter(E=>E.startsWith(st)&&localStorage.getItem(E)));return Qt({log:a,taskIds:te,progress:$,bankTotal:s.length,lessonsDone:h,lessonsTotal:n.length,readingDays:S},new Date)}function d(){let a=c(),$=Gt(W(localStorage.getItem("dl.habit.log")),te,new Date,8),u=Zt(a),h=u.filter(b=>b.unlocked).length,S=a.bankTotal?Math.round(a.learned/a.bankTotal*100):0,E=a.boxes.slice(1),g=Math.max(...E,1),N=a.totalDays===0&&a.learned===0;t.innerHTML=`
      <div class="card stats-hero">
        <div class="row-between">
          <h2 class="card-title">\u5B66\u4E60\u7EDF\u8BA1</h2>
          <span class="tag">\u6700\u8FD1 60 \u5929</span>
        </div>
        ${N?'<p class="hint stats-empty">\u8FD8\u6CA1\u6709\u5B66\u4E60\u8BB0\u5F55\u3002\u53BB\u300C\u4ECA\u65E5\u300D\u5B8C\u6210\u4E00\u9879\u4EFB\u52A1\uFF0C\u8FD9\u91CC\u4F1A\u81EA\u52A8\u957F\u51FA\u4F60\u7684\u5B66\u4E60\u66F2\u7EBF\u3002</p>':""}
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
            ${["\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D","\u65E5"].map((b,q)=>`<span class="hw" style="grid-column:1;grid-row:${q+1}">${b}</span>`).join("")}
            ${$.cells.map((b,q)=>{let v=Math.floor(q/7),D=q%7,C=b.future?"future":"lv-"+b.count,M=b.future?"\u672A\u5230":b.complete?"\u5DF2\u5B8C\u6210":`\u5B8C\u6210 ${b.count}/${b.total}`;return`<i class="heat-cell ${C} ${b.today?"today":""}"
                style="grid-column:${v+2};grid-row:${D+1}" title="${b.date} \xB7 ${M}"></i>`}).join("")}
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
        <div class="progress-track"><div class="progress-fill" style="width:${S}%"></div></div>
        <p class="hint box-cap">\u6309\u590D\u4E60\u95F4\u9694\uFF08\u76D2\uFF09\u5206\u5E03</p>
        <div class="box-bars">
          ${E.map((b,q)=>{let v=q+1;return`
            <div class="box-row">
              <span class="box-name">${De[v]}</span>
              <div class="box-track"><i class="box-fill b${v}" style="width:${b/g*100}%"></i></div>
              <b>${b}</b>
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
          <span class="hint">${h}/${u.length} \u5DF2\u89E3\u9501</span>
        </div>
        <div class="ach-grid">
          ${u.map(b=>`
            <div class="ach ${b.unlocked?"unlocked":""}">
              <div class="ach-top">
                <span class="ach-icon">${b.icon}</span>
                <span class="ach-state">${b.unlocked?"\u2713":`${b.cur}/${b.target}`}</span>
              </div>
              <b>${b.title}</b>
              <span class="hint">${b.desc}</span>
              <div class="progress-track sm">
                <div class="progress-fill" style="width:${Math.round(b.cur/b.target*100)}%"></div>
              </div>
            </div>`).join("")}
        </div>
      </div>
    `}e.addEventListener("dl:task",d),e.addEventListener("dl:show",a=>{a.detail&&a.detail.id==="stats"&&d()}),d()}var se="dl.";function ne(t){let e={};for(let s=0;s<t.length;s++){let n=t.key(s);n&&n.startsWith(se)&&(e[n]=t.getItem(n))}return{app:"daily-learn",version:1,exportedAt:new Date().toISOString(),data:e}}function ae(t,e){if(!t||t.app!=="daily-learn"||typeof t.data!="object"||t.data===null)throw new Error("\u4E0D\u662F\u6709\u6548\u7684\u6BCF\u65E5\u8FDB\u5316\u5907\u4EFD\u6587\u4EF6");let s=Object.keys(t.data).filter(n=>n.startsWith(se)&&typeof t.data[n]=="string");return s.forEach(n=>e.setItem(n,t.data[n])),s.length}var ie="2.1.0";var ct=new EventTarget,bt=[{id:"today",init:At},{id:"stock",init:jt},{id:"english",init:Ht},{id:"news",init:Kt},{id:"stats",init:ee}],oe=document.getElementById("view"),K={};bt.forEach(t=>{let e=document.createElement("div");e.className="pane hidden",e.id=`pane-${t.id}`,oe.appendChild(e),K[t.id]=e});var wt=document.createElement("footer");wt.className="app-footer";wt.innerHTML=`
  <span>\u6BCF\u65E5\u8FDB\u5316 \xB7 \u82F1\u8BED \xD7 \u80A1\u7968</span>
  <span class="footer-tag">\u6BCF\u5929\u4E00\u70B9\u70B9\uFF0C\u957F\u671F\u4E3B\u4E49</span>
  <span class="footer-version">v${ie}</span>`;oe.appendChild(wt);function yt(t){bt.forEach(e=>K[e.id].classList.toggle("hidden",e.id!==t)),document.querySelectorAll(".tabbar button[data-tab]").forEach(e=>e.classList.toggle("active",e.getAttribute("data-tab")===t)),ct.dispatchEvent(new CustomEvent("dl:show",{detail:{id:t}}))}document.querySelectorAll(".tabbar button[data-tab]").forEach(t=>t.addEventListener("click",()=>yt(t.getAttribute("data-tab"))));ct.addEventListener("dl:nav",t=>{let e=t.detail&&t.detail.tab;e&&K[e]&&yt(e)});var qe=t=>e=>{K[t.id].innerHTML=`<div class="card"><p class="hint">\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF1A${e&&e.message||e}</p></div>`};bt.forEach(t=>{Promise.resolve().then(()=>t.init(K[t.id],ct)).catch(qe(t))});yt("today");var ot=new Date,Ae=`${ot.getMonth()+1}\u6708${ot.getDate()}\u65E5 \u5468${"\u65E5\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D"[ot.getDay()]}`;document.querySelectorAll(".js-date").forEach(t=>{t.textContent=Ae});var J=ot.getHours(),Te=J<5?"\u591C\u6DF1\u4E86\uFF0C":J<9?"\u65E9\u4E0A\u597D\uFF0C":J<12?"\u4E0A\u5348\u597D\uFF0C":J<14?"\u4E2D\u5348\u597D\uFF0C":J<18?"\u4E0B\u5348\u597D\uFF0C":"\u665A\u4E0A\u597D\uFF0C";document.querySelectorAll(".js-greet").forEach(t=>{t.textContent=Te});var Ie=["english_words","english_reading","stock_review"];function ce(){let t=Z(tt(localStorage.getItem("dl.habit.log")),Ie);document.querySelectorAll(".js-streak").forEach(e=>{e.textContent=`\u{1F525} ${t} \u5929`,e.classList.toggle("lit",t>0)})}ce();ct.addEventListener("dl:task",ce);var Y=document.getElementById("guide-dialog");document.querySelectorAll(".js-guide-btn").forEach(t=>t.addEventListener("click",()=>Y.showModal()));document.getElementById("guide-close").addEventListener("click",()=>Y.close());Y.addEventListener("click",t=>{t.target===Y&&Y.close()});var $t=document.getElementById("data-msg");document.getElementById("data-export").addEventListener("click",()=>{let t=ne(localStorage),e=Object.keys(t.data).length,s=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(s),n.download=`daily-learn-backup-${new Date().toISOString().slice(0,10)}.json`,n.click(),URL.revokeObjectURL(n.href),$t.textContent=`\u2705 \u5DF2\u5BFC\u51FA ${e} \u9879\u8BB0\u5F55`});document.getElementById("data-import-btn").addEventListener("click",()=>{document.getElementById("data-import-file").click()});document.getElementById("data-import-file").addEventListener("change",async t=>{let e=t.target.files[0];if(t.target.value="",!!e)try{let s=JSON.parse(await e.text()),n=ae(s,localStorage);$t.textContent=`\u2705 \u5DF2\u5BFC\u5165 ${n} \u9879\u8BB0\u5F55\uFF0C\u6B63\u5728\u5237\u65B0\u9875\u9762\u2026`,setTimeout(()=>location.reload(),800)}catch(s){$t.textContent=`\u274C \u5BFC\u5165\u5931\u8D25\uFF1A${s&&s.message||s}`}});})();

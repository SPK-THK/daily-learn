(()=>{var nt=t=>`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;function pt(t,e=new Date){let n=new Date(e);return n.setDate(n.getDate()+t),nt(n)}function et(t,e,n){let s=t&&t[n];return!!s&&e.every(c=>s[c])}function st(t,e,n=new Date){let s=et(t,e,nt(n))?0:-1,c=0;for(;et(t,e,pt(s,n));)c+=1,s-=1;return c}function at(t){try{let e=JSON.parse(t);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}var jt=[{id:"english_words",icon:"\u{1F4D6}",label:"\u80CC\u5B8C\u4ECA\u65E5\u5355\u8BCD",how:"\u5728\u300C\u82F1\u8BED\u300D\u9875\u5B8C\u6210\u65B0\u8BCD\u4E0E\u590D\u4E60",tab:"english"},{id:"english_reading",icon:"\u{1F4F0}",label:"\u8BFB\u5B8C\u4E00\u7BC7\u53CC\u8BED\u77ED\u6587",how:"\u5728\u300C\u82F1\u8BED\u300D\u9875\u6807\u8BB0\u5DF2\u8BFB",tab:"english"},{id:"stock_review",icon:"\u{1F4C8}",label:"\u590D\u76D8\u81EA\u9009\u80A1",how:"\u5728\u300C\u80A1\u7968\u300D\u9875\u5237\u65B0\u884C\u60C5",tab:"stock"}],It="dl.habit.log",_=jt.map(t=>t.id),fe=[{icon:"\u2328\uFE0F",title:"\u952E\u76D8\u64CD\u4F5C",desc:"\u80CC\u5355\u8BCD\u65F6\uFF1A\u7A7A\u683C\u7FFB\u9762\uFF0C1 \u53C8\u5FD8\u4E86\uFF0C2 \u8BB0\u4F4F\u4E86",tone:"tone-blue"},{icon:"\u{1F50A}",title:"\u70B9\u5587\u53ED\u542C\u53D1\u97F3",desc:"\u5355\u8BCD\u3001\u642D\u914D\u3001\u91D1\u53E5\u548C\u8BCD\u6C47\u8868\u90FD\u652F\u6301\u6717\u8BFB",tone:"tone-green"},{icon:"\u{1F4BE}",title:"\u6362\u8BBE\u5907\u5148\u5907\u4EFD",desc:"\u300C\u4F7F\u7528\u6559\u7A0B\u300D\u2192 \u5BFC\u51FA\u5907\u4EFD\uFF0C\u53EF\u8FC1\u79FB\u5230\u65B0\u8BBE\u5907",tone:"tone-amber"}],Tt=()=>nt(new Date),me=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5);async function Ct(t,e){let n=at(localStorage.getItem(It)),s=null;try{let h=(await fetch("/english/content/quotes.json").then(x=>x.json())).quotes||[];h.length&&(s=h[me()%h.length])}catch{}c(),l(),e.addEventListener("dl:task",()=>{c(),l(),a()});function c(){let u=Tt(),h=n[u]||(n[u]={});localStorage.getItem(`dl.english.wordsDone.${u}`)==="1"&&(h.english_words=1),localStorage.getItem(`dl.english.reading.${u}`)&&(h.english_reading=1),localStorage.getItem(`dl.stock.review.${u}`)==="1"&&(h.stock_review=1)}function l(){let u=Object.keys(n).sort().slice(-60);n=Object.fromEntries(u.map(h=>[h,n[h]])),localStorage.setItem(It,JSON.stringify(n))}function a(){let u=Tt(),h=_.filter(f=>n[u]&&n[u][f]),x=st(n,_),L=[...Array(7)].map((f,D)=>{let C=pt(D-6),M=n[C]||{},I=_.filter(p=>M[p]).length;return{d:C,count:I,done:I===_.length,today:C===u}}),g=L.reduce((f,D)=>f+D.count,0),N=L.filter(f=>f.done).length,y=226,q=y*(1-h.length/_.length);t.innerHTML=`
      <div class="card streak-card">
        <div class="streak-row">
          <div class="ring-wrap">
            <svg class="ring" viewBox="0 0 84 84">
              <circle class="ring-bg" cx="42" cy="42" r="36"></circle>
              <circle class="ring-fg" cx="42" cy="42" r="36"
                stroke-dasharray="${y}" stroke-dashoffset="${q}"></circle>
            </svg>
            <div class="ring-label"><b>${h.length}</b>/${_.length}</div>
          </div>
          <div class="streak-info">
            <p class="hint">\u8FDE\u7EED\u5168\u90E8\u5B8C\u6210</p>
            <div class="streak-num">\u{1F525} ${x} <small>\u5929</small></div>
            <p class="hint">${et(n,_,u)?"\u4ECA\u65E5\u6253\u5361\u5B8C\u6210 \u{1F389}":`\u8FD8\u5DEE ${_.length-h.length} \u9879\u5B8C\u6210\u6253\u5361`}</p>
          </div>
        </div>
        <div class="week-strip">
          ${L.map(f=>`<div class="wd ${f.done?"done":""} ${f.today?"today":""}" title="${f.d}">${Number(f.d.slice(8))}<i></i></div>`).join("")}
        </div>
      </div>
      <div class="card tasks-card">
        <h2 class="card-title">\u4ECA\u65E5\u4EFB\u52A1</h2>
        ${jt.map(f=>{let D=n[u]&&n[u][f.id];return`
            <div class="habit-task ${D?"done":""}" ${D?"":`data-goto="${f.tab}" role="button" tabindex="0"`}>
              <span class="dot ${D?"done":""}">${D?"\u2713":""}</span>
              <div class="task-text"><b>${f.icon} ${f.label}</b><span class="hint">${f.how}</span></div>
              <span class="tag ${D?"done":""}">${D?"\u5DF2\u5B8C\u6210":"\u5F85\u5B8C\u6210"}</span>
              ${D?"":'<span class="task-chevron" aria-hidden="true">\u203A</span>'}
            </div>`}).join("")}
      </div>
      <div class="card tips-card">
        <h2 class="card-title">\u5C0F\u8D34\u58EB</h2>
        ${fe.map(f=>`
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
          ${L.map(f=>{let D="\u65E5\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D"[new Date(f.d+"T00:00:00").getDay()];return`<div class="week-bar ${f.today?"today":""}" title="${f.d} \xB7 \u5B8C\u6210 ${f.count}/3">
              <div class="week-track"><i class="week-fill lv-${f.count}" style="height:${f.count/_.length*100}%"></i></div>
              <span>${D}</span>
            </div>`}).join("")}
        </div>
        <p class="hint">\u672C\u5468\u5B8C\u6210 ${g}/${7*_.length} \u9879 \xB7 ${N}/7 \u5929\u5168\u52E4</p>
      </div>
      ${s?`
      <div class="card today-quote">
        <div class="today-quote-mark" aria-hidden="true">\u201C</div>
        <p class="today-quote-en">${s.en}</p>
        <p class="today-quote-zh">${s.zh}</p>
        <p class="hint">\u2014\u2014 ${s.who}</p>
      </div>`:""}
      <p class="hint footnote">\u4E09\u9879\u5168\u90E8\u5B8C\u6210\u5373\u89C6\u4E3A\u5F53\u65E5\u6253\u5361\u6210\u529F\uFF1B\u70B9\u51FB\u5F85\u5B8C\u6210\u4EFB\u52A1\u53EF\u76F4\u63A5\u8DF3\u8F6C\u3002</p>
    `}function w(u){let h=u.closest(".habit-task[data-goto]");h&&e.dispatchEvent(new CustomEvent("dl:nav",{detail:{tab:h.getAttribute("data-goto")}}))}t.addEventListener("click",u=>{if(u.target.closest("[data-stats]")){e.dispatchEvent(new CustomEvent("dl:nav",{detail:{tab:"stats"}}));return}w(u.target)}),t.addEventListener("keydown",u=>{u.key!=="Enter"&&u.key!==" "||!u.target.closest(".habit-task[data-goto]")||(u.preventDefault(),w(u.target))}),a()}var ht=/^(sh|sz)\d{6}$/;function Mt(t,e){try{let n=JSON.parse(t);if(Array.isArray(n)){let s=[...new Set(n.filter(c=>typeof c=="string"&&ht.test(c)))];if(s.length)return s}}catch{}return[...e]}var gt="dl.stock.watchlist",Nt="dl.stock.lessonsDone",$e=["sh600519","sz300750","sz002594","sh601318","sz000858","sh600036"],be=()=>{let t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`};async function Ot(t,e){let{lessons:n}=await fetch("/stock/lessons.json").then(r=>r.json()),s=Mt(localStorage.getItem(gt),$e),c=[],l="quotes",a=null,w="\u5168\u90E8",u={},h=null,x={},L=null;t.innerHTML=`
    <div class="subnav">
      <button data-view="quotes">\u81EA\u9009\u884C\u60C5</button>
      <button data-view="lessons">\u5165\u95E8\u6559\u7A0B</button>
    </div>
    <div id="st-body"></div>
  `;let g=t.querySelector("#st-body"),N=t.querySelector(".subnav");function y(){localStorage.setItem(gt,JSON.stringify(s))}localStorage.getItem(gt)===null&&y();function q(){try{return JSON.parse(localStorage.getItem(Nt)||"{}")}catch{return{}}}function f(r){localStorage.setItem(Nt,JSON.stringify(r))}function D(){localStorage.setItem(`dl.stock.review.${be()}`,"1"),e.dispatchEvent(new CustomEvent("dl:task",{detail:{id:"stock_review"}}))}function C(){let r=new Date,b=r.getDay();if(b===0||b===6)return!1;let k=r.getHours()*60+r.getMinutes();return k>=9*60+15&&k<=15*60+5}setInterval(()=>{l!=="quotes"||document.hidden||typeof L!="function"||C()&&L()},6e4);function M(){N.querySelectorAll("button").forEach(r=>r.classList.toggle("active",r.getAttribute("data-view")===l)),l==="quotes"?I():p()}function I(){g.innerHTML=`
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
    `;let r=o=>g.querySelector(o);function b(){let o=c.filter($=>$.changePct>0).length,v=c.filter($=>$.changePct<0).length,E=c.length-o-v;r("#st-summary").innerHTML=c.length?`<span class="chip up-chip">\u6DA8 ${o}</span><span class="chip flat-chip">\u5E73 ${E}</span><span class="chip down-chip">\u8DCC ${v}</span>`:"",r("#st-list").innerHTML=c.length?'<div class="q-head"><span>\u80A1\u7968</span><span>\u6700\u65B0\u4EF7</span><span>\u6DA8\u8DCC</span><span></span></div>'+c.map($=>{let A=$.changePct>0?"up":$.changePct<0?"down":"flat",J=$.changePct==null?"--":`${$.changePct>0?"+":""}${$.changePct.toFixed(2)}%`,Z=$.change==null?"--":`${$.change>0?"+":""}${$.change.toFixed(2)}`,Y=h===$.code,B=x[$.code],ut=Y?B&&B.length?k(B):'<p class="hint k-err">K\u7EBF\u83B7\u53D6\u5931\u8D25\uFF0C\u7A0D\u540E\u70B9\u51FB\u91CD\u8BD5</p>':"";return`
              <div class="quote-row ${Y?"expanded":""}" data-code="${$.code}">
                <div class="q-name"><b>${$.name}</b><span class="hint">${$.code}</span></div>
                <div class="q-price ${A}">${$.price==null?"\u505C\u724C":$.price.toFixed(2)}</div>
                <div class="q-chg"><span class="pill ${A}">${J}</span><span class="hint">${Z}</span></div>
                <button class="q-del" title="\u5220\u9664" data-del="${$.code}">\xD7</button>
              </div>${Y?`<div class="k-card">${ut}</div>`:""}`}).join(""):'<p class="hint">\u6682\u65E0\u81EA\u9009\u80A1\uFF0C\u8BF7\u5728\u4E0B\u65B9\u6DFB\u52A0\uFF08\u5982 sh600519\uFF09\u3002</p>',r("#st-meta").textContent=c.length?`\u66F4\u65B0\u4E8E ${new Date(c[0].serverTime).toLocaleTimeString("zh-CN")}${C()?" \xB7 \u4EA4\u6613\u65F6\u6BB5\u81EA\u52A8\u5237\u65B0":""}`:"\u6DFB\u52A0\u81EA\u9009\u80A1\u540E\u70B9\u51FB\u5237\u65B0"}function k(o){let v=o.map(O=>O.close),E=360,$=130,A=12,J=Math.min(...v),Z=Math.max(...v),Y=Z-J||1,B=O=>A+O*(E-2*A)/Math.max(v.length-1,1),ut=O=>$-A-(O-J)/Y*($-2*A),Lt=v.map((O,At)=>`${At?"L":"M"}${B(At).toFixed(1)} ${ut(O).toFixed(1)}`).join(" "),he=`${Lt} L ${B(v.length-1).toFixed(1)} ${$-A} L ${A} ${$-A} Z`,P=(v[v.length-1]-v[0])/v[0]*100,ge=P>0?"up":P<0?"down":"flat",tt=P>0?"#e03131":P<0?"#2f9e44":"#8a93a6",Dt="kg"+Math.random().toString(36).slice(2,8),qt=B(v.length-1).toFixed(1),ve=[.25,.5,.75].map(O=>`<line x1="${A}" y1="${($-A-O*($-2*A)).toFixed(1)}"
           x2="${E-A}" y2="${($-A-O*($-2*A)).toFixed(1)}"></line>`).join("");return`
        <div class="row-between k-meta">
          <span class="hint">\u8FD1 ${o.length} \u65E5\u6536\u76D8\u4EF7</span>
          <span class="hint k-range" title="${o[0].date} ~ ${o[o.length-1].date}">${o[0].date.slice(5)} ~ ${o[o.length-1].date.slice(5)}</span>
        </div>
        <svg class="kchart" viewBox="0 0 ${E} ${$}" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="${Dt}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${tt}" stop-opacity=".22"/>
              <stop offset="1" stop-color="${tt}" stop-opacity=".02"/>
            </linearGradient>
          </defs>
          <g class="k-grid">${ve}</g>
          <path d="${he}" fill="url(#${Dt})"></path>
          <path d="${Lt}" fill="none" stroke="${tt}" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"></path>
          <line class="k-lastline" x1="${qt}" y1="${A}" x2="${qt}" y2="${$-A}" stroke="${tt}"></line>
        </svg>
        <div class="row-between k-meta k-meta-bottom">
          <span class="${ge} k-pct">\u533A\u95F4 ${P>0?"+":""}${P.toFixed(2)}%</span>
          <span class="hint">\u6700\u4F4E ${J.toFixed(2)} \xB7 \u6700\u9AD8 ${Z.toFixed(2)}</span>
        </div>`}function S(o,v=1e4){let E=new AbortController,$=setTimeout(()=>E.abort(),v);return fetch(o,{signal:E.signal}).finally(()=>clearTimeout($))}async function T(o){let v=s.find(E=>E.endsWith(o))||o;try{let E=await S(`/api/kline?code=${encodeURIComponent(v)}&days=30`).then($=>$.json());x[o]=Array.isArray(E)&&E.length?E:[]}catch{x[o]=[]}}async function m(){r("#st-meta").textContent="\u5237\u65B0\u4E2D\u2026";try{let v=await(await S("/api/quotes?codes="+encodeURIComponent(s.join(",")))).json();if(v.error)throw new Error(v.error);c=v,b(),D()}catch(o){r("#st-meta").textContent=`\u884C\u60C5\u83B7\u53D6\u5931\u8D25\uFF1A${o.message==="The user aborted a request."?"\u8BF7\u6C42\u8D85\u65F6":o.message}\uFF08\u8BF7\u68C0\u67E5\u7F51\u7EDC\uFF09`}}r("#st-refresh").addEventListener("click",m),r("#st-list").addEventListener("click",async o=>{if(o.target.closest(".q-del")){let $=o.target.getAttribute("data-del");if(!$)return;s=s.filter(A=>A!==$&&!A.endsWith($)),c=c.filter(A=>A.code!==$),h===$&&(h=null),y(),b();return}let v=o.target.closest(".quote-row");if(!v)return;let E=v.getAttribute("data-code");if(E){if(h===E){h=null,b();return}h=E,x[E]||(b(),await T(E)),b()}}),r("#st-add").addEventListener("click",()=>{let o=r("#st-code"),v=o.value.trim().toLowerCase();if(!ht.test(v)){o.value="",o.placeholder="\u683C\u5F0F\uFF1Ash600519 \u6216 sz300750";return}s.includes(v)||(s.push(v),y(),m()),o.value=""}),L=m,m()}function p(){if(a!==null)return i();let r=q(),b=n.filter(m=>r[m.id]).length,k=n.find(m=>!r[m.id]),S=["\u5168\u90E8",...new Set(n.map(m=>m.category).filter(Boolean))],T=w==="\u5168\u90E8"?n:n.filter(m=>m.category===w);g.innerHTML=`
      <div class="card lesson-list">
        <div class="row-between">
          <h2 class="card-title">\u80A1\u7968\u5165\u95E8 \xB7 \u96F6\u57FA\u7840 8 \u8BFE</h2>
          <span class="tag ${b===n.length?"done":""}">${b}/${n.length} \u5DF2\u5B66</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${b/n.length*100}%"></div></div>
        <p class="hint lesson-intro">\u6BCF\u8BFE\u7EA6 3-5 \u5206\u949F\uFF1A\u6B63\u6587 \u2192 \u8981\u70B9 \u2192 \u5C0F\u6D4B\u9A8C\u3002${k?"\u5EFA\u8BAE\u4ECE\u300C\u7EE7\u7EED\u5B66\u300D\u5F00\u59CB\u3002":"\u5168\u90E8\u5B66\u5B8C\uFF0C\u6BD5\u4E1A\uFF01\u{1F393}"}</p>
        <div class="lesson-filters">
          ${S.map(m=>`
            <button class="filter-chip ${m===w?"active":""}" data-cat="${m}">
              ${m}<em>${m==="\u5168\u90E8"?n.length:n.filter(o=>o.category===m).length}</em>
            </button>`).join("")}
        </div>
        ${T.map(m=>`
          <div class="lesson-item" data-lesson="${m.id}">
            <div class="lesson-row">
              <span class="num ${r[m.id]?"done":""}">${r[m.id]?"\u2713":n.indexOf(m)+1}</span>
              <div class="lesson-text">
                <b>${m.title}</b>
                <span class="hint">${m.category} \xB7 \u7EA6 ${m.minutes} \u5206\u949F \xB7 ${m.quiz.length} \u9898\u5C0F\u6D4B\u9A8C</span>
              </div>
              <span class="tag ${m===k?"rec":r[m.id]?"done":""}">${m===k?"\u7EE7\u7EED\u5B66":r[m.id]?"\u5DF2\u5B66\u5B8C":"\u672A\u5B66"}</span>
            </div>
          </div>`).join("")}
        ${T.length?"":'<p class="hint center-text">\u8BE5\u5206\u7C7B\u6682\u65E0\u8BFE\u7A0B</p>'}
      </div>
    `,g.querySelectorAll(".filter-chip").forEach(m=>m.addEventListener("click",()=>{w=m.getAttribute("data-cat"),p()})),g.querySelectorAll(".lesson-item").forEach(m=>m.addEventListener("click",()=>{a=m.getAttribute("data-lesson"),u={},p()}))}function i(){let r=n.find(S=>S.id===a),k=!!q()[r.id];g.innerHTML=`
      <div class="card">
        <button class="btn small ghost" id="ls-back">\u2190 \u8FD4\u56DE\u8BFE\u7A0B\u5217\u8868</button>
        <h2 class="lesson-title">${r.title}</h2>
        <p class="hint">\u7B2C ${n.indexOf(r)+1} \u8BFE \xB7 \u7EA6 ${r.minutes} \u5206\u949F</p>
        ${r.sections.map(S=>`<div class="lesson-sec"><h4>${S.h}</h4><p>${S.p}</p></div>`).join("")}
        <div class="points-box">
          <h4>\u{1F3AF} \u672C\u8BFE\u8981\u70B9</h4>
          <ul>${r.points.map(S=>`<li>${S}</li>`).join("")}</ul>
        </div>
      </div>
      <div class="card">
        <h3 class="quiz-head">\u270F\uFE0F \u5C0F\u6D4B\u9A8C\uFF08${r.quiz.length} \u9898\uFF09</h3>
        ${r.quiz.map((S,T)=>d(S,T)).join("")}
      </div>
      <div class="card center finish-card">
        <button class="btn primary" id="ls-done" ${k?"disabled":""}>${k?"\u672C\u8BFE\u5DF2\u5B66\u5B8C \u2713":"\u6807\u8BB0\u5B66\u5B8C\u8FD9\u8BFE"}</button>
      </div>
    `,g.querySelector("#ls-back").addEventListener("click",()=>{a=null,p()}),g.querySelector("#ls-done").addEventListener("click",()=>{let S=q();S[r.id]=1,f(S),a=null,p()}),g.querySelectorAll(".opt").forEach(S=>S.addEventListener("click",()=>{let T=Number(S.getAttribute("data-q"));if(u[T]!==void 0)return;let m=r.quiz[T],o=Number(S.getAttribute("data-opt"));u[T]=o;let v=g.querySelector(`.quiz-q[data-qi="${T}"]`);v.querySelectorAll(".opt").forEach(E=>{let $=Number(E.getAttribute("data-opt"));$===m.a?E.classList.add("correct"):$===o&&E.classList.add("wrong"),E.classList.add("locked")}),v.querySelector(".explain").classList.remove("hidden")}))}function d(r,b){return`
      <div class="quiz-q" data-qi="${b}">
        <p class="quiz-title">${b+1}. ${r.q}</p>
        ${r.options.map((k,S)=>`<button class="opt" data-q="${b}" data-opt="${S}">${"ABCD"[S]}. ${k}</button>`).join("")}
        <div class="explain hidden">\u{1F4A1} ${r.explain}</div>
      </div>`}N.addEventListener("click",r=>{let b=r.target.getAttribute("data-view");b&&(l=b,b==="lessons"&&(a=null),M())}),M()}var _t=[1,2,4,7,15],vt=_t.length;function we(t){return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}function zt(t,e,n=new Date){let s=e?Math.min(t+1,vt):1,c=new Date(n);return c.setDate(c.getDate()+_t[s-1]),{box:s,due:we(c)}}function Rt(t){try{let e=JSON.parse(t);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function Bt(t,e,n,s=10){let c=e.filter(a=>t[a.w]&&t[a.w].due<=n).sort((a,w)=>t[a.w].due<t[w.w].due?-1:1).map(a=>a.w),l=e.filter(a=>!t[a.w]).slice(0,s).map(a=>a.w);return{date:n,queue:[...c,...l],idx:0}}function ft(t){let e=/^(.+?)\s+([\u4e00-\u9fff].*)$/.exec(t);return e?{en:e[1],zh:e[2]}:{en:t,zh:""}}var Pt="dl.english.progress",Ft="dl.english.today",ye=10,F=()=>{let t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`},mt=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5),R=null,Ht=null;function $t(t){let e=document.getElementById("dl-toast");e||(e=document.createElement("div"),e.id="dl-toast",e.className="app-toast",document.body.appendChild(e)),e.textContent=t,e.classList.add("show"),clearTimeout(Ht),Ht=setTimeout(()=>e.classList.remove("show"),2400)}function ke(){if(!window.speechSynthesis)return null;let e=(speechSynthesis.getVoices()||[]).filter(n=>/^en([-_]|$)/i.test(n.lang));return e.find(n=>/google|samantha|karen|daniel|microsoft.*english/i.test(n.name))||e[0]||null}function Ut(t){if(!("speechSynthesis"in window)||typeof SpeechSynthesisUtterance>"u"){$t("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u6717\u8BFB");return}try{speechSynthesis.cancel();let e=new SpeechSynthesisUtterance(t);e.lang="en-US",e.rate=.9,e.pitch=1;let n=ke();n&&(e.voice=n),e.onerror=()=>$t("\u6717\u8BFB\u5931\u8D25\uFF1A\u8BF7\u68C0\u67E5\u7F51\u7EDC\u6216\u7CFB\u7EDF\u8BED\u97F3"),speechSynthesis.speak(e)}catch{$t("\u6717\u8BFB\u5931\u8D25\uFF1A\u8BF7\u68C0\u67E5\u7F51\u7EDC\u6216\u7CFB\u7EDF\u8BED\u97F3")}}function z(t){let e=String(t||"").trim();if(e){if(navigator.onLine!==!1)try{R&&(R.pause(),R=null);let n=new Audio("https://dict.youdao.com/dictvoice?audio="+encodeURIComponent(e)+"&type=2");R=n;let s=!1,c=()=>{s||(s=!0,Ut(e))};n.onerror=c;let l=n.play();l&&typeof l.catch=="function"&&l.catch(c);return}catch{}Ut(e)}}async function Se(t){try{return await navigator.clipboard.writeText(t),!0}catch{}try{let e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();let n=document.execCommand("copy");return e.remove(),n}catch{return!1}}async function Wt(t,e){let[n,s,c]=await Promise.all([fetch("/english/data/wordbank.json").then(i=>i.json()),fetch("/english/content/articles.json").then(i=>i.json()).then(i=>i.articles),fetch("/english/content/quotes.json").then(i=>i.json()).then(i=>i.quotes)]),l=Rt(localStorage.getItem(Pt)),a=JSON.parse(localStorage.getItem(Ft)||"null"),w="words",u=-1;(!a||a.date!==F())&&(a=Bt(l,n,F(),ye),x());function h(){localStorage.setItem(Pt,JSON.stringify(l))}function x(){localStorage.setItem(Ft,JSON.stringify(a))}function L(){localStorage.getItem(`dl.english.wordsDone.${F()}`)!=="1"&&(localStorage.setItem(`dl.english.wordsDone.${F()}`,"1"),e.dispatchEvent(new CustomEvent("dl:task",{detail:{id:"english_words"}})))}t.innerHTML=`
    <div class="subnav">
      <button data-view="words">\u80CC\u5355\u8BCD</button>
      <button data-view="reading">\u53CC\u8BED\u9605\u8BFB</button>
      <button data-view="quote">\u6BCF\u65E5\u4E00\u53E5</button>
      <button data-view="bank">\u8BCD\u5E93</button>
    </div>
    <div id="en-body"></div>
  `;let g=t.querySelector("#en-body"),N=t.querySelector(".subnav");function y(){N.querySelectorAll("button").forEach(i=>i.classList.toggle("active",i.getAttribute("data-view")===w)),w==="words"?C():w==="reading"?M():w==="bank"?D():p()}let q="",f=null;function D(){let i=q.trim().toLowerCase(),d=i?n.filter(o=>o.w.toLowerCase().includes(i)||o.zh.includes(i)||o.tag.includes(i)):n,r=o=>!!l[o],b=o=>l[o]?l[o].box:0,k=f&&d.some(o=>o.w===f)?f:null,S=k?n.find(o=>o.w===k):null;g.innerHTML=`
      <div class="card">
        <div class="row-between">
          <h2 class="card-title">\u8BCD\u5E93 <span class="hint">${n.length} \u8BCD \xB7 \u5DF2\u5B66 ${n.filter(o=>r(o.w)).length}</span></h2>
        </div>
        <div class="search-box">
          <input id="bk-q" placeholder="\u641C\u7D22\u5355\u8BCD / \u4E2D\u6587 / \u5206\u7C7B\uFF08\u5982\uFF1A\u725B\u5E02\u3001\u8D22\u7ECF\uFF09" value="${q.replace(/"/g,"&quot;")}" autocomplete="off" />
          ${q?'<button id="bk-clear" class="btn small ghost">\u6E05\u7A7A</button>':""}
        </div>
        <p class="hint">${i?`\u5339\u914D ${d.length} \u4E2A`:"\u6309\u8BCD\u5E93\u987A\u5E8F\uFF0C\u6BCF\u5929\u81EA\u52A8\u5B66 10 \u4E2A\u65B0\u8BCD\uFF1B\u8FD9\u91CC\u53EF\u968F\u65F6\u67E5\u9605\u4EFB\u4F55\u8BCD\u3002"}</p>
      </div>
      ${S?`
        <div class="card word-detail">
          <div class="row-between">
            <span class="tag">${S.tag} \xB7 ${r(S.w)?`\u5DF2\u5B66\xB7\u7B2C${b(S.w)}\u76D2`:"\u672A\u5B66"}</span>
            <button class="icon-btn" id="bk-tts" title="\u53D1\u97F3">\u{1F50A}</button>
          </div>
          <h2 class="word">${S.w}</h2>
          <p class="hint">${S.pos}</p>
          <p class="word-zh">${S.zh}</p>
          <div class="ex-block">
            <p class="word-ex">${S.ex}</p>
            <p class="word-ex-zh hint">${S.exZh}</p>
          </div>
          <div class="detail-block">
            <h4>\u{1F4CC} \u5E38\u7528\u642D\u914D</h4>
            <div class="chips">${S.phrases.map(o=>{let v=ft(o);return`<span class="chip phrase-chip" data-say="${v.en}">\u{1F50A} ${v.en} <em>${v.zh}</em></span>`}).join("")}</div>
          </div>
          <div class="detail-block tip-block">
            <h4>\u{1F4A1} \u8BB0\u5FC6\u70B9</h4>
            <p>${S.tip}</p>
          </div>
        </div>`:""}
      <div class="card bank-list">
        ${d.length?d.map(o=>`
          <div class="bank-row ${o.w===k?"open":""}" data-w="${o.w}">
            <span class="dot ${r(o.w)?"done":""}">${r(o.w)?"\u2713":""}</span>
            <div class="bank-text"><b>${o.w}</b><span class="hint">${o.zh}</span></div>
            <span class="tag ${o.w===k?"done":""}">${o.w===k?"\u6536\u8D77":"\u8BE6\u89E3"}</span>
          </div>`).join(""):'<p class="hint center-text">\u6CA1\u6709\u5339\u914D\u7684\u5355\u8BCD</p>'}
      </div>`;let T=g.querySelector("#bk-q");T.addEventListener("input",()=>{q=T.value,D();let o=g.querySelector("#bk-q");o.focus(),o.setSelectionRange(o.value.length,o.value.length)});let m=g.querySelector("#bk-clear");m&&m.addEventListener("click",()=>{q="",D()}),g.querySelector("#bk-tts")&&g.querySelector("#bk-tts").addEventListener("click",()=>z(k)),g.querySelectorAll(".phrase-chip").forEach(o=>o.addEventListener("click",()=>z(o.getAttribute("data-say")))),g.querySelectorAll(".bank-row").forEach(o=>o.addEventListener("click",()=>{let v=o.getAttribute("data-w");f=f===v?null:v,D()}))}function C(){if(a.idx>=a.queue.length){L();let o=Object.keys(l).length,v=Object.values(l).filter(E=>E.box>=vt).length;g.innerHTML=`
        <div class="card center">
          <div class="big-emoji">\u{1F389}</div>
          <h2>\u4ECA\u65E5\u5355\u8BCD\u5DF2\u5B8C\u6210</h2>
          <div class="stat-row">
            <span class="chip">\u8BCD\u5E93\u8FDB\u5EA6 ${o}/${n.length}</span>
            <span class="chip">\u5DF2\u6BD5\u4E1A ${v} \u8BCD</span>
          </div>
          <p class="hint">\u660E\u5929\u4F1A\u6309\u9057\u5FD8\u66F2\u7EBF\u5B89\u6392\u590D\u4E60\u3002<br/>\u53EF\u4EE5\u5230\u300C\u8BCD\u5E93\u300D\u968F\u65F6\u67E5\u9605\u4EFB\u4F55\u8BCD\u7684\u642D\u914D\u4E0E\u8BB0\u5FC6\u70B9\u3002</p>
        </div>`;return}let i=n.find(o=>o.w===a.queue[a.idx]),d=!l[i.w],r=d?0:l[i.w].box;g.innerHTML=`
      <div class="card flashcard">
        <div class="fc-progress">${a.queue.map((o,v)=>`<i class="${v<a.idx?"done":v===a.idx?"cur":""}"></i>`).join("")}</div>
        <div class="row-between">
          <span class="tag">${i.tag} \xB7 ${d?"\u65B0\u8BCD":`\u590D\u4E60\xB7\u7B2C${r}\u76D2`}</span>
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
              <div class="chips">${i.phrases.map(o=>{let{en:v,zh:E}=ft(o);return`<span class="chip phrase-chip" data-say="${v}">\u{1F50A} ${v} <em>${E}</em></span>`}).join("")}</div>
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
    `;let b=g.querySelector("#fc-back"),k=g.querySelector("#flip"),S=g.querySelector("#grade"),T=g.querySelector(".fc-tip");g.querySelector("#tts-word").addEventListener("click",()=>z(i.w)),k.addEventListener("click",()=>{b.classList.remove("hidden"),T&&T.classList.add("hidden"),k.classList.add("hidden"),S.classList.remove("hidden"),z(i.w)}),g.querySelectorAll(".phrase-chip").forEach(o=>o.addEventListener("click",()=>z(o.getAttribute("data-say")))),g.querySelector("#wrong").addEventListener("click",()=>m(!1)),g.querySelector("#right").addEventListener("click",()=>m(!0));function m(o){let v=l[i.w]||{box:0,due:""};l[i.w]=zt(v.box,o),h(),a.idx+=1,x(),C()}}function M(){if(u>=0){let d=s[u],r=localStorage.getItem(`dl.english.reading.${F()}`);g.innerHTML=`
        <div class="card">
          <button class="btn small ghost" id="rd-back">\u2190 \u8FD4\u56DE\u5217\u8868</button>
          <h2 class="card-title">${d.title}</h2>
          <p class="hint">\u7EA6 ${d.minutes} \u5206\u949F \xB7 \u6BB5\u843D\u5BF9\u7167 + \u8BB2\u89E3</p>
          ${d.paras.map(b=>`<p class="rd-en">${b.en}</p><p class="rd-zh hint">${b.zh}</p>`).join("")}
          <div class="notes-block">
            <h4>\u{1F4DD} \u8BED\u6CD5\u4E0E\u8868\u8FBE\u8BB2\u89E3</h4>
            <ul>${d.notes.map(b=>`<li>${b}</li>`).join("")}</ul>
          </div>
          <h4 class="vocab-head">\u{1F50A} \u8BCD\u6C47\u8868\uFF08\u70B9\u51FB\u53D1\u97F3\uFF09</h4>
          <div class="vocab">${d.vocab.map(b=>`<span class="chip vocab-chip" data-say="${b.w}">\u{1F50A} ${b.w} ${b.zh}</span>`).join("")}</div>
          <button class="btn primary" id="rd-done" ${r===d.id?"disabled":""}>
            ${r===d.id?"\u4ECA\u65E5\u5DF2\u8BFB \u2713":"\u6807\u8BB0\u5DF2\u8BFB\uFF0C\u5B8C\u6210\u6253\u5361"}</button>
        </div>`,g.querySelector("#rd-back").addEventListener("click",()=>{u=-1,M()}),g.querySelector("#rd-done").addEventListener("click",()=>{localStorage.setItem(`dl.english.reading.${F()}`,d.id),e.dispatchEvent(new CustomEvent("dl:task",{detail:{id:"english_reading"}})),M()}),g.querySelector(".vocab").addEventListener("click",b=>{let k=b.target.getAttribute("data-say");k&&z(k)});return}let i=mt()%s.length;g.innerHTML=`
      <div class="card rd-list">
        <div class="rd-list-head">
          <div>
            <h2 class="card-title">\u53CC\u8BED\u9605\u8BFB</h2>
            <p class="hint">\u6BCF\u5929\u4E00\u7BC7\u8D22\u7ECF\u77ED\u6587\uFF0C\u6BB5\u843D\u5BF9\u7167 + \u8BB2\u89E3</p>
          </div>
          <span class="tag">${s.length} \u7BC7</span>
        </div>
        ${s.map((d,r)=>`
          <button class="rd-row" data-open="${r}">
            <span class="rd-main">
              <span class="rd-top">
                <b class="rd-title">${d.title}</b>
                ${r===i?'<span class="tag rec">\u4ECA\u65E5\u63A8\u8350</span>':""}
              </span>
              <span class="hint">\u7EA6 ${d.minutes} \u5206\u949F \xB7 ${d.vocab.length} \u4E2A\u8BCD\u6C47</span>
            </span>
            <span class="rd-go">\u9605\u8BFB \u203A</span>
          </button>`).join("")}
      </div>`,g.querySelectorAll("[data-open]").forEach(d=>d.addEventListener("click",()=>{u=Number(d.getAttribute("data-open")),M()}))}function I(i){if(i.audio)try{R&&(R.pause(),R=null);let d=new Audio(i.audio);R=d;let r=!1,b=()=>{r||(r=!0,z(i.en))};d.onerror=b;let k=d.play();k&&typeof k.catch=="function"&&k.catch(b);return}catch{}z(i.en)}function p(){let i=c[mt()%c.length];g.innerHTML=`
      <div class="card center quote-card">
        <div class="quote-mark" aria-hidden="true">\u201C</div>
        <p class="quote-en">${i.en}</p>
        <p class="word-zh">${i.zh}</p>
        <p class="hint">\u2014\u2014 ${i.who}</p>
        <div class="row-gap quote-actions">
          <button class="btn primary" id="tts-quote">\u{1F50A} \u8DDF\u8BFB</button>
          ${i.audio?`<a class="btn" id="dl-quote" href="${i.audio}" download="\u6BCF\u65E5\u4E00\u53E5-${mt()%c.length+1}.mp3">\u2B07\uFE0F \u4E0B\u8F7D\u97F3\u9891</a>`:""}
          <button class="btn" id="copy-quote">\u{1F4CB} \u590D\u5236</button>
        </div>
      </div>`,g.querySelector("#tts-quote").addEventListener("click",()=>I(i)),g.querySelector("#copy-quote").addEventListener("click",async()=>{let d=g.querySelector("#copy-quote"),r=await Se(`${i.en}
${i.zh}
\u2014\u2014 ${i.who}`);d.textContent=r?"\u2705 \u5DF2\u590D\u5236":"\u274C \u590D\u5236\u5931\u8D25",setTimeout(()=>{d.textContent="\u{1F4CB} \u590D\u5236"},1500)})}N.addEventListener("click",i=>{let d=i.target.getAttribute("data-view");d&&(w=d,d==="reading"&&(u=-1),y())}),document.addEventListener("keydown",i=>{if(w!=="words")return;let d=document.activeElement&&document.activeElement.tagName;d==="INPUT"||d==="TEXTAREA"||(i.code==="Space"&&document.getElementById("flip")?(i.preventDefault(),document.getElementById("flip").click()):i.key==="1"&&document.getElementById("wrong")?(i.preventDefault(),document.getElementById("wrong").click()):i.key==="2"&&document.getElementById("right")&&(i.preventDefault(),document.getElementById("right").click()))}),y()}var Jt=t=>String(t).padStart(2,"0");function j(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function bt(t,e=new Date){let n=/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/.exec(String(t||""));if(!n)return String(t||"");let[,s,c,l,a,w]=n,u=`${e.getFullYear()}-${Jt(e.getMonth()+1)}-${Jt(e.getDate())}`;return`${s}-${c}-${l}`===u?`${a}:${w}`:Number(s)===e.getFullYear()?`${c}-${l} ${a}:${w}`:`${s}-${c}-${l} ${a}:${w}`}var xe=[["\u5B8F\u89C2",/(通胀|CPI|PPI|GDP|央行|利率|降息|加息|降准|财政|政策|汇率|人民币|美联储|非农|就业|国债|收益率|PMI|社融|关税|经济数据)/],["\u516C\u53F8",/(公司|集团|股份|财报|业绩|营收|净利|回购|增持|减持|并购|收购|上市|IPO|退市|股东|董事长|中标|订单)/],["\u5168\u7403",/(美股|纳斯达克|道指|标普|欧洲|日本|韩国|美元|比特币|币安|乌克兰|俄罗斯|特朗普|海外|全球市场)/],["\u5E02\u573A",/(A股|沪指|深成指|创业板|指数|收盘|开盘|涨|跌|板块|资金|成交|北向|港股|恒生|期货|原油|黄金|商品|债市)/]];function Yt(t,e=""){let n=`${t||""} ${e||""}`;for(let[s,c]of xe)if(c.test(n))return s;return"\u5176\u4ED6"}function wt(t,e=30){let n=new Set;return(Array.isArray(t)?t:[]).filter(s=>s&&s.title&&/^https?:\/\//i.test(String(s.url||""))).filter(s=>{let c=String(s.id||s.title);return n.has(c)?!1:(n.add(c),!0)}).slice(0,e).map(s=>({id:String(s.id||s.title),title:String(s.title).trim(),digest:String(s.digest||"").replace(/^【[^】]*】\s*/,"").trim(),time:String(s.time||"").trim(),url:String(s.url),content:Array.isArray(s.content)?s.content.filter(c=>typeof c=="string"&&c.trim()).slice(0,40):[],category:Yt(s.title,s.digest)}))}function Kt(t){try{let e=JSON.parse(t);if(e&&Array.isArray(e.items))return{updatedAt:Number(e.updatedAt)||0,items:wt(e.items)}}catch{}return{updatedAt:0,items:[]}}var Xt="dl.news.cache",Ee=5*60*1e3,Gt=["\u5168\u90E8","\u5B8F\u89C2","\u516C\u53F8","\u5168\u7403","\u5E02\u573A","\u5176\u4ED6"];function Qt(t,e){let n=Kt(localStorage.getItem(Xt)),s=n.items,c=n.updatedAt,l=!1,a="",w=!1,u="\u5168\u90E8",h=null,x=!1,L="";function g(){try{localStorage.setItem(Xt,JSON.stringify({updatedAt:c,items:s}))}catch{}}function N(){if(!c)return"";let p=new Date(c),i=p.toDateString()===new Date().toDateString(),d=`${String(p.getHours()).padStart(2,"0")}:${String(p.getMinutes()).padStart(2,"0")}`;return i?d:`${p.getMonth()+1}-${p.getDate()} ${d}`}function y(){return s.find(p=>p.id===h)||null}async function q(p=!1){if(!l){if(!p&&navigator.onLine===!1){I();return}l=!0,a="",I();try{let d=await(await fetch("/api/news",{cache:"no-store"})).json();if(d.error)throw new Error(d.error);let r=new Map(s.map(k=>[k.id,k])),b=wt(d.items).map(k=>({...k,content:r.get(k.id)&&r.get(k.id).content||k.content||[]}));b.length&&(s=b,c=Number(d.updatedAt)||Date.now(),g())}catch{a=navigator.onLine===!1?"\u5F53\u524D\u65E0\u7F51\u7EDC\uFF0C\u663E\u793A\u4E0A\u6B21\u7F13\u5B58":"\u65B0\u95FB\u52A0\u8F7D\u5931\u8D25\uFF0C\u663E\u793A\u4E0A\u6B21\u7F13\u5B58"}l=!1,h&&!y()&&(h=null),I()}}async function f(p){h=p,L="";let i=y();if(I(),!(!i||i.content.length)){if(navigator.onLine===!1){L="\u79BB\u7EBF\u72B6\u6001\uFF0C\u5148\u770B\u770B\u6458\u8981",I();return}x=!0,I();try{let r=await(await fetch("/api/news/article?url="+encodeURIComponent(i.url),{cache:"no-store"})).json();if(r.error)throw new Error(r.error);if(i.content=Array.isArray(r.paragraphs)?r.paragraphs.filter(Boolean):[],!i.content.length)throw new Error("empty");g()}catch{L="\u5168\u6587\u52A0\u8F7D\u5931\u8D25\uFF0C\u53EF\u67E5\u770B\u539F\u6587"}x=!1,I()}}function D(){let p=Object.fromEntries(Gt.map(i=>[i,i==="\u5168\u90E8"?s.length:s.filter(d=>d.category===i).length]));return`<div class="news-filters">
      ${Gt.map(i=>`<button class="filter-chip ${i===u?"active":""}" data-cat="${i}">${i}<em>${p[i]}</em></button>`).join("")}
    </div>`}function C(p){let i=p.content.length?p.content:p.digest?[p.digest]:[];t.innerHTML=`
      <div class="card news-reader">
        <div class="row-between news-reader-top">
          <button class="btn small ghost" id="news-back">\u2190 \u8FD4\u56DE\u8D44\u8BAF</button>
          <a class="btn small" href="${j(p.url)}" target="_blank" rel="noopener noreferrer">\u67E5\u770B\u539F\u6587</a>
        </div>
        <div class="news-meta">
          <span class="news-time">${j(bt(p.time))}</span>
          <span class="news-src">${j(p.category)} \xB7 \u4E1C\u65B9\u8D22\u5BCC</span>
        </div>
        <h2 class="news-reader-title">${j(p.title)}</h2>
        <div class="news-reader-body">
          ${x?'<p class="hint">\u6B63\u5728\u52A0\u8F7D\u5168\u6587\u2026</p>':""}
          ${!x&&i.length?i.map(d=>`<p>${j(d)}</p>`).join(""):""}
          ${!x&&!i.length?'<p class="hint">\u6682\u65E0\u6B63\u6587\uFF0C\u53EF\u70B9\u51FB\u53F3\u4E0A\u89D2\u67E5\u770B\u539F\u6587\u3002</p>':""}
          ${L?`<p class="hint news-reader-err">${j(L)}</p>`:""}
        </div>
        <p class="hint news-reader-foot">\u5185\u5BB9\u6765\u81EA\u4E1C\u65B9\u8D22\u5BCC 7\xD724 \u5FEB\u8BAF\uFF0C\u4EC5\u4F9B\u5B66\u4E60\u53C2\u8003\u3002</p>
      </div>`}function M(){let p=u==="\u5168\u90E8"?s:s.filter(d=>d.category===u),i=[];N()&&i.push(`\u66F4\u65B0\u4E8E ${N()}`),l&&i.push("\u5237\u65B0\u4E2D\u2026"),a&&i.push(a),!c&&!l&&i.push("\u7B49\u5F85\u52A0\u8F7D"),t.innerHTML=`
      <div class="card news-head">
        <div class="row-between">
          <div>
            <h2 class="card-title">\u8D22\u7ECF\u5FEB\u8BAF <span class="news-live">7\xD724</span></h2>
            <p class="hint">${j(i.join(" \xB7 "))}</p>
          </div>
          <button id="news-refresh" class="btn small" ${l?"disabled":""}>\u5237\u65B0</button>
        </div>
        ${D()}
      </div>
      ${s.length?`
        <div class="news-grid">
          ${p.map(d=>`
            <div class="card news-item" data-open="${j(d.id)}" role="button" tabindex="0">
              <div class="news-meta">
                <span class="news-time">${j(bt(d.time))}</span>
                <span class="news-src">${j(d.category)} \xB7 \u4E1C\u65B9\u8D22\u5BCC</span>
              </div>
              <h3 class="news-title">${j(d.title)}</h3>
              ${d.digest?`<p class="hint news-digest">${j(d.digest)}</p>`:""}
              <span class="news-more">\u9605\u8BFB\u5168\u6587 \u203A</span>
            </div>`).join("")}
        </div>
        ${p.length?"":'<div class="card news-empty"><p class="hint">\u8BE5\u5206\u7C7B\u6682\u65E0\u5FEB\u8BAF</p></div>'}`:`
        <div class="card news-empty">
          <div class="big-emoji">\u{1F4F0}</div>
          <p class="hint">${l?"\u6B63\u5728\u83B7\u53D6\u6700\u65B0\u5FEB\u8BAF\u2026":j(a||"\u6682\u65E0\u5FEB\u8BAF")}</p>
          ${l?"":'<button class="btn small" data-retry>\u91CD\u8BD5</button>'}
        </div>`}
    `}function I(){let p=y();h&&p?C(p):(h=null,M())}t.addEventListener("click",p=>{let i=p.target.closest("[data-cat]");if(i){u=i.getAttribute("data-cat"),h=null,I();return}let d=p.target.closest("[data-open]");if(d){f(d.getAttribute("data-open"));return}if(p.target.closest("#news-back")){h=null,I();return}(p.target.closest("#news-refresh")||p.target.closest("[data-retry]"))&&q(!0)}),t.addEventListener("keydown",p=>{if(p.key!=="Enter"&&p.key!==" ")return;let i=p.target.closest("[data-open]");i&&(p.preventDefault(),f(i.getAttribute("data-open")))}),e.addEventListener("dl:show",p=>{w=!!(p.detail&&p.detail.id==="news"),w&&q()}),setInterval(()=>{w&&!document.hidden&&q()},Ee),I(),q()}var it="dl.english.reading.",yt=/^(\d{4})-(\d{2})-(\d{2})$/,ct=(t=new Date)=>`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;function rt(t){let e=yt.exec(String(t??""));if(!e)return null;let n=Number(e[1]),s=Number(e[2])-1,c=Number(e[3]),l=Date.UTC(n,s,c),a=new Date(l);return a.getUTCFullYear()!==n||a.getUTCMonth()!==s||a.getUTCDate()!==c?null:Math.floor(l/864e5)}function ot(t){let e=new Date(Number(t)*864e5);return`${e.getUTCFullYear()}-${String(e.getUTCMonth()+1).padStart(2,"0")}-${String(e.getUTCDate()).padStart(2,"0")}`}function X(t){try{let e=JSON.parse(t);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function Vt(t,e){return!t||!e.length?0:e.filter(n=>t[n]).length}function K(t,e,n){if(!e.length)return!1;let s=t&&t[n];return!!s&&e.every(c=>s[c])}function Le(t,e,n=new Date){let s=rt(ct(n));if(s===null)return 0;let c=0,l=K(t,e,ot(s))?s:s-1;for(;K(t,e,ot(l));)c+=1,l-=1;return c}function De(t,e){if(!e.length||!t)return 0;let n=Object.keys(t).filter(a=>K(t,e,a)).map(rt).filter(a=>a!==null).sort((a,w)=>a-w),s=0,c=0,l=null;for(let a of n)c=l!==null&&a===l+1?c+1:1,c>s&&(s=c),l=a;return s}function Zt(t,e,n=new Date,s=8){let c=ct(n),l=rt(c),a=(n.getDay()+6)%7,w=l-a-(s-1)*7,u=[];for(let h=0;h<s*7;h++){let x=ot(w+h),L=Vt(t&&t[x],e);u.push({date:x,count:L,total:e.length,complete:K(t,e,x),future:x>c,today:x===c})}return{cells:u,weeks:s,start:u[0].date,end:u[u.length-1].date}}function qe(t,e,n=new Date){let s=rt(ct(n)),c=0,l=0;for(let a=6;a>=0;a--){let w=Vt(t&&t[ot(s-a)],e);c+=w,e.length&&w===e.length&&(l+=1)}return{done:c,total:7*e.length,completeDays:l}}function Ae(t,e=0){let n=[0,0,0,0,0,0];for(let c of Object.values(t||{})){let l=c&&Number(c.box),a=Number.isInteger(l)&&l>=1&&l<=5?l:1;n[a]+=1}let s=n.slice(1).reduce((c,l)=>c+l,0);return n[0]=Math.max(0,(Number(e)||0)-s),{counts:n,learned:s,mastered:n[5],fresh:n[0]}}function Ie(t,e=new Date){let n=ct(e);return Object.values(t||{}).filter(s=>s&&typeof s.due=="string"&&yt.test(s.due)&&s.due<=n).length}function te(t){let e=new Set;for(let n of t||[]){if(typeof n!="string"||!n.startsWith(it))continue;let s=n.slice(it.length);yt.test(s)&&e.add(s)}return e.size}function ee(t,e=new Date){let{log:n={},taskIds:s=[],progress:c={},bankTotal:l=0,lessonsDone:a=0,lessonsTotal:w=0,readingDays:u=0}=t||{},h=Ae(c,l),x=qe(n,s,e);return{totalDays:Object.keys(n||{}).filter(g=>K(n,s,g)).length,currentStreak:Le(n,s,e),maxStreak:De(n,s),weekDone:x.done,weekTotal:x.total,weekCompleteDays:x.completeDays,weekRate:x.total?Math.round(x.done/x.total*100):0,learned:h.learned,mastered:h.mastered,fresh:h.fresh,boxes:h.counts,dueToday:Ie(c,e),readingDays:u,lessonsDone:Math.max(0,Number(a)||0),lessonsTotal:Math.max(0,Number(w)||0),bankTotal:Math.max(0,Number(l)||0)}}var Te=[{id:"first_day",icon:"\u{1F331}",title:"\u542F\u7A0B",desc:"\u5B8C\u6210\u7B2C 1 \u5929\u5168\u90E8\u4EFB\u52A1",metric:"totalDays",target:1},{id:"streak3",icon:"\u{1F525}",title:"\u5C0F\u6709\u575A\u6301",desc:"\u8FDE\u7EED\u6253\u5361 3 \u5929",metric:"maxStreak",target:3},{id:"streak7",icon:"\u26A1",title:"\u4E00\u5468\u4E0D\u65AD",desc:"\u8FDE\u7EED\u6253\u5361 7 \u5929",metric:"maxStreak",target:7},{id:"streak30",icon:"\u{1F3C6}",title:"\u4E60\u60EF\u6210\u81EA\u7136",desc:"\u8FDE\u7EED\u6253\u5361 30 \u5929",metric:"maxStreak",target:30},{id:"words10",icon:"\u{1F4DA}",title:"\u8BCD\u6C47\u8D77\u6B65",desc:"\u5B66\u8FC7 10 \u4E2A\u5355\u8BCD",metric:"learned",target:10},{id:"words50",icon:"\u{1F9E0}",title:"\u8BCD\u6C47\u8FDB\u9636",desc:"\u5B66\u8FC7 50 \u4E2A\u5355\u8BCD",metric:"learned",target:50},{id:"master20",icon:"\u{1F393}",title:"\u878D\u4F1A\u8D2F\u901A",desc:"20 \u4E2A\u5355\u8BCD\u8FDB\u5165\u7B2C 5 \u76D2",metric:"mastered",target:20},{id:"read5",icon:"\u{1F4F0}",title:"\u9605\u8BFB\u6210\u4E60",desc:"\u8BFB\u5B8C 5 \u7BC7\u53CC\u8BED\u77ED\u6587",metric:"readingDays",target:5},{id:"lessons8",icon:"\u{1F4C8}",title:"\u6295\u8D44\u5165\u95E8",desc:"\u5B66\u5B8C 8 \u8282\u80A1\u7968\u8BFE\u7A0B",metric:"lessonsDone",target:8}];function ne(t){return Te.map(e=>{let n=Number(t&&t[e.metric])||0,s=Math.min(n,e.target);return{...e,cur:s,unlocked:n>=e.target}})}var se=["english_words","english_reading","stock_review"],je=["\u672A\u5B66","1 \u5929","2 \u5929","4 \u5929","7 \u5929","15 \u5929"];async function ae(t,e){let[n,s]=await Promise.all([fetch("/english/data/wordbank.json").then(a=>a.json()),fetch("/stock/lessons.json").then(a=>a.json()).then(a=>a.lessons)]);function c(){let a=X(localStorage.getItem("dl.habit.log")),w=X(localStorage.getItem("dl.english.progress")),u=X(localStorage.getItem("dl.stock.lessonsDone")),h=s.filter(L=>u[L.id]).length,x=te(Object.keys(localStorage).filter(L=>L.startsWith(it)&&localStorage.getItem(L)));return ee({log:a,taskIds:se,progress:w,bankTotal:n.length,lessonsDone:h,lessonsTotal:s.length,readingDays:x},new Date)}function l(){let a=c(),w=Zt(X(localStorage.getItem("dl.habit.log")),se,new Date,8),u=ne(a),h=u.filter(y=>y.unlocked).length,x=a.bankTotal?Math.round(a.learned/a.bankTotal*100):0,L=a.boxes.slice(1),g=Math.max(...L,1),N=a.totalDays===0&&a.learned===0;t.innerHTML=`
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
          <span class="hint">${w.start.slice(5)} ~ ${w.end.slice(5)}</span>
        </div>
        <div class="heat-wrap">
          <div class="heat-grid" role="img" aria-label="\u6700\u8FD1 8 \u5468\u6253\u5361\u65E5\u5386">
            ${["\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D","\u65E5"].map((y,q)=>`<span class="hw" style="grid-column:1;grid-row:${q+1}">${y}</span>`).join("")}
            ${w.cells.map((y,q)=>{let f=Math.floor(q/7),D=q%7,C=y.future?"future":"lv-"+y.count,M=y.future?"\u672A\u5230":y.complete?"\u5DF2\u5B8C\u6210":`\u5B8C\u6210 ${y.count}/${y.total}`;return`<i class="heat-cell ${C} ${y.today?"today":""}"
                style="grid-column:${f+2};grid-row:${D+1}" title="${y.date} \xB7 ${M}"></i>`}).join("")}
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
        <div class="progress-track"><div class="progress-fill" style="width:${x}%"></div></div>
        <p class="hint box-cap">\u6309\u590D\u4E60\u95F4\u9694\uFF08\u76D2\uFF09\u5206\u5E03</p>
        <div class="box-bars">
          ${L.map((y,q)=>{let f=q+1;return`
            <div class="box-row">
              <span class="box-name">${je[f]}</span>
              <div class="box-track"><i class="box-fill b${f}" style="width:${y/g*100}%"></i></div>
              <b>${y}</b>
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
          ${u.map(y=>`
            <div class="ach ${y.unlocked?"unlocked":""}">
              <div class="ach-top">
                <span class="ach-icon">${y.icon}</span>
                <span class="ach-state">${y.unlocked?"\u2713":`${y.cur}/${y.target}`}</span>
              </div>
              <b>${y.title}</b>
              <span class="hint">${y.desc}</span>
              <div class="progress-track sm">
                <div class="progress-fill" style="width:${Math.round(y.cur/y.target*100)}%"></div>
              </div>
            </div>`).join("")}
        </div>
      </div>
    `}e.addEventListener("dl:task",l),e.addEventListener("dl:show",a=>{a.detail&&a.detail.id==="stats"&&l()}),l()}var ie="dl.";function oe(t){let e={};for(let n=0;n<t.length;n++){let s=t.key(n);s&&s.startsWith(ie)&&(e[s]=t.getItem(s))}return{app:"daily-learn",version:1,exportedAt:new Date().toISOString(),data:e}}function ce(t,e){if(!t||t.app!=="daily-learn"||typeof t.data!="object"||t.data===null)throw new Error("\u4E0D\u662F\u6709\u6548\u7684\u6BCF\u65E5\u8FDB\u5316\u5907\u4EFD\u6587\u4EF6");let n=Object.keys(t.data).filter(s=>s.startsWith(ie)&&typeof t.data[s]=="string");return n.forEach(s=>e.setItem(s,t.data[s])),n.length}var re="2.1.0";var dt=new EventTarget,St=[{id:"today",init:Ct},{id:"stock",init:Ot},{id:"english",init:Wt},{id:"news",init:Qt},{id:"stats",init:ae}],le=document.getElementById("view"),V={};St.forEach(t=>{let e=document.createElement("div");e.className="pane hidden",e.id=`pane-${t.id}`,le.appendChild(e),V[t.id]=e});var xt=document.createElement("footer");xt.className="app-footer";xt.innerHTML=`
  <span>\u6BCF\u65E5\u8FDB\u5316 \xB7 \u82F1\u8BED \xD7 \u80A1\u7968</span>
  <span class="footer-tag">\u6BCF\u5929\u4E00\u70B9\u70B9\uFF0C\u957F\u671F\u4E3B\u4E49</span>
  <span class="footer-version">v${re}</span>`;le.appendChild(xt);function Et(t){St.forEach(e=>V[e.id].classList.toggle("hidden",e.id!==t)),document.querySelectorAll(".tabbar button[data-tab]").forEach(e=>e.classList.toggle("active",e.getAttribute("data-tab")===t)),dt.dispatchEvent(new CustomEvent("dl:show",{detail:{id:t}}))}document.querySelectorAll(".tabbar button[data-tab]").forEach(t=>t.addEventListener("click",()=>Et(t.getAttribute("data-tab"))));dt.addEventListener("dl:nav",t=>{let e=t.detail&&t.detail.tab;e&&V[e]&&Et(e)});var Ce=t=>e=>{V[t.id].innerHTML=`<div class="card"><p class="hint">\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF1A${e&&e.message||e}</p></div>`};St.forEach(t=>{Promise.resolve().then(()=>t.init(V[t.id],dt)).catch(Ce(t))});Et("today");var lt=new Date,Me=`${lt.getMonth()+1}\u6708${lt.getDate()}\u65E5 \u5468${"\u65E5\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D"[lt.getDay()]}`;document.querySelectorAll(".js-date").forEach(t=>{t.textContent=Me});var G=lt.getHours(),Ne=G<5?"\u591C\u6DF1\u4E86\uFF0C":G<9?"\u65E9\u4E0A\u597D\uFF0C":G<12?"\u4E0A\u5348\u597D\uFF0C":G<14?"\u4E2D\u5348\u597D\uFF0C":G<18?"\u4E0B\u5348\u597D\uFF0C":"\u665A\u4E0A\u597D\uFF0C";document.querySelectorAll(".js-greet").forEach(t=>{t.textContent=Ne});var Oe=["english_words","english_reading","stock_review"];function de(){let t=st(at(localStorage.getItem("dl.habit.log")),Oe);document.querySelectorAll(".js-streak").forEach(e=>{e.textContent=`\u{1F525} ${t} \u5929`,e.classList.toggle("lit",t>0)})}de();dt.addEventListener("dl:task",de);var Q=document.getElementById("guide-dialog");document.querySelectorAll(".js-guide-btn").forEach(t=>t.addEventListener("click",()=>Q.showModal()));document.getElementById("guide-close").addEventListener("click",()=>Q.close());Q.addEventListener("click",t=>{t.target===Q&&Q.close()});var U=document.getElementById("install-dialog"),ue=document.getElementById("install-url"),W=document.getElementById("install-msg"),pe=location.origin+location.pathname.replace(/index\.html$/i,""),H=null;window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),H=t});window.addEventListener("appinstalled",()=>{H=null,W&&(W.textContent="\u2705 \u5DF2\u5B89\u88C5\u5230\u4E3B\u5C4F\u5E55")});function _e(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}async function ze(){if(ue.value=pe,W.textContent="",_e()){W.textContent="\u5DF2\u7ECF\u5728 App \u6A21\u5F0F\u4E0B\u8FD0\u884C\uFF0C\u65E0\u9700\u91CD\u590D\u5B89\u88C5\u3002",U.showModal();return}if(H){H.prompt();try{let{outcome:t}=await H.userChoice;if(t==="accepted")return}catch{}H=null}U.showModal()}document.querySelectorAll(".js-install-btn").forEach(t=>t.addEventListener("click",ze));document.getElementById("install-close").addEventListener("click",()=>U.close());U.addEventListener("click",t=>{t.target===U&&U.close()});document.getElementById("install-copy").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(pe),W.textContent="\u2705 \u94FE\u63A5\u5DF2\u590D\u5236\uFF0C\u53D1\u5230\u624B\u673A\u6D4F\u89C8\u5668\u6253\u5F00"}catch{ue.select(),document.execCommand("copy"),W.textContent="\u2705 \u94FE\u63A5\u5DF2\u590D\u5236"}});var kt=document.getElementById("data-msg");document.getElementById("data-export").addEventListener("click",()=>{let t=oe(localStorage),e=Object.keys(t.data).length,n=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),s=document.createElement("a");s.href=URL.createObjectURL(n),s.download=`daily-learn-backup-${new Date().toISOString().slice(0,10)}.json`,s.click(),URL.revokeObjectURL(s.href),kt.textContent=`\u2705 \u5DF2\u5BFC\u51FA ${e} \u9879\u8BB0\u5F55`});document.getElementById("data-import-btn").addEventListener("click",()=>{document.getElementById("data-import-file").click()});document.getElementById("data-import-file").addEventListener("change",async t=>{let e=t.target.files[0];if(t.target.value="",!!e)try{let n=JSON.parse(await e.text()),s=ce(n,localStorage);kt.textContent=`\u2705 \u5DF2\u5BFC\u5165 ${s} \u9879\u8BB0\u5F55\uFF0C\u6B63\u5728\u5237\u65B0\u9875\u9762\u2026`,setTimeout(()=>location.reload(),800)}catch(n){kt.textContent=`\u274C \u5BFC\u5165\u5931\u8D25\uFF1A${n&&n.message||n}`}});})();

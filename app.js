(()=>{var G=t=>`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;function ct(t,e=new Date){let s=new Date(e);return s.setDate(s.getDate()+t),G(s)}function X(t,e,s){let n=t&&t[s];return!!n&&e.every(i=>n[i])}function Q(t,e,s=new Date){let n=X(t,e,G(s))?0:-1,i=0;for(;X(t,e,ct(n,s));)i+=1,n-=1;return i}function V(t){try{let e=JSON.parse(t);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}var xt=[{id:"english_words",icon:"\u{1F4D6}",label:"\u80CC\u5B8C\u4ECA\u65E5\u5355\u8BCD",how:"\u5728\u300C\u82F1\u8BED\u300D\u9875\u5B8C\u6210\u65B0\u8BCD\u4E0E\u590D\u4E60",tab:"english"},{id:"english_reading",icon:"\u{1F4F0}",label:"\u8BFB\u5B8C\u4E00\u7BC7\u53CC\u8BED\u77ED\u6587",how:"\u5728\u300C\u82F1\u8BED\u300D\u9875\u6807\u8BB0\u5DF2\u8BFB",tab:"english"},{id:"stock_review",icon:"\u{1F4C8}",label:"\u590D\u76D8\u81EA\u9009\u80A1",how:"\u5728\u300C\u80A1\u7968\u300D\u9875\u5237\u65B0\u884C\u60C5",tab:"stock"}],kt="dl.habit.log",M=xt.map(t=>t.id),te=[{icon:"\u2328\uFE0F",title:"\u952E\u76D8\u64CD\u4F5C",desc:"\u80CC\u5355\u8BCD\u65F6\uFF1A\u7A7A\u683C\u7FFB\u9762\uFF0C1 \u53C8\u5FD8\u4E86\uFF0C2 \u8BB0\u4F4F\u4E86",tone:"tone-blue"},{icon:"\u{1F50A}",title:"\u70B9\u5587\u53ED\u542C\u53D1\u97F3",desc:"\u5355\u8BCD\u3001\u642D\u914D\u3001\u91D1\u53E5\u548C\u8BCD\u6C47\u8868\u90FD\u652F\u6301\u6717\u8BFB",tone:"tone-green"},{icon:"\u{1F4BE}",title:"\u6362\u8BBE\u5907\u5148\u5907\u4EFD",desc:"\u300C\u4F7F\u7528\u6559\u7A0B\u300D\u2192 \u5BFC\u51FA\u5907\u4EFD\uFF0C\u53EF\u8FC1\u79FB\u5230\u65B0\u8BBE\u5907",tone:"tone-amber"}],St=()=>G(new Date),ee=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5);async function Et(t,e){let s=V(localStorage.getItem(kt)),n=null;try{let v=(await fetch("/english/content/quotes.json").then(k=>k.json())).quotes||[];v.length&&(n=v[ee()%v.length])}catch{}i(),u(),e.addEventListener("dl:task",()=>{i(),u(),a()});function i(){let r=St(),v=s[r]||(s[r]={});localStorage.getItem(`dl.english.wordsDone.${r}`)==="1"&&(v.english_words=1),localStorage.getItem(`dl.english.reading.${r}`)&&(v.english_reading=1),localStorage.getItem(`dl.stock.review.${r}`)==="1"&&(v.stock_review=1)}function u(){let r=Object.keys(s).sort().slice(-60);s=Object.fromEntries(r.map(v=>[v,s[v]])),localStorage.setItem(kt,JSON.stringify(s))}function a(){let r=St(),v=M.filter(g=>s[r]&&s[r][g]),k=Q(s,M),S=[...Array(7)].map((g,E)=>{let A=ct(E-6),I=s[A]||{},N=M.filter(l=>I[l]).length;return{d:A,count:N,done:N===M.length,today:A===r}}),f=S.reduce((g,E)=>g+E.count,0),j=S.filter(g=>g.done).length,b=226,q=b*(1-v.length/M.length);t.innerHTML=`
      <div class="card streak-card">
        <div class="streak-row">
          <div class="ring-wrap">
            <svg class="ring" viewBox="0 0 84 84">
              <circle class="ring-bg" cx="42" cy="42" r="36"></circle>
              <circle class="ring-fg" cx="42" cy="42" r="36"
                stroke-dasharray="${b}" stroke-dashoffset="${q}"></circle>
            </svg>
            <div class="ring-label"><b>${v.length}</b>/${M.length}</div>
          </div>
          <div class="streak-info">
            <p class="hint">\u8FDE\u7EED\u5168\u90E8\u5B8C\u6210</p>
            <div class="streak-num">\u{1F525} ${k} <small>\u5929</small></div>
            <p class="hint">${X(s,M,r)?"\u4ECA\u65E5\u6253\u5361\u5B8C\u6210 \u{1F389}":`\u8FD8\u5DEE ${M.length-v.length} \u9879\u5B8C\u6210\u6253\u5361`}</p>
          </div>
        </div>
        <div class="week-strip">
          ${S.map(g=>`<div class="wd ${g.done?"done":""} ${g.today?"today":""}" title="${g.d}">${Number(g.d.slice(8))}<i></i></div>`).join("")}
        </div>
      </div>
      <div class="card tasks-card">
        <h2 class="card-title">\u4ECA\u65E5\u4EFB\u52A1</h2>
        ${xt.map(g=>{let E=s[r]&&s[r][g.id];return`
            <div class="habit-task ${E?"done":""}" ${E?"":`data-goto="${g.tab}" role="button" tabindex="0"`}>
              <span class="dot ${E?"done":""}">${E?"\u2713":""}</span>
              <div class="task-text"><b>${g.icon} ${g.label}</b><span class="hint">${g.how}</span></div>
              <span class="tag ${E?"done":""}">${E?"\u5DF2\u5B8C\u6210":"\u5F85\u5B8C\u6210"}</span>
              ${E?"":'<span class="task-chevron" aria-hidden="true">\u203A</span>'}
            </div>`}).join("")}
      </div>
      <div class="card tips-card">
        <h2 class="card-title">\u5C0F\u8D34\u58EB</h2>
        ${te.map(g=>`
          <div class="tip-row">
            <span class="tip-ico ${g.tone}">${g.icon}</span>
            <div><b>${g.title}</b><span class="hint">${g.desc}</span></div>
          </div>`).join("")}
      </div>
      <div class="card week-card">
        <div class="row-between">
          <h2 class="card-title">\u672C\u5468\u8282\u594F</h2>
          <button class="btn small ghost week-more" data-stats>\u5B8C\u6574\u7EDF\u8BA1 \u203A</button>
        </div>
        <div class="week-bars">
          ${S.map(g=>{let E="\u65E5\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D"[new Date(g.d+"T00:00:00").getDay()];return`<div class="week-bar ${g.today?"today":""}" title="${g.d} \xB7 \u5B8C\u6210 ${g.count}/3">
              <div class="week-track"><i class="week-fill lv-${g.count}" style="height:${g.count/M.length*100}%"></i></div>
              <span>${E}</span>
            </div>`}).join("")}
        </div>
        <p class="hint">\u672C\u5468\u5B8C\u6210 ${f}/${7*M.length} \u9879 \xB7 ${j}/7 \u5929\u5168\u52E4</p>
      </div>
      ${n?`
      <div class="card today-quote">
        <div class="today-quote-mark" aria-hidden="true">\u201C</div>
        <p class="today-quote-en">${n.en}</p>
        <p class="today-quote-zh">${n.zh}</p>
        <p class="hint">\u2014\u2014 ${n.who}</p>
      </div>`:""}
      <p class="hint footnote">\u4E09\u9879\u5168\u90E8\u5B8C\u6210\u5373\u89C6\u4E3A\u5F53\u65E5\u6253\u5361\u6210\u529F\uFF1B\u70B9\u51FB\u5F85\u5B8C\u6210\u4EFB\u52A1\u53EF\u76F4\u63A5\u8DF3\u8F6C\u3002</p>
    `}function w(r){let v=r.closest(".habit-task[data-goto]");v&&e.dispatchEvent(new CustomEvent("dl:nav",{detail:{tab:v.getAttribute("data-goto")}}))}t.addEventListener("click",r=>{if(r.target.closest("[data-stats]")){e.dispatchEvent(new CustomEvent("dl:nav",{detail:{tab:"stats"}}));return}w(r.target)}),t.addEventListener("keydown",r=>{r.key!=="Enter"&&r.key!==" "||!r.target.closest(".habit-task[data-goto]")||(r.preventDefault(),w(r.target))}),a()}var lt=/^(sh|sz)\d{6}$/;function Lt(t,e){try{let s=JSON.parse(t);if(Array.isArray(s)){let n=[...new Set(s.filter(i=>typeof i=="string"&&lt.test(i)))];if(n.length)return n}}catch{}return[...e]}var rt="dl.stock.watchlist",qt="dl.stock.lessonsDone",se=["sh600519","sz300750","sz002594","sh601318","sz000858","sh600036"],ne=()=>{let t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`};async function Dt(t,e){let{lessons:s}=await fetch("/stock/lessons.json").then(c=>c.json()),n=Lt(localStorage.getItem(rt),se),i=[],u="quotes",a=null,w={},r=null,v={},k=null;t.innerHTML=`
    <div class="subnav">
      <button data-view="quotes">\u81EA\u9009\u884C\u60C5</button>
      <button data-view="lessons">\u5165\u95E8\u6559\u7A0B</button>
    </div>
    <div id="st-body"></div>
  `;let S=t.querySelector("#st-body"),f=t.querySelector(".subnav");function j(){localStorage.setItem(rt,JSON.stringify(n))}localStorage.getItem(rt)===null&&j();function b(){try{return JSON.parse(localStorage.getItem(qt)||"{}")}catch{return{}}}function q(c){localStorage.setItem(qt,JSON.stringify(c))}function g(){localStorage.setItem(`dl.stock.review.${ne()}`,"1"),e.dispatchEvent(new CustomEvent("dl:task",{detail:{id:"stock_review"}}))}function E(){let c=new Date,m=c.getDay();if(m===0||m===6)return!1;let x=c.getHours()*60+c.getMinutes();return x>=9*60+15&&x<=15*60+5}setInterval(()=>{u!=="quotes"||document.hidden||typeof k!="function"||E()&&k()},6e4);function A(){f.querySelectorAll("button").forEach(c=>c.classList.toggle("active",c.getAttribute("data-view")===u)),u==="quotes"?I():N()}function I(){S.innerHTML=`
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
    `;let c=o=>S.querySelector(o);function m(){let o=i.filter(h=>h.changePct>0).length,p=i.filter(h=>h.changePct<0).length,y=i.length-o-p;c("#st-summary").innerHTML=i.length?`<span class="chip up-chip">\u6DA8 ${o}</span><span class="chip flat-chip">\u5E73 ${y}</span><span class="chip down-chip">\u8DCC ${p}</span>`:"",c("#st-list").innerHTML=i.length?'<div class="q-head"><span>\u80A1\u7968</span><span>\u6700\u65B0\u4EF7</span><span>\u6DA8\u8DCC</span><span></span></div>'+i.map(h=>{let L=h.changePct>0?"up":h.changePct<0?"down":"flat",B=h.changePct==null?"--":`${h.changePct>0?"+":""}${h.changePct.toFixed(2)}%`,J=h.change==null?"--":`${h.change>0?"+":""}${h.change.toFixed(2)}`,F=r===h.code,O=v[h.code],it=F?O&&O.length?x(O):'<p class="hint k-err">K\u7EBF\u83B7\u53D6\u5931\u8D25\uFF0C\u7A0D\u540E\u70B9\u51FB\u91CD\u8BD5</p>':"";return`
              <div class="quote-row ${F?"expanded":""}" data-code="${h.code}">
                <div class="q-name"><b>${h.name}</b><span class="hint">${h.code}</span></div>
                <div class="q-price ${L}">${h.price==null?"\u505C\u724C":h.price.toFixed(2)}</div>
                <div class="q-chg"><span class="pill ${L}">${B}</span><span class="hint">${J}</span></div>
                <button class="q-del" title="\u5220\u9664" data-del="${h.code}">\xD7</button>
              </div>${F?`<div class="k-card">${it}</div>`:""}`}).join(""):'<p class="hint">\u6682\u65E0\u81EA\u9009\u80A1\uFF0C\u8BF7\u5728\u4E0B\u65B9\u6DFB\u52A0\uFF08\u5982 sh600519\uFF09\u3002</p>',c("#st-meta").textContent=i.length?`\u66F4\u65B0\u4E8E ${new Date(i[0].serverTime).toLocaleTimeString("zh-CN")}${E()?" \xB7 \u4EA4\u6613\u65F6\u6BB5\u81EA\u52A8\u5237\u65B0":""}`:"\u6DFB\u52A0\u81EA\u9009\u80A1\u540E\u70B9\u51FB\u5237\u65B0"}function x(o){let p=o.map(C=>C.close),y=360,h=130,L=12,B=Math.min(...p),J=Math.max(...p),F=J-B||1,O=C=>L+C*(y-2*L)/Math.max(p.length-1,1),it=C=>h-L-(C-B)/F*(h-2*L),bt=p.map((C,yt)=>`${yt?"L":"M"}${O(yt).toFixed(1)} ${it(C).toFixed(1)}`).join(" "),Qt=`${bt} L ${O(p.length-1).toFixed(1)} ${h-L} L ${L} ${h-L} Z`,_=(p[p.length-1]-p[0])/p[0]*100,Vt=_>0?"up":_<0?"down":"flat",Y=_>0?"#e03131":_<0?"#2f9e44":"#8a93a6",$t="kg"+Math.random().toString(36).slice(2,8),wt=O(p.length-1).toFixed(1),Zt=[.25,.5,.75].map(C=>`<line x1="${L}" y1="${(h-L-C*(h-2*L)).toFixed(1)}"
           x2="${y-L}" y2="${(h-L-C*(h-2*L)).toFixed(1)}"></line>`).join("");return`
        <div class="row-between k-meta">
          <span class="hint">\u8FD1 ${o.length} \u65E5\u6536\u76D8\u4EF7</span>
          <span class="hint k-range" title="${o[0].date} ~ ${o[o.length-1].date}">${o[0].date.slice(5)} ~ ${o[o.length-1].date.slice(5)}</span>
        </div>
        <svg class="kchart" viewBox="0 0 ${y} ${h}" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="${$t}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${Y}" stop-opacity=".22"/>
              <stop offset="1" stop-color="${Y}" stop-opacity=".02"/>
            </linearGradient>
          </defs>
          <g class="k-grid">${Zt}</g>
          <path d="${Qt}" fill="url(#${$t})"></path>
          <path d="${bt}" fill="none" stroke="${Y}" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"></path>
          <line class="k-lastline" x1="${wt}" y1="${L}" x2="${wt}" y2="${h-L}" stroke="${Y}"></line>
        </svg>
        <div class="row-between k-meta k-meta-bottom">
          <span class="${Vt} k-pct">\u533A\u95F4 ${_>0?"+":""}${_.toFixed(2)}%</span>
          <span class="hint">\u6700\u4F4E ${B.toFixed(2)} \xB7 \u6700\u9AD8 ${J.toFixed(2)}</span>
        </div>`}function d(o,p=1e4){let y=new AbortController,h=setTimeout(()=>y.abort(),p);return fetch(o,{signal:y.signal}).finally(()=>clearTimeout(h))}async function D(o){let p=n.find(y=>y.endsWith(o))||o;try{let y=await d(`/api/kline?code=${encodeURIComponent(p)}&days=30`).then(h=>h.json());v[o]=Array.isArray(y)&&y.length?y:[]}catch{v[o]=[]}}async function T(){c("#st-meta").textContent="\u5237\u65B0\u4E2D\u2026";try{let p=await(await d("/api/quotes?codes="+encodeURIComponent(n.join(",")))).json();if(p.error)throw new Error(p.error);i=p,m(),g()}catch(o){c("#st-meta").textContent=`\u884C\u60C5\u83B7\u53D6\u5931\u8D25\uFF1A${o.message==="The user aborted a request."?"\u8BF7\u6C42\u8D85\u65F6":o.message}\uFF08\u8BF7\u68C0\u67E5\u7F51\u7EDC\uFF09`}}c("#st-refresh").addEventListener("click",T),c("#st-list").addEventListener("click",async o=>{if(o.target.closest(".q-del")){let h=o.target.getAttribute("data-del");if(!h)return;n=n.filter(L=>L!==h&&!L.endsWith(h)),i=i.filter(L=>L.code!==h),r===h&&(r=null),j(),m();return}let p=o.target.closest(".quote-row");if(!p)return;let y=p.getAttribute("data-code");if(y){if(r===y){r=null,m();return}r=y,v[y]||(m(),await D(y)),m()}}),c("#st-add").addEventListener("click",()=>{let o=c("#st-code"),p=o.value.trim().toLowerCase();if(!lt.test(p)){o.value="",o.placeholder="\u683C\u5F0F\uFF1Ash600519 \u6216 sz300750";return}n.includes(p)||(n.push(p),j(),T()),o.value=""}),k=T,T()}function N(){if(a!==null)return l();let c=b(),m=s.filter(d=>c[d.id]).length,x=s.find(d=>!c[d.id]);S.innerHTML=`
      <div class="card lesson-list">
        <div class="row-between">
          <h2 class="card-title">\u80A1\u7968\u5165\u95E8 \xB7 \u96F6\u57FA\u7840 8 \u8BFE</h2>
          <span class="tag ${m===s.length?"done":""}">${m}/${s.length} \u5DF2\u5B66</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${m/s.length*100}%"></div></div>
        <p class="hint lesson-intro">\u6BCF\u8BFE\u7EA6 3-5 \u5206\u949F\uFF1A\u6B63\u6587 \u2192 \u8981\u70B9 \u2192 \u5C0F\u6D4B\u9A8C\u3002${x?"\u5EFA\u8BAE\u4ECE\u300C\u7EE7\u7EED\u5B66\u300D\u5F00\u59CB\u3002":"\u5168\u90E8\u5B66\u5B8C\uFF0C\u6BD5\u4E1A\uFF01\u{1F393}"}</p>
        ${s.map((d,D)=>`
          <div class="lesson-item" data-lesson="${d.id}">
            <div class="lesson-row">
              <span class="num ${c[d.id]?"done":""}">${c[d.id]?"\u2713":D+1}</span>
              <div class="lesson-text">
                <b>${d.title}</b>
                <span class="hint">\u7EA6 ${d.minutes} \u5206\u949F \xB7 ${d.quiz.length} \u9898\u5C0F\u6D4B\u9A8C</span>
              </div>
              <span class="tag ${d===x?"rec":c[d.id]?"done":""}">${d===x?"\u7EE7\u7EED\u5B66":c[d.id]?"\u5DF2\u5B66\u5B8C":"\u672A\u5B66"}</span>
            </div>
          </div>`).join("")}
      </div>
    `,S.querySelectorAll(".lesson-item").forEach(d=>d.addEventListener("click",()=>{a=d.getAttribute("data-lesson"),w={},N()}))}function l(){let c=s.find(d=>d.id===a),x=!!b()[c.id];S.innerHTML=`
      <div class="card">
        <button class="btn small ghost" id="ls-back">\u2190 \u8FD4\u56DE\u8BFE\u7A0B\u5217\u8868</button>
        <h2 class="lesson-title">${c.title}</h2>
        <p class="hint">\u7B2C ${s.indexOf(c)+1} \u8BFE \xB7 \u7EA6 ${c.minutes} \u5206\u949F</p>
        ${c.sections.map(d=>`<div class="lesson-sec"><h4>${d.h}</h4><p>${d.p}</p></div>`).join("")}
        <div class="points-box">
          <h4>\u{1F3AF} \u672C\u8BFE\u8981\u70B9</h4>
          <ul>${c.points.map(d=>`<li>${d}</li>`).join("")}</ul>
        </div>
      </div>
      <div class="card">
        <h3 class="quiz-head">\u270F\uFE0F \u5C0F\u6D4B\u9A8C\uFF08${c.quiz.length} \u9898\uFF09</h3>
        ${c.quiz.map((d,D)=>$(d,D)).join("")}
      </div>
      <div class="card center finish-card">
        <button class="btn primary" id="ls-done" ${x?"disabled":""}>${x?"\u672C\u8BFE\u5DF2\u5B66\u5B8C \u2713":"\u6807\u8BB0\u5B66\u5B8C\u8FD9\u8BFE"}</button>
      </div>
    `,S.querySelector("#ls-back").addEventListener("click",()=>{a=null,N()}),S.querySelector("#ls-done").addEventListener("click",()=>{let d=b();d[c.id]=1,q(d),a=null,N()}),S.querySelectorAll(".opt").forEach(d=>d.addEventListener("click",()=>{let D=Number(d.getAttribute("data-q"));if(w[D]!==void 0)return;let T=c.quiz[D],o=Number(d.getAttribute("data-opt"));w[D]=o;let p=S.querySelector(`.quiz-q[data-qi="${D}"]`);p.querySelectorAll(".opt").forEach(y=>{let h=Number(y.getAttribute("data-opt"));h===T.a?y.classList.add("correct"):h===o&&y.classList.add("wrong"),y.classList.add("locked")}),p.querySelector(".explain").classList.remove("hidden")}))}function $(c,m){return`
      <div class="quiz-q" data-qi="${m}">
        <p class="quiz-title">${m+1}. ${c.q}</p>
        ${c.options.map((x,d)=>`<button class="opt" data-q="${m}" data-opt="${d}">${"ABCD"[d]}. ${x}</button>`).join("")}
        <div class="explain hidden">\u{1F4A1} ${c.explain}</div>
      </div>`}f.addEventListener("click",c=>{let m=c.target.getAttribute("data-view");m&&(u=m,m==="lessons"&&(a=null),A())}),A()}var Tt=[1,2,4,7,15],dt=Tt.length;function ae(t){return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}function At(t,e,s=new Date){let n=e?Math.min(t+1,dt):1,i=new Date(s);return i.setDate(i.getDate()+Tt[n-1]),{box:n,due:ae(i)}}function jt(t){try{let e=JSON.parse(t);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function It(t,e,s,n=10){let i=e.filter(a=>t[a.w]&&t[a.w].due<=s).sort((a,w)=>t[a.w].due<t[w.w].due?-1:1).map(a=>a.w),u=e.filter(a=>!t[a.w]).slice(0,n).map(a=>a.w);return{date:s,queue:[...i,...u],idx:0}}function ut(t){let e=/^(.+?)\s+([\u4e00-\u9fff].*)$/.exec(t);return e?{en:e[1],zh:e[2]}:{en:t,zh:""}}var Ct="dl.english.progress",Mt="dl.english.today",oe=10,R=()=>{let t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`},Nt=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5),Z=null,Ot=null;function pt(t){let e=document.getElementById("dl-toast");e||(e=document.createElement("div"),e.id="dl-toast",e.className="app-toast",document.body.appendChild(e)),e.textContent=t,e.classList.add("show"),clearTimeout(Ot),Ot=setTimeout(()=>e.classList.remove("show"),2400)}function ie(){if(!window.speechSynthesis)return null;let e=(speechSynthesis.getVoices()||[]).filter(s=>/^en([-_]|$)/i.test(s.lang));return e.find(s=>/google|samantha|karen|daniel|microsoft.*english/i.test(s.name))||e[0]||null}function zt(t){if(!("speechSynthesis"in window)||typeof SpeechSynthesisUtterance>"u"){pt("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u6717\u8BFB");return}try{speechSynthesis.cancel();let e=new SpeechSynthesisUtterance(t);e.lang="en-US",e.rate=.9,e.pitch=1;let s=ie();s&&(e.voice=s),e.onerror=()=>pt("\u6717\u8BFB\u5931\u8D25\uFF1A\u8BF7\u68C0\u67E5\u7F51\u7EDC\u6216\u7CFB\u7EDF\u8BED\u97F3"),speechSynthesis.speak(e)}catch{pt("\u6717\u8BFB\u5931\u8D25\uFF1A\u8BF7\u68C0\u67E5\u7F51\u7EDC\u6216\u7CFB\u7EDF\u8BED\u97F3")}}function z(t){let e=String(t||"").trim();if(e){if(navigator.onLine!==!1)try{Z&&(Z.pause(),Z=null);let s=new Audio("https://dict.youdao.com/dictvoice?audio="+encodeURIComponent(e)+"&type=2");Z=s;let n=s.play();n&&typeof n.catch=="function"&&n.catch(()=>zt(e));return}catch{}zt(e)}}async function ce(t){try{return await navigator.clipboard.writeText(t),!0}catch{}try{let e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();let s=document.execCommand("copy");return e.remove(),s}catch{return!1}}async function _t(t,e){let[s,n,i]=await Promise.all([fetch("/english/data/wordbank.json").then(l=>l.json()),fetch("/english/content/articles.json").then(l=>l.json()).then(l=>l.articles),fetch("/english/content/quotes.json").then(l=>l.json()).then(l=>l.quotes)]),u=jt(localStorage.getItem(Ct)),a=JSON.parse(localStorage.getItem(Mt)||"null"),w="words",r=-1;(!a||a.date!==R())&&(a=It(u,s,R(),oe),k());function v(){localStorage.setItem(Ct,JSON.stringify(u))}function k(){localStorage.setItem(Mt,JSON.stringify(a))}function S(){localStorage.getItem(`dl.english.wordsDone.${R()}`)!=="1"&&(localStorage.setItem(`dl.english.wordsDone.${R()}`,"1"),e.dispatchEvent(new CustomEvent("dl:task",{detail:{id:"english_words"}})))}t.innerHTML=`
    <div class="subnav">
      <button data-view="words">\u80CC\u5355\u8BCD</button>
      <button data-view="reading">\u53CC\u8BED\u9605\u8BFB</button>
      <button data-view="quote">\u6BCF\u65E5\u4E00\u53E5</button>
      <button data-view="bank">\u8BCD\u5E93</button>
    </div>
    <div id="en-body"></div>
  `;let f=t.querySelector("#en-body"),j=t.querySelector(".subnav");function b(){j.querySelectorAll("button").forEach(l=>l.classList.toggle("active",l.getAttribute("data-view")===w)),w==="words"?A():w==="reading"?I():w==="bank"?E():N()}let q="",g=null;function E(){let l=q.trim().toLowerCase(),$=l?s.filter(o=>o.w.toLowerCase().includes(l)||o.zh.includes(l)||o.tag.includes(l)):s,c=o=>!!u[o],m=o=>u[o]?u[o].box:0,x=g&&$.some(o=>o.w===g)?g:null,d=x?s.find(o=>o.w===x):null;f.innerHTML=`
      <div class="card">
        <div class="row-between">
          <h2 class="card-title">\u8BCD\u5E93 <span class="hint">${s.length} \u8BCD \xB7 \u5DF2\u5B66 ${s.filter(o=>c(o.w)).length}</span></h2>
        </div>
        <div class="search-box">
          <input id="bk-q" placeholder="\u641C\u7D22\u5355\u8BCD / \u4E2D\u6587 / \u5206\u7C7B\uFF08\u5982\uFF1A\u725B\u5E02\u3001\u8D22\u7ECF\uFF09" value="${q.replace(/"/g,"&quot;")}" autocomplete="off" />
          ${q?'<button id="bk-clear" class="btn small ghost">\u6E05\u7A7A</button>':""}
        </div>
        <p class="hint">${l?`\u5339\u914D ${$.length} \u4E2A`:"\u6309\u8BCD\u5E93\u987A\u5E8F\uFF0C\u6BCF\u5929\u81EA\u52A8\u5B66 10 \u4E2A\u65B0\u8BCD\uFF1B\u8FD9\u91CC\u53EF\u968F\u65F6\u67E5\u9605\u4EFB\u4F55\u8BCD\u3002"}</p>
      </div>
      ${d?`
        <div class="card word-detail">
          <div class="row-between">
            <span class="tag">${d.tag} \xB7 ${c(d.w)?`\u5DF2\u5B66\xB7\u7B2C${m(d.w)}\u76D2`:"\u672A\u5B66"}</span>
            <button class="icon-btn" id="bk-tts" title="\u53D1\u97F3">\u{1F50A}</button>
          </div>
          <h2 class="word">${d.w}</h2>
          <p class="hint">${d.pos}</p>
          <p class="word-zh">${d.zh}</p>
          <div class="ex-block">
            <p class="word-ex">${d.ex}</p>
            <p class="word-ex-zh hint">${d.exZh}</p>
          </div>
          <div class="detail-block">
            <h4>\u{1F4CC} \u5E38\u7528\u642D\u914D</h4>
            <div class="chips">${d.phrases.map(o=>{let p=ut(o);return`<span class="chip phrase-chip" data-say="${p.en}">\u{1F50A} ${p.en} <em>${p.zh}</em></span>`}).join("")}</div>
          </div>
          <div class="detail-block tip-block">
            <h4>\u{1F4A1} \u8BB0\u5FC6\u70B9</h4>
            <p>${d.tip}</p>
          </div>
        </div>`:""}
      <div class="card bank-list">
        ${$.length?$.map(o=>`
          <div class="bank-row ${o.w===x?"open":""}" data-w="${o.w}">
            <span class="dot ${c(o.w)?"done":""}">${c(o.w)?"\u2713":""}</span>
            <div class="bank-text"><b>${o.w}</b><span class="hint">${o.zh}</span></div>
            <span class="tag ${o.w===x?"done":""}">${o.w===x?"\u6536\u8D77":"\u8BE6\u89E3"}</span>
          </div>`).join(""):'<p class="hint center-text">\u6CA1\u6709\u5339\u914D\u7684\u5355\u8BCD</p>'}
      </div>`;let D=f.querySelector("#bk-q");D.addEventListener("input",()=>{q=D.value,E();let o=f.querySelector("#bk-q");o.focus(),o.setSelectionRange(o.value.length,o.value.length)});let T=f.querySelector("#bk-clear");T&&T.addEventListener("click",()=>{q="",E()}),f.querySelector("#bk-tts")&&f.querySelector("#bk-tts").addEventListener("click",()=>z(x)),f.querySelectorAll(".phrase-chip").forEach(o=>o.addEventListener("click",()=>z(o.getAttribute("data-say")))),f.querySelectorAll(".bank-row").forEach(o=>o.addEventListener("click",()=>{let p=o.getAttribute("data-w");g=g===p?null:p,E()}))}function A(){if(a.idx>=a.queue.length){S();let o=Object.keys(u).length,p=Object.values(u).filter(y=>y.box>=dt).length;f.innerHTML=`
        <div class="card center">
          <div class="big-emoji">\u{1F389}</div>
          <h2>\u4ECA\u65E5\u5355\u8BCD\u5DF2\u5B8C\u6210</h2>
          <div class="stat-row">
            <span class="chip">\u8BCD\u5E93\u8FDB\u5EA6 ${o}/${s.length}</span>
            <span class="chip">\u5DF2\u6BD5\u4E1A ${p} \u8BCD</span>
          </div>
          <p class="hint">\u660E\u5929\u4F1A\u6309\u9057\u5FD8\u66F2\u7EBF\u5B89\u6392\u590D\u4E60\u3002<br/>\u53EF\u4EE5\u5230\u300C\u8BCD\u5E93\u300D\u968F\u65F6\u67E5\u9605\u4EFB\u4F55\u8BCD\u7684\u642D\u914D\u4E0E\u8BB0\u5FC6\u70B9\u3002</p>
        </div>`;return}let l=s.find(o=>o.w===a.queue[a.idx]),$=!u[l.w],c=$?0:u[l.w].box;f.innerHTML=`
      <div class="card flashcard">
        <div class="fc-progress">${a.queue.map((o,p)=>`<i class="${p<a.idx?"done":p===a.idx?"cur":""}"></i>`).join("")}</div>
        <div class="row-between">
          <span class="tag">${l.tag} \xB7 ${$?"\u65B0\u8BCD":`\u590D\u4E60\xB7\u7B2C${c}\u76D2`}</span>
          <button class="icon-btn" id="tts-word" title="\u53D1\u97F3">\u{1F50A}</button>
        </div>
        <div class="fc-body">
          <h2 class="word">${l.w}</h2>
          <p class="hint fc-pos">${l.pos}</p>
          <p class="hint fc-tip">\u5148\u56DE\u60F3\u5B83\u7684\u4E2D\u6587\u610F\u601D\uFF0C\u518D\u663E\u793A\u7B54\u6848</p>
          <div id="fc-back" class="hidden">
            <p class="word-zh">${l.zh}</p>
            <div class="ex-block">
              <p class="word-ex">${l.ex}</p>
              <p class="word-ex-zh hint">${l.exZh}</p>
            </div>
            <div class="detail-block">
              <h4>\u{1F4CC} \u5E38\u7528\u642D\u914D</h4>
              <div class="chips">${l.phrases.map(o=>{let{en:p,zh:y}=ut(o);return`<span class="chip phrase-chip" data-say="${p}">\u{1F50A} ${p} <em>${y}</em></span>`}).join("")}</div>
            </div>
            <div class="detail-block tip-block">
              <h4>\u{1F4A1} \u8BB0\u5FC6\u70B9</h4>
              <p>${l.tip}</p>
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
    `;let m=f.querySelector("#fc-back"),x=f.querySelector("#flip"),d=f.querySelector("#grade"),D=f.querySelector(".fc-tip");f.querySelector("#tts-word").addEventListener("click",()=>z(l.w)),x.addEventListener("click",()=>{m.classList.remove("hidden"),D&&D.classList.add("hidden"),x.classList.add("hidden"),d.classList.remove("hidden"),z(l.w)}),f.querySelectorAll(".phrase-chip").forEach(o=>o.addEventListener("click",()=>z(o.getAttribute("data-say")))),f.querySelector("#wrong").addEventListener("click",()=>T(!1)),f.querySelector("#right").addEventListener("click",()=>T(!0));function T(o){let p=u[l.w]||{box:0,due:""};u[l.w]=At(p.box,o),v(),a.idx+=1,k(),A()}}function I(){if(r>=0){let $=n[r],c=localStorage.getItem(`dl.english.reading.${R()}`);f.innerHTML=`
        <div class="card">
          <button class="btn small ghost" id="rd-back">\u2190 \u8FD4\u56DE\u5217\u8868</button>
          <h2 class="card-title">${$.title}</h2>
          <p class="hint">\u7EA6 ${$.minutes} \u5206\u949F \xB7 \u6BB5\u843D\u5BF9\u7167 + \u8BB2\u89E3</p>
          ${$.paras.map(m=>`<p class="rd-en">${m.en}</p><p class="rd-zh hint">${m.zh}</p>`).join("")}
          <div class="notes-block">
            <h4>\u{1F4DD} \u8BED\u6CD5\u4E0E\u8868\u8FBE\u8BB2\u89E3</h4>
            <ul>${$.notes.map(m=>`<li>${m}</li>`).join("")}</ul>
          </div>
          <h4 class="vocab-head">\u{1F50A} \u8BCD\u6C47\u8868\uFF08\u70B9\u51FB\u53D1\u97F3\uFF09</h4>
          <div class="vocab">${$.vocab.map(m=>`<span class="chip vocab-chip" data-say="${m.w}">\u{1F50A} ${m.w} ${m.zh}</span>`).join("")}</div>
          <button class="btn primary" id="rd-done" ${c===$.id?"disabled":""}>
            ${c===$.id?"\u4ECA\u65E5\u5DF2\u8BFB \u2713":"\u6807\u8BB0\u5DF2\u8BFB\uFF0C\u5B8C\u6210\u6253\u5361"}</button>
        </div>`,f.querySelector("#rd-back").addEventListener("click",()=>{r=-1,I()}),f.querySelector("#rd-done").addEventListener("click",()=>{localStorage.setItem(`dl.english.reading.${R()}`,$.id),e.dispatchEvent(new CustomEvent("dl:task",{detail:{id:"english_reading"}})),I()}),f.querySelector(".vocab").addEventListener("click",m=>{let x=m.target.getAttribute("data-say");x&&z(x)});return}let l=Nt()%n.length;f.innerHTML=`
      <div class="card rd-list">
        <div class="rd-list-head">
          <div>
            <h2 class="card-title">\u53CC\u8BED\u9605\u8BFB</h2>
            <p class="hint">\u6BCF\u5929\u4E00\u7BC7\u8D22\u7ECF\u77ED\u6587\uFF0C\u6BB5\u843D\u5BF9\u7167 + \u8BB2\u89E3</p>
          </div>
          <span class="tag">${n.length} \u7BC7</span>
        </div>
        ${n.map(($,c)=>`
          <button class="rd-row" data-open="${c}">
            <span class="rd-main">
              <span class="rd-top">
                <b class="rd-title">${$.title}</b>
                ${c===l?'<span class="tag rec">\u4ECA\u65E5\u63A8\u8350</span>':""}
              </span>
              <span class="hint">\u7EA6 ${$.minutes} \u5206\u949F \xB7 ${$.vocab.length} \u4E2A\u8BCD\u6C47</span>
            </span>
            <span class="rd-go">\u9605\u8BFB \u203A</span>
          </button>`).join("")}
      </div>`,f.querySelectorAll("[data-open]").forEach($=>$.addEventListener("click",()=>{r=Number($.getAttribute("data-open")),I()}))}function N(){let l=i[Nt()%i.length];f.innerHTML=`
      <div class="card center quote-card">
        <div class="quote-mark" aria-hidden="true">\u201C</div>
        <p class="quote-en">${l.en}</p>
        <p class="word-zh">${l.zh}</p>
        <p class="hint">\u2014\u2014 ${l.who}</p>
        <div class="row-gap quote-actions">
          <button class="btn primary" id="tts-quote">\u{1F50A} \u8DDF\u8BFB\u4E00\u904D</button>
          <button class="btn" id="copy-quote">\u{1F4CB} \u590D\u5236</button>
        </div>
      </div>`,f.querySelector("#tts-quote").addEventListener("click",()=>z(l.en)),f.querySelector("#copy-quote").addEventListener("click",async()=>{let $=f.querySelector("#copy-quote"),c=await ce(`${l.en}
${l.zh}
\u2014\u2014 ${l.who}`);$.textContent=c?"\u2705 \u5DF2\u590D\u5236":"\u274C \u590D\u5236\u5931\u8D25",setTimeout(()=>{$.textContent="\u{1F4CB} \u590D\u5236"},1500)})}j.addEventListener("click",l=>{let $=l.target.getAttribute("data-view");$&&(w=$,$==="reading"&&(r=-1),b())}),document.addEventListener("keydown",l=>{if(w!=="words")return;let $=document.activeElement&&document.activeElement.tagName;$==="INPUT"||$==="TEXTAREA"||(l.code==="Space"&&document.getElementById("flip")?(l.preventDefault(),document.getElementById("flip").click()):l.key==="1"&&document.getElementById("wrong")?(l.preventDefault(),document.getElementById("wrong").click()):l.key==="2"&&document.getElementById("right")&&(l.preventDefault(),document.getElementById("right").click()))}),b()}var tt="dl.english.reading.",ht=/^(\d{4})-(\d{2})-(\d{2})$/,st=(t=new Date)=>`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;function nt(t){let e=ht.exec(String(t??""));if(!e)return null;let s=Number(e[1]),n=Number(e[2])-1,i=Number(e[3]),u=Date.UTC(s,n,i),a=new Date(u);return a.getUTCFullYear()!==s||a.getUTCMonth()!==n||a.getUTCDate()!==i?null:Math.floor(u/864e5)}function et(t){let e=new Date(Number(t)*864e5);return`${e.getUTCFullYear()}-${String(e.getUTCMonth()+1).padStart(2,"0")}-${String(e.getUTCDate()).padStart(2,"0")}`}function P(t){try{let e=JSON.parse(t);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function Rt(t,e){return!t||!e.length?0:e.filter(s=>t[s]).length}function H(t,e,s){if(!e.length)return!1;let n=t&&t[s];return!!n&&e.every(i=>n[i])}function le(t,e,s=new Date){let n=nt(st(s));if(n===null)return 0;let i=0,u=H(t,e,et(n))?n:n-1;for(;H(t,e,et(u));)i+=1,u-=1;return i}function re(t,e){if(!e.length||!t)return 0;let s=Object.keys(t).filter(a=>H(t,e,a)).map(nt).filter(a=>a!==null).sort((a,w)=>a-w),n=0,i=0,u=null;for(let a of s)i=u!==null&&a===u+1?i+1:1,i>n&&(n=i),u=a;return n}function Bt(t,e,s=new Date,n=8){let i=st(s),u=nt(i),a=(s.getDay()+6)%7,w=u-a-(n-1)*7,r=[];for(let v=0;v<n*7;v++){let k=et(w+v),S=Rt(t&&t[k],e);r.push({date:k,count:S,total:e.length,complete:H(t,e,k),future:k>i,today:k===i})}return{cells:r,weeks:n,start:r[0].date,end:r[r.length-1].date}}function de(t,e,s=new Date){let n=nt(st(s)),i=0,u=0;for(let a=6;a>=0;a--){let w=Rt(t&&t[et(n-a)],e);i+=w,e.length&&w===e.length&&(u+=1)}return{done:i,total:7*e.length,completeDays:u}}function ue(t,e=0){let s=[0,0,0,0,0,0];for(let i of Object.values(t||{})){let u=i&&Number(i.box),a=Number.isInteger(u)&&u>=1&&u<=5?u:1;s[a]+=1}let n=s.slice(1).reduce((i,u)=>i+u,0);return s[0]=Math.max(0,(Number(e)||0)-n),{counts:s,learned:n,mastered:s[5],fresh:s[0]}}function pe(t,e=new Date){let s=st(e);return Object.values(t||{}).filter(n=>n&&typeof n.due=="string"&&ht.test(n.due)&&n.due<=s).length}function Ft(t){let e=new Set;for(let s of t||[]){if(typeof s!="string"||!s.startsWith(tt))continue;let n=s.slice(tt.length);ht.test(n)&&e.add(n)}return e.size}function Ht(t,e=new Date){let{log:s={},taskIds:n=[],progress:i={},bankTotal:u=0,lessonsDone:a=0,lessonsTotal:w=0,readingDays:r=0}=t||{},v=ue(i,u),k=de(s,n,e);return{totalDays:Object.keys(s||{}).filter(f=>H(s,n,f)).length,currentStreak:le(s,n,e),maxStreak:re(s,n),weekDone:k.done,weekTotal:k.total,weekCompleteDays:k.completeDays,weekRate:k.total?Math.round(k.done/k.total*100):0,learned:v.learned,mastered:v.mastered,fresh:v.fresh,boxes:v.counts,dueToday:pe(i,e),readingDays:r,lessonsDone:Math.max(0,Number(a)||0),lessonsTotal:Math.max(0,Number(w)||0),bankTotal:Math.max(0,Number(u)||0)}}var he=[{id:"first_day",icon:"\u{1F331}",title:"\u542F\u7A0B",desc:"\u5B8C\u6210\u7B2C 1 \u5929\u5168\u90E8\u4EFB\u52A1",metric:"totalDays",target:1},{id:"streak3",icon:"\u{1F525}",title:"\u5C0F\u6709\u575A\u6301",desc:"\u8FDE\u7EED\u6253\u5361 3 \u5929",metric:"maxStreak",target:3},{id:"streak7",icon:"\u26A1",title:"\u4E00\u5468\u4E0D\u65AD",desc:"\u8FDE\u7EED\u6253\u5361 7 \u5929",metric:"maxStreak",target:7},{id:"streak30",icon:"\u{1F3C6}",title:"\u4E60\u60EF\u6210\u81EA\u7136",desc:"\u8FDE\u7EED\u6253\u5361 30 \u5929",metric:"maxStreak",target:30},{id:"words10",icon:"\u{1F4DA}",title:"\u8BCD\u6C47\u8D77\u6B65",desc:"\u5B66\u8FC7 10 \u4E2A\u5355\u8BCD",metric:"learned",target:10},{id:"words50",icon:"\u{1F9E0}",title:"\u8BCD\u6C47\u8FDB\u9636",desc:"\u5B66\u8FC7 50 \u4E2A\u5355\u8BCD",metric:"learned",target:50},{id:"master20",icon:"\u{1F393}",title:"\u878D\u4F1A\u8D2F\u901A",desc:"20 \u4E2A\u5355\u8BCD\u8FDB\u5165\u7B2C 5 \u76D2",metric:"mastered",target:20},{id:"read5",icon:"\u{1F4F0}",title:"\u9605\u8BFB\u6210\u4E60",desc:"\u8BFB\u5B8C 5 \u7BC7\u53CC\u8BED\u77ED\u6587",metric:"readingDays",target:5},{id:"lessons8",icon:"\u{1F4C8}",title:"\u6295\u8D44\u5165\u95E8",desc:"\u5B66\u5B8C 8 \u8282\u80A1\u7968\u8BFE\u7A0B",metric:"lessonsDone",target:8}];function Pt(t){return he.map(e=>{let s=Number(t&&t[e.metric])||0,n=Math.min(s,e.target);return{...e,cur:n,unlocked:s>=e.target}})}var Ut=["english_words","english_reading","stock_review"],ge=["\u672A\u5B66","1 \u5929","2 \u5929","4 \u5929","7 \u5929","15 \u5929"];async function Wt(t,e){let[s,n]=await Promise.all([fetch("/english/data/wordbank.json").then(a=>a.json()),fetch("/stock/lessons.json").then(a=>a.json()).then(a=>a.lessons)]);function i(){let a=P(localStorage.getItem("dl.habit.log")),w=P(localStorage.getItem("dl.english.progress")),r=P(localStorage.getItem("dl.stock.lessonsDone")),v=n.filter(S=>r[S.id]).length,k=Ft(Object.keys(localStorage).filter(S=>S.startsWith(tt)&&localStorage.getItem(S)));return Ht({log:a,taskIds:Ut,progress:w,bankTotal:s.length,lessonsDone:v,lessonsTotal:n.length,readingDays:k},new Date)}function u(){let a=i(),w=Bt(P(localStorage.getItem("dl.habit.log")),Ut,new Date,8),r=Pt(a),v=r.filter(b=>b.unlocked).length,k=a.bankTotal?Math.round(a.learned/a.bankTotal*100):0,S=a.boxes.slice(1),f=Math.max(...S,1),j=a.totalDays===0&&a.learned===0;t.innerHTML=`
      <div class="card stats-hero">
        <div class="row-between">
          <h2 class="card-title">\u5B66\u4E60\u7EDF\u8BA1</h2>
          <span class="tag">\u6700\u8FD1 60 \u5929</span>
        </div>
        ${j?'<p class="hint stats-empty">\u8FD8\u6CA1\u6709\u5B66\u4E60\u8BB0\u5F55\u3002\u53BB\u300C\u4ECA\u65E5\u300D\u5B8C\u6210\u4E00\u9879\u4EFB\u52A1\uFF0C\u8FD9\u91CC\u4F1A\u81EA\u52A8\u957F\u51FA\u4F60\u7684\u5B66\u4E60\u66F2\u7EBF\u3002</p>':""}
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
            ${["\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D","\u65E5"].map((b,q)=>`<span class="hw" style="grid-column:1;grid-row:${q+1}">${b}</span>`).join("")}
            ${w.cells.map((b,q)=>{let g=Math.floor(q/7),E=q%7,A=b.future?"future":"lv-"+b.count,I=b.future?"\u672A\u5230":b.complete?"\u5DF2\u5B8C\u6210":`\u5B8C\u6210 ${b.count}/${b.total}`;return`<i class="heat-cell ${A} ${b.today?"today":""}"
                style="grid-column:${g+2};grid-row:${E+1}" title="${b.date} \xB7 ${I}"></i>`}).join("")}
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
        <div class="progress-track"><div class="progress-fill" style="width:${k}%"></div></div>
        <p class="hint box-cap">\u6309\u590D\u4E60\u95F4\u9694\uFF08\u76D2\uFF09\u5206\u5E03</p>
        <div class="box-bars">
          ${S.map((b,q)=>{let g=q+1;return`
            <div class="box-row">
              <span class="box-name">${ge[g]}</span>
              <div class="box-track"><i class="box-fill b${g}" style="width:${b/f*100}%"></i></div>
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
          <span class="hint">${v}/${r.length} \u5DF2\u89E3\u9501</span>
        </div>
        <div class="ach-grid">
          ${r.map(b=>`
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
    `}e.addEventListener("dl:task",u),e.addEventListener("dl:show",a=>{a.detail&&a.detail.id==="stats"&&u()}),u()}var Kt="dl.";function Jt(t){let e={};for(let s=0;s<t.length;s++){let n=t.key(s);n&&n.startsWith(Kt)&&(e[n]=t.getItem(n))}return{app:"daily-learn",version:1,exportedAt:new Date().toISOString(),data:e}}function Yt(t,e){if(!t||t.app!=="daily-learn"||typeof t.data!="object"||t.data===null)throw new Error("\u4E0D\u662F\u6709\u6548\u7684\u6BCF\u65E5\u8FDB\u5316\u5907\u4EFD\u6587\u4EF6");let s=Object.keys(t.data).filter(n=>n.startsWith(Kt)&&typeof t.data[n]=="string");return s.forEach(n=>e.setItem(n,t.data[n])),s.length}var ot=new EventTarget,vt=[{id:"today",init:Et},{id:"stock",init:Dt},{id:"english",init:_t},{id:"stats",init:Wt}],Xt=document.getElementById("view"),K={};vt.forEach(t=>{let e=document.createElement("div");e.className="pane hidden",e.id=`pane-${t.id}`,Xt.appendChild(e),K[t.id]=e});var ft=document.createElement("footer");ft.className="app-footer";ft.innerHTML="<span>\u6BCF\u65E5\u8FDB\u5316 \xB7 \u82F1\u8BED \xD7 \u80A1\u7968</span><span>\u6BCF\u5929\u4E00\u70B9\u70B9\uFF0C\u957F\u671F\u4E3B\u4E49</span>";Xt.appendChild(ft);function mt(t){vt.forEach(e=>K[e.id].classList.toggle("hidden",e.id!==t)),document.querySelectorAll(".tabbar button[data-tab]").forEach(e=>e.classList.toggle("active",e.getAttribute("data-tab")===t)),ot.dispatchEvent(new CustomEvent("dl:show",{detail:{id:t}}))}document.querySelectorAll(".tabbar button[data-tab]").forEach(t=>t.addEventListener("click",()=>mt(t.getAttribute("data-tab"))));ot.addEventListener("dl:nav",t=>{let e=t.detail&&t.detail.tab;e&&K[e]&&mt(e)});var ve=t=>e=>{K[t.id].innerHTML=`<div class="card"><p class="hint">\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF1A${e&&e.message||e}</p></div>`};vt.forEach(t=>{Promise.resolve().then(()=>t.init(K[t.id],ot)).catch(ve(t))});mt("today");var at=new Date,fe=`${at.getMonth()+1}\u6708${at.getDate()}\u65E5 \u5468${"\u65E5\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D"[at.getDay()]}`;document.querySelectorAll(".js-date").forEach(t=>{t.textContent=fe});var U=at.getHours(),me=U<5?"\u591C\u6DF1\u4E86\uFF0C":U<9?"\u65E9\u4E0A\u597D\uFF0C":U<12?"\u4E0A\u5348\u597D\uFF0C":U<14?"\u4E2D\u5348\u597D\uFF0C":U<18?"\u4E0B\u5348\u597D\uFF0C":"\u665A\u4E0A\u597D\uFF0C";document.querySelectorAll(".js-greet").forEach(t=>{t.textContent=me});var be=["english_words","english_reading","stock_review"];function Gt(){let t=Q(V(localStorage.getItem("dl.habit.log")),be);document.querySelectorAll(".js-streak").forEach(e=>{e.textContent=`\u{1F525} ${t} \u5929`,e.classList.toggle("lit",t>0)})}Gt();ot.addEventListener("dl:task",Gt);var W=document.getElementById("guide-dialog");document.querySelectorAll(".js-guide-btn").forEach(t=>t.addEventListener("click",()=>W.showModal()));document.getElementById("guide-close").addEventListener("click",()=>W.close());W.addEventListener("click",t=>{t.target===W&&W.close()});var gt=document.getElementById("data-msg");document.getElementById("data-export").addEventListener("click",()=>{let t=Jt(localStorage),e=Object.keys(t.data).length,s=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(s),n.download=`daily-learn-backup-${new Date().toISOString().slice(0,10)}.json`,n.click(),URL.revokeObjectURL(n.href),gt.textContent=`\u2705 \u5DF2\u5BFC\u51FA ${e} \u9879\u8BB0\u5F55`});document.getElementById("data-import-btn").addEventListener("click",()=>{document.getElementById("data-import-file").click()});document.getElementById("data-import-file").addEventListener("change",async t=>{let e=t.target.files[0];if(t.target.value="",!!e)try{let s=JSON.parse(await e.text()),n=Yt(s,localStorage);gt.textContent=`\u2705 \u5DF2\u5BFC\u5165 ${n} \u9879\u8BB0\u5F55\uFF0C\u6B63\u5728\u5237\u65B0\u9875\u9762\u2026`,setTimeout(()=>location.reload(),800)}catch(s){gt.textContent=`\u274C \u5BFC\u5165\u5931\u8D25\uFF1A${s&&s.message||s}`}});})();

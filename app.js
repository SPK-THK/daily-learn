(()=>{var G=t=>`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;function ot(t,e=new Date){let s=new Date(e);return s.setDate(s.getDate()+t),G(s)}function H(t,e,s){let a=t&&t[s];return!!a&&e.every(o=>a[o])}function Q(t,e,s=new Date){let a=H(t,e,G(s))?0:-1,o=0;for(;H(t,e,ot(a,s));)o+=1,a-=1;return o}function Z(t){try{let e=JSON.parse(t);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}var kt=[{id:"english_words",icon:"\u{1F4D6}",label:"\u80CC\u5B8C\u4ECA\u65E5\u5355\u8BCD",how:"\u5728\u300C\u82F1\u8BED\u300D\u9875\u5B8C\u6210\u65B0\u8BCD\u4E0E\u590D\u4E60",tab:"english"},{id:"english_reading",icon:"\u{1F4F0}",label:"\u8BFB\u5B8C\u4E00\u7BC7\u53CC\u8BED\u77ED\u6587",how:"\u5728\u300C\u82F1\u8BED\u300D\u9875\u6807\u8BB0\u5DF2\u8BFB",tab:"english"},{id:"stock_review",icon:"\u{1F4C8}",label:"\u590D\u76D8\u81EA\u9009\u80A1",how:"\u5728\u300C\u80A1\u7968\u300D\u9875\u5237\u65B0\u884C\u60C5",tab:"stock"}],wt="dl.habit.log",N=kt.map(t=>t.id),Gt=[{icon:"\u2328\uFE0F",title:"\u952E\u76D8\u64CD\u4F5C",desc:"\u80CC\u5355\u8BCD\u65F6\uFF1A\u7A7A\u683C\u7FFB\u9762\uFF0C1 \u53C8\u5FD8\u4E86\uFF0C2 \u8BB0\u4F4F\u4E86",tone:"tone-blue"},{icon:"\u{1F50A}",title:"\u70B9\u5587\u53ED\u542C\u53D1\u97F3",desc:"\u5355\u8BCD\u3001\u642D\u914D\u3001\u91D1\u53E5\u548C\u8BCD\u6C47\u8868\u90FD\u652F\u6301\u6717\u8BFB",tone:"tone-green"},{icon:"\u{1F4BE}",title:"\u6362\u8BBE\u5907\u5148\u5907\u4EFD",desc:"\u300C\u4F7F\u7528\u6559\u7A0B\u300D\u2192 \u5BFC\u51FA\u5907\u4EFD\uFF0C\u53EF\u8FC1\u79FB\u5230\u65B0\u8BBE\u5907",tone:"tone-amber"}],yt=()=>G(new Date);function St(t,e){let s=Z(localStorage.getItem(wt));a(),o(),e.addEventListener("dl:task",()=>{a(),o(),u()});function a(){let d=yt(),v=s[d]||(s[d]={});localStorage.getItem(`dl.english.wordsDone.${d}`)==="1"&&(v.english_words=1),localStorage.getItem(`dl.english.reading.${d}`)&&(v.english_reading=1),localStorage.getItem(`dl.stock.review.${d}`)==="1"&&(v.stock_review=1)}function o(){let d=Object.keys(s).sort().slice(-60);s=Object.fromEntries(d.map(v=>[v,s[v]])),localStorage.setItem(wt,JSON.stringify(s))}function u(){let d=yt(),v=N.filter(w=>s[d]&&s[d][w]),E=Q(s,N),k=[...Array(7)].map((w,g)=>{let L=ot(g-6);return{d:L,done:H(s,N,L),today:L===d}}),S=226,f=S*(1-v.length/N.length);t.innerHTML=`
      <div class="card streak-card">
        <div class="streak-row">
          <div class="ring-wrap">
            <svg class="ring" viewBox="0 0 84 84">
              <circle class="ring-bg" cx="42" cy="42" r="36"></circle>
              <circle class="ring-fg" cx="42" cy="42" r="36"
                stroke-dasharray="${S}" stroke-dashoffset="${f}"></circle>
            </svg>
            <div class="ring-label"><b>${v.length}</b>/${N.length}</div>
          </div>
          <div class="streak-info">
            <p class="hint">\u8FDE\u7EED\u5168\u90E8\u5B8C\u6210</p>
            <div class="streak-num">\u{1F525} ${E} <small>\u5929</small></div>
            <p class="hint">${H(s,N,d)?"\u4ECA\u65E5\u6253\u5361\u5B8C\u6210 \u{1F389}":`\u8FD8\u5DEE ${N.length-v.length} \u9879\u5B8C\u6210\u6253\u5361`}</p>
          </div>
        </div>
        <div class="week-strip">
          ${k.map(w=>`<div class="wd ${w.done?"done":""} ${w.today?"today":""}" title="${w.d}">${Number(w.d.slice(8))}<i></i></div>`).join("")}
        </div>
      </div>
      <div class="card tasks-card">
        <h2 class="card-title">\u4ECA\u65E5\u4EFB\u52A1</h2>
        ${kt.map(w=>{let g=s[d]&&s[d][w.id];return`
            <div class="habit-task ${g?"done":""}" ${g?"":`data-goto="${w.tab}" role="button" tabindex="0"`}>
              <span class="dot ${g?"done":""}">${g?"\u2713":""}</span>
              <div class="task-text"><b>${w.icon} ${w.label}</b><span class="hint">${w.how}</span></div>
              <span class="tag ${g?"done":""}">${g?"\u5DF2\u5B8C\u6210":"\u5F85\u5B8C\u6210"}</span>
              ${g?"":'<span class="task-chevron" aria-hidden="true">\u203A</span>'}
            </div>`}).join("")}
      </div>
      <div class="card tips-card">
        <h2 class="card-title">\u5C0F\u8D34\u58EB</h2>
        ${Gt.map(w=>`
          <div class="tip-row">
            <span class="tip-ico ${w.tone}">${w.icon}</span>
            <div><b>${w.title}</b><span class="hint">${w.desc}</span></div>
          </div>`).join("")}
      </div>
      <p class="hint footnote">\u4E09\u9879\u5168\u90E8\u5B8C\u6210\u5373\u89C6\u4E3A\u5F53\u65E5\u6253\u5361\u6210\u529F\uFF1B\u70B9\u51FB\u5F85\u5B8C\u6210\u4EFB\u52A1\u53EF\u76F4\u63A5\u8DF3\u8F6C\u3002</p>
    `}function n(d){let v=d.closest(".habit-task[data-goto]");v&&e.dispatchEvent(new CustomEvent("dl:nav",{detail:{tab:v.getAttribute("data-goto")}}))}t.addEventListener("click",d=>n(d.target)),t.addEventListener("keydown",d=>{d.key!=="Enter"&&d.key!==" "||!d.target.closest(".habit-task[data-goto]")||(d.preventDefault(),n(d.target))}),u()}var ct=/^(sh|sz)\d{6}$/;function xt(t,e){try{let s=JSON.parse(t);if(Array.isArray(s)){let a=[...new Set(s.filter(o=>typeof o=="string"&&ct.test(o)))];if(a.length)return a}}catch{}return[...e]}var lt="dl.stock.watchlist",Et="dl.stock.lessonsDone",Qt=["sh600519","sz300750","sz002594","sh601318","sz000858","sh600036"],Zt=()=>{let t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`};async function Lt(t,e){let{lessons:s}=await fetch("/stock/lessons.json").then(c=>c.json()),a=xt(localStorage.getItem(lt),Qt),o=[],u="quotes",n=null,d={},v=null,E={},k=null;t.innerHTML=`
    <div class="subnav">
      <button data-view="quotes">\u81EA\u9009\u884C\u60C5</button>
      <button data-view="lessons">\u5165\u95E8\u6559\u7A0B</button>
    </div>
    <div id="st-body"></div>
  `;let S=t.querySelector("#st-body"),f=t.querySelector(".subnav");function w(){localStorage.setItem(lt,JSON.stringify(a))}localStorage.getItem(lt)===null&&w();function g(){try{return JSON.parse(localStorage.getItem(Et)||"{}")}catch{return{}}}function L(c){localStorage.setItem(Et,JSON.stringify(c))}function q(){localStorage.setItem(`dl.stock.review.${Zt()}`,"1"),e.dispatchEvent(new CustomEvent("dl:task",{detail:{id:"stock_review"}}))}function j(){let c=new Date,b=c.getDay();if(b===0||b===6)return!1;let y=c.getHours()*60+c.getMinutes();return y>=9*60+15&&y<=15*60+5}setInterval(()=>{u!=="quotes"||document.hidden||typeof k!="function"||j()&&k()},6e4);function M(){f.querySelectorAll("button").forEach(c=>c.classList.toggle("active",c.getAttribute("data-view")===u)),u==="quotes"?I():_()}function I(){S.innerHTML=`
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
    `;let c=i=>S.querySelector(i);function b(){let i=o.filter(h=>h.changePct>0).length,p=o.filter(h=>h.changePct<0).length,$=o.length-i-p;c("#st-summary").innerHTML=o.length?`<span class="chip up-chip">\u6DA8 ${i}</span><span class="chip flat-chip">\u5E73 ${$}</span><span class="chip down-chip">\u8DCC ${p}</span>`:"",c("#st-list").innerHTML=o.length?'<div class="q-head"><span>\u80A1\u7968</span><span>\u6700\u65B0\u4EF7</span><span>\u6DA8\u8DCC</span><span></span></div>'+o.map(h=>{let x=h.changePct>0?"up":h.changePct<0?"down":"flat",B=h.changePct==null?"--":`${h.changePct>0?"+":""}${h.changePct.toFixed(2)}%`,Y=h.change==null?"--":`${h.change>0?"+":""}${h.change.toFixed(2)}`,F=v===h.code,C=E[h.code],it=F?C&&C.length?y(C):'<p class="hint k-err">K\u7EBF\u83B7\u53D6\u5931\u8D25\uFF0C\u7A0D\u540E\u70B9\u51FB\u91CD\u8BD5</p>':"";return`
              <div class="quote-row ${F?"expanded":""}" data-code="${h.code}">
                <div class="q-name"><b>${h.name}</b><span class="hint">${h.code}</span></div>
                <div class="q-price ${x}">${h.price==null?"\u505C\u724C":h.price.toFixed(2)}</div>
                <div class="q-chg"><span class="pill ${x}">${B}</span><span class="hint">${Y}</span></div>
                <button class="q-del" title="\u5220\u9664" data-del="${h.code}">\xD7</button>
              </div>${F?`<div class="k-card">${it}</div>`:""}`}).join(""):'<p class="hint">\u6682\u65E0\u81EA\u9009\u80A1\uFF0C\u8BF7\u5728\u4E0B\u65B9\u6DFB\u52A0\uFF08\u5982 sh600519\uFF09\u3002</p>',c("#st-meta").textContent=o.length?`\u66F4\u65B0\u4E8E ${new Date(o[0].serverTime).toLocaleTimeString("zh-CN")}${j()?" \xB7 \u4EA4\u6613\u65F6\u6BB5\u81EA\u52A8\u5237\u65B0":""}`:"\u6DFB\u52A0\u81EA\u9009\u80A1\u540E\u70B9\u51FB\u5237\u65B0"}function y(i){let p=i.map(T=>T.close),$=360,h=130,x=12,B=Math.min(...p),Y=Math.max(...p),F=Y-B||1,C=T=>x+T*($-2*x)/Math.max(p.length-1,1),it=T=>h-x-(T-B)/F*(h-2*x),ft=p.map((T,$t)=>`${$t?"L":"M"}${C($t).toFixed(1)} ${it(T).toFixed(1)}`).join(" "),Jt=`${ft} L ${C(p.length-1).toFixed(1)} ${h-x} L ${x} ${h-x} Z`,z=(p[p.length-1]-p[0])/p[0]*100,Yt=z>0?"up":z<0?"down":"flat",X=z>0?"#e03131":z<0?"#2f9e44":"#8a93a6",bt="kg"+Math.random().toString(36).slice(2,8),mt=C(p.length-1).toFixed(1),Xt=[.25,.5,.75].map(T=>`<line x1="${x}" y1="${(h-x-T*(h-2*x)).toFixed(1)}"
           x2="${$-x}" y2="${(h-x-T*(h-2*x)).toFixed(1)}"></line>`).join("");return`
        <div class="row-between k-meta">
          <span class="hint">\u8FD1 ${i.length} \u65E5\u6536\u76D8\u4EF7</span>
          <span class="hint k-range" title="${i[0].date} ~ ${i[i.length-1].date}">${i[0].date.slice(5)} ~ ${i[i.length-1].date.slice(5)}</span>
        </div>
        <svg class="kchart" viewBox="0 0 ${$} ${h}" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="${bt}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${X}" stop-opacity=".22"/>
              <stop offset="1" stop-color="${X}" stop-opacity=".02"/>
            </linearGradient>
          </defs>
          <g class="k-grid">${Xt}</g>
          <path d="${Jt}" fill="url(#${bt})"></path>
          <path d="${ft}" fill="none" stroke="${X}" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"></path>
          <line class="k-lastline" x1="${mt}" y1="${x}" x2="${mt}" y2="${h-x}" stroke="${X}"></line>
        </svg>
        <div class="row-between k-meta k-meta-bottom">
          <span class="${Yt} k-pct">\u533A\u95F4 ${z>0?"+":""}${z.toFixed(2)}%</span>
          <span class="hint">\u6700\u4F4E ${B.toFixed(2)} \xB7 \u6700\u9AD8 ${Y.toFixed(2)}</span>
        </div>`}function r(i,p=1e4){let $=new AbortController,h=setTimeout(()=>$.abort(),p);return fetch(i,{signal:$.signal}).finally(()=>clearTimeout(h))}async function D(i){let p=a.find($=>$.endsWith(i))||i;try{let $=await r(`/api/kline?code=${encodeURIComponent(p)}&days=30`).then(h=>h.json());E[i]=Array.isArray($)&&$.length?$:[]}catch{E[i]=[]}}async function A(){c("#st-meta").textContent="\u5237\u65B0\u4E2D\u2026";try{let p=await(await r("/api/quotes?codes="+encodeURIComponent(a.join(",")))).json();if(p.error)throw new Error(p.error);o=p,b(),q()}catch(i){c("#st-meta").textContent=`\u884C\u60C5\u83B7\u53D6\u5931\u8D25\uFF1A${i.message==="The user aborted a request."?"\u8BF7\u6C42\u8D85\u65F6":i.message}\uFF08\u8BF7\u68C0\u67E5\u7F51\u7EDC\uFF09`}}c("#st-refresh").addEventListener("click",A),c("#st-list").addEventListener("click",async i=>{if(i.target.closest(".q-del")){let h=i.target.getAttribute("data-del");if(!h)return;a=a.filter(x=>x!==h&&!x.endsWith(h)),o=o.filter(x=>x.code!==h),v===h&&(v=null),w(),b();return}let p=i.target.closest(".quote-row");if(!p)return;let $=p.getAttribute("data-code");if($){if(v===$){v=null,b();return}v=$,E[$]||(b(),await D($)),b()}}),c("#st-add").addEventListener("click",()=>{let i=c("#st-code"),p=i.value.trim().toLowerCase();if(!ct.test(p)){i.value="",i.placeholder="\u683C\u5F0F\uFF1Ash600519 \u6216 sz300750";return}a.includes(p)||(a.push(p),w(),A()),i.value=""}),k=A,A()}function _(){if(n!==null)return l();let c=g(),b=s.filter(r=>c[r.id]).length,y=s.find(r=>!c[r.id]);S.innerHTML=`
      <div class="card lesson-list">
        <div class="row-between">
          <h2 class="card-title">\u80A1\u7968\u5165\u95E8 \xB7 \u96F6\u57FA\u7840 8 \u8BFE</h2>
          <span class="tag ${b===s.length?"done":""}">${b}/${s.length} \u5DF2\u5B66</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${b/s.length*100}%"></div></div>
        <p class="hint lesson-intro">\u6BCF\u8BFE\u7EA6 3-5 \u5206\u949F\uFF1A\u6B63\u6587 \u2192 \u8981\u70B9 \u2192 \u5C0F\u6D4B\u9A8C\u3002${y?"\u5EFA\u8BAE\u4ECE\u300C\u7EE7\u7EED\u5B66\u300D\u5F00\u59CB\u3002":"\u5168\u90E8\u5B66\u5B8C\uFF0C\u6BD5\u4E1A\uFF01\u{1F393}"}</p>
        ${s.map((r,D)=>`
          <div class="lesson-item" data-lesson="${r.id}">
            <div class="lesson-row">
              <span class="num ${c[r.id]?"done":""}">${c[r.id]?"\u2713":D+1}</span>
              <div class="lesson-text">
                <b>${r.title}</b>
                <span class="hint">\u7EA6 ${r.minutes} \u5206\u949F \xB7 ${r.quiz.length} \u9898\u5C0F\u6D4B\u9A8C</span>
              </div>
              <span class="tag ${r===y?"rec":c[r.id]?"done":""}">${r===y?"\u7EE7\u7EED\u5B66":c[r.id]?"\u5DF2\u5B66\u5B8C":"\u672A\u5B66"}</span>
            </div>
          </div>`).join("")}
      </div>
    `,S.querySelectorAll(".lesson-item").forEach(r=>r.addEventListener("click",()=>{n=r.getAttribute("data-lesson"),d={},_()}))}function l(){let c=s.find(r=>r.id===n),y=!!g()[c.id];S.innerHTML=`
      <div class="card">
        <button class="btn small ghost" id="ls-back">\u2190 \u8FD4\u56DE\u8BFE\u7A0B\u5217\u8868</button>
        <h2 class="lesson-title">${c.title}</h2>
        <p class="hint">\u7B2C ${s.indexOf(c)+1} \u8BFE \xB7 \u7EA6 ${c.minutes} \u5206\u949F</p>
        ${c.sections.map(r=>`<div class="lesson-sec"><h4>${r.h}</h4><p>${r.p}</p></div>`).join("")}
        <div class="points-box">
          <h4>\u{1F3AF} \u672C\u8BFE\u8981\u70B9</h4>
          <ul>${c.points.map(r=>`<li>${r}</li>`).join("")}</ul>
        </div>
      </div>
      <div class="card">
        <h3 class="quiz-head">\u270F\uFE0F \u5C0F\u6D4B\u9A8C\uFF08${c.quiz.length} \u9898\uFF09</h3>
        ${c.quiz.map((r,D)=>m(r,D)).join("")}
      </div>
      <div class="card center finish-card">
        <button class="btn primary" id="ls-done" ${y?"disabled":""}>${y?"\u672C\u8BFE\u5DF2\u5B66\u5B8C \u2713":"\u6807\u8BB0\u5B66\u5B8C\u8FD9\u8BFE"}</button>
      </div>
    `,S.querySelector("#ls-back").addEventListener("click",()=>{n=null,_()}),S.querySelector("#ls-done").addEventListener("click",()=>{let r=g();r[c.id]=1,L(r),n=null,_()}),S.querySelectorAll(".opt").forEach(r=>r.addEventListener("click",()=>{let D=Number(r.getAttribute("data-q"));if(d[D]!==void 0)return;let A=c.quiz[D],i=Number(r.getAttribute("data-opt"));d[D]=i;let p=S.querySelector(`.quiz-q[data-qi="${D}"]`);p.querySelectorAll(".opt").forEach($=>{let h=Number($.getAttribute("data-opt"));h===A.a?$.classList.add("correct"):h===i&&$.classList.add("wrong"),$.classList.add("locked")}),p.querySelector(".explain").classList.remove("hidden")}))}function m(c,b){return`
      <div class="quiz-q" data-qi="${b}">
        <p class="quiz-title">${b+1}. ${c.q}</p>
        ${c.options.map((y,r)=>`<button class="opt" data-q="${b}" data-opt="${r}">${"ABCD"[r]}. ${y}</button>`).join("")}
        <div class="explain hidden">\u{1F4A1} ${c.explain}</div>
      </div>`}f.addEventListener("click",c=>{let b=c.target.getAttribute("data-view");b&&(u=b,b==="lessons"&&(n=null),M())}),M()}var Dt=[1,2,4,7,15],rt=Dt.length;function Vt(t){return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}function qt(t,e,s=new Date){let a=e?Math.min(t+1,rt):1,o=new Date(s);return o.setDate(o.getDate()+Dt[a-1]),{box:a,due:Vt(o)}}function At(t){try{let e=JSON.parse(t);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function Tt(t,e,s,a=10){let o=e.filter(n=>t[n.w]&&t[n.w].due<=s).sort((n,d)=>t[n.w].due<t[d.w].due?-1:1).map(n=>n.w),u=e.filter(n=>!t[n.w]).slice(0,a).map(n=>n.w);return{date:s,queue:[...o,...u],idx:0}}function dt(t){let e=/^(.+?)\s+([\u4e00-\u9fff].*)$/.exec(t);return e?{en:e[1],zh:e[2]}:{en:t,zh:""}}var jt="dl.english.progress",It="dl.english.today",te=10,R=()=>{let t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`},Mt=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5);function O(t){speechSynthesis.cancel();let e=new SpeechSynthesisUtterance(t);e.lang="en-US",e.rate=.92,speechSynthesis.speak(e)}async function ee(t){try{return await navigator.clipboard.writeText(t),!0}catch{}try{let e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();let s=document.execCommand("copy");return e.remove(),s}catch{return!1}}async function Ct(t,e){let[s,a,o]=await Promise.all([fetch("/english/data/wordbank.json").then(l=>l.json()),fetch("/english/content/articles.json").then(l=>l.json()).then(l=>l.articles),fetch("/english/content/quotes.json").then(l=>l.json()).then(l=>l.quotes)]),u=At(localStorage.getItem(jt)),n=JSON.parse(localStorage.getItem(It)||"null"),d="words",v=-1;(!n||n.date!==R())&&(n=Tt(u,s,R(),te),k());function E(){localStorage.setItem(jt,JSON.stringify(u))}function k(){localStorage.setItem(It,JSON.stringify(n))}function S(){localStorage.getItem(`dl.english.wordsDone.${R()}`)!=="1"&&(localStorage.setItem(`dl.english.wordsDone.${R()}`,"1"),e.dispatchEvent(new CustomEvent("dl:task",{detail:{id:"english_words"}})))}t.innerHTML=`
    <div class="subnav">
      <button data-view="words">\u80CC\u5355\u8BCD</button>
      <button data-view="reading">\u53CC\u8BED\u9605\u8BFB</button>
      <button data-view="quote">\u6BCF\u65E5\u4E00\u53E5</button>
      <button data-view="bank">\u8BCD\u5E93</button>
    </div>
    <div id="en-body"></div>
  `;let f=t.querySelector("#en-body"),w=t.querySelector(".subnav");function g(){w.querySelectorAll("button").forEach(l=>l.classList.toggle("active",l.getAttribute("data-view")===d)),d==="words"?M():d==="reading"?I():d==="bank"?j():_()}let L="",q=null;function j(){let l=L.trim().toLowerCase(),m=l?s.filter(i=>i.w.toLowerCase().includes(l)||i.zh.includes(l)||i.tag.includes(l)):s,c=i=>!!u[i],b=i=>u[i]?u[i].box:0,y=q&&m.some(i=>i.w===q)?q:null,r=y?s.find(i=>i.w===y):null;f.innerHTML=`
      <div class="card">
        <div class="row-between">
          <h2 class="card-title">\u8BCD\u5E93 <span class="hint">${s.length} \u8BCD \xB7 \u5DF2\u5B66 ${s.filter(i=>c(i.w)).length}</span></h2>
        </div>
        <div class="search-box">
          <input id="bk-q" placeholder="\u641C\u7D22\u5355\u8BCD / \u4E2D\u6587 / \u5206\u7C7B\uFF08\u5982\uFF1A\u725B\u5E02\u3001\u8D22\u7ECF\uFF09" value="${L.replace(/"/g,"&quot;")}" autocomplete="off" />
          ${L?'<button id="bk-clear" class="btn small ghost">\u6E05\u7A7A</button>':""}
        </div>
        <p class="hint">${l?`\u5339\u914D ${m.length} \u4E2A`:"\u6309\u8BCD\u5E93\u987A\u5E8F\uFF0C\u6BCF\u5929\u81EA\u52A8\u5B66 10 \u4E2A\u65B0\u8BCD\uFF1B\u8FD9\u91CC\u53EF\u968F\u65F6\u67E5\u9605\u4EFB\u4F55\u8BCD\u3002"}</p>
      </div>
      ${r?`
        <div class="card word-detail">
          <div class="row-between">
            <span class="tag">${r.tag} \xB7 ${c(r.w)?`\u5DF2\u5B66\xB7\u7B2C${b(r.w)}\u76D2`:"\u672A\u5B66"}</span>
            <button class="icon-btn" id="bk-tts" title="\u53D1\u97F3">\u{1F50A}</button>
          </div>
          <h2 class="word">${r.w}</h2>
          <p class="hint">${r.pos}</p>
          <p class="word-zh">${r.zh}</p>
          <div class="ex-block">
            <p class="word-ex">${r.ex}</p>
            <p class="word-ex-zh hint">${r.exZh}</p>
          </div>
          <div class="detail-block">
            <h4>\u{1F4CC} \u5E38\u7528\u642D\u914D</h4>
            <div class="chips">${r.phrases.map(i=>{let p=dt(i);return`<span class="chip phrase-chip" data-say="${p.en}">\u{1F50A} ${p.en} <em>${p.zh}</em></span>`}).join("")}</div>
          </div>
          <div class="detail-block tip-block">
            <h4>\u{1F4A1} \u8BB0\u5FC6\u70B9</h4>
            <p>${r.tip}</p>
          </div>
        </div>`:""}
      <div class="card bank-list">
        ${m.length?m.map(i=>`
          <div class="bank-row ${i.w===y?"open":""}" data-w="${i.w}">
            <span class="dot ${c(i.w)?"done":""}">${c(i.w)?"\u2713":""}</span>
            <div class="bank-text"><b>${i.w}</b><span class="hint">${i.zh}</span></div>
            <span class="tag ${i.w===y?"done":""}">${i.w===y?"\u6536\u8D77":"\u8BE6\u89E3"}</span>
          </div>`).join(""):'<p class="hint center-text">\u6CA1\u6709\u5339\u914D\u7684\u5355\u8BCD</p>'}
      </div>`;let D=f.querySelector("#bk-q");D.addEventListener("input",()=>{L=D.value,j();let i=f.querySelector("#bk-q");i.focus(),i.setSelectionRange(i.value.length,i.value.length)});let A=f.querySelector("#bk-clear");A&&A.addEventListener("click",()=>{L="",j()}),f.querySelector("#bk-tts")&&f.querySelector("#bk-tts").addEventListener("click",()=>O(y)),f.querySelectorAll(".phrase-chip").forEach(i=>i.addEventListener("click",()=>O(i.getAttribute("data-say")))),f.querySelectorAll(".bank-row").forEach(i=>i.addEventListener("click",()=>{let p=i.getAttribute("data-w");q=q===p?null:p,j()}))}function M(){if(n.idx>=n.queue.length){S();let i=Object.keys(u).length,p=Object.values(u).filter($=>$.box>=rt).length;f.innerHTML=`
        <div class="card center">
          <div class="big-emoji">\u{1F389}</div>
          <h2>\u4ECA\u65E5\u5355\u8BCD\u5DF2\u5B8C\u6210</h2>
          <div class="stat-row">
            <span class="chip">\u8BCD\u5E93\u8FDB\u5EA6 ${i}/${s.length}</span>
            <span class="chip">\u5DF2\u6BD5\u4E1A ${p} \u8BCD</span>
          </div>
          <p class="hint">\u660E\u5929\u4F1A\u6309\u9057\u5FD8\u66F2\u7EBF\u5B89\u6392\u590D\u4E60\u3002<br/>\u53EF\u4EE5\u5230\u300C\u8BCD\u5E93\u300D\u968F\u65F6\u67E5\u9605\u4EFB\u4F55\u8BCD\u7684\u642D\u914D\u4E0E\u8BB0\u5FC6\u70B9\u3002</p>
        </div>`;return}let l=s.find(i=>i.w===n.queue[n.idx]),m=!u[l.w],c=m?0:u[l.w].box;f.innerHTML=`
      <div class="card flashcard">
        <div class="fc-progress">${n.queue.map((i,p)=>`<i class="${p<n.idx?"done":p===n.idx?"cur":""}"></i>`).join("")}</div>
        <div class="row-between">
          <span class="tag">${l.tag} \xB7 ${m?"\u65B0\u8BCD":`\u590D\u4E60\xB7\u7B2C${c}\u76D2`}</span>
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
              <div class="chips">${l.phrases.map(i=>{let{en:p,zh:$}=dt(i);return`<span class="chip phrase-chip" data-say="${p}">\u{1F50A} ${p} <em>${$}</em></span>`}).join("")}</div>
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
      <p class="hint center-text">\u7B2C ${n.idx+1} / ${n.queue.length} \u4E2A</p>
      <p class="kbd-hint center-text"><kbd>\u7A7A\u683C</kbd> \u7FFB\u9762 \xB7 <kbd>1</kbd> \u53C8\u5FD8\u4E86 \xB7 <kbd>2</kbd> \u8BB0\u4F4F\u4E86</p>
    `;let b=f.querySelector("#fc-back"),y=f.querySelector("#flip"),r=f.querySelector("#grade"),D=f.querySelector(".fc-tip");f.querySelector("#tts-word").addEventListener("click",()=>O(l.w)),y.addEventListener("click",()=>{b.classList.remove("hidden"),D&&D.classList.add("hidden"),y.classList.add("hidden"),r.classList.remove("hidden"),O(l.w)}),f.querySelectorAll(".phrase-chip").forEach(i=>i.addEventListener("click",()=>O(i.getAttribute("data-say")))),f.querySelector("#wrong").addEventListener("click",()=>A(!1)),f.querySelector("#right").addEventListener("click",()=>A(!0));function A(i){let p=u[l.w]||{box:0,due:""};u[l.w]=qt(p.box,i),E(),n.idx+=1,k(),M()}}function I(){if(v>=0){let m=a[v],c=localStorage.getItem(`dl.english.reading.${R()}`);f.innerHTML=`
        <div class="card">
          <button class="btn small ghost" id="rd-back">\u2190 \u8FD4\u56DE\u5217\u8868</button>
          <h2 class="card-title">${m.title}</h2>
          <p class="hint">\u7EA6 ${m.minutes} \u5206\u949F \xB7 \u6BB5\u843D\u5BF9\u7167 + \u8BB2\u89E3</p>
          ${m.paras.map(b=>`<p class="rd-en">${b.en}</p><p class="rd-zh hint">${b.zh}</p>`).join("")}
          <div class="notes-block">
            <h4>\u{1F4DD} \u8BED\u6CD5\u4E0E\u8868\u8FBE\u8BB2\u89E3</h4>
            <ul>${m.notes.map(b=>`<li>${b}</li>`).join("")}</ul>
          </div>
          <h4 class="vocab-head">\u{1F50A} \u8BCD\u6C47\u8868\uFF08\u70B9\u51FB\u53D1\u97F3\uFF09</h4>
          <div class="vocab">${m.vocab.map(b=>`<span class="chip vocab-chip" data-say="${b.w}">\u{1F50A} ${b.w} ${b.zh}</span>`).join("")}</div>
          <button class="btn primary" id="rd-done" ${c===m.id?"disabled":""}>
            ${c===m.id?"\u4ECA\u65E5\u5DF2\u8BFB \u2713":"\u6807\u8BB0\u5DF2\u8BFB\uFF0C\u5B8C\u6210\u6253\u5361"}</button>
        </div>`,f.querySelector("#rd-back").addEventListener("click",()=>{v=-1,I()}),f.querySelector("#rd-done").addEventListener("click",()=>{localStorage.setItem(`dl.english.reading.${R()}`,m.id),e.dispatchEvent(new CustomEvent("dl:task",{detail:{id:"english_reading"}})),I()}),f.querySelector(".vocab").addEventListener("click",b=>{let y=b.target.getAttribute("data-say");y&&O(y)});return}let l=Mt()%a.length;f.innerHTML=`
      <div class="card rd-list">
        <div class="rd-list-head">
          <div>
            <h2 class="card-title">\u53CC\u8BED\u9605\u8BFB</h2>
            <p class="hint">\u6BCF\u5929\u4E00\u7BC7\u8D22\u7ECF\u77ED\u6587\uFF0C\u6BB5\u843D\u5BF9\u7167 + \u8BB2\u89E3</p>
          </div>
          <span class="tag">${a.length} \u7BC7</span>
        </div>
        ${a.map((m,c)=>`
          <button class="rd-row" data-open="${c}">
            <span class="rd-main">
              <span class="rd-top">
                <b class="rd-title">${m.title}</b>
                ${c===l?'<span class="tag rec">\u4ECA\u65E5\u63A8\u8350</span>':""}
              </span>
              <span class="hint">\u7EA6 ${m.minutes} \u5206\u949F \xB7 ${m.vocab.length} \u4E2A\u8BCD\u6C47</span>
            </span>
            <span class="rd-go">\u9605\u8BFB \u203A</span>
          </button>`).join("")}
      </div>`,f.querySelectorAll("[data-open]").forEach(m=>m.addEventListener("click",()=>{v=Number(m.getAttribute("data-open")),I()}))}function _(){let l=o[Mt()%o.length];f.innerHTML=`
      <div class="card center quote-card">
        <div class="quote-mark" aria-hidden="true">\u201C</div>
        <p class="quote-en">${l.en}</p>
        <p class="word-zh">${l.zh}</p>
        <p class="hint">\u2014\u2014 ${l.who}</p>
        <div class="row-gap quote-actions">
          <button class="btn primary" id="tts-quote">\u{1F50A} \u8DDF\u8BFB\u4E00\u904D</button>
          <button class="btn" id="copy-quote">\u{1F4CB} \u590D\u5236</button>
        </div>
      </div>`,f.querySelector("#tts-quote").addEventListener("click",()=>O(l.en)),f.querySelector("#copy-quote").addEventListener("click",async()=>{let m=f.querySelector("#copy-quote"),c=await ee(`${l.en}
${l.zh}
\u2014\u2014 ${l.who}`);m.textContent=c?"\u2705 \u5DF2\u590D\u5236":"\u274C \u590D\u5236\u5931\u8D25",setTimeout(()=>{m.textContent="\u{1F4CB} \u590D\u5236"},1500)})}w.addEventListener("click",l=>{let m=l.target.getAttribute("data-view");m&&(d=m,m==="reading"&&(v=-1),g())}),document.addEventListener("keydown",l=>{if(d!=="words")return;let m=document.activeElement&&document.activeElement.tagName;m==="INPUT"||m==="TEXTAREA"||(l.code==="Space"&&document.getElementById("flip")?(l.preventDefault(),document.getElementById("flip").click()):l.key==="1"&&document.getElementById("wrong")?(l.preventDefault(),document.getElementById("wrong").click()):l.key==="2"&&document.getElementById("right")&&(l.preventDefault(),document.getElementById("right").click()))}),g()}var V="dl.english.reading.",ut=/^(\d{4})-(\d{2})-(\d{2})$/,et=(t=new Date)=>`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;function st(t){let e=ut.exec(String(t??""));if(!e)return null;let s=Number(e[1]),a=Number(e[2])-1,o=Number(e[3]),u=Date.UTC(s,a,o),n=new Date(u);return n.getUTCFullYear()!==s||n.getUTCMonth()!==a||n.getUTCDate()!==o?null:Math.floor(u/864e5)}function tt(t){let e=new Date(Number(t)*864e5);return`${e.getUTCFullYear()}-${String(e.getUTCMonth()+1).padStart(2,"0")}-${String(e.getUTCDate()).padStart(2,"0")}`}function U(t){try{let e=JSON.parse(t);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function Nt(t,e){return!t||!e.length?0:e.filter(s=>t[s]).length}function P(t,e,s){if(!e.length)return!1;let a=t&&t[s];return!!a&&e.every(o=>a[o])}function se(t,e,s=new Date){let a=st(et(s));if(a===null)return 0;let o=0,u=P(t,e,tt(a))?a:a-1;for(;P(t,e,tt(u));)o+=1,u-=1;return o}function ne(t,e){if(!e.length||!t)return 0;let s=Object.keys(t).filter(n=>P(t,e,n)).map(st).filter(n=>n!==null).sort((n,d)=>n-d),a=0,o=0,u=null;for(let n of s)o=u!==null&&n===u+1?o+1:1,o>a&&(a=o),u=n;return a}function Ot(t,e,s=new Date,a=8){let o=et(s),u=st(o),n=(s.getDay()+6)%7,d=u-n-(a-1)*7,v=[];for(let E=0;E<a*7;E++){let k=tt(d+E),S=Nt(t&&t[k],e);v.push({date:k,count:S,total:e.length,complete:P(t,e,k),future:k>o,today:k===o})}return{cells:v,weeks:a,start:v[0].date,end:v[v.length-1].date}}function ae(t,e,s=new Date){let a=st(et(s)),o=0,u=0;for(let n=6;n>=0;n--){let d=Nt(t&&t[tt(a-n)],e);o+=d,e.length&&d===e.length&&(u+=1)}return{done:o,total:7*e.length,completeDays:u}}function ie(t,e=0){let s=[0,0,0,0,0,0];for(let o of Object.values(t||{})){let u=o&&Number(o.box),n=Number.isInteger(u)&&u>=1&&u<=5?u:1;s[n]+=1}let a=s.slice(1).reduce((o,u)=>o+u,0);return s[0]=Math.max(0,(Number(e)||0)-a),{counts:s,learned:a,mastered:s[5],fresh:s[0]}}function oe(t,e=new Date){let s=et(e);return Object.values(t||{}).filter(a=>a&&typeof a.due=="string"&&ut.test(a.due)&&a.due<=s).length}function _t(t){let e=new Set;for(let s of t||[]){if(typeof s!="string"||!s.startsWith(V))continue;let a=s.slice(V.length);ut.test(a)&&e.add(a)}return e.size}function zt(t,e=new Date){let{log:s={},taskIds:a=[],progress:o={},bankTotal:u=0,lessonsDone:n=0,lessonsTotal:d=0,readingDays:v=0}=t||{},E=ie(o,u),k=ae(s,a,e);return{totalDays:Object.keys(s||{}).filter(f=>P(s,a,f)).length,currentStreak:se(s,a,e),maxStreak:ne(s,a),weekDone:k.done,weekTotal:k.total,weekCompleteDays:k.completeDays,weekRate:k.total?Math.round(k.done/k.total*100):0,learned:E.learned,mastered:E.mastered,fresh:E.fresh,boxes:E.counts,dueToday:oe(o,e),readingDays:v,lessonsDone:Math.max(0,Number(n)||0),lessonsTotal:Math.max(0,Number(d)||0),bankTotal:Math.max(0,Number(u)||0)}}var ce=[{id:"first_day",icon:"\u{1F331}",title:"\u542F\u7A0B",desc:"\u5B8C\u6210\u7B2C 1 \u5929\u5168\u90E8\u4EFB\u52A1",metric:"totalDays",target:1},{id:"streak3",icon:"\u{1F525}",title:"\u5C0F\u6709\u575A\u6301",desc:"\u8FDE\u7EED\u6253\u5361 3 \u5929",metric:"maxStreak",target:3},{id:"streak7",icon:"\u26A1",title:"\u4E00\u5468\u4E0D\u65AD",desc:"\u8FDE\u7EED\u6253\u5361 7 \u5929",metric:"maxStreak",target:7},{id:"streak30",icon:"\u{1F3C6}",title:"\u4E60\u60EF\u6210\u81EA\u7136",desc:"\u8FDE\u7EED\u6253\u5361 30 \u5929",metric:"maxStreak",target:30},{id:"words10",icon:"\u{1F4DA}",title:"\u8BCD\u6C47\u8D77\u6B65",desc:"\u5B66\u8FC7 10 \u4E2A\u5355\u8BCD",metric:"learned",target:10},{id:"words50",icon:"\u{1F9E0}",title:"\u8BCD\u6C47\u8FDB\u9636",desc:"\u5B66\u8FC7 50 \u4E2A\u5355\u8BCD",metric:"learned",target:50},{id:"master20",icon:"\u{1F393}",title:"\u878D\u4F1A\u8D2F\u901A",desc:"20 \u4E2A\u5355\u8BCD\u8FDB\u5165\u7B2C 5 \u76D2",metric:"mastered",target:20},{id:"read5",icon:"\u{1F4F0}",title:"\u9605\u8BFB\u6210\u4E60",desc:"\u8BFB\u5B8C 5 \u7BC7\u53CC\u8BED\u77ED\u6587",metric:"readingDays",target:5},{id:"lessons8",icon:"\u{1F4C8}",title:"\u6295\u8D44\u5165\u95E8",desc:"\u5B66\u5B8C 8 \u8282\u80A1\u7968\u8BFE\u7A0B",metric:"lessonsDone",target:8}];function Rt(t){return ce.map(e=>{let s=Number(t&&t[e.metric])||0,a=Math.min(s,e.target);return{...e,cur:a,unlocked:s>=e.target}})}var Bt=["english_words","english_reading","stock_review"],le=["\u672A\u5B66","1 \u5929","2 \u5929","4 \u5929","7 \u5929","15 \u5929"];async function Ft(t,e){let[s,a]=await Promise.all([fetch("/english/data/wordbank.json").then(n=>n.json()),fetch("/stock/lessons.json").then(n=>n.json()).then(n=>n.lessons)]);function o(){let n=U(localStorage.getItem("dl.habit.log")),d=U(localStorage.getItem("dl.english.progress")),v=U(localStorage.getItem("dl.stock.lessonsDone")),E=a.filter(S=>v[S.id]).length,k=_t(Object.keys(localStorage).filter(S=>S.startsWith(V)&&localStorage.getItem(S)));return zt({log:n,taskIds:Bt,progress:d,bankTotal:s.length,lessonsDone:E,lessonsTotal:a.length,readingDays:k},new Date)}function u(){let n=o(),d=Ot(U(localStorage.getItem("dl.habit.log")),Bt,new Date,8),v=Rt(n),E=v.filter(g=>g.unlocked).length,k=n.bankTotal?Math.round(n.learned/n.bankTotal*100):0,S=n.boxes.slice(1),f=Math.max(...S,1),w=n.totalDays===0&&n.learned===0;t.innerHTML=`
      <div class="card stats-hero">
        <div class="row-between">
          <h2 class="card-title">\u5B66\u4E60\u7EDF\u8BA1</h2>
          <span class="tag">\u6700\u8FD1 60 \u5929</span>
        </div>
        ${w?'<p class="hint stats-empty">\u8FD8\u6CA1\u6709\u5B66\u4E60\u8BB0\u5F55\u3002\u53BB\u300C\u4ECA\u65E5\u300D\u5B8C\u6210\u4E00\u9879\u4EFB\u52A1\uFF0C\u8FD9\u91CC\u4F1A\u81EA\u52A8\u957F\u51FA\u4F60\u7684\u5B66\u4E60\u66F2\u7EBF\u3002</p>':""}
        <div class="stat-grid">
          <div class="stat-tile"><b>${n.currentStreak}</b><span>\u5F53\u524D\u8FDE\u51FB</span></div>
          <div class="stat-tile"><b>${n.maxStreak}</b><span>\u6700\u957F\u8FDE\u51FB</span></div>
          <div class="stat-tile"><b>${n.totalDays}</b><span>\u7D2F\u8BA1\u6253\u5361</span></div>
          <div class="stat-tile"><b>${n.weekRate}%</b><span>\u672C\u5468\u5B8C\u6210\u7387</span></div>
        </div>
        <div class="week-line">
          <span class="hint">\u672C\u5468\u5B8C\u6210 ${n.weekDone}/${n.weekTotal} \u9879</span>
          <span class="hint">${n.weekCompleteDays}/7 \u5929\u5168\u52E4</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${n.weekRate}%"></div></div>
      </div>

      <div class="card cal-card">
        <div class="row-between">
          <h2 class="card-title">\u6253\u5361\u65E5\u5386</h2>
          <span class="hint">${d.start.slice(5)} ~ ${d.end.slice(5)}</span>
        </div>
        <div class="heat-wrap">
          <div class="heat-grid" role="img" aria-label="\u6700\u8FD1 8 \u5468\u6253\u5361\u65E5\u5386">
            ${["\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D","\u65E5"].map((g,L)=>`<span class="hw" style="grid-column:1;grid-row:${L+1}">${g}</span>`).join("")}
            ${d.cells.map((g,L)=>{let q=Math.floor(L/7),j=L%7,M=g.future?"future":"lv-"+g.count,I=g.future?"\u672A\u5230":g.complete?"\u5DF2\u5B8C\u6210":`\u5B8C\u6210 ${g.count}/${g.total}`;return`<i class="heat-cell ${M} ${g.today?"today":""}"
                style="grid-column:${q+2};grid-row:${j+1}" title="${g.date} \xB7 ${I}"></i>`}).join("")}
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
          <span class="tag ${n.dueToday?"rec":"done"}">${n.dueToday?`\u5F85\u590D\u4E60 ${n.dueToday}`:"\u590D\u4E60\u5DF2\u6E05\u7A7A"}</span>
        </div>
        <p class="hint vocab-total"><b>${n.learned}</b> / ${n.bankTotal} \u8BCD\u5DF2\u5B66 \xB7 \u6BD5\u4E1A ${n.mastered} \u4E2A</p>
        <div class="progress-track"><div class="progress-fill" style="width:${k}%"></div></div>
        <p class="hint box-cap">\u6309\u590D\u4E60\u95F4\u9694\uFF08\u76D2\uFF09\u5206\u5E03</p>
        <div class="box-bars">
          ${S.map((g,L)=>{let q=L+1;return`
            <div class="box-row">
              <span class="box-name">${le[q]}</span>
              <div class="box-track"><i class="box-fill b${q}" style="width:${g/f*100}%"></i></div>
              <b>${g}</b>
            </div>`}).join("")}
        </div>
        <p class="hint box-note">\u672A\u5B66 ${n.fresh} \u4E2A\uFF0C\u4F1A\u6309\u8BCD\u5E93\u987A\u5E8F\u8FDB\u5165\u6BCF\u65E5\u65B0\u8BCD\u961F\u5217\u3002</p>
      </div>

      <div class="card foot-card">
        <h2 class="card-title">\u5B66\u4E60\u8DB3\u8FF9</h2>
        <div class="stat-grid">
          <div class="stat-tile"><b>${n.readingDays}</b><span>\u8BFB\u5B8C\u6587\u7AE0</span></div>
          <div class="stat-tile"><b>${n.lessonsDone}/${n.lessonsTotal}</b><span>\u80A1\u7968\u8BFE\u7A0B</span></div>
          <div class="stat-tile"><b>${n.mastered}</b><span>\u6BD5\u4E1A\u5355\u8BCD</span></div>
        </div>
      </div>

      <div class="card ach-card">
        <div class="row-between">
          <h2 class="card-title">\u6210\u5C31</h2>
          <span class="hint">${E}/${v.length} \u5DF2\u89E3\u9501</span>
        </div>
        <div class="ach-grid">
          ${v.map(g=>`
            <div class="ach ${g.unlocked?"unlocked":""}">
              <div class="ach-top">
                <span class="ach-icon">${g.icon}</span>
                <span class="ach-state">${g.unlocked?"\u2713":`${g.cur}/${g.target}`}</span>
              </div>
              <b>${g.title}</b>
              <span class="hint">${g.desc}</span>
              <div class="progress-track sm">
                <div class="progress-fill" style="width:${Math.round(g.cur/g.target*100)}%"></div>
              </div>
            </div>`).join("")}
        </div>
      </div>
    `}e.addEventListener("dl:task",u),e.addEventListener("dl:show",n=>{n.detail&&n.detail.id==="stats"&&u()}),u()}var Ht="dl.";function Pt(t){let e={};for(let s=0;s<t.length;s++){let a=t.key(s);a&&a.startsWith(Ht)&&(e[a]=t.getItem(a))}return{app:"daily-learn",version:1,exportedAt:new Date().toISOString(),data:e}}function Ut(t,e){if(!t||t.app!=="daily-learn"||typeof t.data!="object"||t.data===null)throw new Error("\u4E0D\u662F\u6709\u6548\u7684\u6BCF\u65E5\u8FDB\u5316\u5907\u4EFD\u6587\u4EF6");let s=Object.keys(t.data).filter(a=>a.startsWith(Ht)&&typeof t.data[a]=="string");return s.forEach(a=>e.setItem(a,t.data[a])),s.length}var at=new EventTarget,ht=[{id:"today",init:St},{id:"stock",init:Lt},{id:"english",init:Ct},{id:"stats",init:Ft}],Wt=document.getElementById("view"),J={};ht.forEach(t=>{let e=document.createElement("div");e.className="pane hidden",e.id=`pane-${t.id}`,Wt.appendChild(e),J[t.id]=e});var gt=document.createElement("footer");gt.className="app-footer";gt.innerHTML="<span>\u6BCF\u65E5\u8FDB\u5316 \xB7 \u82F1\u8BED \xD7 \u80A1\u7968</span><span>\u6BCF\u5929\u4E00\u70B9\u70B9\uFF0C\u957F\u671F\u4E3B\u4E49</span>";Wt.appendChild(gt);function vt(t){ht.forEach(e=>J[e.id].classList.toggle("hidden",e.id!==t)),document.querySelectorAll(".tabbar button[data-tab]").forEach(e=>e.classList.toggle("active",e.getAttribute("data-tab")===t)),at.dispatchEvent(new CustomEvent("dl:show",{detail:{id:t}}))}document.querySelectorAll(".tabbar button[data-tab]").forEach(t=>t.addEventListener("click",()=>vt(t.getAttribute("data-tab"))));at.addEventListener("dl:nav",t=>{let e=t.detail&&t.detail.tab;e&&J[e]&&vt(e)});var re=t=>e=>{J[t.id].innerHTML=`<div class="card"><p class="hint">\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF1A${e&&e.message||e}</p></div>`};ht.forEach(t=>{Promise.resolve().then(()=>t.init(J[t.id],at)).catch(re(t))});vt("today");var nt=new Date,de=`${nt.getMonth()+1}\u6708${nt.getDate()}\u65E5 \u5468${"\u65E5\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D"[nt.getDay()]}`;document.querySelectorAll(".js-date").forEach(t=>{t.textContent=de});var W=nt.getHours(),ue=W<5?"\u591C\u6DF1\u4E86\uFF0C":W<9?"\u65E9\u4E0A\u597D\uFF0C":W<12?"\u4E0A\u5348\u597D\uFF0C":W<14?"\u4E2D\u5348\u597D\uFF0C":W<18?"\u4E0B\u5348\u597D\uFF0C":"\u665A\u4E0A\u597D\uFF0C";document.querySelectorAll(".js-greet").forEach(t=>{t.textContent=ue});var pe=["english_words","english_reading","stock_review"];function Kt(){let t=Q(Z(localStorage.getItem("dl.habit.log")),pe);document.querySelectorAll(".js-streak").forEach(e=>{e.textContent=`\u{1F525} ${t} \u5929`,e.classList.toggle("lit",t>0)})}Kt();at.addEventListener("dl:task",Kt);var K=document.getElementById("guide-dialog");document.querySelectorAll(".js-guide-btn").forEach(t=>t.addEventListener("click",()=>K.showModal()));document.getElementById("guide-close").addEventListener("click",()=>K.close());K.addEventListener("click",t=>{t.target===K&&K.close()});var pt=document.getElementById("data-msg");document.getElementById("data-export").addEventListener("click",()=>{let t=Pt(localStorage),e=Object.keys(t.data).length,s=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(s),a.download=`daily-learn-backup-${new Date().toISOString().slice(0,10)}.json`,a.click(),URL.revokeObjectURL(a.href),pt.textContent=`\u2705 \u5DF2\u5BFC\u51FA ${e} \u9879\u8BB0\u5F55`});document.getElementById("data-import-btn").addEventListener("click",()=>{document.getElementById("data-import-file").click()});document.getElementById("data-import-file").addEventListener("change",async t=>{let e=t.target.files[0];if(t.target.value="",!!e)try{let s=JSON.parse(await e.text()),a=Ut(s,localStorage);pt.textContent=`\u2705 \u5DF2\u5BFC\u5165 ${a} \u9879\u8BB0\u5F55\uFF0C\u6B63\u5728\u5237\u65B0\u9875\u9762\u2026`,setTimeout(()=>location.reload(),800)}catch(s){pt.textContent=`\u274C \u5BFC\u5165\u5931\u8D25\uFF1A${s&&s.message||s}`}});})();

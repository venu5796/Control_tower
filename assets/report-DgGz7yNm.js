import{A as e,C as t,D as n,P as r,d as i,g as a,i as o,t as s,w as c}from"./jira-DPjsT-so.js";var l=Object.create,u=Object.defineProperty,d=Object.getOwnPropertyDescriptor,f=Object.getOwnPropertyNames,p=Object.getPrototypeOf,m=Object.prototype.hasOwnProperty,h=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),g=(e,t,n,r)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var i=f(t),a=0,o=i.length,s;a<o;a++)s=i[a],!m.call(e,s)&&s!==n&&u(e,s,{get:(e=>t[e]).bind(null,s),enumerable:!(r=d(t,s))||r.enumerable});return e},_=(e,t,n)=>(n=e==null?{}:l(p(e)),g(t||!e||!e.__esModule?u(n,`default`,{value:e,enumerable:!0}):n,e)),v=(e=>typeof require<`u`?require:typeof Proxy<`u`?new Proxy(e,{get:(e,t)=>(typeof require<`u`?require:e)[t]}):e)(function(e){if(typeof require<`u`)return require.apply(this,arguments);throw Error('Calling `require` for "'+e+"\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.")}),y=new Set([`executive_summary`,`rag_reasons`,`sprint_progress`]);async function b(e,t,r){if(!y.has(e))throw Error(`Unknown section: ${e}`);let i=await fetch(n.API_URL,{method:`POST`,headers:{"Content-Type":`text/plain`},body:JSON.stringify({action:`geminiDraft`,sheetId:r,section:e,context:t})});if(!i.ok)throw Error(`GAS error: ${i.status}`);let a=await i.json();if(!a.ok)throw Error(a.error||`AI draft failed`);return a.draft}var x=`modulepreload`,S=function(e,t){return new URL(e,t).href},C={},w=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=S(t,n),t in C)return;C[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:x,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};function T(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}var ee=`./report-template.docx`,E=null;async function D(){return E||=(await w(async()=>{let{default:e}=await import(`./jszip.min-CcEFkPKK.js`).then(e=>_(e.default,1));return{default:e}},[],import.meta.url)).default,E}async function O(e){let t=await D(),n=await fetch(ee);if(!n.ok)throw Error(`report-template.docx not found in dist/.
Open the Weekly Report docx in Word, replace fillable text with {{placeholder}} tokens, and save as report-template.docx into dist/.`);let r=await t.loadAsync(await n.arrayBuffer()),i=await r.file(`word/document.xml`).async(`string`),a=re(e);for(let[e,t]of Object.entries(a))i=i.split(`{{${e}}}`).join(T(String(t??``)));return i=A(i,`__BUDGET_ROWS__`,M(e)),i=A(i,`__SPRINT_ROWS__`,N(e)),i=A(i,`__HOLIDAY_ROWS__`,P(e)),r.file(`word/document.xml`,i),r.generateAsync({type:`blob`,compression:`DEFLATE`})}function k(e){return`Weekly-Report-${(e.sprintName||`report`).replace(/[/\\:*?"<>|]/g,`-`)}.docx`}async function te(e){let t;try{t=await O(e)}catch(e){alert(e.message);return}ne(t,k(e))}function ne(e,t){let n=URL.createObjectURL(e),r=Object.assign(document.createElement(`a`),{href:n,download:t});document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n)}function re(e){let t=e.data?.config||{},n=t.currency_symbol||`€`,r=e.totals||{};return{report_date:new Date().toLocaleDateString(`en-GB`,{day:`numeric`,month:`long`,year:`numeric`}),project_name:t.project_name||``,sprint_name:e.sprintName||``,overall_status:e.rag.overall,overall_prev:e.rag.overallPrev||e.rag.overall,overall_reason:e.sections.rag_overall_reason||``,scope_status:e.rag.scope,scope_prev:e.rag.scopePrev||e.rag.scope,scope_reason:e.sections.rag_scope_reason||``,schedule_status:e.rag.schedule,schedule_prev:e.rag.schedulePrev||e.rag.schedule,schedule_reason:e.sections.rag_schedule_reason||``,budget_status:e.rag.budget,budget_prev:e.rag.budgetPrev||e.rag.budget,budget_reason:e.sections.rag_budget_reason||``,risk_status:e.rag.risk,risk_prev:e.rag.riskPrev||e.rag.risk,risk_reason:e.sections.rag_risk_reason||``,executive_summary:e.sections.executive_summary||``,sprint_done_pct:e.sprintStats.donePct+`%`,sprint_ip_pct:e.sprintStats.inProgressPct+`%`,sprint_todo_pct:e.sprintStats.todoPct+`%`,sprint_progress:e.sections.sprint_progress||``,sow_burned:n+F(r.burn||0),sow_remaining:n+F(Math.max(0,r.budgetDelta||0)),sow_pct_complete:Math.round(r.pctComplete||0)+`%`,sow_delta:n+F(r.budgetDelta||0)}}function A(e,t,n){return e.split(t).join(n)}function j(e,t=!1){let n=t?`<w:b/><w:bCs/>`:``;return`<w:tr>${e.map(e=>`<w:tc><w:p><w:r><w:rPr>${n}</w:rPr><w:t xml:space="preserve">${T(String(e??``))}</w:t></w:r></w:p></w:tc>`).join(``)}</w:tr>`}function M(e){let t=e.data?.config?.currency_symbol||`€`,n=(e.budgetPhases||[]).map(e=>j([e.name,t+F(e.planned),t+F(e.actual),t+F(e.delta),e.status])).join(``),r=e.totals||{};return n+j([`Total`,t+F(r.budget||0),t+F(r.burn||0),t+F(r.budgetDelta||0),``],!0)}function N(e){return(e.sprintScope||[]).map(e=>j([e.sprint,e.done||0,e.inProgress||0,e.todo||0,e.total||0])).join(``)}function P(e){return(e.holidays||[]).map(e=>j([e.person,e.dates,e.days,e.coverage||``])).join(``)}function F(e){return Number(e).toLocaleString(`en-IE`,{maximumFractionDigits:0})}var ie=`https://www.googleapis.com/auth/drive.file`,I=null,L=null,R=0,z=!1,B=!1,V=[];function H(){return new Promise((t,n)=>{if(L&&Date.now()<R){t(L);return}if(V.push({resolve:t,reject:n}),z)return;function r(e){z=!0,I.requestAccessToken({prompt:e})}if(I){r(``);return}if(typeof google>`u`||!google.accounts?.oauth2){let e=Error(`Google Identity Services not loaded. Ensure the GIS script is in report.html.`);V.splice(0).forEach(t=>t.reject(e));return}I=google.accounts.oauth2.initTokenClient({client_id:e,scope:ie,callback(e){if(z=!1,e.error){if(!B){B=!0,r(`consent`);return}B=!1,V.splice(0).forEach(t=>t.reject(Error(e.error)));return}B=!1,L=e.access_token,R=Date.now()+((e.expires_in||3600)-60)*1e3,V.splice(0).forEach(e=>e.resolve(L))},error_callback(e){z=!1,B=!1,V.splice(0).forEach(t=>t.reject(e))}}),r(``)})}async function U(e,t){let n=await H(),r=`ct_rpt_`+Date.now(),i=JSON.stringify({name:t.replace(/\.docx$/i,``),mimeType:`application/vnd.google-apps.document`}),a=new TextEncoder,o=a.encode(`--${r}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${i}\r\n`),s=a.encode(`--${r}\r\nContent-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document\r\n\r\n`),c=a.encode(`\r\n--${r}--`),l=await e.arrayBuffer(),u=new Uint8Array(o.length+s.length+l.byteLength+c.length),d=0;u.set(o,d),d+=o.length,u.set(s,d),d+=s.length,u.set(new Uint8Array(l),d),d+=l.byteLength,u.set(c,d);let f=await fetch(`https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink`,{method:`POST`,headers:{Authorization:`Bearer ${n}`,"Content-Type":`multipart/related; boundary=${r}`},body:u});if(!f.ok){let e=await f.text();throw Error(`Drive API ${f.status}: ${e.slice(0,200)}`)}return f.json()}function W(){try{return JSON.parse(localStorage.getItem(`ct_profiles`)||`[]`).sort((e,t)=>(t.lastUsed||0)-(e.lastUsed||0))[0]||null}catch{}return null}var G={data:null,sheetId:null,sprintName:``,sprintStats:{donePct:0,inProgressPct:0,todoPct:0,doneCount:0,total:0},rag:{overall:`OK`,scope:`OK`,schedule:`OK`,budget:`OK`,risk:`OK`},budgetPhases:[],sprintScope:[],holidays:[],totals:{},sections:{executive_summary:``,sprint_progress:``,rag_overall_reason:``,rag_scope_reason:``,rag_schedule_reason:``,rag_budget_reason:``,rag_risk_reason:``}};function K(e){let n=e.config||{},r=e.jiraIssues||[],i=e.rawPhases||[],a=e.actuals||[],l=e.plan||[],u=e.leaves||{},d={},f={},p=[],m=new Set;i.forEach(e=>{let t=e||``;!t||m.has(t)||(m.add(t),p.push(t),d[t]=0,f[t]=0)});let h={};l.forEach(e=>{if(e.phase&&e.dateStr){let n=t(c(e.dateStr));n&&!h[n]&&(h[n]=e.phase)}}),a.forEach(e=>{let n=c(e.Date);if(!n)return;let r=h[t(n)]||``,i=parseFloat(e.Subtotal)||0;i>0&&d[r]!==void 0&&(d[r]+=i)}),l.forEach(e=>{let t=e.phase||``,n=(parseFloat(e.planH)||0)*(parseFloat(e.plannedRate)||0);n>0&&f[t]!==void 0&&(f[t]+=n)}),G.budgetPhases=p.map(e=>({name:e,planned:Math.round(f[e]||0),actual:Math.round(d[e]||0),delta:Math.round((f[e]||0)-(d[e]||0)),status:`Ongoing`}));let g=parseFloat(n.budget||0),_=G.budgetPhases.reduce((e,t)=>e+t.actual,0);G.totals={budget:g,burn:_,pctComplete:g>0?_/g*100:0,budgetDelta:g-_};let v={},y=e.jiraConfig?.sprint_dates||{};r.forEach(e=>{let t=e.sprint||`Unknown`,n=o(e.status||``);v[t]||(v[t]={done:0,inProgress:0,todo:0}),s.has(n)?v[t].done++:n===`development`?v[t].inProgress++:v[t].todo++});let b=new Date().toISOString().slice(0,10),x=``,S=``;Object.entries(y).forEach(([e,t])=>{let n=t?.start||t?.[0]||``;n<=b&&n>S&&(S=n,x=e)}),x||=Object.keys(v).pop()||``,G.sprintName=x;let C=v[x]||{done:0,inProgress:0,todo:0},w=C.done+C.inProgress+C.todo||1;G.sprintStats={doneCount:C.done,inProgressCount:C.inProgress,todoCount:C.todo,total:w,donePct:Math.round(C.done/w*100),inProgressPct:Math.round(C.inProgress/w*100),todoPct:Math.round(C.todo/w*100)},G.sprintScope=Object.entries(v).map(([e,t])=>({sprint:e,done:t.done,inProgress:t.inProgress,todo:t.todo,total:t.done+t.inProgress+t.todo}));let T=G.totals.pctComplete;G.rag.budget=T>110?`Red`:T>95?`Amber`:`OK`,G.rag.overall=G.rag.budget===`Red`?`Red`:`OK`,G.holidays=[],Object.entries(u).forEach(([e,t])=>{t?.length&&G.holidays.push({person:e,dates:t.slice(0,3).join(`, `)+(t.length>3?`… +${t.length-3}`:``),days:t.length,coverage:``})})}function q(e){let t=(e||``).toLowerCase();return t===`ok`||t===`green`?`rag-ok`:t===`amber`||t===`change request`||t===`cr`?`rag-cr`:`rag-bad`}function J(){return`
    <div class="rpt-card">
      <div class="rpt-card-header">
        <span class="rpt-card-title">Project Dashboard — RAG Status</span>
        <button class="btn-ai" onclick="window.draftRAGReasons(this)">
          <span class="ai-label">✦ Draft reasons with AI</span>
          <span class="ai-spinner">…</span>
        </button>
      </div>
      <div class="rpt-card-body">
        <table class="rpt-rag-table">
          <thead><tr><th>Category</th><th>Current</th><th>Reason (if Amber/Red)</th></tr></thead>
          <tbody>
            ${[{key:`overall`,label:`Overall`},{key:`scope`,label:`Scope`},{key:`schedule`,label:`Schedule`},{key:`budget`,label:`Budget`},{key:`risk`,label:`Risk`}].map(e=>`
              <tr>
                <td>${a(e.label)}</td>
                <td><span class="${q(G.rag[e.key])}">${a(G.rag[e.key])}</span></td>
                <td><input type="text" id="rag-reason-${e.key}" placeholder="—"
                     value="${a(G.sections[`rag_${e.key}_reason`])}"
                     oninput="window.updateSection('rag_${e.key}_reason', this.value)"></td>
              </tr>`).join(``)}
          </tbody>
        </table>
      </div>
    </div>`}function ae(){return`
    <div class="rpt-card">
      <div class="rpt-card-header">
        <span class="rpt-card-title">Executive Summary</span>
        <button class="btn-ai" onclick="window.draftAI('executive_summary', this)">
          <span class="ai-label">✦ Draft with AI</span>
          <span class="ai-spinner">…</span>
        </button>
      </div>
      <div class="rpt-card-body">
        <textarea class="rpt-textarea" rows="6" id="section-executive_summary"
          oninput="window.updateSection('executive_summary', this.value)"
          placeholder="AI draft will appear here, or type your own…">${a(G.sections.executive_summary)}</textarea>
      </div>
    </div>`}function oe(){let e=G.sprintStats;return`
    <div class="rpt-card">
      <div class="rpt-card-header">
        <span class="rpt-card-title">Sprint Progress — ${a(G.sprintName)}</span>
        <button class="btn-ai" onclick="window.draftAI('sprint_progress', this)">
          <span class="ai-label">✦ Draft with AI</span>
          <span class="ai-spinner">…</span>
        </button>
      </div>
      <div class="rpt-card-body">
        <div class="rpt-sprint-stats">
          <div class="rpt-stat"><span class="rpt-stat-label">Done</span><span class="rpt-stat-value rag-ok">${e.donePct}%</span></div>
          <div class="rpt-stat"><span class="rpt-stat-label">In Progress</span><span class="rpt-stat-value">${e.inProgressPct}%</span></div>
          <div class="rpt-stat"><span class="rpt-stat-label">Not Started</span><span class="rpt-stat-value">${e.todoPct}%</span></div>
          <div class="rpt-stat"><span class="rpt-stat-label">Total Tickets</span><span class="rpt-stat-value">${e.total}</span></div>
        </div>
        <textarea class="rpt-textarea" rows="3" id="section-sprint_progress"
          oninput="window.updateSection('sprint_progress', this.value)"
          placeholder="AI draft will appear here, or type your own…">${a(G.sections.sprint_progress)}</textarea>
      </div>
    </div>`}function se(){let e=G.data?.config?.currency_symbol||`€`,t=e=>Number(e).toLocaleString(`en-IE`,{maximumFractionDigits:0}),n=G.budgetPhases.map(n=>`
    <tr>
      <td>${a(n.name)}</td>
      <td class="num">${e}${t(n.planned)}</td>
      <td class="num">${e}${t(n.actual)}</td>
      <td class="num">${e}${t(n.delta)}</td>
      <td>${a(n.status)}</td>
    </tr>`).join(``),r=G.totals;return`
    <div class="rpt-card">
      <div class="rpt-card-header"><span class="rpt-card-title">Budget Burndown</span></div>
      <div class="rpt-card-body">
        <div class="rpt-sprint-stats">
          <div class="rpt-stat"><span class="rpt-stat-label">SOW Burned</span><span class="rpt-stat-value">${e}${t(r.burn)}</span></div>
          <div class="rpt-stat"><span class="rpt-stat-label">Remaining</span><span class="rpt-stat-value">${e}${t(Math.max(0,r.budgetDelta))}</span></div>
          <div class="rpt-stat"><span class="rpt-stat-label">% Complete</span><span class="rpt-stat-value">${Math.round(r.pctComplete)}%</span></div>
        </div>
        <table class="rpt-data-table">
          <thead><tr><th>Phase</th><th>Planned</th><th>Actual</th><th>Delta</th><th>Status</th></tr></thead>
          <tbody>
            ${n}
            <tr class="summary-row">
              <td>Total</td>
              <td class="num">${e}${t(r.budget)}</td>
              <td class="num">${e}${t(r.burn)}</td>
              <td class="num">${e}${t(r.budgetDelta)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`}function ce(){return G.holidays.length?`
    <div class="rpt-card">
      <div class="rpt-card-header"><span class="rpt-card-title">Holiday Tracker</span></div>
      <div class="rpt-card-body">
        <table class="rpt-data-table">
          <thead><tr><th>Resource</th><th>Dates</th><th>Days</th><th>Coverage</th></tr></thead>
          <tbody>
            ${G.holidays.map((e,t)=>`
              <tr>
                <td>${a(e.person)}</td>
                <td>${a(e.dates)}</td>
                <td>${e.days}</td>
                <td><input type="text" style="width:100%;border:1px solid var(--border);border-radius:4px;padding:2px 6px;background:var(--bg);color:var(--text);font-size:0.82rem"
                     placeholder="Coverage plan…"
                     oninput="window.updateHolidayCoverage(${t}, this.value)"></td>
              </tr>`).join(``)}
          </tbody>
        </table>
      </div>
    </div>`:``}function le(){document.getElementById(`rpt-sections`).innerHTML=J()+ae()+oe()+se()+ce()}function Y(e){let t=G.data?.config||{},n={projectName:t.project_name,sprintName:G.sprintName,ragStatuses:G.rag,budgetPctComplete:Math.round(G.totals.pctComplete),budgetBurned:G.totals.burn,budgetTotal:G.totals.budget,currency:t.currency_symbol||`€`};return e===`executive_summary`||e===`rag_reasons`?{...n,sprintStats:G.sprintStats}:e===`sprint_progress`?{...n,sprintStats:G.sprintStats,sprintScope:G.sprintScope}:n}async function X(e,t){e.classList.add(`loading`),e.disabled=!0;try{await t()}catch(e){alert(`AI draft failed: `+e.message)}finally{e.classList.remove(`loading`),e.disabled=!1}}window.draftAI=function(e,t){X(t,async()=>{let t=await b(e,Y(e),G.sheetId);G.sections[e]=t;let n=document.getElementById(`section-${e}`);n&&(n.value=t)})},window.draftRAGReasons=function(e){X(e,async()=>{let e=await b(`rag_reasons`,Y(`rag_reasons`),G.sheetId),t={};try{t=JSON.parse(e)}catch{t={}}[`overall`,`scope`,`schedule`,`budget`,`risk`].forEach(e=>{let n=t[e]||``;G.sections[`rag_${e}_reason`]=n;let r=document.getElementById(`rag-reason-${e}`);r&&(r.value=n)})})},window.updateSection=function(e,t){G.sections[e]=t},window.updateHolidayCoverage=function(e,t){G.holidays[e]&&(G.holidays[e].coverage=t)},window.generateReport=function(){te(G)},window.sendToGoogleDocs=async function(){let e=document.getElementById(`btn-gdocs`),t=document.getElementById(`btn-gdocs-label`),n=document.getElementById(`btn-gdocs-spinner`);e.disabled=!0,t.style.display=`none`,n.style.display=``;try{let e=await U(await O(G),k(G));window.open(e.webViewLink,`_blank`)}catch(e){alert(`Failed to send to Google Docs: `+e.message)}finally{e.disabled=!1,t.style.display=``,n.style.display=`none`}};function Z(e){document.getElementById(e).style.display=``}function Q(e){document.getElementById(e).style.display=`none`}function $(e){Q(`rpt-loading`),document.getElementById(`rpt-error-msg`).textContent=e,Z(`rpt-error`)}window.addEventListener(`load`,async()=>{if(!i()){Q(`rpt-loading`),Z(`rpt-auth-wall`);return}let e=W();if(!e){Q(`rpt-loading`),Z(`rpt-no-project`);return}G.sheetId=e.sheetId,document.getElementById(`rpt-project-name`).textContent=e.name||`Project`;try{let e=await fetch(r(`t=${Date.now()}&sheetId=${encodeURIComponent(G.sheetId)}`));if(!e.ok)throw Error(`HTTP ${e.status}`);G.data=await e.json(),K(G.data)}catch(e){$(`Failed to load project data: `+e.message);return}Q(`rpt-loading`),document.getElementById(`rpt-sprint-label`).textContent=G.sprintName||``,le(),Z(`rpt-main`)});export{v as n,h as t};
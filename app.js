
(function(){
const D=window.NPSN_DATA||{states:[],electionTypes:[]};
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
function nav(){
 const toggle=$(".menu-toggle"), menu=$(".menu");
 if(toggle) toggle.addEventListener("click",()=>menu.classList.toggle("open"));
}
function renderStates(){
 const grid=$("#stateGrid"), input=$("#stateSearch"), filter=$("#stateFilter");
 if(!grid)return;
 const draw=()=>{
  const q=(input?.value||"").toLowerCase().trim(), f=filter?.value||"All";
  const rows=D.states.filter(s=>(!q||s.name.toLowerCase().includes(q))&&(f==="All"||s.category===f));
  grid.innerHTML=rows.map((s,i)=>`<article class="card state-card reveal"><span class="tag">${esc(s.category)}</span><h3>${esc(s.name)}</h3><p>Election intelligence, constituency research, organisation and local-governance pathways.</p><br><a href="state.html?state=${encodeURIComponent(s.name)}">Open state profile →</a></article>`).join("")||`<div class="card"><strong>No matching state/UT.</strong></div>`;
 };
 input?.addEventListener("input",draw);filter?.addEventListener("change",draw);draw();
}
function statePage(){
 const el=$("#statePage"); if(!el)return;
 const name=new URLSearchParams(location.search).get("state")||"India";
 const state=D.states.find(s=>s.name===name);
 const category=state?.category||"National";
 $("#stateTitle").textContent=name;
 $("#stateSubtitle").textContent=state?`${state.category} strategic and election information hub`:"India strategic and election information hub";
 el.innerHTML=`
 <div class="grid grid-3">
 ${D.electionTypes.map(x=>`<article class="card"><span class="tag">Election level</span><h3>${esc(x.name)}</h3><p>${esc(x.description)}. Use official notifications and results as the authoritative record.</p></article>`).join("")}
 </div>
 <br>
 <div class="notice"><strong>Source discipline:</strong> NPSN treats official election notifications, results and applicable law/rules as the primary record. Secondary analysis should be clearly identified as analysis.</div>`;
}
function ai(){
 const box=$("#chat"), input=$("#chatInput"), send=$("#chatSend"); if(!box)return;
 const answer=q=>{
  q=q.toLowerCase();
  if(q.includes("election"))return "I can structure election research by election type, state/UT, district, constituency, candidate, result and source. For live facts, connect an official-data retrieval layer.";
  if(q.includes("organisation")||q.includes("organization"))return "A practical organisation audit can map hierarchy, roles, geographic coverage, volunteer systems, reporting cadence, training and performance indicators.";
  if(q.includes("strategy"))return "NPSN’s working sequence is Listen → Research → Analyse → Strategise → Organise → Execute → Measure → Adapt.";
  if(q.includes("legal")||q.includes("law"))return "Political and electoral work should be checked against the applicable ECI/SEC notifications, election laws, local rules, privacy requirements and other jurisdiction-specific obligations.";
  return "I’m the NPSN AI demonstration layer. Ask about strategy, elections, organisation or legal/compliance workflow.";
 };
 const add=(text,who)=>{const d=document.createElement("div");d.className="msg "+who;d.textContent=text;box.appendChild(d);box.scrollTop=box.scrollHeight};
 send?.addEventListener("click",()=>{const q=input.value.trim();if(!q)return;add(q,"user");input.value="";setTimeout(()=>add(answer(q),"bot"),180)});
 input?.addEventListener("keydown",e=>{if(e.key==="Enter")send.click()});
}
function assessment(){
 const f=$("#assessment"); if(!f)return;
 f.addEventListener("submit",e=>{e.preventDefault();$("#formStatus").textContent="Assessment captured locally for this demo. A production deployment needs a secure backend or approved form service.";});
}
function year(){const y=$("#year");if(y)y.textContent=new Date().getFullYear()}
document.addEventListener("DOMContentLoaded",()=>{nav();renderStates();statePage();ai();assessment();year()});
})();

// Lightweight bilingual UI helper. Core content remains English; Hindi navigation labels
// are provided without external libraries and can be expanded page-by-page.
const NPSN_LANG = {
  en:{home:"Home",strategy:"Strategy",elections:"Elections",research:"Research",organisation:"Organisation",ai:"NPSN AI",about:"About",compliance:"Compliance",contact:"Contact"},
  hi:{home:"होम",strategy:"रणनीति",elections:"चुनाव",research:"अनुसंधान",organisation:"संगठन",ai:"NPSN AI",about:"परिचय",compliance:"अनुपालन",contact:"संपर्क"}
};
function setupLang(){
  const b=document.querySelector("#langToggle"); if(!b)return;
  const key="npsn_lang"; let lang=localStorage.getItem(key)||"en";
  const apply=()=>{
    document.documentElement.lang=lang==="hi"?"hi":"en";
    b.textContent=lang==="hi"?"English":"हिन्दी";
    document.querySelectorAll("[data-en][data-hi]").forEach(el=>el.textContent=lang==="hi"?el.dataset.hi:el.dataset.en);
  };
  b.addEventListener("click",()=>{lang=lang==="en"?"hi":"en";localStorage.setItem(key,lang);apply()}); apply();
}
document.addEventListener("DOMContentLoaded",setupLang);

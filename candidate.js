
(function(){
const KEY="npsn_candidate_workspace_v1";
const defaults={tasks:[],issues:[],members:[],checks:[
 ["Applicable election notification checked",false],
 ["Campaign expenditure / record process checked",false],
 ["Required permissions / local rules checked",false],
 ["Published material reviewed for accuracy and attribution",false],
 ["Data collection purpose and access controls checked",false]
]};
function load(){try{return JSON.parse(localStorage.getItem(KEY))||structuredClone(defaults)}catch(e){return structuredClone(defaults)}}
function save(d){localStorage.setItem(KEY,JSON.stringify(d));render(d)}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function render(d){
 const tasks=$("#taskList"),issues=$("#issueList"),members=$("#memberList"),checks=$("#checkList");
 if(!tasks)return;
 tasks.innerHTML=d.tasks.map((x,i)=>`<div class="card" style="padding:12px;margin:7px 0;display:flex;justify-content:space-between;gap:10px"><span><b>${esc(x.text)}</b><small style="display:block;color:#5f6b78">${esc(x.priority)}</small></span><button class="btn" data-del="task" data-i="${i}">✓</button></div>`).join("")||'<p class="small">No tasks yet.</p>';
 issues.innerHTML=d.issues.map((x,i)=>`<div class="card" style="padding:12px;margin:7px 0;display:flex;justify-content:space-between;gap:10px"><span><b>${esc(x.text)}</b><small style="display:block;color:#5f6b78">${esc(x.area)}</small></span><button class="btn" data-del="issue" data-i="${i}">✓</button></div>`).join("")||'<p class="small">No issues yet.</p>';
 members.innerHTML=d.members.map((x,i)=>`<div class="card" style="padding:12px;margin:7px 0;display:flex;justify-content:space-between;gap:10px"><span><b>${esc(x.name)}</b><small style="display:block;color:#5f6b78">${esc(x.role)}</small></span><button class="btn" data-del="member" data-i="${i}">×</button></div>`).join("")||'<p class="small">No team members yet.</p>';
 checks.innerHTML=d.checks.map((x,i)=>`<label style="display:flex;gap:9px;margin:12px 0;align-items:flex-start"><input type="checkbox" data-check="${i}" ${x[1]?"checked":""}> <span>${esc(x[0])}</span></label>`).join("");
 $("#kpiTasks").textContent=d.tasks.length;$("#kpiIssues").textContent=d.issues.length;$("#kpiTeam").textContent=d.members.length;$("#kpiChecks").textContent=d.checks.filter(x=>!x[1]).length;
 $$("[data-del]").forEach(b=>b.onclick=()=>{d[b.dataset.del+"s"].splice(+b.dataset.i,1);save(d)});
 $$("[data-check]").forEach(b=>b.onchange=()=>{d.checks[+b.dataset.check][1]=b.checked;save(d)});
}
function init(){
 if(!$("#taskList"))return; let d=load();
 $("#addTask").onclick=()=>{let v=$("#taskText").value.trim();if(!v)return;d.tasks.push({text:v,priority:$("#taskPriority").value});$("#taskText").value="";save(d)};
 $("#addIssue").onclick=()=>{let v=$("#issueText").value.trim();if(!v)return;d.issues.push({text:v,area:$("#issueArea").value.trim()||"Unspecified"});$("#issueText").value="";$("#issueArea").value="";save(d)};
 $("#addMember").onclick=()=>{let n=$("#memberName").value.trim(),r=$("#memberRole").value.trim();if(!n)return;d.members.push({name:n,role:r||"Team"});$("#memberName").value="";$("#memberRole").value="";save(d)};
 render(d);
}
document.addEventListener("DOMContentLoaded",init);
})();

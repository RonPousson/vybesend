import {initial,tiers,calculate,waves,money,num} from "./planner.js";
let plan={...initial},waveCount=1,tab="builder";
const $=s=>document.querySelector(s), el=(tag,attrs={},text="")=>{const n=document.createElement(tag);for(const [key,value] of Object.entries(attrs)){if(key==="class")n.className=value;else n.setAttribute(key,value);}n.textContent=text;return n;};
const render=()=>{
 const r=calculate(plan);
 const titles={builder:"Campaign Builder",optimizer:"Multi-Touch Planner",financial:"Financial Model",readiness:"Launch Readiness"};
 $("#title").textContent=titles[tab];$("#crumb").textContent=" / "+titles[tab].toUpperCase();
 document.querySelectorAll("[data-tab]").forEach(b=>b.classList.toggle("selected",b.dataset.tab===tab));
 const metrics=[["＄","Campaign budget",money(plan.budget)],["➤","Total deployments",num(plan.totalSends)],["♙","Unique audience",num(plan.uniqueContacts)],["↻","Repeat deployments",r.error?"—":num(r.repeat)]];
 $("#metrics").innerHTML=metrics.map(([i,l,v])=>'<div class="metric"><div class="ico">'+i+'</div><div><span>'+l+'</span><strong>'+v+'</strong></div></div>').join("");
 const area=$("#workspace");area.innerHTML="";
 if(tab==="readiness")return readiness(area);
 if(tab==="financial")return financial(area,r);
 const left=el("section",{class:"panel"}),right=el("section",{class:"panel"});
 left.innerHTML='<div class="panelhead"><h2>Campaign configuration</h2><p>Select a trial package or customize the delivery mix.</p></div>';
 const tierrow=el("div",{class:"tierrow"});tiers.forEach(t=>{const b=el("button",{class:"tier"+(plan.budget===t.budget&&plan.totalSends===t.totalSends?" active":"")});b.append(el("b",{},t.name),el("span",{},money(t.budget)));b.onclick=()=>{plan={...plan,...t,name:t.name+" Performance Trial"};render();};tierrow.append(b);});left.append(tierrow);
 addInput(left,"Client / advertiser","client","text");
 addInput(left,"Campaign name","name","text");
 const fields=el("div",{class:"inputgrid"});left.append(fields);
 addInput(fields,"Campaign budget ($)","budget","number",100);
 addInput(fields,"Total email sends","totalSends","number",5000);
 addInput(fields,"Unique contacts","uniqueContacts","number",5000);
 addInput(fields,"Qualified-lead planning target","targetLeads","number",1);
 const range=el("label",{},"Follow-up waves: "+waveCount),slider=el("input",{type:"range",min:"1",max:"4",value:String(waveCount)});slider.oninput=e=>{waveCount=Number(e.target.value);render();};range.append(slider);left.append(range);
 warn(left,"Follow-up eligibility, licenses, consent, suppressions and recipient frequency caps must be checked before live deployment.");
 right.innerHTML='<div class="panelhead"><h2>✦ AI Multi-Touch Planner</h2><p>Transparent allocation model; automated optimization is not connected yet.</p></div>';
 if(r.error)right.append(el("p",{class:"err"},r.error));else{
  right.innerHTML+='<p>Unique reach: <b>'+((1-r.repeat/plan.totalSends)*100).toFixed(1)+'%</b> · Repeat deployments: <b>'+((r.repeat/plan.totalSends)*100).toFixed(1)+'%</b></p>';
  const stack=el("div",{class:"stack"}),a=el("span",{class:"unique"}),b=el("span",{class:"repeat"});a.style.width=(100*(1-r.repeat/plan.totalSends))+"%";b.style.width=(100*r.repeat/plan.totalSends)+"%";stack.append(a,b);right.append(stack);
  right.innerHTML+='<div class="key"><span><i class="unique"></i> Initial sends</span><span><i class="repeat"></i> Repeat sends</span></div>';
  waves(plan,waveCount).forEach((w,i)=>{const row=el("div",{class:"wave"});row.append(el("div",{class:"count"},String(i+1)));const detail=el("div");detail.append(el("b",{},w.name),el("span",{},i===0?"Initial":'Illustrative day '+w.day));row.append(detail,el("strong",{},num(w.sends)));right.append(row);});
  addRow(right,"Illustrative modeled costs",money(r.totalCost));
  addRow(right,"Remaining before unmodeled costs",money(r.contribution),r.contribution>=0?"green":"");
  addRow(right,"Modeled contribution margin",(r.margin*100).toFixed(1)+"%");
  right.append(el("p",{class:"smallnote"},"No verified vendor costs; these figures exclude any unentered labor, software, call-tracking and other expenses. Targets are not guarantees."));
 }
 const grid=el("div",{class:"columns"});grid.append(left,right);area.append(grid);
};
function addInput(parent,label,key,type,step=1){
 const wrap=el("label",{},label),i=el("input",{type,value:String(plan[key]),...(type==="number"?{step:String(step),min:"0"}:{})});
 i.addEventListener("change",()=>{const v=type==="number"?Number(i.value):i.value;plan[key]=v;if(key==="totalSends"&&plan.uniqueContacts>v)plan.uniqueContacts=v;render();});
 wrap.append(i);parent.append(wrap);
}
function warn(parent,txt){parent.append(el("div",{class:"warn"},"⚠  "+txt));}
function addRow(parent,l,v,cls=""){const row=el("div",{class:"row"});row.append(el("span",{},l),el("b",{class:cls},v));parent.append(row);}
function financial(parent,r){
 const grid=el("div",{class:"columns"}),left=el("section",{class:"panel"}),right=el("section",{class:"panel"});grid.append(left,right);parent.append(grid);
 left.innerHTML='<div class="panelhead"><h2>Wholesale assumptions</h2><p>Model scenarios, not verified vendor quotes.</p></div>';
 const fields=el("div",{class:"inputgrid"});left.append(fields);
 addInput(fields,"Audience acquisition CPM ($)","audienceCPM","number",0.5);addInput(fields,"Deployment CPM ($)","sendCPM","number",0.5);addInput(fields,"Other modeled costs ($)","otherCosts","number",50);addInput(fields,"Client campaign price ($)","budget","number",100);
 warn(left,"Licensing, permissions, actual sending rates, landing pages, labor and call tracking still require verification.");
 right.innerHTML='<div class="panelhead"><h2>Contribution model</h2><p>Planning only; not net profit.</p></div>';
 if(r.error){right.append(el("p",{class:"err"},r.error));return;}
 const big=el("div",{class:"bigvalue"},money(r.contribution));big.append(el("small",{},"Remaining before unmodeled costs"));right.append(big);
 [["Client revenue",money(plan.budget)],["Audience cost",money(r.audienceCost)],["Sending cost",money(r.deploymentCost)],["Other modeled costs",money(plan.otherCosts)],["Total modeled costs",money(r.totalCost)],["Contribution margin",(r.margin*100).toFixed(1)+"%"],["Revenue per 1,000 sends","$"+(plan.budget/plan.totalSends*1000).toFixed(2)],["Revenue / target lead, if achieved",plan.targetLeads?money(plan.budget/plan.targetLeads):"N/A"]].forEach(([l,v])=>addRow(right,l,v));
}
function readiness(parent){
 const box=el("section",{class:"readiness"});warn(box,"No sending, payments, authentication or data storage is connected. Do not deploy live campaigns.");
 const items=[
 ["Audience licenses and permissions","Provider contracts must explicitly allow the selected advertising use and repeat contacts."],
 ["Suppressions and delivery safeguards","Build opt-out, complaint, bounce and conversion suppression, dedupe, frequency caps, unsubscribe headers and audit logs."],
 ["Compliant sending provider","Verify acceptable use, sending consent basis, SPF, DKIM, DMARC, monitoring and throttling before launch."],
 ["Landing pages and attribution","Integrate tracking numbers, recording consent, CRM lead validation, and reports by deployment wave."],
 ["Authentication and security","Implement operator authentication, server-side roles, secret vault and client data segregation."],
 ["Ghost editorial integration","Optional creative/publishing integration; Ghost subscriber infrastructure does not authorize third-party cold list sends."]
 ];
 items.forEach(([title,text],i)=>{const row=el("div",{class:"check"}),d=el("div");d.append(el("b",{},title),el("p",{},text));row.append(el("div",{class:"n"},String(i+1)),d,el("span",{class:"pending"},"NOT CONNECTED"));box.append(row);});parent.append(box);
}
document.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{tab=b.dataset.tab;render();});
$("#copy").onclick=async()=>{const data={...plan,estimatedEconomics:calculate(plan),waves:waves(plan,waveCount),notice:"Illustrative only. No audience/provider rights, send permissions or outcomes verified."};try{await navigator.clipboard.writeText(JSON.stringify(data,null,2));$("#copy").textContent="✓ Copied";setTimeout(()=>$("#copy").textContent="▢   Copy Campaign JSON",1500)}catch{$("#copy").textContent="Clipboard unavailable";}};
render();

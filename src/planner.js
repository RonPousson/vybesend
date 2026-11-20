export const tiers = [
  {name:"Silver",budget:2800,totalSends:75000,uniqueContacts:60000,targetLeads:8},
  {name:"Gold",budget:3700,totalSends:125000,uniqueContacts:100000,targetLeads:15},
  {name:"Platinum",budget:5500,totalSends:200000,uniqueContacts:150000,targetLeads:25}
];
export const initial = {client:"SOV Media / Allegiance Gold",name:"Platinum Performance Trial",...tiers[2],audienceCPM:4,sendCPM:4,otherCosts:0};
export const integer = x => Number.isInteger(x)&&x>=0;
export function calculate(p){
 const keys=["budget","totalSends","uniqueContacts","targetLeads","audienceCPM","sendCPM","otherCosts"];
 if(keys.some(k=>!Number.isFinite(p[k])||p[k]<0)||!integer(p.totalSends)||!integer(p.uniqueContacts)||!integer(p.targetLeads)||p.totalSends<1||p.uniqueContacts<1||p.uniqueContacts>p.totalSends)
   return {error:"Enter valid nonnegative amounts; unique contacts must be between 1 and total sends."};
 const repeat=p.totalSends-p.uniqueContacts;
 const audienceCost=p.uniqueContacts*p.audienceCPM/1000, deploymentCost=p.totalSends*p.sendCPM/1000;
 const totalCost=audienceCost+deploymentCost+p.otherCosts, contribution=p.budget-totalCost;
 return {repeat,audienceCost,deploymentCost,totalCost,contribution,margin:p.budget?contribution/p.budget:0};
}
export function waves(p,count=1){
 const c=calculate(p);if(c.error||!integer(count)||count<1||count>6)return [];
 const base=Math.floor(c.repeat/count);
 return [{name:"Initial deployment",sends:p.uniqueContacts,day:0},...Array.from({length:count},(_,i)=>({name:"Follow-up "+(i+1),sends:base+(i<c.repeat%count?1:0),day:(i+1)*3}))];
}
export const money=v=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(v);
export const num=v=>new Intl.NumberFormat("en-US").format(v);

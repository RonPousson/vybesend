import test from "node:test";
import assert from "node:assert/strict";
import {initial,calculate,waves} from "../src/planner.js";
test("Platinum modeled costs",()=>{const r=calculate(initial);assert.equal(r.repeat,50000);assert.equal(r.audienceCost,600);assert.equal(r.deploymentCost,800);assert.equal(r.contribution,4100);});
test("All sends are accounted for",()=>assert.equal(waves(initial,3).reduce((n,w)=>n+w.sends,0),200000));
test("No double-counting unique contacts",()=>assert.ok(calculate({...initial,uniqueContacts:210000}).error));
test("No division by zero",()=>assert.equal(calculate({...initial,budget:0}).margin,0));

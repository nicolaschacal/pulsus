import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Idea, Project, PulsusData, Session, ProjectStatus } from "@/types";
const KEY = "pulsus.v1.data";
const initial: PulsusData = { ideas:[], projects:[], sessions:[] };
type Ctx = PulsusData & { ready:boolean; addIdea:(title:string,note:string)=>void; updateIdea:(id:string,patch:Partial<Idea>)=>void; deleteIdea:(id:string)=>void; createProjectFromIdea:(id:string,hours:number,budget:number)=>void; addProject:(title:string,description:string,hours:number,budget:number)=>void; updateProject:(id:string,patch:Partial<Project>)=>void; logSession:(id:string,minutes:number)=>void; setProjectStatus:(id:string,status:ProjectStatus)=>void };
const Context = createContext<Ctx|null>(null);
export function PulsusProvider({children}:{children:React.ReactNode}) {
 const [data,setData]=useState<PulsusData>(initial); const [ready,setReady]=useState(false);
 useEffect(()=>{ AsyncStorage.getItem(KEY).then(raw=>{if(raw)setData(JSON.parse(raw) as PulsusData)}).catch(()=>{}).finally(()=>setReady(true)); },[]);
 useEffect(()=>{if(ready)AsyncStorage.setItem(KEY,JSON.stringify(data)).catch(()=>{});},[data,ready]);
 const value=useMemo<Ctx>(()=>({ ...data,ready,
  addIdea:(title,note)=>setData(p=>({...p,ideas:[{id:String(Date.now()),title:title.trim(),note:note.trim(),createdAt:new Date().toISOString(),status:"inbox"},...p.ideas]})),
  updateIdea:(id,patch)=>setData(p=>({...p,ideas:p.ideas.map(x=>x.id===id?{...x,...patch}:x)})),
  deleteIdea:id=>setData(p=>({...p,ideas:p.ideas.filter(x=>x.id!==id)})),
  createProjectFromIdea:(id,hours,budget)=>setData(p=>{const idea=p.ideas.find(x=>x.id===id);if(!idea)return p;const project:Project={id:String(Date.now()),title:idea.title,description:idea.note,weeklyHours:hours,moneyBudget:budget,moneySpent:0,minutesLogged:0,status:"active",createdAt:new Date().toISOString()};return {...p,ideas:p.ideas.filter(x=>x.id!==id),projects:[project,...p.projects]}}),
  addProject:(title,description,hours,budget)=>setData(p=>({...p,projects:[{id:String(Date.now()),title:title.trim(),description:description.trim(),weeklyHours:hours,moneyBudget:budget,moneySpent:0,minutesLogged:0,status:"active",createdAt:new Date().toISOString()},...p.projects]})),
  updateProject:(id,patch)=>setData(p=>({...p,projects:p.projects.map(x=>x.id===id?{...x,...patch}:x)})),
  logSession:(id,minutes)=>setData(p=>{const s:Session={id:String(Date.now()),projectId:id,minutes,date:new Date().toISOString(),note:""};return {...p,sessions:[s,...p.sessions],projects:p.projects.map(x=>x.id===id?{...x,minutesLogged:x.minutesLogged+minutes}:x)}}),
  setProjectStatus:(id,status)=>setData(p=>({...p,projects:p.projects.map(x=>x.id===id?{...x,status}:x)}))
 }),[data,ready]);
 return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function usePulsus(){const c=useContext(Context);if(!c)throw new Error("usePulsus must be used inside PulsusProvider");return c;}

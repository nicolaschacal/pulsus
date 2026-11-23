export type IdeaStatus = "inbox" | "incubating" | "archived";
export type ProjectStatus = "active" | "paused" | "review" | "completed" | "discarded";
export type Idea = { id:string; title:string; note:string; createdAt:string; status:IdeaStatus };
export type Project = { id:string; title:string; description:string; weeklyHours:number; moneyBudget:number; moneySpent:number; minutesLogged:number; status:ProjectStatus; createdAt:string };
export type Session = { id:string; projectId:string; minutes:number; date:string; note:string };
export type PulsusData = { ideas:Idea[]; projects:Project[]; sessions:Session[] };

import React from "react";
import { ScrollView,Text,View } from "react-native";
import { router } from "expo-router";
import { Screen,Heading,Card,Button,Pill } from "@/components/ui";
import { usePulsus } from "@/context/PulsusContext";
import { colors } from "@/constants/theme";
export default function ProjectsScreen(){
 const {projects,setProjectStatus}=usePulsus();
 const active=projects.filter(p=>p.status==="active");
 const other=projects.filter(p=>p.status!=="active");
 const label=(s:string)=>s==="paused"?"En pausa":s==="completed"?"Completado":s==="discarded"?"Descartado":"En revisión";
 return <Screen><ScrollView contentContainerStyle={{paddingBottom:32}} showsVerticalScrollIndicator={false}>
 <Heading subtitle="Pocos proyectos a la vez. Espacio para avanzar y también para descansar.">Tus proyectos</Heading>
 <Button title="+ Nuevo proyecto" onPress={()=>router.push("/project/new")}/>
 <Text style={{color:colors.text,fontSize:18,fontWeight:"700",marginTop:24,marginBottom:12}}>Activos · {active.length}</Text>
 {active.length===0?<Card><Text style={{color:colors.text,fontWeight:"600"}}>No tenés proyectos activos.</Text><Text style={{color:colors.muted}}>Podés convertir una idea en proyecto cuando estés listo.</Text></Card>:active.map(p=><Card key={p.id} style={{marginBottom:12}}><View style={{flexDirection:"row",justifyContent:"space-between"}}><Text style={{color:colors.text,fontSize:17,fontWeight:"700",flex:1}}>{p.title}</Text><Pill tone="green">Activo</Pill></View><Text style={{color:colors.muted,fontSize:13}}>{p.description||"Sin descripción"}</Text><View style={{flexDirection:"row",justifyContent:"space-between"}}><Text style={{color:colors.muted,fontSize:12}}>Presupuesto: {p.weeklyHours} h/semana</Text><Text style={{color:colors.muted,fontSize:12}}>{Math.round(p.minutesLogged/60*10)/10} h registradas</Text></View><Button title="Ver proyecto" secondary onPress={()=>router.push({pathname:"/project/[id]",params:{id:p.id}})}/></Card>)}
 {other.length>0?<><Text style={{color:colors.text,fontSize:18,fontWeight:"700",marginTop:16,marginBottom:12}}>En pausa o cerrados</Text>{other.map(p=><Card key={p.id} style={{marginBottom:10}}><View style={{flexDirection:"row",justifyContent:"space-between"}}><Text style={{color:colors.text,fontWeight:"700",flex:1}}>{p.title}</Text><Pill tone="muted">{label(p.status)}</Pill></View><Button title="Ver proyecto" secondary onPress={()=>router.push({pathname:"/project/[id]",params:{id:p.id}})}/>{p.status==="paused"?<Button title="Reactivar proyecto" onPress={()=>setProjectStatus(p.id,"active")}/>:null}</Card>)}</>:null}
 </ScrollView></Screen>
}
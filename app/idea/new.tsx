import React,{useState} from "react";
import { ScrollView,Text } from "react-native";
import { router } from "expo-router";
import { Screen,Heading,Field,Button,Label } from "@/components/ui";
import { usePulsus } from "@/context/PulsusContext";
import { colors } from "@/constants/theme";
export default function NewIdeaScreen(){const [title,setTitle]=useState("");const [note,setNote]=useState("");const {addIdea}=usePulsus();return <Screen><ScrollView keyboardShouldPersistTaps="handled"><Text onPress={()=>router.back()} style={{color:colors.blue,fontWeight:"700",marginBottom:24}}>‹ Volver</Text><Heading subtitle="No hace falta tener todo resuelto. Guardá la chispa antes de que se escape.">Capturar una idea</Heading><Label>¿Qué se te ocurrió?</Label><Field value={title} onChangeText={setTitle} placeholder="Dale un nombre a tu idea" autoFocus maxLength={90}/><Label>Notas (opcional)</Label><Field value={note} onChangeText={setNote} placeholder="Anotá lo que no querés olvidar..." multiline numberOfLines={5} style={{minHeight:120,textAlignVertical:"top"}}/><Text style={{color:colors.muted,fontSize:12,lineHeight:19,marginVertical:16}}>Guardar una idea no significa comprometerte a realizarla. Por ahora, solo le estamos haciendo un lugar.</Text><Button title="Guardar idea" disabled={!title.trim()} onPress={()=>{addIdea(title,note);router.back()}}/></ScrollView></Screen>}

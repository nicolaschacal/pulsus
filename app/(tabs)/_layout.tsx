import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
export default function TabLayout(){return <Tabs screenOptions={{headerShown:false,tabBarStyle:{backgroundColor:colors.surface,borderTopColor:colors.border,height:84,paddingTop:8,paddingBottom:22},tabBarActiveTintColor:colors.blue,tabBarInactiveTintColor:colors.muted,tabBarLabelStyle:{fontSize:11,fontWeight:"600"}}}>
<Tabs.Screen name="index" options={{title:"Inicio",tabBarIcon:({color,size})=><Ionicons name="pulse-outline" size={size} color={color}/>}}/>
<Tabs.Screen name="ideas" options={{title:"Ideas",tabBarIcon:({color,size})=><Ionicons name="bulb-outline" size={size} color={color}/>}}/>
<Tabs.Screen name="projects" options={{title:"Proyectos",tabBarIcon:({color,size})=><Ionicons name="layers-outline" size={size} color={color}/>}}/>
<Tabs.Screen name="balance" options={{title:"Equilibrio",tabBarIcon:({color,size})=><Ionicons name="leaf-outline" size={size} color={color}/>}}/>
</Tabs>}

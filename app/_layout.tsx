import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PulsusProvider } from "@/context/PulsusContext";
import { colors } from "@/constants/theme";
export default function RootLayout(){return <PulsusProvider><StatusBar style="light"/><Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:colors.bg}}}/></PulsusProvider>}

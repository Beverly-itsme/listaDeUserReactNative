// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },   
        headerTintColor: "#fff",                   
        headerTitleStyle: { fontWeight: "700" },
        tabBarStyle: { backgroundColor: "#000" },   
        tabBarActiveTintColor: "#fff",              // cor do ícone/texto ativo
        tabBarInactiveTintColor: "#888",            
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Lista",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="relatorio"
        options={{
          title: "Relatório",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}



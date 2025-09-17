// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Lista" }} />
      <Tabs.Screen name="relatorio" options={{ title: "Relatório" }} />
    </Tabs>
  );
}


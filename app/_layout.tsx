// para detalhes
import React from "react";
import { Stack } from "expo-router";
import { PessoasProvider } from "../contexts/PessoasContext";

export default function RootLayout() {
  return (
    <PessoasProvider>
      <Stack
       
        screenOptions={{
          headerStyle: { backgroundColor: "#000" },   
          headerTintColor: "#fff",                   
          headerTitleStyle: { fontWeight: "700" },    
          headerShadowVisible: false,                 
        }}
      >
        {/* Tabs ficam sem o header do Stack (a aparência dos tabs está no app/(tabs)/_layout.tsx) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Tela de detalhes (está fora dos tabs) — título definido e herda o estilo preto do screenOptions acima */}
        <Stack.Screen
          name="pessoa/[id]"
          options={{ title: "Detalhes" }}
        />
      </Stack>
    </PessoasProvider>
  );
}



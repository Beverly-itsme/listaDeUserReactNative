// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { PessoasProvider } from "../contexts/PessoasContext";

export default function RootLayout() {
  return (
    <PessoasProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="pessoa/[id]" options={{ title: "Detalhes" }} />
      </Stack>
    </PessoasProvider>
  );
}


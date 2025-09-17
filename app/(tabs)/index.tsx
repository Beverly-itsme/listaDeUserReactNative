// app/(tabs)/index.tsx
import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { usePessoas, Pessoa } from "../../contexts/PessoasContext";

export default function Page() {
  const { pessoas, addPessoa } = usePessoas();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [ano, setAno] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");

  const onAdicionar = () => {
    if (!nome || !email || !ano || !descricao || !imagem) {
      Alert.alert("Preencha todos os campos");
      return;
    }
    const nova: Pessoa = {
      id: Date.now().toString(),
      nome,
      email,
      ano,
      descricao,
      imagem,
    };
    addPessoa(nova);
    setNome(""); setEmail(""); setAno(""); setDescricao(""); setImagem("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Pessoas</Text>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Ano" value={ano} onChangeText={setAno} />
      <TextInput style={styles.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
      <TextInput style={styles.input} placeholder="Link da imagem" value={imagem} onChangeText={setImagem} />

      <TouchableOpacity style={styles.botao} onPress={onAdicionar}>
        <Text style={styles.textoBotao}>Adicionar Pessoa</Text>
      </TouchableOpacity>

      <FlatList
        data={pessoas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => router.push(`/pessoa/${item.id}`)}>
            <Image source={{ uri: item.imagem }} style={styles.avatar} />
            <Text style={styles.textoItem}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titulo: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 6, marginBottom: 8 },
  botao: { backgroundColor: "#007bff", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 12 },
  textoBotao: { color: "#fff", fontWeight: "bold" },
  item: { flexDirection: "row", alignItems: "center", padding: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  textoItem: { marginLeft: 10, fontSize: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
});



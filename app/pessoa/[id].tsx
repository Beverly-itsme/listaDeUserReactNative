// app/pessoa/[id].tsx
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePessoas } from "../../contexts/PessoasContext";

export default function Detalhes() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { pessoas, updatePessoa, removePessoa } = usePessoas();
  const pessoa = pessoas.find((p) => p.id === id);

  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(pessoa?.nome ?? "");
  const [email, setEmail] = useState(pessoa?.email ?? "");
  const [ano, setAno] = useState(pessoa?.ano ?? "");
  const [descricao, setDescricao] = useState(pessoa?.descricao ?? "");
  const [imagem, setImagem] = useState(pessoa?.imagem ?? "");

  if (!pessoa) return (
    <View style={styles.container}><Text>Pessoa não encontrada</Text></View>
  );

  const onSalvar = () => {
    updatePessoa({ id: pessoa.id, nome, email, ano, descricao, imagem });
    setEditando(false);
  };

  const onApagar = () => {
    Alert.alert("Apagar", "Tem a certeza?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Apagar", style: "destructive", onPress: () => { removePessoa(pessoa.id); router.back(); } }
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imagem }} style={styles.imagem} />
      {editando ? (
        <>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} value={ano} onChangeText={setAno} />
          <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />
          <TextInput style={styles.input} value={imagem} onChangeText={setImagem} />
          <TouchableOpacity style={styles.botao} onPress={onSalvar}><Text style={styles.btnText}>Salvar</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.botao, { backgroundColor: "#aaa" }]} onPress={() => setEditando(false)}><Text style={styles.btnText}>Cancelar</Text></TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.titulo}>{pessoa.nome}</Text>
          <Text>Email: {pessoa.email}</Text>
          <Text>Ano: {pessoa.ano}</Text>
          <Text>Descrição: {pessoa.descricao}</Text>

          <TouchableOpacity style={styles.botao} onPress={() => setEditando(true)}><Text style={styles.btnText}>Editar</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.botao, { backgroundColor: "#f44336" }]} onPress={onApagar}><Text style={styles.btnText}>Apagar</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.botao, { backgroundColor: "#666" }]} onPress={() => router.back()}><Text style={styles.btnText}>Voltar</Text></TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  imagem: { width: 140, height: 140, borderRadius: 70, marginBottom: 12 },
  titulo: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 6, marginBottom: 8 },
  botao: { backgroundColor: "#007bff", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 8 },
  btnText: { color: "#fff", fontWeight: "bold" },
});

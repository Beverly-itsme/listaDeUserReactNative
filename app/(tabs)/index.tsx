// app/(tabs)/index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { usePessoas, Pessoa } from "../../contexts/PessoasContext";
import { Ionicons } from "@expo/vector-icons"; // para icons

export default function Page() {
  const { pessoas, addPessoa } = usePessoas();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [ano, setAno] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [botaoHover, setBotaoHover] = useState(false);

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

      <View style={styles.row}>
        <Ionicons name="person-circle-outline" size={28} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.row}>
        <Ionicons name="mail-outline" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.row}>
        <Ionicons name="calendar-outline" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Ano"
          placeholderTextColor="#999"
          value={ano}
          onChangeText={setAno}
        />
      </View>

      <View style={styles.row}>
        <Ionicons name="document-text-outline" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          placeholderTextColor="#999"
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <View style={styles.row}>
        <Ionicons name="image-outline" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Link da imagem"
          placeholderTextColor="#999"
          value={imagem}
          onChangeText={setImagem}
        />
      </View>

      <Pressable
        onPress={onAdicionar}
        onHoverIn={() => setBotaoHover(true)}
        onHoverOut={() => setBotaoHover(false)}
        android_ripple={{ color: "#333" }}
        style={[
          styles.botao,
          botaoHover ? styles.botaoHover : null,
        ]}
      >
        <Ionicons name="add-circle-outline" size={18} style={styles.botaoIcon} />
        <Text style={styles.textoBotao}>Adicionar Pessoa</Text>
      </Pressable>

      <FlatList
        data={pessoas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => {
          const hovered = hoveredItem === item.id;
          return (
            <Pressable
              onPress={() => router.push(`/pessoa/${item.id}`)}
              onHoverIn={() => setHoveredItem(item.id)}
              onHoverOut={() => setHoveredItem(null)}
              style={[
                styles.item,
                hovered ? styles.itemHover : null,
              ]}
            >
              {item.imagem ? (
                <Image source={{ uri: item.imagem }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                  <Ionicons name="person" size={22} color="#fff" />
                </View>
              )}
              <View style={styles.itemTextWrap}>
                <Text style={styles.textoItem}>{item.nome}</Text>
                <View style={styles.metaRow}>
                  <Ionicons name="mail" size={12} style={styles.metaIcon} />
                  <Text style={styles.metaText}>{item.email}</Text>
                  <Ionicons name="calendar" size={12} style={[styles.metaIcon, { marginLeft: 10 }]} />
                  <Text style={styles.metaText}>{item.ano}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} style={styles.chevron} />
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#000", // fundo preto
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  inputIcon: {
    color: "#ccc",
    marginRight: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#0f0f0f",
    color: "#fff",
    paddingVertical: Platform.OS === "web" ? 8 : 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  botao: {
    flexDirection: "row",
    backgroundColor: "#222", // botão cinza escuro
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    // sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    // sombra Android
    elevation: 2,
  },
  botaoHover: {
    backgroundColor: "#333", // fica um pouco mais claro no hover
    transform: [{ scale: 1.02 }],
    // sombra maior no hover
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 6,
    elevation: 6,
  },
  botaoIcon: {
    color: "#fff",
    marginRight: 8,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "700",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: "#070707", // quase preto
    borderWidth: 1,
    borderColor: "#111",
  },
  itemHover: {
    borderColor: "#444",
    transform: [{ translateY: -2 }, { scale: 1.01 }],
    // sombra no hover
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: "#0b0b0b",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#222",
    backgroundColor: "#222",
  },
  avatarPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
  },
  itemTextWrap: {
    flex: 1,
    marginLeft: 12,
  },
  textoItem: {
    marginLeft: 0,
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  metaIcon: {
    color: "#aaa",
    marginRight: 4,
    opacity: 0.9,
  },
  metaText: {
    color: "#aaa",
    fontSize: 12,
  },
  chevron: {
    color: "#888",
    marginLeft: 8,
  },
});



// app/pessoa/[id].tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePessoas, Pessoa } from "../../contexts/PessoasContext";
import { Ionicons } from "@expo/vector-icons";

export default function Detalhes() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { pessoas, updatePessoa, removePessoa } = usePessoas();
  const pessoa = pessoas.find((p) => p.id === id);

  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(pessoa?.nome ?? "");
  const [email, setEmail] = useState(pessoa?.email ?? "");
  const [ano, setAno] = useState(pessoa?.ano ?? "");
  const [descricao, setDescricao] = useState(pessoa?.descricao ?? "");
  const [imagem, setImagem] = useState(pessoa?.imagem ?? "");

  const [botaoHover, setBotaoHover] = useState<string | null>(null);

  // Se a lista de pessoas mudar, atualiza campos 
  useEffect(() => {
    setNome(pessoa?.nome ?? "");
    setEmail(pessoa?.email ?? "");
    setAno(pessoa?.ano ?? "");
    setDescricao(pessoa?.descricao ?? "");
    setImagem(pessoa?.imagem ?? "");
  }, [pessoa]);

  if (!pessoa) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: "#fff" }}>Pessoa não encontrada</Text>
      </View>
    );
  }

  const onSalvar = () => {
    if (!nome || !email || !ano || !descricao) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }
    const atualizado: Pessoa = {
      id: pessoa.id,
      nome,
      email,
      ano,
      descricao,
      imagem,
    };
    updatePessoa(atualizado);
    setEditando(false);
    Alert.alert("Sucesso", "Dados atualizados");
  };

  const onApagar = () => {
    Alert.alert("Apagar", "Tem a certeza?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Apagar",
        style: "destructive",
        onPress: () => {
          removePessoa(pessoa.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.imagem} />
        ) : (
          <View style={[styles.imagem, styles.imagemPlaceholder]}>
            <Ionicons name="person" size={56} color="#fff" />
          </View>
        )}

        <View style={styles.headerRight}>
          <Text style={styles.titulo}>{pessoa.nome}</Text>
          <Text style={styles.subText}>{pessoa.email}</Text>
          <Text style={styles.subText}>Ano: {pessoa.ano}</Text>
        </View>
      </View>

      {editando ? (
        <>
          <View style={styles.row}>
            <Ionicons name="person-outline" size={18} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor="#999"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.row}>
            <Ionicons name="mail-outline" size={16} style={styles.inputIcon} />
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
            <Ionicons name="calendar-outline" size={16} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ano"
              placeholderTextColor="#999"
              value={ano}
              onChangeText={setAno}
            />
          </View>

          <View style={styles.row}>
            <Ionicons name="document-text-outline" size={16} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Descrição"
              placeholderTextColor="#999"
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />
          </View>

          <View style={styles.row}>
            <Ionicons name="image-outline" size={16} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Link da imagem"
              placeholderTextColor="#999"
              value={imagem}
              onChangeText={setImagem}
            />
          </View>

          <Pressable
            onPress={onSalvar}
            onHoverIn={() => setBotaoHover("salvar")}
            onHoverOut={() => setBotaoHover(null)}
            style={[styles.botao, botaoHover === "salvar" ? styles.botaoHover : null]}
          >
            <Ionicons name="save-outline" size={16} style={styles.botaoIcon} />
            <Text style={styles.btnText}>Salvar</Text>
          </Pressable>

          <Pressable
            onPress={() => setEditando(false)}
            onHoverIn={() => setBotaoHover("cancel")}
            onHoverOut={() => setBotaoHover(null)}
            style={[styles.botao, styles.botaoAlt, botaoHover === "cancel" ? styles.botaoHover : null]}
          >
            <Ionicons name="close-outline" size={16} style={styles.botaoIcon} />
            <Text style={styles.btnText}>Cancelar</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Descrição</Text>
            <Text style={styles.infoText}>{pessoa.descricao}</Text>
          </View>

          <View style={styles.actions}>
            <Pressable
              onPress={() => setEditando(true)}
              onHoverIn={() => setBotaoHover("editar")}
              onHoverOut={() => setBotaoHover(null)}
              style={[styles.botao, botaoHover === "editar" ? styles.botaoHover : null]}
            >
              <Ionicons name="create-outline" size={16} style={styles.botaoIcon} />
              <Text style={styles.btnText}>Editar</Text>
            </Pressable>

            <Pressable
              onPress={onApagar}
              onHoverIn={() => setBotaoHover("apagar")}
              onHoverOut={() => setBotaoHover(null)}
              style={[styles.botao, styles.botaoDanger, botaoHover === "apagar" ? styles.botaoHoverDanger : null]}
            >
              <Ionicons name="trash-outline" size={16} style={styles.botaoIcon} />
              <Text style={styles.btnText}>Apagar</Text>
            </Pressable>

            <Pressable
              onPress={() => router.back()}
              onHoverIn={() => setBotaoHover("voltar")}
              onHoverOut={() => setBotaoHover(null)}
              style={[styles.botao, styles.botaoAlt, botaoHover === "voltar" ? styles.botaoHover : null]}
            >
              <Ionicons name="arrow-back-outline" size={16} style={styles.botaoIcon} />
              <Text style={styles.btnText}>Voltar</Text>
            </Pressable>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#000",
    minHeight: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  imagem: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#222",
    backgroundColor: "#111",
  },
  imagemPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
  },
  headerRight: {
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  subText: {
    color: "#aaa",
    fontSize: 13,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inputIcon: {
    color: "#ccc",
    marginRight: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#222",
    backgroundColor: "#0f0f0f",
    color: "#fff",
    paddingVertical: Platform.OS === "web" ? 8 : 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  infoBlock: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#070707",
    borderWidth: 1,
    borderColor: "#111",
  },
  label: {
    color: "#999",
    fontSize: 12,
    marginBottom: 6,
  },
  infoText: {
    color: "#fff",
    fontSize: 14,
  },
  actions: {
    flexDirection: "column",
    gap: 8,
  },
  botao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  botaoAlt: {
    backgroundColor: "#333",
  },
  botaoDanger: {
    backgroundColor: "#5a1f1f",
  },
  botaoHover: {
    transform: [{ scale: 1.02 }],
    backgroundColor: "#2b2b2b",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 6,
  },
  botaoHoverDanger: {
    transform: [{ scale: 1.02 }],
    backgroundColor: "#7a2b2b",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 6,
  },
  botaoIcon: {
    color: "#fff",
    marginRight: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
});

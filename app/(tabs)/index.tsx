/*import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";



const [pessoas, setPessoas] = useState<Pessoa[]>([]);


export default function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [pessoas, setPessoas] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Adicionar ou Editar pessoa
  const adicionarPessoa = () => {
    if (nome.trim() === "" || email.trim() === "") return;

    if (editIndex !== null) {
      const novaLista = [...pessoas];
      novaLista[editIndex] = { nome, email };
      setPessoas(novaLista);
      setEditIndex(null);
    } else {
      setPessoas([...pessoas, { nome, email }]);
    }

    console.log("Lista atualizada:", [...pessoas, { nome, email }]);
    setNome("");
    setEmail("");
  };

  // Remover pessoa
  const removerPessoa = (index) => {
    const novaLista = pessoas.filter((_, i) => i !== index);
    setPessoas(novaLista);
    console.log("Lista após remover:", novaLista);
  };

  // Editar pessoa
  const editarPessoa = (index) => {
    setNome(pessoas[index].nome);
    setEmail(pessoas[index].email);
    setEditIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulário de Pessoas</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <Button
        title={editIndex !== null ? "Salvar Edição" : "Adicionar"}
        onPress={adicionarPessoa}
      />

      {pessoas.length === 0 ? (
        <Text style={styles.empty}>A lista está vazia</Text>
      ) : (
        <FlatList
          data={pessoas}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.item,
                { backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff" }, 
              ]}
            >
              <Text style={styles.text}>
                {item.nome} - {item.email}
              </Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => editarPessoa(index)}>
                  <Text style={styles.edit}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removerPessoa(index)}>
                  <Text style={styles.remove}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  empty: {
    marginTop: 20,
    textAlign: "center",
    fontStyle: "italic",
    color: "gray",
  },
  item: {
    padding: 12,
    marginVertical: 4,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  edit: {
    color: "blue",
    marginRight: 10,
  },
  remove: {
    color: "red",
  },
});*/




import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Pessoa {
  id: string;
  nome: string;
  email: string;
}

export default function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const adicionarOuEditarPessoa = () => {
    if (!nome || !email) return;

    if (editandoId) {
      setPessoas((prev) =>
        prev.map((p) =>
          p.id === editandoId ? { ...p, nome: nome, email: email } : p
        )
      );
      setEditandoId(null);
    } else {
      const novaPessoa: Pessoa = {
        id: Date.now().toString(),
        nome,
        email,
      };
      setPessoas([...pessoas, novaPessoa]);
    }
    setNome("");
    setEmail("");
  };

  const removerPessoa = (id: string) => {
    setPessoas((prev) => prev.filter((p) => p.id !== id));
  };

  const editarPessoa = (pessoa: Pessoa) => {
    setNome(pessoa.nome);
    setEmail(pessoa.email);
    setEditandoId(pessoa.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Pessoas</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#888"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.botao} onPress={adicionarOuEditarPessoa}>
        <Text style={styles.textoBotao}>
          {editandoId ? "Salvar Alterações" : "Adicionar ⚠️"}
        </Text>
      </TouchableOpacity>

      {pessoas.length === 0 ? (
        <Text style={styles.vazio}>A lista está vazia...</Text>
      ) : (
        <FlatList
          data={pessoas}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.item,
                { backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff" }, // zebra clara
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.textoItem}>{item.nome}</Text>
                <Text style={styles.textoEmail}>{item.email}</Text>
              </View>
              <TouchableOpacity
                style={[styles.botaoAcao, { backgroundColor: "#4caf50" }]}
                onPress={() => editarPessoa(item)}
              >
                <Text style={styles.textoBotao}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botaoAcao, { backgroundColor: "#f44336" }]}
                onPress={() => removerPessoa(item.id)}
              >
                <Text style={styles.textoBotao}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#ffffff", // fundo branco
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000", // texto preto
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#000",
  },
  botao: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
  vazio: {
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
    color: "#666",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textoItem: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  textoEmail: {
    fontSize: 14,
    color: "#444",
  },
  botaoAcao: {
    padding: 8,
    borderRadius: 6,
    marginLeft: 8,
  },
});
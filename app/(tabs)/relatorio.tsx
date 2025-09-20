// app/relatorio.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Share,
  Alert,
} from "react-native";
import { usePessoas, Pessoa } from "../../contexts/PessoasContext";
import { Ionicons } from "@expo/vector-icons";

export default function Relatorio() {
  const { pessoas } = usePessoas(); // espera-se que seja Pessoa[]

  // defensivo: garante array
  const lista = Array.isArray(pessoas) ? pessoas : [];

  // Estatísticas simples
  const total = lista.length;

  // Média do ano: evita NaN e transforma em número
  const somaAnos = lista.reduce((acc: number, p) => {
    const anoNum = Number(p?.ano ?? 0);
    return acc + (Number.isFinite(anoNum) ? anoNum : 0);
  }, 0);

  const mediaAno = total > 0 ? (somaAnos / total).toFixed(1) : "0";

  // Montar relatório em texto
  const gerarRelatorioTexto = () => {
    let texto = "📊 Relatório de Pessoas\n\n";
    texto += `Total de pessoas: ${total}\n`;
    texto += `Média dos anos: ${mediaAno}\n\n`;
    texto += `Detalhes:\n\n`;

    lista.forEach((p, i) => {
      texto += `${i + 1}. ${p?.nome ?? "—"} (${p?.email ?? "—"}) - ${p?.ano ?? "—"}\n`;
      if (p?.descricao) texto += `   ${p.descricao}\n`;
      texto += "\n";
    });

    return texto;
  };

  // Compartilhar relatório via Share API nativa
  const compartilhar = async () => {
    try {
      const relatorio = gerarRelatorioTexto();
      await Share.share({ message: relatorio });
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
      Alert.alert("Erro", "Não foi possível compartilhar o relatório.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
    <Ionicons name="bar-chart-outline" size={24} color="#fff" style={{ marginRight: 6 }} />
    <Text style={styles.titulo}>Relatório</Text>
  </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total de Pessoas</Text>
        <Text style={styles.valor}>{total}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Média de Ano</Text>
        <Text style={styles.valor}>{mediaAno}</Text>
      </View>

      <Text style={styles.subtitulo}>Lista de Pessoas</Text>

      {lista.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.infoEmpty}>Nenhuma pessoa cadastrada.</Text>
        </View>
      ) : (
        lista.map((p) => (
          <View key={p.id} style={styles.pessoa}>
            <Text style={styles.nome}>{p.nome}</Text>
            <Text style={styles.email}>{p.email}</Text>
            <Text style={styles.ano}>Ano: {p.ano}</Text>
            {p.descricao ? <Text style={styles.descricao}>{p.descricao}</Text> : null}
          </View>
        ))
      )}

      <Pressable style={styles.botao} onPress={compartilhar}>
        <Ionicons name="share-social-outline" size={18} color="#fff" />
        <Text style={styles.botaoTexto}>Compartilhar Relatório</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#000",
    minHeight: "100%",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  label: {
    fontSize: 14,
    color: "#aaa",
  },
  valor: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
    marginTop: 6,
  },
  subtitulo: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 10,
  },
  pessoa: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#222",
  },
  nome: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  email: {
    color: "#ccc",
    fontSize: 14,
  },
  ano: {
    color: "#aaa",
    fontSize: 13,
  },
  descricao: {
    color: "#ddd",
    marginTop: 6,
  },
  infoEmpty: {
    color: "#999",
    fontSize: 14,
  },
  botao: {
    backgroundColor: "#222",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  botaoTexto: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "700",
  },
});


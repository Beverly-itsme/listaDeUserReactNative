// contexts/PessoasContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import pessoasJson from "../data/pessoas.json"; // 👈 importar JSON

export interface Pessoa {
  id: string;
  nome: string;
  email: string;
  ano: string;
  descricao: string;
  imagem: string;
}

type ContextType = {
  pessoas: Pessoa[];
  addPessoa: (p: Pessoa) => void;
  updatePessoa: (p: Pessoa) => void;
  removePessoa: (id: string) => void;
};

const PessoasContext = createContext<ContextType | undefined>(undefined);

export const PessoasProvider = ({ children }: { children: ReactNode }) => {
  const [pessoas, setPessoas] = useState<Pessoa[]>(pessoasJson); // 👈 inicializa com JSON

  const addPessoa = (p: Pessoa) => setPessoas((prev) => [...prev, p]);
  const updatePessoa = (p: Pessoa) =>
    setPessoas((prev) => prev.map((x) => (x.id === p.id ? p : x)));
  const removePessoa = (id: string) =>
    setPessoas((prev) => prev.filter((x) => x.id !== id));

  return (
    <PessoasContext.Provider value={{ pessoas, addPessoa, updatePessoa, removePessoa }}>
      {children}
    </PessoasContext.Provider>
  );
};

export const usePessoas = () => {
  const ctx = useContext(PessoasContext);
  if (!ctx) throw new Error("usePessoas must be used within PessoasProvider");
  return ctx;
};


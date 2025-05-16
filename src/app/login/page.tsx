'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";  // Alterado para usar next/navigation
import axios from "axios";
import Image from 'next/image';

const LoginPage = () => {
  const router = useRouter();  // Uso do useRouter do next/navigation
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    // Verifica se o usuário já está logado (por exemplo, se o token já está armazenado)
    const token = localStorage.getItem("token");
    if (token) {
      // Se já estiver logado, redireciona para a página de cadastro de casos
      router.push("/casos/");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      // Fazendo a requisição ao backend para obter o token
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, senha });
      alert("Login efetuado com sucesso!");
      const token = response.data.token;

      // Armazenando o token no localStorage
      localStorage.setItem("token", token);

      // Redirecionando para a página de cadastro de casos
      router.push("/casos");
    } catch (error) {
      setErro("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
      <Image src='/logo-gop.png' width={308} height={121} alt=""/>

      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {erro && <div className="text-red-500 text-sm mb-4">{erro}</div>}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

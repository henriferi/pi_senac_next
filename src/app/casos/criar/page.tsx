'use client';
import { useState } from 'react';

export default function CriarCaso() {
  const [form, setForm] = useState({
    nome: '',
    local: '',
    descricao: '',
    tipo: '',
    peritoResponsavel: '',
    dataHora: '',
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');


    if (!token) {
      alert("Úsuario não autenticado. Faça login");
    }
    try {
      const response = await fetch('http://localhost:5000/api/casos', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Erro ao cadastrar caso');

      alert("Caso cadastrado com sucesso!");

    } catch (err) {
      console.error(err);   
      alert('Erro ao enviar dados. Verifique o  console.');
    }
  };


  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">Cadastrar Caso</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nome"
          placeholder="Nome do caso"
          value={form.nome}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="local"
          placeholder="Local"
          value={form.local}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Selecione um tipo</option>
          <option value="Lesão Corporal">Lesão Corporal</option>
          <option value="Identificação por Arcos Dentais">Identificação por Arcos Dentais</option>
          <option value="Estimativa de Idade">Estimativa de Idade</option>
          <option value="Exame de Marcas de Mordida">Exame de Marcas de Mordida</option>
          <option value="Coleta de DNA">Coleta de DNA</option>
        </select>
        <input
          name="peritoResponsavel"
          placeholder="Perito Responsável"
          value={form.peritoResponsavel}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <div>
          <label htmlFor="dataHora">Data e Hora:</label>
          <input
            type="datetime-local"
            name="dataHora"
            value={form.dataHora}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Salvar Caso
        </button>
      </form>
    </div>
  );
}

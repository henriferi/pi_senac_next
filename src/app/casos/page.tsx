'use client';

import { useEffect, useState } from 'react';

type Caso = {
  nome: string;
  local: string;
  descricao: string;
  tipo: string;
  peritoResponsavel: string;
  status: 'Em andamento' | 'Finalizado' | 'Arquivado';
};

export default function ListaCasos() {
  const [casos, setCasos] = useState<Caso[]>([]);

  useEffect(() => {
    fetch('/api/casos')
      .then((res) => res.json())
      .then((data) => setCasos(data))
      .catch((err) => console.error('Erro ao carregar casos:', err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Lista de Casos</h1>
      {casos.length === 0 ? (
        <p className="text-gray-500">Nenhum caso cadastrado.</p>
      ) : (
        <ul className="space-y-4">
          {casos.map((caso, index) => (
            <li key={index} className="p-4 border rounded-lg shadow">
              <h2 className="text-xl font-semibold">{caso.nome}</h2>
              <p><strong>Local:</strong> {caso.local}</p>
              <p><strong>Tipo:</strong> {caso.tipo}</p>
              <p><strong>Descrição:</strong> {caso.descricao}</p>
              <p><strong>Perito:</strong> {caso.peritoResponsavel}</p>
              <p><strong>Status:</strong> <span className="italic">{caso.status}</span></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

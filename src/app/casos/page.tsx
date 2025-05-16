'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Perito = {
  _id: string;
  nome: string;
};

type Caso = {
  _id: string;
  nome: string;
  local: string;
  descricao: string;
  tipo: string;
  peritoResponsavel: Perito;
};

export default function ListaCasos() {
  const [casos, setCasos] = useState<Caso[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/casos', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setCasos((data.casos || []).reverse());
        } else {
          console.error("Erro na resposta:", data.error || data);
        }
      })
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
            <li key={caso._id} className="p-4 border rounded-lg shadow hover:bg-gray-50">
              <Link href={`/casos/${caso._id}`}>
                <h2 className="text-xl font-semibold text-blue-600 hover:underline">{caso.nome}</h2>
                <p><strong>Local:</strong> {caso.local}</p>
                <p><strong>Tipo:</strong> {caso.tipo}</p>
                <p><strong>Perito:</strong> {caso.peritoResponsavel.nome}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

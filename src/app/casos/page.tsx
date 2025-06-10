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
  status: string;
  peritoResponsavel: Perito;
};

export default function ListaCasos() {
  const [casos, setCasos] = useState<Caso[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/casos', {
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
          {casos.map((caso) => (
            <li key={caso._id} className="p-4 rounded-lg shadow-md hover:bg-gray-50 bg-white">
              <Link href={`/casos/${caso._id}`}>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">{caso.nome}</h1>
                    <div className="px-4 py-2 rounded-xl bg-gray-200">
                        <p className="text-lg text-gray-800">{caso.status} </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-gray-600 mb-2">Local</p>
                      <p className="text-lg text-gray-800">{caso.local}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-gray-600 mb-2">Tipo</p>
                      <p className="text-lg text-gray-800">{caso.tipo}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-gray-600 mb-2">Descrição</p>
                      <p className="text-lg text-gray-800">{caso.descricao}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-gray-600 mb-2">Perito</p>
                      <p className="text-lg text-gray-800">{caso.peritoResponsavel.nome} </p>
                    </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
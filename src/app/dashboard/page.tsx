'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, ResponsiveContainer, } from 'recharts';

type DashboardData = {
  totalCasos: number;
  totalPeritos: number;
  casosPorTipo: Record<string, number>;
  casosRecentes: { nome: string; tipo: string; perito: string; data: string }[];
  casosPorPerito: { nome: string; quantidade: number }[];
};

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6', '#14B8A6', '#F43F5E'];


  useEffect(() => {
    fetch('https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/dashboard/resumo', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setDashboard(data);
      }) 
      .catch(err => console.error('Erro ao buscar dados da dashboard:', err));
  }, []);

  if (!dashboard) return <p className='mt-2 p-2'>Carregando dashboard...</p>;

  const casosPorTipoArray = Object.entries(dashboard.casosPorTipo).map(
    ([tipo, quantidade]) => ({
      tipo,
      quantidade,
    })
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total de Casos</h2>
          <p className="text-2xl">{dashboard.totalCasos}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total de Peritos</h2>
          <p className="text-2xl">{dashboard.totalPeritos}</p>
        </div>
      </div>

      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Casos por Tipo</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={casosPorTipoArray}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tipo" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="quantidade" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Casos Recentes</h2>
        <ul>
          {dashboard.casosRecentes.map((caso, index) => {
            return (
              <li key={index} className="border-b py-2">
                <strong>{caso.nome}</strong> ({caso.tipo}) - {caso.perito} em{' '}
                {new Date(caso.data).toLocaleDateString()}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Casos por Perito</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dashboard.casosPorPerito}
              dataKey="quantidade"
              nameKey="nome"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {dashboard.casosPorPerito.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

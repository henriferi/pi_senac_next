'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type Caso = {
    _id: string;
    nome: string;
    local: string;
    descricao: string;
    tipo: string;
    peritoResponsavel: { nome: string; email: string };
};

export default function DetalhesCaso() {
    const { id } = useParams();
    const [caso, setCaso] = useState<Caso | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const casoId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';
        if (!casoId) return;

        fetch(`http://localhost:5000/api/casos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Data da API:', data);
                if (data && data._id) {
                    setCaso(data);
                } else {
                    console.error('Erro: resposta inesperada', data);
                }
            })

            .catch((err) => console.error('Erro na requisição:', err));
    }, [id]);

    if (!caso) return <p className="p-4">Carregando caso...</p>;

    console.log('Caso renderizado:', caso)

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">{caso.nome}</h1>
            <p><strong>Local:</strong> {caso.local}</p>
            <p><strong>Tipo:</strong> {caso.tipo}</p>
            <p><strong>Descrição:</strong> {caso.descricao}</p>
            <p><strong>Perito:</strong> {caso.peritoResponsavel.nome} ({caso.peritoResponsavel.email})</p>

            <Link href={'/casos'}><button className='bg-red-500 p-2 rounded text-white mt-4 cursor-pointer hover:bg-red-700 transition duration-300 ease-in-out'>Voltar</button></Link>
        </div>
    );
}

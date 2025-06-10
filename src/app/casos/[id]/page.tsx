'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ModalEvidencia from '@/app/components/ModalEvidencia';
import ModalListaEvidencias from '@/app/components/ModalVerEvidencias';


type Caso = {
    _id: string;
    nome: string;
    local: string;
    descricao: string;
    tipo: string;
    status: string;
    peritoResponsavel: { nome: string; email: string };
};

export default function DetalhesCaso() {
    const { id } = useParams();
    const [caso, setCaso] = useState<Caso | null>(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [modalEvidenciasAberto, setModalEvidenciasAberto] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        const casoId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';
        if (!casoId) return;

        fetch(`https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/casos${casoId}`, {
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

    console.log('Caso renderizado:', caso);

    return (
        <>
            <div className="max-w-3xl mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">{caso.nome}</h1>
                    <div className="flex gap-12">
                        <div className="px-4 py-2 rounded-xl bg-gray-200">
                            <p className="text-lg text-gray-800">{caso.status}</p>
                        </div>
                        <button className="bg-blue-900 px-4 py-2 rounded text-white cursor-pointer hover:bg-blue-950 transition duration-300 ease-in-out">
                            Gerar Relatório
                        </button>
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
                        <p className="text-lg text-gray-800">
                            {caso.peritoResponsavel.nome} ({caso.peritoResponsavel.email})
                        </p>
                    </div>
                </div>

                <div className="flex space-x-4 mt-6">
                    <Link href={'/casos'}>
                        <button className="bg-red-700 px-4 py-2 rounded text-white cursor-pointer hover:bg-red-900 transition duration-300 ease-in-out">
                            Voltar
                        </button>
                    </Link>
                    <button
                        onClick={() => setModalAberto(true)}
                        className="bg-green-700 px-4 py-2 rounded text-white cursor-pointer hover:bg-green-900 transition duration-300 ease-in-out"
                    >
                        Adicionar Evidência
                    </button>
                    <button
                        onClick={() => setModalEvidenciasAberto(true)}
                        className="bg-blue-700 px-4 py-2 rounded text-white cursor-pointer hover:bg-blue-900 transition" >
                        Ver Evidências
                    </button>
                </div>
            </div>

            <ModalEvidencia
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
                casoId={caso._id}
                onEvidenciaCadastrada={() => {
                    console.log('Evidência cadastrada!');

                }}
            />
            <ModalListaEvidencias
                isOpen={modalEvidenciasAberto}
                onClose={() => setModalEvidenciasAberto(false)}
                casoId={caso._id}
            />
        </>
    );
}

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiX, FiDownload, FiImage } from 'react-icons/fi';

type Evidencia = {
  _id: string;
  casoId: string;
  arquivoId: string;
  nomeArquivo: string;
  tipoArquivo: string;
  tipoEvidencia: string;
  descricao: string;
};

type ModalEvidenciasProps = {
  isOpen: boolean;
  onClose: () => void;
  casoId: string;
};

export default function ModalEvidencias({
  isOpen,
  onClose,
  casoId,
}: ModalEvidenciasProps) {
  const [evidencias, setEvidencias] = useState<Evidencia[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchEvidencias = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await fetch(
          `http://localhost:5000/api/evidencias?casoId=${casoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setEvidencias(data);
      } catch (error) {
        console.error('Erro ao buscar evidências:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvidencias();
  }, [isOpen, casoId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Evidências</h2>
          <button onClick={onClose}>
            <FiX className="text-2xl text-gray-700 hover:text-black" />
          </button>
        </div>

        {loading ? (
          <p>Carregando evidências...</p>
        ) : evidencias.length === 0 ? (
          <p className="text-gray-600">Nenhuma evidência cadastrada.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evidencias.map((evidencia) => (
              <div
                key={evidencia._id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <p className="font-semibold mb-2">{evidencia.descricao}</p>
                <p className="text-sm text-gray-600 mb-2">
                  Tipo: {evidencia.tipoEvidencia}
                </p>

                {evidencia.tipoArquivo.startsWith('image/') ? (
                  <Image
                    src={`http://localhost:5000/api/evidencias/${evidencia.arquivoId}`}
                    alt={evidencia.descricao}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                ) : (
                  <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded">
                    <FiImage className="text-2xl text-gray-500" />
                    <p className="text-sm">{evidencia.nomeArquivo}</p>
                  </div>
                )}

                <a
                  href={`http://localhost:5000/api/evidencias/${evidencia.arquivoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 mt-2 text-blue-700 hover:underline"
                >
                  <FiDownload /> Baixar / Visualizar
                </a>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-900"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

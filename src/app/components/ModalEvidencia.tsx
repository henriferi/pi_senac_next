'use client';

import { useState, useRef } from 'react';
import { FiUpload } from 'react-icons/fi';

type ModalEvidenciaProps = {
  isOpen: boolean;
  onClose: () => void;
  casoId: string;
  onEvidenciaCadastrada: () => void; // callback para atualizar lista se quiser
};

export default function ModalEvidencia({
  isOpen,
  onClose,
  casoId,
  onEvidenciaCadastrada,
}: ModalEvidenciaProps) {
  const [descricao, setDescricao] = useState('');
  const [tipoEvidencia, setTipoEvidencia] = useState('radiografia');
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Ref pro input escondido
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!arquivo) {
      alert('Selecione um arquivo');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('arquivo', arquivo);
      formData.append('descricao', descricao);
      formData.append('tipoEvidencia', tipoEvidencia);
      formData.append('casoId', casoId);

      const response = await fetch('http://localhost:5000/api/evidencias', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.erro || 'Erro ao cadastrar evidência');
      }

      alert('Evidência cadastrada com sucesso');
      onEvidenciaCadastrada();
      onClose();
    } catch (error: any) {
      alert(`Erro: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Abre o seletor de arquivos
  const abrirSeletorArquivo = () => {
    inputFileRef.current?.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Adicionar Evidência</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Descrição</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Tipo de Evidência</label>
            <select
              value={tipoEvidencia}
              onChange={(e) => setTipoEvidencia(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="radiografia">Radiografia</option>
              <option value="odontograma">Odontograma</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <input
            type="file"
            ref={inputFileRef}
            className="hidden"
            onChange={(e) => setArquivo(e.target.files?.[0] || null)}
            accept="image/*,application/pdf"
          />

          <div>
            <label className="block mb-1 font-medium">Arquivo</label>
            <button
              type="button"
              onClick={abrirSeletorArquivo}
              className="flex items-center gap-2 border-2 border-dashed border-gray-400 rounded px-4 py-3 w-full justify-center text-gray-600 hover:border-green-700 hover:text-green-700 transition cursor-pointer"
            >
              <FiUpload size={24} />
              {arquivo ? arquivo.name : 'Clique para selecionar um arquivo'}
            </button>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-900"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Upload, FileText, Image, Video, AlertCircle, CheckCircle, Loader2, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const FormularioDenuncia = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    tipo: '',
    empresa: '',
    descricao: '',
    valor: '',
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) => {
      const validTypes = ['image/', 'video/', 'application/pdf'];
      return validTypes.some((type) => file.type.startsWith(type));
    });

    if (validFiles.length !== selectedFiles.length) {
      setError('Alguns arquivos foram ignorados. Apenas imagens, vídeos e PDFs são aceitos.');
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (file.type.startsWith('video/')) return <Video className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validações
    if (!formData.tipo) {
      setError('Por favor, selecione o tipo de reclamação.');
      setLoading(false);
      return;
    }

    if (!formData.empresa) {
      setError('Por favor, informe o nome da empresa.');
      setLoading(false);
      return;
    }

    if (!formData.descricao || formData.descricao.length < 20) {
      setError('Por favor, descreva o problema com pelo menos 20 caracteres.');
      setLoading(false);
      return;
    }

    try {
      // Simular envio da denúncia
      // Em produção, fazer chamada real à API
      const denunciaData = {
        ...formData,
        usuario: user,
        arquivos: files.map((f) => ({ nome: f.name, tipo: f.type, tamanho: f.size })),
        protocolo: `PROCON-${Date.now()}`,
        data: new Date().toISOString(),
        status: 'Pendente',
      };

      console.log('Denúncia enviada:', denunciaData);

      // Simular delay de envio
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);
      
      // Limpar formulário após 3 segundos
      setTimeout(() => {
        setFormData({
          tipo: '',
          empresa: '',
          descricao: '',
          valor: '',
        });
        setFiles([]);
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Erro ao enviar denúncia. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Denúncia Enviada com Sucesso!</h2>
          <p className="text-green-700 mb-4">
            Sua denúncia foi registrada e será analisada em breve.
          </p>
          <p className="text-sm text-green-600">
            Protocolo: PROCON-{Date.now()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Registrar Denúncia</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de Reclamação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Reclamação *
            </label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Selecione o tipo</option>
              <option value="produto_defeito">Produto com Defeito</option>
              <option value="servico_inadequado">Serviço Inadequado</option>
              <option value="cobranca_indevida">Cobrança Indevida</option>
              <option value="propaganda_enganosa">Propaganda Enganosa</option>
              <option value="nao_entrega">Não Entrega</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          {/* Nome da Empresa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Empresa *
            </label>
            <input
              type="text"
              name="empresa"
              value={formData.empresa}
              onChange={handleInputChange}
              placeholder="Digite o nome da empresa"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Valor (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Envolvido (opcional)
            </label>
            <input
              type="text"
              name="valor"
              value={formData.valor}
              onChange={handleInputChange}
              placeholder="R$ 0,00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Descrição do Problema */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição do Problema *
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              placeholder="Descreva detalhadamente o problema..."
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Mínimo 20 caracteres ({formData.descricao.length}/20)
            </p>
          </div>

          {/* Upload de Arquivos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anexar Documentos (Fotos, Vídeos, PDFs)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">
                Arraste arquivos aqui ou clique para selecionar
              </p>
              <input
                type="file"
                multiple
                accept="image/*,video/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
              >
                Selecionar Arquivos
              </label>
            </div>

            {/* Lista de Arquivos */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Arquivos Selecionados ({files.length})
                </p>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file)}
                      <div>
                        <p className="text-sm font-medium text-gray-700">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botão de Envio */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  tipo: '',
                  empresa: '',
                  descricao: '',
                  valor: '',
                });
                setFiles([]);
                setError('');
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Limpar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : (
                <span>Enviar Denúncia</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioDenuncia;


import React, { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const MinhasDenunciasList = () => {
  const { user } = useAuth();
  const [denuncias, setDenuncias] = useState([]);
  const [selectedDenuncia, setSelectedDenuncia] = useState(null);

  useEffect(() => {
    // Simular carregamento de denúncias
    const mockDenuncias = [
      {
        id: 1,
        protocol: 'PROCON-2025-001234',
        tipo: 'Produto com Defeito',
        empresa: 'Loja XYZ Ltda',
        status: 'Em Análise',
        data: '2025-10-10',
        descricao: 'Produto apresentou defeito após 15 dias de uso...',
      },
      {
        id: 2,
        protocol: 'PROCON-2025-001189',
        tipo: 'Cobrança Indevida',
        empresa: 'Operadora ABC',
        status: 'Resolvido',
        data: '2025-10-05',
        descricao: 'Cobrança de serviço não contratado...',
      },
      {
        id: 3,
        protocol: 'PROCON-2025-001156',
        tipo: 'Serviço Inadequado',
        empresa: 'Empresa DEF S.A.',
        status: 'Aguardando Resposta',
        data: '2025-09-28',
        descricao: 'Serviço não foi prestado conforme contratado...',
      },
    ];

    setDenuncias(mockDenuncias);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Resolvido':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Em Análise':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'Aguardando Resposta':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolvido':
        return 'bg-green-100 text-green-800';
      case 'Em Análise':
        return 'bg-yellow-100 text-yellow-800';
      case 'Aguardando Resposta':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lista de Denúncias */}
        <div className="lg:col-span-2 space-y-4">
          {denuncias.map((denuncia) => (
            <div
              key={denuncia.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedDenuncia(denuncia)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(denuncia.status)}
                  <div>
                    <h3 className="font-semibold text-gray-800">{denuncia.protocol}</h3>
                    <p className="text-sm text-gray-600">{denuncia.tipo}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    denuncia.status
                  )}`}
                >
                  {denuncia.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Empresa:</span>
                  <span className="font-medium text-gray-800">{denuncia.empresa}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-medium text-gray-800">
                    {new Date(denuncia.data).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 line-clamp-2">{denuncia.descricao}</p>
              </div>

              <button className="mt-4 flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">
                <Eye className="w-4 h-4" />
                <span>Ver Detalhes</span>
              </button>
            </div>
          ))}

          {denuncias.length === 0 && (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600">Você ainda não tem denúncias registradas</p>
            </div>
          )}
        </div>

        {/* Detalhes da Denúncia */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
            {selectedDenuncia ? (
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Detalhes da Denúncia</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Protocolo
                    </label>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedDenuncia.protocol}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedDenuncia.status
                      )}`}
                    >
                      {selectedDenuncia.status}
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Tipo</label>
                    <p className="text-sm text-gray-800">{selectedDenuncia.tipo}</p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Empresa</label>
                    <p className="text-sm text-gray-800">{selectedDenuncia.empresa}</p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Data</label>
                    <p className="text-sm text-gray-800">
                      {new Date(selectedDenuncia.data).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Descrição
                    </label>
                    <p className="text-sm text-gray-800 mt-1">{selectedDenuncia.descricao}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Linha do Tempo</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
                        <div>
                          <p className="text-xs font-medium text-gray-800">Denúncia Registrada</p>
                          <p className="text-xs text-gray-500">
                            {new Date(selectedDenuncia.data).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mt-1.5"></div>
                        <div>
                          <p className="text-xs font-medium text-gray-800">Em Análise</p>
                          <p className="text-xs text-gray-500">Aguardando análise técnica</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-500">
                  Selecione uma denúncia para ver os detalhes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinhasDenunciasList;


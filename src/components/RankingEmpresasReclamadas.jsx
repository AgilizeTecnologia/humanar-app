import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, TrendingUp, CheckCircle, XCircle } from 'lucide-react';

const RankingEmpresasReclamadas = () => {
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch('/companiesRanking.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRankingData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do ranking:", error);
        setError("Não foi possível carregar o ranking de empresas.");
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-700">Carregando ranking...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-600">
        <XCircle className="w-16 h-16 mb-4" />
        <p className="text-lg">{error}</p>
        <Link to="/" className="mt-4 text-blue-600 hover:underline">Voltar para o Início</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <Link to="/" className="text-blue-600 hover:underline flex items-center mb-6">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Voltar para a Página Inicial
      </Link>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Ranking de Empresas Reclamadas</h1>

      <p className="text-center text-gray-600 mb-8">
        Confira o desempenho das empresas mais reclamadas, com base no número de reclamações, resoluções e avaliações dos consumidores.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posição</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reclamações</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolvidos</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Resolução</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avaliação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rankingData.map((empresa) => (
              <tr key={empresa.ranking} className="hover:bg-gray-50">
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                  {empresa.ranking}º
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{empresa.nomeEmpresa}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{empresa.reclamacoes}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{empresa.resolvidos}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${empresa.indiceResolucao >= 80 ? 'bg-green-100 text-green-800' : empresa.indiceResolucao >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {empresa.indiceResolucao}%
                  </span>
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700 flex items-center">
                  {empresa.mediaAvaliacao}
                  <Star className="w-4 h-4 ml-1 text-yellow-400 fill-current" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Dados atualizados em: {new Date().toLocaleDateString()}</p>
        <p>Fonte: Base de dados fictícia para demonstração.</p>
      </div>
    </div>
  );
};

export default RankingEmpresasReclamadas;


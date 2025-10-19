import React, { useState } from 'react';
import { Search, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const cdcArticles = [
  {
    id: 1,
    article: 'Art. 6º',
    title: 'Direitos Básicos do Consumidor',
    content: 'São direitos básicos do consumidor: I - a proteção da vida, saúde e segurança contra os riscos provocados por práticas no fornecimento de produtos e serviços considerados perigosos ou nocivos; II - a educação e divulgação sobre o consumo adequado dos produtos e serviços...',
  },
  {
    id: 2,
    article: 'Art. 18',
    title: 'Vícios do Produto',
    content: 'Os fornecedores de produtos de consumo duráveis ou não duráveis respondem solidariamente pelos vícios de qualidade ou quantidade que os tornem impróprios ou inadequados ao consumo a que se destinam ou lhes diminuam o valor...',
  },
  {
    id: 3,
    article: 'Art. 35',
    title: 'Recusa de Cumprimento da Oferta',
    content: 'Se o fornecedor de produtos ou serviços recusar cumprimento à oferta, apresentação ou publicidade, o consumidor poderá, alternativamente e à sua livre escolha: I - exigir o cumprimento forçado da obrigação; II - aceitar outro produto ou prestação de serviço equivalente; III - rescindir o contrato...',
  },
  {
    id: 4,
    article: 'Art. 49',
    title: 'Direito de Arrependimento',
    content: 'O consumidor pode desistir do contrato, no prazo de 7 dias a contar de sua assinatura ou do ato de recebimento do produto ou serviço, sempre que a contratação de fornecimento de produtos e serviços ocorrer fora do estabelecimento comercial...',
  },
];

const CDCViewer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedArticle, setExpandedArticle] = useState(null);

  const filteredArticles = cdcArticles.filter(
    (article) =>
      article.article.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleArticle = (id) => {
    setExpandedArticle(expandedArticle === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Código de Defesa do Consumidor
                </h1>
                <p className="text-sm text-gray-600">Lei nº 8.078, de 11 de setembro de 1990</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar artigos, palavras-chave..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Articles List */}
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleArticle(article.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4 text-left">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">
                        {article.article.replace('Art. ', '')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{article.article}</h3>
                      <p className="text-sm text-gray-600">{article.title}</p>
                    </div>
                  </div>
                  {expandedArticle === article.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {expandedArticle === article.id && (
                  <div className="px-6 pb-6 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed mt-4">{article.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600">Nenhum artigo encontrado para "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CDCViewer;


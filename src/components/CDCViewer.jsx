import React, { useState } from 'react';
// Importe os ícones se ainda precisar deles para outras partes do componente,
// mas para o iframe puro, eles não serão usados diretamente.
// import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const CDCViewer = () => {
  // Não precisamos mais de `searchTerm`, `filteredArticles`, `expandedArticle`,
  // pois não estamos mais exibindo a lista de artigos.
  // const [searchTerm, setSearchTerm] = useState('');
  // const [expandedArticle, setExpandedArticle] = useState(null);

  // A URL do seu livro digital interativo no Vercel
  const vercelBookUrl = "https://shttps://livro-cdc-interativo-9ym8.vercel.app/";

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Código de Defesa do Consumidor
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Seu guia interativo e atualizado.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Aqui é onde o livro interativo será incorporado */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Livro Digital Interativo</h2>
            <div className="relative" style={{ paddingBottom: '75%', height: 0 }}>
              <iframe
                src={vercelBookUrl}
                title="Livro Digital Interativo do Código de Defesa do Consumidor"
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                frameBorder="0"
                allowFullScreen
                style={{ border: 'none' }}
              ></iframe>
            </div>
            <p className="mt-4 text-center text-gray-600">
              <a 
                href={vercelBookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Abrir livro em nova aba
              </a>
            </p>
          </div>
        </div>

        {/* Removemos toda a seção de busca e exibição de artigos */}
        {/*
        <div className="mt-10">
          <div className="mb-8">
            <input
              type="text"
              placeholder="Buscar artigos..."
              className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e ) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold">
                      <span>
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
        */}
      </div>
    </div>
  );
};

export default CDCViewer;

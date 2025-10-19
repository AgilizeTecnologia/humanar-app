import React, { useState } from 'react';
import { Monitor, FileText, Phone, BookOpen, Home, ArrowLeft } from 'lucide-react';

const TotemInterface = () => {
  const [currentScreen, setCurrentScreen] = useState('home');

  const renderHomeScreen = () => (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-white mb-8">Bem-vindo ao Totem de Atendimento</h1>
      <p className="text-2xl text-white mb-12 opacity-90">
        Selecione uma opção para continuar
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <button
          onClick={() => setCurrentScreen('denuncia')}
          className="bg-white rounded-2xl p-12 hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <FileText className="w-24 h-24 mx-auto mb-6 text-blue-600" />
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">Fazer Denúncia</h3>
          <p className="text-gray-600 text-lg">
            Registre sua reclamação de forma rápida e segura
          </p>
        </button>

        <button
          onClick={() => setCurrentScreen('consulta')}
          className="bg-white rounded-2xl p-12 hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <BookOpen className="w-24 h-24 mx-auto mb-6 text-green-600" />
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">Consultar CDC</h3>
          <p className="text-gray-600 text-lg">
            Acesse o Código de Defesa do Consumidor
          </p>
        </button>

        <button
          onClick={() => setCurrentScreen('atendimento')}
          className="bg-white rounded-2xl p-12 hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <Phone className="w-24 h-24 mx-auto mb-6 text-yellow-600" />
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">Atendimento</h3>
          <p className="text-gray-600 text-lg">
            Fale com um atendente especializado
          </p>
        </button>

        <button
          onClick={() => (window.location.href = '/')}
          className="bg-white rounded-2xl p-12 hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <Home className="w-24 h-24 mx-auto mb-6 text-purple-600" />
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">Portal Web</h3>
          <p className="text-gray-600 text-lg">
            Acesse o portal completo no seu dispositivo
          </p>
        </button>
      </div>
    </div>
  );

  const renderDenunciaScreen = () => (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => setCurrentScreen('home')}
        className="flex items-center space-x-2 text-white mb-8 text-xl hover:opacity-80 transition-opacity"
      >
        <ArrowLeft className="w-6 h-6" />
        <span>Voltar</span>
      </button>

      <div className="bg-white rounded-2xl p-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Fazer Denúncia</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-xl font-medium text-gray-700 mb-3">
              Tipo de Reclamação
            </label>
            <select className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Selecione o tipo</option>
              <option>Produto com Defeito</option>
              <option>Serviço Inadequado</option>
              <option>Cobrança Indevida</option>
              <option>Propaganda Enganosa</option>
              <option>Outro</option>
            </select>
          </div>

          <div>
            <label className="block text-xl font-medium text-gray-700 mb-3">
              Nome da Empresa
            </label>
            <input
              type="text"
              placeholder="Digite o nome da empresa"
              className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xl font-medium text-gray-700 mb-3">
              Descrição do Problema
            </label>
            <textarea
              rows="6"
              placeholder="Descreva o problema..."
              className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-6 rounded-xl text-2xl font-semibold hover:bg-blue-700 transition-colors">
            Enviar Denúncia
          </button>
        </div>
      </div>
    </div>
  );

  const renderConsultaScreen = () => (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => setCurrentScreen('home')}
        className="flex items-center space-x-2 text-white mb-8 text-xl hover:opacity-80 transition-opacity"
      >
        <ArrowLeft className="w-6 h-6" />
        <span>Voltar</span>
      </button>

      <div className="bg-white rounded-2xl p-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Código de Defesa do Consumidor
        </h2>

        <div className="space-y-6">
          <div className="bg-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Art. 6º</h3>
            <p className="text-lg text-blue-800">
              São direitos básicos do consumidor: proteção da vida, saúde e segurança...
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-green-900 mb-4">Art. 18</h3>
            <p className="text-lg text-green-800">
              Vícios do produto - prazo de 30 dias para produtos não duráveis...
            </p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-yellow-900 mb-4">Art. 49</h3>
            <p className="text-lg text-yellow-800">
              Direito de arrependimento - 7 dias para compras online...
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAtendimentoScreen = () => (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => setCurrentScreen('home')}
        className="flex items-center space-x-2 text-white mb-8 text-xl hover:opacity-80 transition-opacity"
      >
        <ArrowLeft className="w-6 h-6" />
        <span>Voltar</span>
      </button>

      <div className="bg-white rounded-2xl p-12 text-center">
        <Phone className="w-32 h-32 mx-auto mb-8 text-yellow-600" />
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Atendimento Presencial</h2>
        <p className="text-2xl text-gray-600 mb-8">
          Um atendente estará com você em breve
        </p>

        <div className="bg-yellow-50 rounded-xl p-8 mb-8">
          <p className="text-xl text-yellow-800">
            Senha: <span className="font-bold text-3xl">A-123</span>
          </p>
        </div>

        <p className="text-lg text-gray-600">
          Por favor, aguarde ser chamado no painel de atendimento
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Monitor className="w-16 h-16 text-white" />
              <div>
                <h1 className="text-3xl font-bold text-white">Totem de Atendimento</h1>
                <p className="text-white opacity-90">Secretaria de Defesa do Consumidor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {currentScreen === 'home' && renderHomeScreen()}
        {currentScreen === 'denuncia' && renderDenunciaScreen()}
        {currentScreen === 'consulta' && renderConsultaScreen()}
        {currentScreen === 'atendimento' && renderAtendimentoScreen()}
      </div>
    </div>
  );
};

export default TotemInterface;


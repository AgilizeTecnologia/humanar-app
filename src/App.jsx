import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Shield, Phone, FileText } from 'lucide-react';
import './App.css';
import './gdf-styles.css';

// Contextos
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Componentes
import Layout from './components/Layout';
import FormularioDenuncia from './components/FormularioDenuncia';
import AtendimentoOnline from './components/AtendimentoOnline';
import CDCViewer from './components/CDCViewer';
import MinhasDenunciasList from './components/MinhasDenunciasList';
import RankingEmpresasReclamadas from './components/RankingEmpresasReclamadas';
import TotemInterface from './components/TotemInterface';
import ProtectedRoute from './components/ProtectedRoute';
import AuthFlow from './components/AuthFlow';

// Componente de elementos flutuantes
const FloatingElements = () => (
  <>
    <div className="floating-element"></div>
    <div className="floating-element"></div>
    <div className="floating-element"></div>
  </>
);

// Componente Home
const Home = () => {
  const { isAuthenticated } = useAuth();
  const [showAuthFlow, setShowAuthFlow] = useState(false);

  const handleDenunciaClick = (e) => {
    if (!isAuthenticated()) {
      e.preventDefault();
      setShowAuthFlow(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthFlow(false);
    window.location.href = '/denuncias';
  };

  return (
    <div className="relative min-h-screen">
      <FloatingElements />

      {/* Hero Section */}
      <section className="relative bg-gdf-gradient text-white py-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Defesa do Consumidor
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-up opacity-90" style={{ animationDelay: '0.2s' }}>
            Protegendo seus direitos em Brasília
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/denuncias"
              className="btn-gdf-secondary hover-lift"
              onClick={handleDenunciaClick}
            >
              Fazer Denúncia
            </Link>
            <Link to="/atendimento" className="btn-gdf-primary hover-lift">
              Atendimento Online
            </Link>
            <Link to="/totem" className="btn-gdf-secondary hover-lift">
              Totem de Atendimento
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Auth Flow Modal */}
      {showAuthFlow && (
        <AuthFlow
          onAuthSuccess={handleAuthSuccess}
          onClose={() => setShowAuthFlow(false)}
        />
      )}

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gdf-gradient">
            Como Podemos Ajudar
          </h2>
          <div className="grid md:grid-cols-3 gap-8 stagger-animation">
            <div className="card-modern p-8 text-center hover-lift">
              <Shield className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-4">Denúncias Online</h3>
              <p className="text-gray-600">
                Registre suas denúncias com fotos e vídeos de forma rápida e segura.
              </p>
            </div>
            <div className="card-modern p-8 text-center hover-lift">
              <Phone className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
              <h3 className="text-xl font-semibold mb-4">Atendimento 24/7</h3>
              <p className="text-gray-600">
                Mediadores especializados disponíveis para orientação e resolução de conflitos.
              </p>
            </div>
            <div className="card-modern p-8 text-center hover-lift">
              <FileText className="w-16 h-16 mx-auto mb-4 text-orange-600" />
              <h3 className="text-xl font-semibold mb-4">CDC Interativo</h3>
              <p className="text-gray-600">
                Consulte o Código de Defesa do Consumidor com busca inteligente e orientações práticas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gdf-gradient-subtle text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-bounce-custom">
              <div className="text-4xl font-bold mb-2">1.2K+</div>
              <div className="text-lg opacity-90">Denúncias Resolvidas</div>
            </div>
            <div className="animate-bounce-custom" style={{ animationDelay: '0.5s' }}>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Atendimento</div>
            </div>
            <div className="animate-bounce-custom" style={{ animationDelay: '1s' }}>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-lg opacity-90">Satisfação</div>
            </div>
            <div className="animate-bounce-custom" style={{ animationDelay: '1.5s' }}>
              <div className="text-4xl font-bold mb-2">48h</div>
              <div className="text-lg opacity-90">Tempo Médio</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Componente principal
function AppContent() {
  return (
    <Router>
      <Routes>
        {/* Rota do Totem sem Layout */}
        <Route path="/totem" element={<TotemInterface />} />

        {/* Rotas com Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/denuncias"
                  element={
                    <ProtectedRoute>
                      <FormularioDenuncia />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/atendimento"
                  element={
                    <ProtectedRoute>
                      <AtendimentoOnline />
                    </ProtectedRoute>
                  }
                />
                <Route path="/cdc" element={<CDCViewer />} />
                <Route path="/ranking-empresas" element={<RankingEmpresasReclamadas />} />
                <Route path="/portal-cursos" element={<div>Portal de Cursos em breve...</div>} />
                <Route
                  path="/minhas-denuncias"
                  element={
                    <ProtectedRoute>
                      <MinhasDenunciasList />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;


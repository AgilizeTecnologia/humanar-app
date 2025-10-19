import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Phone, FileText, Home as HomeIcon, List, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Layout = ({ children }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Início', icon: HomeIcon },
    { path: '/denuncias', label: 'Denúncias', icon: Shield },
    { path: '/atendimento', label: 'Atendimento', icon: Phone },
    { path: '/cdc', label: 'CDC', icon: FileText },
    { path: '/minhas-denuncias', label: 'Minhas Denúncias', icon: List },
    { path: '/ranking-empresas', label: 'Ranking Empresas Reclamadas', icon: TrendingUp },
    { path: '/portal-cursos', label: 'Portal de Cursos', icon: FileText },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="text-xs font-semibold text-gray-700 mb-1">Alô Consumidor</div>
                <img
                  src="/logo-alo-consumidor.jpg"
                  alt="Alô Consumidor"
                  className="w-16 h-16 object-contain"
                />
                <div className="text-center mt-1">
                  <div className="text-[10px] font-medium text-gray-600">Governo do Distrito Federal</div>
                  <div className="text-[9px] text-gray-500">Secretaria de Defesa do Consumidor do D.F.</div>
                </div>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-800">Portal do Consumidor</h1>
                <p className="text-sm text-gray-600">Protegendo seus direitos</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex space-x-8">
                {navItems.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`transition-colors font-medium ${
                      location.pathname === path
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              {/* User Info */}
              {isAuthenticated() && (
                <div className="hidden lg:flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{user?.nome}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair</span>
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileNavOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className={`fixed inset-0 z-50 lg:hidden ${mobileNavOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black opacity-50" onClick={() => setMobileNavOpen(false)}></div>
        <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform">
          <div className="p-4 border-b">
            <button onClick={() => setMobileNavOpen(false)} className="float-right">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold">Menu</h2>
          </div>
          <nav className="p-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
                  location.pathname === path
                    ? 'bg-blue-100 text-blue-600'
                    : 'hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}

            {isAuthenticated() && (
              <>
                <div className="border-t my-4"></div>
                <div className="px-3 py-2 text-sm text-gray-600">
                  <User className="w-4 h-4 inline mr-2" />
                  {user?.nome}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileNavOpen(false);
                  }}
                  className="flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sair</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sobre</h3>
              <p className="text-gray-300 text-sm">
                Portal oficial da Secretaria de Defesa do Consumidor do Distrito Federal.
                Protegendo os direitos dos consumidores brasilienses.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>Telefone: 151</li>
                <li>Email: procon@df.gov.br</li>
                <li>Horário: Segunda a Sexta, 8h às 18h</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Legislação
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Perguntas Frequentes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Ouvidoria
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Secretaria de Defesa do Consumidor do DF. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;


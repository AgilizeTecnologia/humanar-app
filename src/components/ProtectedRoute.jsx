import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthFlow from './AuthFlow';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated } = useAuth();
  const [showAuthFlow, setShowAuthFlow] = useState(!isAuthenticated() && requireAuth);

  const handleAuthSuccess = () => {
    setShowAuthFlow(false);
  };

  if (requireAuth && !isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Acesso Restrito
          </h2>
          <p className="text-gray-600 mb-6">
            Você precisa estar autenticado para acessar esta página
          </p>
          {showAuthFlow && (
            <AuthFlow
              onAuthSuccess={handleAuthSuccess}
              onClose={() => setShowAuthFlow(false)}
            />
          )}
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;


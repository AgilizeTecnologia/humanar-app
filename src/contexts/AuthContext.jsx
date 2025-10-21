import React, { createContext, useContext, useState, useEffect } from 'react';
import { registerUser, sendVerificationCodeAPI, verifyCodeAPI, resetPasswordAPI } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const isAuthenticated = () => {
    return user !== null;
  };

  const login = async (cpf, senha) => {
    const fixedCpf = '12345678900';
    const fixedSenha = 'Mudar@123';
    const cpfWithoutFormatting = cpf.replace(/\D/g, '');

    if (cpfWithoutFormatting === fixedCpf && senha === fixedSenha) {
      const dummyUser = { cpf: '123.456.789-00', name: 'Usuário Temporário' };
      setUser(dummyUser);
      localStorage.setItem('user', JSON.stringify(dummyUser));
      return { success: true, user: dummyUser };
    } else {
      return { success: false, message: 'CPF ou senha inválidos' };
    }
  };

  const register = async (userData) => {
    try {
      const result = await registerUser(userData);
      if (result.success) {
        setUser(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
      }
      return result;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  };

  const sendVerificationCode = async (cpf) => {
    try {
      const result = await sendVerificationCodeAPI(cpf);
      return result;
    } catch (error) {
      console.error('Erro ao enviar código:', error);
      throw error;
    }
  };

  const verifyCode = async (cpf, code) => {
    try {
      const result = await verifyCodeAPI(cpf, code);
      return result;
    } catch (error) {
      console.error('Erro ao verificar código:', error);
      throw error;
    }
  };

  const resetPassword = async (cpf, newPassword) => {
    try {
      const result = await resetPasswordAPI(cpf, newPassword);
      return result;
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    sendVerificationCode,
    verifyCode,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

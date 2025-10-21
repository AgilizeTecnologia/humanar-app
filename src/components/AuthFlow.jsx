import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from '../hooks/useForm';
import {
  validateLoginForm,
  validateRegisterForm,
  validateResetPasswordForm,
  validateNewPasswordForm,
  formatCPF,
  formatPhone,
} from '../utils/validation';

const AuthFlow = ({ onAuthSuccess, onClose }) => {
  const [stage, setStage] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { login, register, sendVerificationCode, verifyCode, resetPassword } = useAuth();

  const loginForm = useForm({ cpf: '', senha: '' });
  const registerForm = useForm({
    cpf: '',
    senha: '',
    confirmarSenha: '',
    nome: '',
    email: '',
    telefone: '',
  });
  const forgotPasswordForm = useForm({ cpf: '' });
  const verifyCodeForm = useForm({ verificationCode: '' });
  const resetPasswordForm = useForm({ newPassword: '', confirmPassword: '' });

  const handleLogin = async (values) => {
    try {
      const result = await login(values.cpf, values.senha);
      if (result.success) {
        onAuthSuccess(result.user);
      }
    } catch (err) {
      loginForm.setErrors({ senha: 'CPF ou senha inválidos' });
    }
  };

  const handleRegister = async (values) => {
    try {
      const result = await register({
        cpf: values.cpf,
        nome: values.nome,
        email: values.email,
        telefone: values.telefone,
        senha: values.senha,
      });
      if (result.success) {
        onAuthSuccess(result.user);
      }
    } catch (err) {
      registerForm.setErrors({ senha: 'Erro ao registrar. Tente novamente.' });
    }
  };

  const handleSendVerificationCode = async (values) => {
    try {
      const result = await sendVerificationCode(values.cpf);
      if (result.success) {
        setSuccessMessage('Código de verificação enviado para seu email/telefone cadastrado');
        setStage('verify-code');
      }
    } catch (err) {
      forgotPasswordForm.setErrors({ cpf: 'Erro ao enviar código. Verifique se o CPF está cadastrado.' });
    }
  };

  const handleVerifyCode = async (values) => {
    if (values.verificationCode.length !== 6) {
      verifyCodeForm.setErrors({ verificationCode: 'Código deve ter 6 dígitos' });
      return;
    }

    try {
      const result = await verifyCode(forgotPasswordForm.values.cpf, values.verificationCode);
      if (result.success) {
        setSuccessMessage('Código verificado com sucesso');
        setStage('reset-password');
      }
    } catch (err) {
      verifyCodeForm.setErrors({ verificationCode: 'Código inválido ou expirado' });
    }
  };

  const handleResetPassword = async (values) => {
    try {
      const result = await resetPassword(forgotPasswordForm.values.cpf, values.newPassword);
      if (result.success) {
        setSuccessMessage('Senha redefinida com sucesso! Faça login com sua nova senha.');
        setTimeout(() => {
          setStage('login');
          loginForm.reset();
          forgotPasswordForm.reset();
          verifyCodeForm.reset();
          resetPasswordForm.reset();
          setSuccessMessage('');
        }, 2000);
      }
    } catch (err) {
      resetPasswordForm.setErrors({ newPassword: 'Erro ao redefinir senha. Tente novamente.' });
    }
  };

  const renderError = (error) => {
    if (!error) return null;
    return <p className="text-red-600 text-sm mt-1">{error}</p>;
  };

  const renderLoginForm = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        loginForm.handleSubmit(handleLogin, validateLoginForm);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="cpf"
            value={formatCPF(loginForm.values.cpf)}
            onChange={(e) => loginForm.handleChange({ target: { name: 'cpf', value: e.target.value.replace(/\D/g, '') } })}
            placeholder="000.000.000-00"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength="14"
            required
          />
        </div>
        {renderError(loginForm.errors.cpf)}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="senha"
            value={loginForm.values.senha}
            onChange={loginForm.handleChange}
            placeholder="Digite sua senha"
            className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {renderError(loginForm.errors.senha)}
      </div>

      <button
        type="button"
        onClick={() => setStage('forgot-password')}
        className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
      >
        Esqueceu sua senha?
      </button>

      <button
        type="submit"
        disabled={loginForm.isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loginForm.isSubmitting ? 'Entrando...' : 'Entrar'}
      </button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => setStage('register')}
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Não tem conta? <span className="text-blue-600 font-medium">Cadastre-se</span>
        </button>
      </div>
    </form>
  );

  const renderRegisterForm = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        registerForm.handleSubmit(handleRegister, validateRegisterForm);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="nome"
            value={registerForm.values.nome}
            onChange={registerForm.handleChange}
            placeholder="Digite seu nome completo"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        {renderError(registerForm.errors.nome)}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="cpf"
            value={formatCPF(registerForm.values.cpf)}
            onChange={(e) => registerForm.handleChange({ target: { name: 'cpf', value: e.target.value.replace(/\D/g, '') } })}
            placeholder="000.000.000-00"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength="14"
            required
          />
        </div>
        {renderError(registerForm.errors.cpf)}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            name="email"
            value={registerForm.values.email}
            onChange={registerForm.handleChange}
            placeholder="seu@email.com"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        {renderError(registerForm.errors.email)}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="telefone"
            value={formatPhone(registerForm.values.telefone)}
            onChange={(e) => registerForm.handleChange({ target: { name: 'telefone', value: e.target.value.replace(/\D/g, '') } })}
            placeholder="(00) 00000-0000"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength="15"
            required
          />
        </div>
        {renderError(registerForm.errors.telefone)}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="senha"
            value={registerForm.values.senha}
            onChange={registerForm.handleChange}
            placeholder="Mínimo 6 caracteres"
            className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {renderError(registerForm.errors.senha)}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="password"
            name="confirmarSenha"
            value={registerForm.values.confirmarSenha}
            onChange={registerForm.handleChange}
            placeholder="Confirme sua senha"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        {renderError(registerForm.errors.confirmarSenha)}
      </div>

      <button
        type="submit"
        disabled={registerForm.isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {registerForm.isSubmitting ? 'Registrando...' : 'Registrar'}
      </button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => setStage('login')}
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Já tem conta? <span className="text-blue-600 font-medium">Faça login</span>
        </button>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        forgotPasswordForm.handleSubmit(handleSendVerificationCode, validateResetPasswordForm);
      }}
      className="space-y-4"
    >
      <p className="text-sm text-gray-600">Digite seu CPF para enviarmos um código de verificação.</p>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="cpf"
            value={formatCPF(forgotPasswordForm.values.cpf)}
            onChange={(e) => forgotPasswordForm.handleChange({ target: { name: 'cpf', value: e.target.value.replace(/\D/g, '') } })}
            placeholder="000.000.000-00"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength="14"
            required
          />
        </div>
        {renderError(forgotPasswordForm.errors.cpf)}
      </div>

      <button
        type="submit"
        disabled={forgotPasswordForm.isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {forgotPasswordForm.isSubmitting ? 'Enviando...' : 'Enviar Código'}
      </button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => setStage('login')}
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Voltar para o Login
        </button>
      </div>
    </form>
  );

  const renderVerifyCodeForm = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        verifyCodeForm.handleSubmit(handleVerifyCode);
      }}
      className="space-y-4"
    >
      <p className="text-sm text-gray-600">Digite o código de 6 dígitos que enviamos para você.</p>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Código de Verificação</label>
        <div className="relative">
          <input
            type="text"
            name="verificationCode"
            value={verifyCodeForm.values.verificationCode}
            onChange={(e) => verifyCodeForm.handleChange({ target: { name: 'verificationCode', value: e.target.value.replace(/\D/g, '') } })}
            placeholder="000000"
            className="w-full text-center tracking-[1em] py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength="6"
            required
          />
        </div>
        {renderError(verifyCodeForm.errors.verificationCode)}
      </div>

      <button
        type="submit"
        disabled={verifyCodeForm.isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {verifyCodeForm.isSubmitting ? 'Verificando...' : 'Verificar Código'}
      </button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => setStage('forgot-password')}
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Reenviar código
        </button>
      </div>
    </form>
  );

  const renderResetPasswordForm = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        resetPasswordForm.handleSubmit(handleResetPassword, validateNewPasswordForm);
      }}
      className="space-y-4"
    >
      <p className="text-sm text-gray-600">Crie uma nova senha.</p>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="newPassword"
            value={resetPasswordForm.values.newPassword}
            onChange={resetPasswordForm.handleChange}
            placeholder="Digite sua nova senha"
            className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {renderError(resetPasswordForm.errors.newPassword)}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="password"
            name="confirmPassword"
            value={resetPasswordForm.values.confirmPassword}
            onChange={resetPasswordForm.handleChange}
            placeholder="Confirme sua nova senha"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        {renderError(resetPasswordForm.errors.confirmPassword)}
      </div>

      <button
        type="submit"
        disabled={resetPasswordForm.isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {resetPasswordForm.isSubmitting ? 'Redefinindo...' : 'Redefinir Senha'}
      </button>
    </form>
  );

  const getTitle = () => {
    switch (stage) {
      case 'login':
        return 'Login';
      case 'register':
        return 'Cadastro';
      case 'forgot-password':
        return 'Recuperar Senha';
      case 'verify-code':
        return 'Verificar Código';
      case 'reset-password':
        return 'Nova Senha';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-transform duration-300 animate-slide-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{getTitle()}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-md">
            {successMessage}
          </div>
        )}

        {stage === 'login' && renderLoginForm()}
        {stage === 'register' && renderRegisterForm()}
        {stage === 'forgot-password' && renderForgotPasswordForm()}
        {stage === 'verify-code' && renderVerifyCodeForm()}
        {stage === 'reset-password' && renderResetPasswordForm()}
      </div>
    </div>
  );
};

export default AuthFlow;

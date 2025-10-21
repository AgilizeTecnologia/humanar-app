const API_BASE_URL = '/api/auth';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro na requisição');
  }
  return response.json();
};

export const loginUser = async (cpf, senha) => {
  // Em produção, substituir por chamada real à API
  if (import.meta.env.DEV) {
    // Mock para desenvolvimento
    if (cpf === '123.456.789-00' && senha === 'Mudar@123') {
      return {
        success: true,
        user: {
          id: '1',
          cpf,
          nome: 'Usuário Teste',
          email: 'usuario@teste.com',
          telefone: '(61) 99999-9999',
        },
      };
    } else {
      throw new Error('CPF ou senha inválidos (mock)');
    }
  }

  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cpf, senha }),
  });
  return handleResponse(response);
};

export const registerUser = async (userData) => {
  // Em produção, substituir por chamada real à API
  if (import.meta.env.DEV) {
    // Mock para desenvolvimento
    return {
      success: true,
      user: {
        id: Date.now().toString(),
        ...userData,
      },
    };
  }

  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const sendVerificationCodeAPI = async (cpf) => {
  // Em produção, substituir por chamada real à API
  if (import.meta.env.DEV) {
    console.log('Código de verificação enviado para:', cpf);
    return { success: true, message: 'Código enviado com sucesso (mock)' };
  }

  const response = await fetch(`${API_BASE_URL}/send-verification-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cpf }),
  });
  return handleResponse(response);
};

export const verifyCodeAPI = async (cpf, code) => {
  // Em produção, substituir por chamada real à API
  if (import.meta.env.DEV) {
    if (code === '123456') {
      return { success: true, message: 'Código verificado com sucesso (mock)' };
    }
    throw new Error('Código inválido ou expirado (mock)');
  }

  const response = await fetch(`${API_BASE_URL}/verify-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cpf, code }),
  });
  return handleResponse(response);
};

export const resetPasswordAPI = async (cpf, newPassword) => {
  // Em produção, substituir por chamada real à API
  if (import.meta.env.DEV) {
    console.log('Senha redefinida com sucesso para:', cpf);
    return { success: true, message: 'Senha redefinida com sucesso (mock)' };
  }

  const response = await fetch(`${API_BASE_URL}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cpf, newPassword }),
  });
  return handleResponse(response);
};


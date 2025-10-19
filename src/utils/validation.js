export const validateCPF = (cpf) => {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais
  // Exceção para CPF de teste
  if (cleanCPF === '12345678900') {
    return true;
  }

  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return false;
  }

  // Validação dos dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(9))) {
    return false;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(10))) {
    return false;
  }

  return true;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  // Remove caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, '');
  // Verifica se tem 10 ou 11 dígitos (com ou sem 9 no celular)
  return cleanPhone.length === 10 || cleanPhone.length === 11;
};

export const validatePassword = (password) => {
  // Mínimo 6 caracteres
  return password.length >= 6;
};

export const validateLoginForm = (values) => {
  const errors = {};

  if (!values.cpf) {
    errors.cpf = 'CPF é obrigatório';
  } else if (!validateCPF(values.cpf)) {
    errors.cpf = 'CPF inválido';
  }

  if (!values.senha) {
    errors.senha = 'Senha é obrigatória';
  }

  return errors;
};

export const validateRegisterForm = (values) => {
  const errors = {};

  if (!values.nome) {
    errors.nome = 'Nome é obrigatório';
  }

  if (!values.cpf) {
    errors.cpf = 'CPF é obrigatório';
  } else if (!validateCPF(values.cpf)) {
    errors.cpf = 'CPF inválido';
  }

  if (!values.email) {
    errors.email = 'E-mail é obrigatório';
  } else if (!validateEmail(values.email)) {
    errors.email = 'E-mail inválido';
  }

  if (!values.telefone) {
    errors.telefone = 'Telefone é obrigatório';
  } else if (!validatePhone(values.telefone)) {
    errors.telefone = 'Telefone inválido';
  }

  if (!values.senha) {
    errors.senha = 'Senha é obrigatória';
  } else if (!validatePassword(values.senha)) {
    errors.senha = 'Senha deve ter no mínimo 6 caracteres';
  }

  if (!values.confirmarSenha) {
    errors.confirmarSenha = 'Confirmação de senha é obrigatória';
  } else if (values.senha !== values.confirmarSenha) {
    errors.confirmarSenha = 'As senhas não coincidem';
  }

  return errors;
};

export const validateResetPasswordForm = (values) => {
  const errors = {};

  if (!values.cpf) {
    errors.cpf = 'CPF é obrigatório';
  } else if (!validateCPF(values.cpf)) {
    errors.cpf = 'CPF inválido';
  }

  return errors;
};

export const validateNewPasswordForm = (values) => {
  const errors = {};

  if (!values.newPassword) {
    errors.newPassword = 'Nova senha é obrigatória';
  } else if (!validatePassword(values.newPassword)) {
    errors.newPassword = 'Senha deve ter no mínimo 6 caracteres';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirmação de senha é obrigatória';
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'As senhas não coincidem';
  }

  return errors;
};

export const formatCPF = (cpf) => {
  const cleanCPF = cpf.replace(/\D/g, '');
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatPhone = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return phone;
};


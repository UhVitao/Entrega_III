// features/validation.js — validação de CPF e helpers
export function isValidCPF(value){
  const cpf = (value || '').replace(/\D+/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false; // repetidos

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let dig1 = 11 - (sum % 11);
  dig1 = dig1 > 9 ? 0 : dig1;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  let dig2 = 11 - (sum % 11);
  dig2 = dig2 > 9 ? 0 : dig2;

  return dig1 === parseInt(cpf.charAt(9)) && dig2 === parseInt(cpf.charAt(10));
}

export function setFieldError(input, message){
  input.setCustomValidity(message || '');
  input.reportValidity();
}

export function clearFieldError(input){
  input.setCustomValidity('');
}

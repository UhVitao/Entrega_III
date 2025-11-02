// features/form.js — submissão com verificação extra e persistência local
import { maskCPF, maskCEP, maskPhone } from './masks.js';
import { isValidCPF, setFieldError, clearFieldError } from './validation.js';
import { storage } from '../core/storage.js';
import { toast } from '../ui/toast.js';

export function initCadastroForm(){
  const form = document.querySelector('form');
  if (!form) return;

  const cpf = form.querySelector('#cpf');
  const cep = form.querySelector('#cep');
  const tel = form.querySelector('#telefone');

  if (cpf) maskCPF(cpf);
  if (cep) maskCEP(cep);
  if (tel) maskPhone(tel);

  // Validação extra de CPF
  if (cpf){
    cpf.addEventListener('blur', () => {
      if (cpf.value && !isValidCPF(cpf.value)){
        setFieldError(cpf, 'CPF inválido. Verifique os dígitos.');
      } else {
        clearFieldError(cpf);
      }
    });
  }

  form.addEventListener('submit', (e) => {
    if (cpf && cpf.value && !isValidCPF(cpf.value)){
      e.preventDefault();
      setFieldError(cpf, 'CPF inválido. Verifique os dígitos.');
      return;
    }
    if (!form.checkValidity()){
      // deixa o browser mostrar os erros nativos
      return;
    }
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    const list = storage.get('volunteers', []);
    list.push({ ...data, createdAt: new Date().toISOString() });
    storage.set('volunteers', list);

    form.reset();
    toast('Cadastro enviado com sucesso!', 'info', 2500);
    renderHistory();
  });

  // Histórico simples
  const historyEl = document.getElementById('cadastro-historico');
  function renderHistory(){
    if (!historyEl) return;
    const list = storage.get('volunteers', []);
    if (list.length === 0){
      historyEl.innerHTML = '<p class="muted">Sem cadastros ainda.</p>';
      return;
    }
    historyEl.innerHTML = `<ul role="list">${list.slice(-5).reverse().map(v => `
      <li><strong>${v.nome || '(sem nome)'}</strong> — ${v.email || ''} — <small>${new Date(v.createdAt).toLocaleString()}</small></li>
    `).join('')}</ul>`;
  }
  renderHistory();
}

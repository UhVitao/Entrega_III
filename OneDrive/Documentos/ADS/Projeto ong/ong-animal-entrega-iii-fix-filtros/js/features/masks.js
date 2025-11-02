// features/masks.js — máscaras de CPF, CEP e Telefone
function onlyDigits(v){ return v.replace(/\D+/g, ''); }

export function maskCPF(el){
  el.addEventListener('input', () => {
    const d = onlyDigits(el.value).slice(0, 11);
    let out = d;
    if (d.length > 9) out = d.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    else if (d.length > 6) out = d.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    else if (d.length > 3) out = d.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    el.value = out;
  });
}

export function maskCEP(el){
  el.addEventListener('input', () => {
    const d = onlyDigits(el.value).slice(0, 8);
    el.value = d.replace(/(\d{5})(\d{0,3})/, (m, a, b) => b ? `${a}-${b}` : a);
  });
}

export function maskPhone(el){
  el.addEventListener('input', () => {
    const d = onlyDigits(el.value).slice(0, 11);
    if (d.length <= 10){
      // (##) ####-####
      el.value = d
        .replace(/^(\d{0,2})/, (m,a)=> a ? `(${a}` : '')
        .replace(/^\((\d{2})(\d{0,4})/, (m,ddd,rest)=> rest ? `(${ddd}) ${rest}` : `(${ddd}`)
        .replace(/^\((\d{2})\)\s(\d{4})(\d{0,4})/, (m,ddd,a,b)=> b ? `(${ddd}) ${a}-${b}` : `(${ddd}) ${a}`);
    } else {
      // (##) #####-####
      el.value = d
        .replace(/^(\d{0,2})/, (m,a)=> a ? `(${a}` : '')
        .replace(/^\((\d{2})(\d{0,5})/, (m,ddd,rest)=> rest ? `(${ddd}) ${rest}` : `(${ddd}`)
        .replace(/^\((\d{2})\)\s(\d{5})(\d{0,4})/, (m,ddd,a,b)=> b ? `(${ddd}) ${a}-${b}` : `(${ddd}) ${a}`);
    }
  });
}

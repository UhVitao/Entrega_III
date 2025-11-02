// ui/toast.js — cria avisos temporários
export function toast(message, type = 'info', timeout = 3000) {
  const el = document.createElement('div');
  el.className = `alert alert--${type}`;
  el.role = 'status';
  el.textContent = message;
  Object.assign(el.style, {
    position: 'fixed', left: '50%', transform: 'translateX(-50%)',
    bottom: '16px', zIndex: 9999, maxWidth: '92vw'
  });
  document.body.appendChild(el);
  setTimeout(() => el.remove(), timeout);
}

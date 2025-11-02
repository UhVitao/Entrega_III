// ui/menu.js — sincroniza aria-expanded com o checkbox do menu
export function initMenuA11y() {
  const checkbox = document.querySelector('.nav__checkbox');
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('menu-principal');
  if (!checkbox || !toggle || !menu) return;

  function sync() {
    const expanded = checkbox.checked;
    toggle.setAttribute('aria-expanded', String(expanded));
  }
  checkbox.addEventListener('change', sync);
  sync();

  // Fechar menu quando usuário clica fora (mobile)
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      checkbox.checked = false;
      sync();
    }
  });
}

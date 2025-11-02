import { initMenuA11y } from './ui/menu.js';
import { initCadastroForm } from './features/form.js';
import { initProjects } from './features/projects.js';
import { initRouter } from './core/router.js';

function onReady(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }

onReady(() => {
  initMenuA11y();
  initRouter();

  const path = location.pathname;
  if (path.endsWith('cadastro.html')) {
    initCadastroForm();
  }
  if (path.endsWith('projetos.html')) {
    initProjects();
  }
});

// features/projects.js — renderiza projetos e implementa filtros via hash (#/projetos/:categoria)
import { projects } from '../data/projects.js';
import { projectCardTemplate } from '../core/templates.js';

export function initProjects(){
  const container = document.getElementById('project-list');
  if (!container) return;

  function getFilterFromHash(){
    const h = location.hash || '';
    const m = h.match(/^#\/projetos\/?([^\/]+)?/i);
    return m && m[1] ? decodeURIComponent(m[1]) : null;
  }

  function render(){
    const filter = getFilterFromHash();
    const data = filter
      ? projects.filter(p => p.categories.some(c => c.toLowerCase().includes(filter.toLowerCase())))
      : projects;

    container.innerHTML = data.map(projectCardTemplate).join('') || '<p class="muted">Nenhum projeto encontrado.</p>';

    // Marcar item ativo nos filtros, se existirem
    document.querySelectorAll('[data-filter]').forEach(a => {
      const active = (filter && a.dataset.filter.toLowerCase() === filter.toLowerCase()) || (!filter && a.dataset.filter === 'all');
      a.setAttribute('aria-current', active ? 'page' : 'false');
    });
  }

  window.addEventListener('hashchange', render);
  render();
}

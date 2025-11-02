// core/templates.js — template simples para card de projeto
export function projectCardTemplate(p){
  return `
  <article class="card">
    <header><h3>${p.title}</h3></header>
    <figure class="rounded shadow-1">
      <img src="${p.img}" alt="${p.alt}">
      <figcaption>${p.description}</figcaption>
    </figure>
    <p><strong>Impacto:</strong> ${p.impact}</p>
    <ul aria-label="Categorias">
      ${p.categories.map(c => `<li>${c}</li>`).join('')}
    </ul>
    <p>
      <a class="btn" href="cadastro.html">Quero ser voluntário</a>
      <a class="btn btn--ghost" href="#doacoes">Como doar</a>
    </p>
  </article>`;
}

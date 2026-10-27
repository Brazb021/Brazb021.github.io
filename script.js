/* =========================================================
   EDITE AQUI: tecnologias, interesses e projetos
   ========================================================= */

const TECNOLOGIAS = ['React', 'Python', 'SQL', 'CSS'];

const INTERESSES = ['🎮 Jogos', '🎧 Música', '🏎️ Automobilismo', '🤖 IA'];

// Frases que se alternam embaixo do nome
const FRASES = ['Desenvolvedor', 'Criando sites', 'Automatizando processos', 'Estudante de TI'];

// Para cada projeto:
//  - imagem: caminho de um print (ex.: 'assets/torque.png'). Opcional.
//  - preview: URL de um site publicado para mostrar uma prévia ao vivo. Opcional.
//  - sem imagem nem preview, aparece uma arte com a "sigla".
const PROJETOS = [
  {
    titulo: 'TORQUE: Vendas de Capacetes Online',
    descricao: 'Loja virtual de capacetes com catálogo de produtos e experiência de compra online.',
    tags: ['E-commerce', 'Em desenvolvimento'],
    sigla: 'TORQUE',
    // Quando o site estiver no ar, adicione: site: 'https://...',
    repo: 'https://github.com/Brazb021/loja-capacetes',
  },
  {
    titulo: 'Vagas Suporte TI',
    descricao: 'Dashboard que reúne vagas de Suporte TI (N1, N2, Júnior e Help Desk) da Gupy, LinkedIn, InfoJobs e Catho, com filtros por nível, plataforma e período.',
    tags: ['Automação', 'Dashboard', 'GitHub Pages'],
    preview: 'https://brazb021.github.io/VagasSuporteTI/',
    site: 'https://brazb021.github.io/VagasSuporteTI/',
  },
  {
    titulo: 'Próximo projeto',
    descricao: 'Novos projetos da faculdade e pessoais chegando em breve.',
    tags: ['Em breve'],
    emBreve: true,
  },
];

/* ========================================================= */

const ICONES = {
  React: '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>',
  Python: '<svg viewBox="0 0 24 24"><path d="M12 3c-4 0-4 1.7-4 3v2h4v1H6c-2 0-3 1.5-3 4s1 4 3 4h2v-2.5c0-1.4 1.1-2.5 2.5-2.5h4c1.4 0 2.5-1.1 2.5-2.5V6c0-1.6-1.6-3-5-3z"/><path d="M12 21c4 0 4-1.7 4-3v-2h-4v-1h6c2 0 3-1.5 3-4s-1-4-3-4h-2"/></svg>',
  SQL: '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
  CSS: '<svg viewBox="0 0 24 24"><path d="m4 3 1.5 17L12 22l6.5-2L20 3z"/><path d="M16 8H8.5l.3 3.5h6.9l-.4 4.5L12 17l-3.3-1"/></svg>',
};
const ICONE_PADRAO = '<svg viewBox="0 0 24 24"><path d="m8 9-4 3 4 3M16 9l4 3-4 3"/></svg>';

const $ = (sel) => document.querySelector(sel);

// Tecnologias: lista duplicada para a faixa rolar sem emendas
function renderTecnologias() {
  const item = (t, oculto) =>
    `<span class="tech"${oculto ? ' aria-hidden="true"' : ''}>${ICONES[t] || ICONE_PADRAO}${t}</span>`;
  const repeticoes = Math.max(2, Math.ceil(8 / TECNOLOGIAS.length));
  let html = '';
  for (let i = 0; i < repeticoes * 2; i++) {
    html += TECNOLOGIAS.map((t) => item(t, i > 0)).join('');
  }
  $('#tech-track').innerHTML = html;
}

function renderInteresses() {
  $('#interests').innerHTML = INTERESSES.map((i) => `<li>${i}</li>`).join('');
}

function previewHTML(p) {
  if (p.imagem) return `<img src="${p.imagem}" alt="Prévia de ${p.titulo}" loading="lazy" draggable="false">`;
  if (p.preview) return `<iframe src="${p.preview}" title="Prévia de ${p.titulo}" loading="lazy" tabindex="-1" aria-hidden="true"></iframe>`;
  if (p.emBreve) return `<div class="art soon"><span>EM BREVE</span></div>`;
  return `<div class="art"><span>${p.sigla || p.titulo.slice(0, 2).toUpperCase()}</span></div>`;
}

function renderProjetos() {
  $('#track').innerHTML = PROJETOS.map((p) => {
    const links = [];
    if (p.site) links.push(`<a class="btn btn-primary" href="${p.site}" target="_blank" rel="noopener">Ver site</a>`);
    if (p.repo) links.push(`<a class="btn btn-ghost" href="${p.repo}" target="_blank" rel="noopener">Ver código</a>`);
    return `
      <article class="project">
        <div class="preview">${previewHTML(p)}</div>
        <div class="project-body">
          <h3>${p.titulo}</h3>
          <p>${p.descricao}</p>
          <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>
          ${links.length ? `<div class="project-links">${links.join('')}</div>` : ''}
        </div>
      </article>`;
  }).join('');

  $('#dots').innerHTML = PROJETOS.map((p, i) =>
    `<button role="tab" aria-label="Ir para ${p.titulo}" aria-selected="${i === 0}" data-i="${i}"></button>`
  ).join('');
}

// Ajusta a escala das prévias ao vivo ao tamanho do card
function ajustarPreviews() {
  document.querySelectorAll('.preview iframe').forEach((f) => {
    f.style.transform = `scale(${f.parentElement.clientWidth / 1280})`;
  });
}

function iniciarCarrossel() {
  const carousel = $('#carousel');
  const cards = () => [...carousel.querySelectorAll('.project')];
  const dots = [...document.querySelectorAll('#dots button')];
  const prev = $('#prev');
  const next = $('#next');

  const passo = () => {
    const [a, b] = cards();
    return b ? b.offsetLeft - a.offsetLeft : carousel.clientWidth;
  };

  const indiceAtual = () => Math.round(carousel.scrollLeft / passo());

  const atualizar = () => {
    const max = carousel.scrollWidth - carousel.clientWidth;
    // No fim da rolagem, o último card já está visível
    const i = carousel.scrollLeft >= max - 2 ? dots.length - 1 : indiceAtual();
    dots.forEach((d, j) => d.setAttribute('aria-selected', String(j === i)));
    prev.disabled = carousel.scrollLeft <= 2;
    next.disabled = carousel.scrollLeft >= max - 2;
  };

  const irPara = (i) => carousel.scrollTo({ left: i * passo(), behavior: 'smooth' });

  prev.addEventListener('click', () => irPara(indiceAtual() - 1));
  next.addEventListener('click', () => irPara(indiceAtual() + 1));
  dots.forEach((d) => d.addEventListener('click', () => irPara(Number(d.dataset.i))));

  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); irPara(indiceAtual() + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); irPara(indiceAtual() - 1); }
  });

  let raf;
  carousel.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(atualizar);
  });

  // Arrastar com o mouse (no toque o navegador já faz isso)
  let inicioX = 0, inicioScroll = 0, arrastando = false, moveu = false;
  carousel.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    arrastando = true; moveu = false;
    inicioX = e.clientX; inicioScroll = carousel.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!arrastando) return;
    const dx = e.clientX - inicioX;
    if (!moveu && Math.abs(dx) > 5) { moveu = true; carousel.classList.add('dragging'); }
    if (moveu) carousel.scrollLeft = inicioScroll - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!arrastando) return;
    arrastando = false;
    if (moveu) {
      const i = indiceAtual();
      carousel.classList.remove('dragging');
      irPara(i);
    }
  });
  // Evita abrir links ao soltar depois de arrastar
  carousel.addEventListener('click', (e) => { if (moveu) { e.preventDefault(); moveu = false; } }, true);

  window.addEventListener('resize', () => { ajustarPreviews(); atualizar(); });
  atualizar();
}

function iniciarTema() {
  $('#theme-toggle').addEventListener('click', () => {
    const root = document.documentElement;
    const escuroAtual = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : true;
    const novo = escuroAtual ? 'light' : 'dark';
    root.dataset.theme = novo;
    try { localStorage.setItem('tema', novo); } catch (e) {}
  });
}

const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Efeito de digitação no cargo
function iniciarDigitacao() {
  const el = $('#typed');
  if (reduzMovimento || FRASES.length < 2) return;
  let frase = 0, letra = FRASES[0].length, apagando = true;
  const tick = () => {
    letra += apagando ? -1 : 1;
    el.textContent = FRASES[frase].slice(0, letra);
    let espera = apagando ? 45 : 85;
    if (apagando && letra === 0) {
      apagando = false;
      frase = (frase + 1) % FRASES.length;
      espera = 350;
    } else if (!apagando && letra === FRASES[frase].length) {
      apagando = true;
      espera = 2200;
    }
    setTimeout(tick, espera);
  };
  setTimeout(tick, 2200);
}

// Cards aparecem suavemente ao rolar a página
function iniciarRevelar() {
  const itens = document.querySelectorAll('.reveal');
  const mostrarTodos = () => itens.forEach((i) => i.classList.add('visible'));
  if (reduzMovimento || !('IntersectionObserver' in window)) return mostrarTodos();
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  itens.forEach((i, n) => { i.style.transitionDelay = `${Math.min(n, 4) * 60}ms`; obs.observe(i); });
  // Garantia: nada fica escondido se o observador não disparar
  setTimeout(mostrarTodos, 2500);
}

// Brilho dos cards seguindo o mouse
function iniciarBrilho() {
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
    });
  });
}

function iniciarCopiarEmail() {
  const label = $('#copy-label');
  $('#copy-email').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('brazb021@gmail.com');
      label.textContent = 'Copiado!';
    } catch (e) {
      label.textContent = 'Erro';
    }
    setTimeout(() => { label.textContent = 'Copiar'; }, 1800);
  });
}

function preencherNumeros() {
  $('#stat-projetos').textContent = PROJETOS.filter((p) => !p.emBreve).length;
  $('#stat-techs').textContent = TECNOLOGIAS.length;
}

renderTecnologias();
renderInteresses();
renderProjetos();
ajustarPreviews();
iniciarCarrossel();
iniciarTema();
preencherNumeros();
iniciarDigitacao();
iniciarRevelar();
iniciarBrilho();
iniciarCopiarEmail();
$('#year').textContent = new Date().getFullYear();

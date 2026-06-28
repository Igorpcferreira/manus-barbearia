/**
 * fx.ts — efeitos client-side (vanilla TS, sem libs) da Manu's Barbearia.
 *
 * Centraliza os efeitos novos migrados do protótipo single-file aprovado:
 *   - Brasas em <canvas> (3 camadas com profundidade, parallax ao rolar e
 *     reação ao cursor; faíscas brilhantes ocasionais; pausa em aba oculta)
 *   - Luz que segue o cursor (cursor-glow) — só desktop
 *   - Parallax das camadas de fundo ([data-par]) por scroll + mouse
 *   - Tilt 3D + glare nos cards/foto e botões magnéticos (seção no fim)
 *
 * Decisão da marca (sensação premium para TODOS): a atmosfera — brasas, aurora,
 * halo, reveals — roda em qualquer dispositivo, inclusive no celular e mesmo com
 * "reduzir movimento" ativo. A única cortesia sob `prefers-reduced-motion` é
 * desligar o parallax de scroll (o movimento mais incômodo). Já os efeitos que
 * dependem de MOUSE (tilt, glare, cursor-glow, magnético) ficam restritos a
 * desktop com ponteiro fino (`hover:hover` + `pointer:fine`), pois não há como
 * acioná-los no toque. Importado UMA única vez no Layout.astro.
 */

// `reduce` é usado APENAS para desligar o parallax de scroll sob reduzir-movimento
// (ver decisão da marca no doc do topo). `fine` restringe os efeitos de mouse.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const clamp = (v: number, a: number, b: number): number => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const rand = (a: number, b: number): number => a + Math.random() * (b - a);

/* Estado de ponteiro compartilhado (parallax de mouse + cursor-glow). */
let mx = 0; // -1..1, relativo ao centro da viewport
let my = 0;

/* ============================================================
   PARALLAX das camadas de fundo ([data-par])
   Usa a propriedade independente `translate` (não `transform`) para COMPOR com a
   animação `auroraDrift`, que anima `transform` — assim o parallax aparece de fato
   em vez de ser sobrescrito pela animação.
   ============================================================ */
const parLayers = Array.from(document.querySelectorAll<HTMLElement>('[data-par]'));

function parFrame(): void {
  const sc = window.scrollY;
  for (const el of parLayers) {
    const s = parseFloat(el.dataset.par || '0.04');
    const y = sc * s * -1;
    const px = fine ? mx * 180 * s : 0;
    const py = fine ? my * 180 * s : 0;
    el.style.translate = `${px}px ${y + py}px`;
  }
}

if (parLayers.length && !reduce) {
  // Handler de scroll próprio (rAF). nav-solid/barra-de-progresso seguem no Layout.
  let ticking = false;
  const onScroll = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      parFrame();
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', parFrame, { passive: true });
  parFrame();
}

/* ============================================================
   CURSOR-GLOW + parallax de mouse (apenas desktop com ponteiro fino)
   ============================================================ */
const cglow = document.getElementById('cglow');
if (cglow && fine) {
  const GLOW_HALF = 260; // metade de 520px, p/ centralizar o brilho no cursor
  let tx = window.innerWidth / 2;
  let ty = window.innerHeight / 2;
  let cx = tx;
  let cy = ty;

  window.addEventListener(
    'pointermove',
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );
  window.addEventListener('pointerover', () => {
    cglow.style.opacity = '1';
  });

  const glowLoop = (): void => {
    cx = lerp(cx, tx, 0.14);
    cy = lerp(cy, ty, 0.14);
    cglow.style.transform = `translate(${cx - GLOW_HALF}px, ${cy - GLOW_HALF}px)`;
    parFrame(); // mantém o parallax de mouse no mesmo rAF do glow
    requestAnimationFrame(glowLoop);
  };
  requestAnimationFrame(glowLoop);
}

/* ============================================================
   BRASAS (canvas, 3 camadas, parallax, reação ao cursor)
   ============================================================ */
interface EmberLayer {
  n: number; // quantidade
  sMin: number; // raio mín
  sMax: number; // raio máx
  vMin: number; // velocidade mín (sobe)
  vMax: number; // velocidade máx
  alpha: number; // opacidade base
  par: number; // fator de parallax por scroll
}

interface Ember {
  layer: EmberLayer;
  x: number;
  y: number;
  r: number;
  vy: number;
  amp: number; // amplitude da oscilação horizontal
  ph: number; // fase
  fr: number; // frequência
  hue: number; // matiz (laranja/âmbar — calor da marca)
  life: number; // 0..1 (fade in/out via seno)
  bright: boolean; // faísca mais brilhante ocasional
}

(function embers(): void {
  // Brasas rodam sempre (parte da identidade premium), inclusive sob reduzir-movimento.
  const el = document.getElementById('embers');
  if (!(el instanceof HTMLCanvasElement)) return;
  // Aliases com tipo não-nulo: o narrowing por instanceof/null-check não sobrevive
  // dentro das closures (resize/loop), então fixamos o tipo aqui.
  const canvas: HTMLCanvasElement = el;
  const context = canvas.getContext('2d');
  if (!context) return;
  const c2d: CanvasRenderingContext2D = context;

  const DPR = Math.min(window.devicePixelRatio || 1, 2); // limita DPR a 2 (perf)
  let W = 0;
  let H = 0;

  // do fundo (pequenas/lentas/discretas) ao topo (grandes/rápidas/brilhantes).
  // No toque mantemos uma redução leve (bateria), mas farta o bastante para a
  // atmosfera de brasas aparecer cheia no celular (≈51 vs 60 no desktop).
  const layers: EmberLayer[] = [
    { n: fine ? 26 : 22, sMin: 0.5, sMax: 1.4, vMin: 0.1, vMax: 0.3, alpha: 0.45, par: 0.02 },
    { n: fine ? 20 : 17, sMin: 1.0, sMax: 2.2, vMin: 0.2, vMax: 0.5, alpha: 0.6, par: 0.05 },
    { n: fine ? 14 : 12, sMin: 1.6, sMax: 3.2, vMin: 0.38, vMax: 0.8, alpha: 0.82, par: 0.09 },
  ];

  function make(layer: EmberLayer, seed: boolean): Ember {
    return {
      layer,
      x: Math.random() * W,
      y: seed ? Math.random() * H : H + Math.random() * 60,
      r: rand(layer.sMin, layer.sMax),
      vy: -rand(layer.vMin, layer.vMax),
      amp: rand(6, 22),
      ph: Math.random() * Math.PI * 2,
      fr: rand(0.4, 1.2),
      hue: rand(18, 44),
      life: Math.random(),
      bright: Math.random() < 0.09,
    };
  }

  const parts: Ember[] = [];
  function resize(): void {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });
  for (const L of layers) for (let i = 0; i < L.n; i++) parts.push(make(L, true));

  let pointerX = -9999;
  let pointerY = -9999;
  if (fine) {
    window.addEventListener(
      'pointermove',
      (e) => {
        pointerX = e.clientX;
        pointerY = e.clientY;
      },
      { passive: true }
    );
  }

  let running = true;
  document.addEventListener('visibilitychange', () => {
    const was = running;
    running = !document.hidden; // pausa quando a aba fica oculta
    if (running && !was) requestAnimationFrame(loop);
  });

  function loop(): void {
    if (!running) return;
    c2d.setTransform(DPR, 0, 0, DPR, 0, 0);
    c2d.clearRect(0, 0, W, H);
    const t = performance.now() / 1000;
    const sc = window.scrollY;
    for (const p of parts) {
      p.life += 0.0035;
      p.y += p.vy;
      let px = p.x + Math.sin(t * p.fr + p.ph) * p.amp * 0.06;
      let py = p.y - sc * p.layer.par; // parallax por scroll
      if (fine && pointerX > -9000) {
        const dx = px - pointerX;
        const dy = py - pointerY;
        const d2 = dx * dx + dy * dy;
        if (d2 < 13000) {
          const f = 1 - d2 / 13000; // repele suavemente perto do cursor
          py -= f * 0.9;
          px += dx * 0.0016 * f * 60;
        }
      }
      if (py < -14 || p.life > 1) {
        Object.assign(p, make(p.layer, false));
        continue;
      }
      const a = clamp(Math.sin(p.life * Math.PI) * p.layer.alpha * (p.bright ? 1.4 : 1), 0, 1);
      const r = p.r * (p.bright ? 1.5 : 1);
      c2d.beginPath();
      c2d.arc(px, py, r, 0, Math.PI * 2);
      c2d.fillStyle = `hsla(${p.hue}, 100%, ${p.bright ? 68 : 58}%, ${a})`;
      c2d.shadowBlur = p.bright ? 16 : 9;
      c2d.shadowColor = `hsla(${p.hue}, 100%, 55%, ${a})`;
      c2d.fill();
    }
    c2d.shadowBlur = 0;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

/* ============================================================
   TILT 3D + GLARE (cards e foto) e BOTÕES MAGNÉTICOS (CTAs)
   Apenas desktop com ponteiro fino; o suave retorno fica por conta da transição
   de `transform` definida em .[data-tilt] / nos próprios botões (var(--dur)).
   ============================================================ */
if (fine) {
  const TILT_MAX = 8; // graus
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width; // 0..1
      const py = (e.clientY - r.top) / r.height; // 0..1
      card.style.transform =
        `perspective(800px) rotateX(${(0.5 - py) * TILT_MAX}deg) ` +
        `rotateY(${(px - 0.5) * TILT_MAX}deg) translateZ(6px)`;
      card.classList.add('lit');
      card.style.setProperty('--gx', `${px * 100}%`);
      card.style.setProperty('--gy', `${py * 100}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
      card.classList.remove('lit');
    });
  });

  const MAG_STRENGTH = 6; // intensidade da atração magnética
  document.querySelectorAll<HTMLElement>('[data-mag]').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      btn.style.transform = `translate(${x * MAG_STRENGTH * 2}px, ${y * MAG_STRENGTH * 2}px)`;
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ============================================================
   RIPPLE no toque/clique — feedback tátil em TODOS os dispositivos (essencial no
   celular, onde não há hover). Delegação no documento p/ pegar qualquer botão
   [data-ripple], inclusive os que entram depois (ilhas React). Cada onda se
   remove sozinha ao fim da animação.
   ============================================================ */
document.addEventListener(
  'pointerdown',
  (e) => {
    const target = e.target as HTMLElement | null;
    const btn = target?.closest<HTMLElement>('[data-ripple]');
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const ink = document.createElement('span');
    ink.className = 'ripple';
    ink.style.width = ink.style.height = `${size}px`;
    ink.style.left = `${e.clientX - r.left - size / 2}px`;
    ink.style.top = `${e.clientY - r.top - size / 2}px`;
    btn.appendChild(ink);
    ink.addEventListener('animationend', () => ink.remove());
  },
  { passive: true }
);

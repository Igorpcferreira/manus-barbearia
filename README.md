# Manu's Barbearia — Landing Page

Landing page premium da **Manu's Barbearia** (Goiânia‑GO), reconstruída no melhor stack
moderno para sites de marketing: **Astro + Tailwind CSS v4 + React (ilhas) + Motion + shadcn/ui**.

- ⚡ **Performance no topo:** quase zero JavaScript por padrão (Astro), imagens otimizadas em
  WebP automaticamente, ótimo para Core Web Vitals e SEO.
- 📱 **Mobile‑first:** público principal é celular; layout e toque pensados pra telefone.
- 🎨 **Identidade preservada:** tema neon dark (laranja/âmbar), fontes Chakra Petch + Space
  Grotesk, barber pole, brasa/glow, status aberto/fechado, FAB de contato.
- ♿ **Acessível:** contraste, foco visível, `prefers-reduced-motion`, alvos de toque ≥44px.

---

## 🚀 Rodar localmente

> Requer **Node 20.19.1+** (ou 22+). O projeto está fixado no **Astro 5** justamente para
> rodar no Node 20. Veja a nota em *Segurança & versões* no fim.

```bash
npm install        # instala dependências (usa o registry público — veja .npmrc)
npm run dev        # servidor de desenvolvimento (http://localhost:4321)
npm run build      # gera o site estático em dist/
npm run preview    # serve o dist/ pra conferir o build de produção
```

---

## 🗂️ Estrutura

```
src/
├── data/site.ts          ← CONTEÚDO (textos, serviços, planos, reviews, contato, horários)
├── styles/global.css     ← TEMA (paleta neon em @theme, tokens shadcn, animações)
├── layouts/Layout.astro  ← <head>, SEO/OG, JSON-LD, fontes, fundo, scripts
├── pages/index.astro     ← monta as seções
├── components/
│   ├── *.astro           ← seções estáticas (Nav, Hero, About, Services, Plans, Reviews, Contact, Footer)
│   ├── ui/button.tsx     ← Button (shadcn) p/ ilhas
│   ├── Button.astro      ← Button estático (mesmo visual, zero JS)
│   └── islands/          ← ilhas React + Motion (só onde precisa de interação):
│       ├── StatusBadge.tsx  (aberto/fechado, fuso de São Paulo)
│       ├── Counter.tsx      (estatísticas animadas)
│       ├── Lightbox.tsx     (galeria + modal com teclado)
│       └── Fab.tsx          (botões flutuantes + voltar ao topo)
└── assets/images/        ← imagens originais (otimizadas no build)
legacy/                   ← site single-file antigo (backup, não é publicado)
```

## ✏️ Como personalizar

- **Textos / serviços / planos / avaliações / contato / horários:** tudo em
  [`src/data/site.ts`](src/data/site.ts). É o único lugar que você edita pro dia a dia.
- **Cores e fontes:** [`src/styles/global.css`](src/styles/global.css) (bloco `@theme`).
- **Imagens:** troque os arquivos em `src/assets/images/` (mantendo os nomes) — o Astro
  reotimiza no build. A imagem de compartilhamento (WhatsApp/Google) é `public/og.jpg`.
- **Domínio:** ao comprar, atualize `site:` em [`astro.config.mjs`](astro.config.mjs) e a
  `url`/`image` do JSON-LD seguem junto (canonical, OG e dados estruturados).

---

## ☁️ Deploy na Vercel

O site é **estático** — não precisa de adaptador. Na Vercel:

1. Importe o repositório (a Vercel detecta Astro automaticamente).
   - **Build command:** `astro build` · **Output directory:** `dist`
2. Deploy. Pronto — já sai no domínio `*.vercel.app`.
3. **Domínio próprio:** em *Settings → Domains*, adicione o domínio comprado e aponte o DNS
   conforme as instruções da Vercel. Depois, atualize `site:` no `astro.config.mjs` e
   refaça o deploy pra canonical/OG ficarem com a URL final.

> Dica: como é estático, também funciona em Netlify, Cloudflare Pages, GitHub Pages, etc.

---

## 🔒 Segurança & versões

- `npm audit` aponta avisos no Astro 5 cujo conserto exige **Astro 7 (Node 22+)**. Para
  **este site eles não se aplicam** (são sobre `define:vars`, server islands, slots
  dinâmicos e SSR — recursos que não usamos; o conteúdo é estático e fixo) e a do `esbuild`
  é só do **servidor de desenvolvimento** no Windows.
- Quando você migrar para **Node 22+**, é possível subir para o Astro 7
  (`npm i astro@latest @astrojs/react@latest`) e zerar os avisos.
- O `.npmrc` aponta para o registry público do npm (seu npm global usa um registry privado
  do trabalho; o `.npmrc` local garante que este projeto instale dos pacotes públicos).

---

Feito com ⚡ para a **Manu's Barbearia** — Goiânia‑GO.

# Manu's Barbearia

Site da **Manu's Barbearia** (Goiânia-GO), no ar em www.manusbarbearia.com.br.

## O que está no ar: a V2

Desde 23/11/2026 a home é **`public/index.html`**, uma página única escrita à mão (HTML, CSS e
JavaScript nativo, sem framework). Foi aprovada pelo Marcos, dono da barbearia, depois de ficar em
teste em `/novo/`.

- Fontes auto-hospedadas em `public/fonts/`, imagens em `.webp` em `public/img/`
- Ícones: Boxicons 2.1.4 (licença MIT), embutidos na própria página
- O mapa do Google só carrega depois que a pessoa aceita os cookies (aviso no rodapé da tela)
- Abre direto do disco também, sem servidor e sem build

**Para mudar texto, preço, horário ou foto, edite `public/index.html`.** Os preços aparecem em dois
lugares: nos cartões de plano e no objeto do simulador, no script do fim da página.

`/novo` e `/novo/` redirecionam para a home (`vercel.json`), porque o link de teste chegou a ser
mandado.

## A V1, fora do ar

O site anterior, em Astro, continua em `src/`, mas não é publicado: a página dele foi renomeada para
`src/pages/_index-v1.astro`, e o Astro não transforma em rota arquivo que começa com `_`.

Para voltar à V1: renomeie de volta para `src/pages/index.astro` e apague `public/index.html`.

`legacy/prototype.html` é o protótipo que deu origem à V1. Não é publicado.

## Como o deploy funciona

A Vercel está configurada como projeto Astro (`astro build`, saída em `dist`). Como não há rota em
`src/pages`, o build só copia `public/` para `dist/`, e é isso que vai ao ar.

**Push na `main` publica.**

Para conferir o build localmente (Node 24, fixado no `.nvmrc`):

```bash
npm ci
npm run build      # gera dist/
npm run preview    # serve o dist/
```

O `.npmrc` aponta para o registry público do npm, para o projeto não depender do registry
configurado no npm global da máquina.

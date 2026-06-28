/* ============================================================
   FONTE ÚNICA DE CONTEÚDO — Manu's Barbearia
   Edite os textos/links aqui; os componentes leem deste arquivo.
   ============================================================ */

export const site = {
  name: "Manu's Barbearia",
  city: "Goiânia",
  state: "GO",
  tagline: "Corte preciso, estilo afiado.",
  phone: "(62) 98400-1740",
  phoneRaw: "+5562984001740",
  instagramHandle: "manusbarbeariaa",
  rating: "5,0",
  ratingCount: 5,
};

export const links = {
  booksy:
    "https://booksy.com/pt-br/instant-experiences/widget/133338?instant_experiences_enabled=true&ig_ix=true&is_fb=1",
  whatsapp:
    "https://wa.me/5562984001740?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio.",
  instagram: "https://www.instagram.com/manusbarbeariaa",
  tel: "tel:+5562984001740",
  mapEmbed:
    "https://maps.google.com/maps?q=Manu%27s%20Barbearia%2C%20Av.%20Perimetral%20Norte%2010770%2C%20Goi%C3%A2nia%20-%20GO%2074665-510&z=16&output=embed",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=Manu%27s%20Barbearia%2C%20Av.%20Perimetral%20Norte%2010770%2C%20Goi%C3%A2nia%20-%20GO%2074665-510",
};

export const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#planos", label: "Planos" },
  { href: "#galeria", label: "Galeria" },
  { href: "#contato", label: "Contato" },
];

export const stats = [
  { value: 9, prefix: "+", suffix: "", label: "Anos de experiência" },
  { value: 100, prefix: "", suffix: "%", label: "Hora marcada" },
  { text: "Booksy", label: "Agendamento online" },
];

/** SVG interno (viewBox 0 0 24 24, stroke currentColor) de cada serviço */
export const services = [
  {
    title: "Corte",
    desc: "Tesoura ou máquina, no estilo que combina com você.",
    icon: `<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.1 8.1 20 20M8.1 15.9 20 4"/>`,
  },
  {
    title: "Barba",
    desc: "Toalha quente, navalha e óleo hidratante.",
    icon: `<path d="M4 5h16M6 5v6a6 6 0 0 0 12 0V5"/><path d="M9 17c1 2 5 2 6 0"/>`,
  },
  {
    title: "Corte + Barba",
    desc: "O combo completo, do topo ao queixo.",
    icon: `<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.1 8.1 20 20M8.1 15.9 20 4"/><path d="M14 14l6 6"/>`,
  },
  {
    title: "Barboterapia",
    desc: "Tratamento relaxante e completo para a barba.",
    icon: `<path d="M12 3c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10z"/>`,
  },
  {
    title: "Sobrancelha",
    desc: "Design e limpeza na navalha pra fechar o visual.",
    icon: `<path d="M4 14c3-4 13-4 16 0"/><circle cx="9" cy="11" r="1"/><circle cx="15" cy="11" r="1"/>`,
  },
  {
    title: "Hidratação no Ozônio",
    desc: "Fios e couro cabeludo revitalizados e saudáveis.",
    icon: `<path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"/><path d="M9 14a3 3 0 0 0 3 3"/>`,
  },
  {
    title: "Limpeza de Pele",
    desc: "Pele limpa, renovada e com aspecto saudável.",
    icon: `<path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z"/><path d="M18 16l.7 1.7L20.5 18l-1.8.6-.7 1.7-.6-1.7L15.5 18l1.8-.3z"/>`,
  },
  {
    title: "Pigmentação",
    desc: "Preenchimento e definição perfeita da barba.",
    icon: `<path d="M3 21l3-1 11-11-2-2L4 18z"/><path d="M14 5l2-2 3 3-2 2z"/>`,
  },
  {
    title: "Freestyle / Desenho",
    desc: "Cortes com desenho e arte feitos à mão.",
    icon: `<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>`,
  },
];

/**
 * Planos exibidos na seção #planos, NA ORDEM da lista.
 * - kind "smart": destaque no preço por corte/visita (de–por), faixa Seg·Ter·Qua
 *   e selo mensal "R$x/mês · N no mês" — espelha os criativos da campanha.
 * - kind "unlimited": preço mensal em destaque + frase curta.
 */
export type Plan = {
  kind: "smart" | "unlimited";
  name: string;
  title: string;
  featured: boolean;
  badge?: string;
  features: string[];
  cta: string;
  monthly: string;
  // somente kind "smart"
  lead?: string;
  unitPrice?: string;
  unitCents?: string;
  unitFrom?: string;
  unitLabel?: string;
  schedule?: string;
  monthlyNote?: string;
  // somente kind "unlimited"
  tag?: string;
};

export const plans: Plan[] = [
  {
    kind: "smart",
    name: "Plano Smart",
    title: "Corte",
    lead: "No plano mensal, seu corte sai por",
    unitPrice: "33",
    unitCents: "00",
    unitFrom: "45",
    unitLabel: "/ corte",
    schedule: "Seg · Ter · Qua",
    monthly: "132",
    monthlyNote: "4 cortes no mês",
    featured: false,
    features: [
      "Um corte por semana, sempre fresco",
      "Economize R$48 todo mês",
      "Seu horário garantido na semana",
      "Agende quando quiser pelo Booksy",
    ],
    cta: "https://wa.me/5562984001740?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Plano%20Smart%20de%20Corte%20(R%24132%2Fm%C3%AAs%2C%20seg%20a%20qua).",
  },
  {
    kind: "smart",
    name: "Plano Smart",
    title: "Corte + Barba",
    lead: "No plano mensal, corte + barba sai por",
    unitPrice: "85",
    unitCents: "00",
    unitFrom: "120",
    unitLabel: "/ visita",
    schedule: "Seg · Ter · Qua",
    monthly: "340",
    monthlyNote: "4 visitas no mês",
    featured: false,
    features: [
      "Corte + barba toda semana, na régua",
      "Economize R$140 todo mês",
      "Seu horário garantido na semana",
      "Agende quando quiser pelo Booksy",
    ],
    cta: "https://wa.me/5562984001740?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Plano%20Smart%20de%20Corte%20%2B%20Barba%20(R%24340%2Fm%C3%AAs%2C%20seg%20a%20qua).",
  },
  {
    kind: "unlimited",
    name: "Plano Corte",
    title: "Corte Ilimitado",
    monthly: "147",
    tag: "Cortes ilimitados o mês inteiro.",
    featured: false,
    features: [
      "Cortes ilimitados",
      "Agende quando quiser",
      "Sem fila, sempre com hora marcada",
    ],
    cta: "https://wa.me/5562984001740?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Plano%20Corte%20Ilimitado%20(R%24147%2Fm%C3%AAs).",
  },
  {
    kind: "unlimited",
    name: "Plano Completo",
    title: "Corte + Barba Ilimitado",
    monthly: "247",
    tag: "Cortes e barba ilimitados o mês inteiro.",
    featured: true,
    badge: "Mais popular",
    features: [
      "Cortes ilimitados",
      "Barba ilimitada",
      "Atendimento prioritário",
      "Agende quando quiser",
    ],
    cta: "https://wa.me/5562984001740?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Plano%20Corte%20%2B%20Barba%20Ilimitado%20(R%24247%2Fm%C3%AAs).",
  },
];

/** Imagens da galeria (importadas em Gallery para otimização do astro:assets) */
export const galleryAlts = [
  "Salão da Manu's Barbearia",
  "Fachada",
  "Corte degradê",
  "Barba",
  "Freestyle / desenho",
  "Atendimento",
];
export const galleryCaptions = [
  "Nosso salão",
  "Fachada",
  "Corte degradê",
  "Barba",
  "Freestyle",
  "Atendimento",
];

export const reviews = [
  {
    name: "Rafael Moraes",
    initial: "R",
    date: "Há 2 semanas",
    quote:
      "Melhor barbearia de Goiânia, sem exagero. O acabamento na máquina é perfeito e o atendimento com hora marcada não me deixa esperando. Saio sempre no precision.",
  },
  {
    name: "Diego Santana",
    initial: "D",
    date: "Há 1 mês",
    quote:
      "Faço o plano de corte ilimitado e vale cada centavo. Venho toda semana, sempre encaixo no horário e nunca peguei fila. Ambiente top e papo bom.",
  },
  {
    name: "Lucas Andrade",
    initial: "L",
    date: "Há 3 semanas",
    quote:
      "Fiz corte + barba com toalha quente e fiquei impressionado. Cuidado com cada detalhe, navalha impecável. Virei cliente fiel, recomendo demais.",
  },
  {
    name: "Bruno Teixeira",
    initial: "B",
    date: "Há 1 semana",
    quote:
      "Profissionais que entendem do assunto. Pedi um degradê e saiu exatamente como eu queria. Agendamento pelo Booksy é prático, resolve tudo pelo celular.",
  },
  {
    name: "Henrique Prado",
    initial: "H",
    date: "Há 2 meses",
    quote:
      "Ambiente limpo, climatizado e com aquele clima de barbearia raiz. A barboterapia é relaxante demais. Saio renovado toda vez. Nota 10.",
  },
  {
    name: "Marcos Vinícius",
    initial: "M",
    date: "Há 1 mês",
    quote:
      "Levo meu filho e nós dois saímos satisfeitos. Atendimento de primeira, pontualidade que respeita o cliente. Recomendo pra todo mundo de Goiânia.",
  },
];

export const contact = {
  addressLine1: "Av. Perimetral Norte, 10770 — Quadra HC3, Lote 04, Loja 2",
  addressLine2: "St. Goiânia 2, Goiânia - GO · CEP 74665-510",
  hours: [
    { d: "Segunda a Sexta", h: "09h00 às 19h30" },
    { d: "Sábado", h: "09h00 às 18h00" },
    { d: "Domingo", h: "Fechado", muted: true },
  ],
};

/**
 * Janelas de funcionamento p/ status aberto/fechado (timezone America/Sao_Paulo).
 * day: 0=Dom ... 6=Sáb. Minutos desde a meia-noite.
 */
export const openingHours: Record<number, { open: number; close: number } | null> = {
  0: null, // Domingo
  1: { open: 9 * 60, close: 19 * 60 + 30 },
  2: { open: 9 * 60, close: 19 * 60 + 30 },
  3: { open: 9 * 60, close: 19 * 60 + 30 },
  4: { open: 9 * 60, close: 19 * 60 + 30 },
  5: { open: 9 * 60, close: 19 * 60 + 30 },
  6: { open: 9 * 60, close: 18 * 60 }, // Sábado
};

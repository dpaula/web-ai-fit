# AI Fit — Guia rápido para agentes

## Propósito do projeto
- Landing page em português para o produto **AI Fit**: nutricionista por IA que opera via WhatsApp.
- Capta leads (nome + WhatsApp, opcional e‑mail), gera link de indicação e informa benefícios do serviço.

## Arquitetura e fluxo
- SPA em React; entry point `index.tsx` monta `<App>` em `#root`.
- App organiza seções: `Hero` (CTA principal), `Features`, `Testimonials`, `PreRegisterForm` (formulário + referral), `Footer`. Navbar fixa chama scroll até o form.
- Formulário (`components/PreRegisterForm.tsx`) usa **react-hook-form**:
  - Formata telefone para padrão `(11) 99999-9999`.
  - Envia `POST` para API externa via `services/api.ts`.
  - Captura query `?ref=` e envia como `codigoConviteIndicador`; depois mostra `linkConvite` retornado e botão de compartilhamento WhatsApp.
- Estilos via classes do Tailwind carregado por CDN direto em `index.html`; tema customizado em `tailwind.config` inline (cores brand/dark, fontes Inter). Sem pipeline de CSS.
- Assets locais em `public/` (favicons, avatares, ícone). Componentes usam caminhos absolutos `/images/...` e `/logo/icon.svg` (mantidos pelo Vite).

## Integração externa
- Endpoint: `https://iafit.autevia.com.br/my-ia-fitness/api/usuarios/pre-cadastro`.
- Payload (`PreCadastroRequest`): `nome`, `telefone`, `email?`, `codigoConviteIndicador?`, `urlOrigem`.
- Resposta (`PreCadastroResponse`): `status`, `message?`, `codigoConvite`, `linkConvite`, dados do usuário.
- Erros HTTP lançam exceção; UI mostra `alert` genérico.

## Stack principal
- Runtime: Node.js (>=20.19 requisitado pelo @vitejs/plugin-react).
- Bundler/dev server: **Vite 6**.
- Linguagem: **TypeScript** (JSX, `moduleResolution: bundler`).
- UI: **React 19**, **react-hook-form**, ícones **lucide-react**.
- Servir estático em produção: `npx serve -s dist -l 3000` (ver `Procfile`).

## Build e execução
- Instalação: `npm install` (usa `package-lock.json`).
- Dev: `npm run dev` (porta 3000, host 0.0.0.0 – ver `vite.config.ts`).
- Build: `npm run build` → gera `dist/`.
- Preview local: `npm run preview`.
- Produção: `npm run build` seguido de `npm start` (usa `serve` sobre `dist/`; mesmo comando no `Procfile`).

## Variáveis de ambiente
- `.env.local`: `GEMINI_API_KEY` (passada para o bundle via `define` em `vite.config.ts`). **Hoje não usada no código**, mas mantida para compatibilidade com AI Studio.

## Estrutura relevante
- `App.tsx` – composição das seções e lógica de scroll.
- `components/` – UI modular (Hero, Features, Testimonials, PreRegisterForm, Footer, Logo, Button).
- `services/api.ts` – cliente simples `fetch` para pré-cadastro.
- `types.ts` – contratos de request/response e tipos de UI.
- `index.html` – import map CDN (React, lucide, react-hook-form), Tailwind via CDN, estilos globais/animations.
- `vite.config.ts` – aliases (`@` -> root), define envs, porta/host.
- `metadata.json` – descrição da app para AI Studio.

## Cuidados rápidos para agentes
- Como Tailwind vem por CDN, não há `postcss`/`tailwind.config.js`; qualquer nova utility deve respeitar essa abordagem inline.
- Endpoints externos: garantir CORS e HTTPS; não há reintentos ou toasts, só `alert`.
- Mudanças no caminho de assets precisam alinhar `public/` e imports absolutos (`/images`, `/logo`).
- Se usar GEMINI_API_KEY futuramente, centralizar em serviço em vez de ler diretamente no cliente.
- Lockfile: removido porque a versão macOS não trazia binários Rollup para Linux e quebrava o build Nixpacks; gere novo `package-lock.json` em Linux x64 (Node >=20, npm >=10) antes de reintroduzir.

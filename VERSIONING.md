# AI Fit – Versionamento Interno

## v1.0.3 — 2025-11-27
- Cartões mobile reorganizados (nome + status em wrap, dados em linhas dedicadas) para evitar truncar/queimar informação em telas pequenas.
- Badge de versão atualizada para v1.0.3.

## v1.0.2 — 2025-11-27
- Nova tela `/gerenciar-usuarios` para listar, filtrar e marcar pré-cadastros como `ON_BOARD`.
- Layout mobile-first com cartões e tabela responsiva em telas médias/grandes.
- Exibição discreta da versão dentro do header do painel.

Notas:
- Base da API definida por `VITE_API_BASE_URL` (fallback para `https://iafit.autevia.com.br/my-ia-fitness`).
- Requer Node.js 20+ para builds Vite.

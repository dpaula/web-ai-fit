# Nota sobre lockfile

Removemos o `package-lock.json` porque ele foi gerado em macOS (arm64) e não continha os binários opcionais do Rollup para Linux, causando falha no build do EasyPanel/Nixpacks (`Cannot find module @rollup/rollup-linux-x64-gnu`). Com ele ausente, o `npm install` na build Linux baixa o binário correto automaticamente.

Próximos passos se quiser travar dependências novamente:
- Gere o lockfile em um ambiente Linux x64 com Node >= 20.19 e npm >= 10.8 (`npm install --package-lock-only`).
- Comite o novo `package-lock.json`.


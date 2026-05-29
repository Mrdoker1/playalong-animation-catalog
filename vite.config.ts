import { defineConfig } from 'vite';

// base = имя репозитория на GitHub. Если переименуешь репо — поменяй здесь
// (или прокинь через CLI: `BASE=/other-name/ vite build`).
const REPO_NAME = 'playalong-animation-catalog';

export default defineConfig({
  base: process.env.BASE ?? `/${REPO_NAME}/`,
  server: {
    port: 5757,
    // Если 5757 занят — Vite сам подберёт следующий свободный.
    strictPort: false,
    open: true,
  },
});

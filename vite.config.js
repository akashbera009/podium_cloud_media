import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'podium_cloud_media'; // Change to your actual repo name

export default defineConfig({
  base: `/${repoName}/`, // Important for GitHub Pages
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/user': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/user/, '/user'),
      },
      '/jokes': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/jokes/, '/jokes'),
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: browserslistToEsbuild()
  },
  //css: postcss /* loaded from postcss.config.cjs */
  plugins: [
    react(),
    mkcert()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    https: true,
    strictPort: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://localhost:7200',
        secure: false
      },
      '/signalr': {
        target: 'wss://localhost:7200',
        ws: true,
        secure: false
      },
    }
  }
})
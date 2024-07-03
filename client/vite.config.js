import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        onProxyReq: (proxyReq, req, res) => {
          console.log(`Proxying request: ${req.method} ${req.url}`);
        },
        onError: (err, req, res) => {
          console.error('Proxy error:', err);
        },
      },
    },
  },
  plugins: [react()],
});
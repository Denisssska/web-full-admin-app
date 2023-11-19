import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //если корсы слетают
  server: {
    proxy: {
      //замена пути
      '/auth': {
        target: 'http://localhost:8800',
        changeOrigin: true,

      },
      '/api': {
        target: 'http://localhost:8800',
        changeOrigin: true,
       
        secure:false
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // This allows the server to be accessible externally (over the network)
    port: 3001,   // You can specify a custom port here (default is 3000)
  },
});

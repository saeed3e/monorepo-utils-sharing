import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'ui': path.resolve(__dirname, '../../packages/ui/src'),
      'utils': path.resolve(__dirname, '../../packages/utils/src')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
});
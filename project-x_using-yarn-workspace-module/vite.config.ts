'use strict';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

/**
 * Vite configuration with bundle analysis capabilities
 * @see https://vite.dev/config/
 */
export default defineConfig(({ mode, command }) => ({
  plugins: [
    react(),
    // Only include visualizer when bundle analysis is enabled
    ...(mode === 'analyze' ? [
      visualizer({
        filename: './dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
        template: 'treemap'
      })
    ] : [])
  ],
  build: {
    // Enable minification for production builds
    minify: 'terser',
    
    // Generate sourcemaps only in analyze mode
    sourcemap: mode === 'analyze',
    
    // Set chunk size warning limit
    chunkSizeWarningLimit: 100,
    
    // Terser options for better minification
    terserOptions: {
      compress: {
        drop_console: command === 'build' && mode !== 'analyze',
        drop_debugger: command === 'build',
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    
    // Configure Rollup options for better bundle analysis
    rollupOptions: {
      output: {
        // Place all dependencies in vendors directory, app code in assets
        chunkFileNames: ({ name = '' }) =>
          name.startsWith('vendor-')
            ? `vendors/${name}-[hash].js`
            : `assets/${name}-[hash].js`,
        
        // Create separate chunks for each dependency
        manualChunks: (id) => {
          // Handle node_modules
          if (id.includes('node_modules/')) {
            // Extract package name from the path
            const match = id.match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)/);
            if (match && match[1]) {
              // Get package name and clean it for chunk naming
              let pkgName = match[1];
              
              // Handle scoped packages
              if (pkgName.includes('/')) {
                const parts = pkgName.split('/');
                pkgName = parts[0].startsWith('@') ? `${parts[0]}-${parts[1]}` : parts[0];
              }
              
              // Clean the name and return as vendor chunk
              return `vendor-${pkgName.replace('@', '').replace(/\//g, '-')}`;
            }
          }
        },
        
        // Organize static assets by type
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name?.split('.').pop()?.toLowerCase() || '';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) return 'assets/images/[name]-[hash][extname]';
          if (ext === 'css') return 'assets/styles/[name]-[hash][extname]';
          return 'assets/[name]-[hash][extname]';
        }
      },
      
      // Optimize tree-shaking
      treeshake: {
        moduleSideEffects: 'no-external',
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      }
    }
  }
}));

// import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [
    react(),
    jsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: '_redirects', // Path to your _redirects file
          dest: '' // Copies to the root of the dist directory
        }
      ]
    })
  ],
  // https://github.com/jpuri/react-draft-wysiwyg/issues/1317
  // base: '/red-star',
  base: '/',
  define: {
    global: 'window'
  },
  resolve: {
    // alias: [
    //   {
    //     find: /^~(.+)/,
    //     replacement: path.join(process.cwd(), 'node_modules/$1')
    //   },
    //   {
    //     find: /^src(.+)/,
    //     replacement: path.join(process.cwd(), 'src/$1')
    //   }
    // ]
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000
  },
  preview: {
    // this ensures that the browser opens upon preview start
    open: true,
    // this sets a default port to 3000
    port: 3000
  }
});

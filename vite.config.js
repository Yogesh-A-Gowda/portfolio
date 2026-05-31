import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite plugin to override Windows Registry MIME-type misconfiguration (js -> application/octet-stream)
const fixWindowsMimeTypes = () => ({
  name: 'fix-windows-mime-types',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url) {
        const cleanUrl = req.url.split('?')[0];
        if (
          cleanUrl.endsWith('.js') ||
          cleanUrl.endsWith('.jsx') ||
          cleanUrl.endsWith('.ts') ||
          cleanUrl.endsWith('.tsx') ||
          cleanUrl.endsWith('.mjs')
        ) {
          // Monkey-patch res.setHeader to intercept and correct misclassified Content-Type
          const originalSetHeader = res.setHeader;
          res.setHeader = function (name, value) {
            if (
              name.toLowerCase() === 'content-type' &&
              typeof value === 'string' &&
              value.includes('application/octet-stream')
            ) {
              value = 'application/javascript';
            }
            return originalSetHeader.call(this, name, value);
          };

          // Monkey-patch res.writeHead to ensure writeHead headers are also corrected
          const originalWriteHead = res.writeHead;
          res.writeHead = function (statusCode, ...args) {
            const headers = args[args.length - 1];
            if (headers && typeof headers === 'object') {
              for (const key of Object.keys(headers)) {
                if (
                  key.toLowerCase() === 'content-type' &&
                  typeof headers[key] === 'string' &&
                  headers[key].includes('application/octet-stream')
                ) {
                  headers[key] = 'application/javascript';
                }
              }
            }
            return originalWriteHead.call(this, statusCode, ...args);
          };
        }
      }
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), fixWindowsMimeTypes()],
})

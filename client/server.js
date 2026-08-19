const { createServer } = require('http');
const next = require('next');
const backendApp = require('./server-api/index.js'); // Import Express API app

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Pass all unhandled requests to Next.js
  backendApp.all('*', (req, res) => {
    return handle(req, res);
  });

  createServer(backendApp).listen(port, () => {
    console.log(`> Unified Server Ready on http://${hostname}:${port}`);
  });
});

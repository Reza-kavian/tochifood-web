//// zare_nk_050520_okk(1)
const http = require('http');
const next = require('next');

const port = 3002;
const dev = false; // چون production هست
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http.createServer((req, res) => {
    handle(req, res);
  }).listen(port, '0.0.0.0', (err) => {
    if (err) throw err;
    console.log(`> Ready on http://0.0.0.0:${port}`);
  });
});

import express from 'express';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { APP_BASE_HREF } from '@angular/common';
import { renderApplication } from '@angular/platform-server';
import bootstrap from './src/main.server'; // ← your async bootstrap function
import 'zone.js/node';

const __dirname = resolve(fileURLToPath(import.meta.url), '..');
const browserDistFolder = resolve(__dirname, '../browser');
const indexHtml = resolve(browserDistFolder, 'index.html');

const app = express();

app.use(express.static(browserDistFolder, {
  maxAge: '1y',
}));

app.get('*', async (req, res, next) => {
  try {
    const html = await renderApplication(bootstrap, {
      document: indexHtml,
      url: req.originalUrl,
      platformProviders: [
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
    });

    res.send(html);
  } catch (err) {
    next(err);
  }
});

const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`✅ Node SSR server is running at http://localhost:${port}`);
});

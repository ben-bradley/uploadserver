'use strict';

import { createServer } from 'http';
import { createWriteStream } from 'fs';
import args from 'argify';

const port = process.env.PORT || process.env.port || args.port || 0,
  uploadsDir = args.uploadsDir || process.cwd();

const server = createServer((req, res) => {
  if (args.cors) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }
  }
  let filename = req.url.replace(/^\//, '').replace(/\.\.+\//g, ''),
    stream = createWriteStream(uploadsDir + '/' + filename);

  req.pipe(stream)
    .on('error', (err) => {
      res.statusCode = 400;
      res.statusMessage = err.message;
      if (args.verbose) {
        console.error(err.message);
      }
      res.end('uhoh!');
    })
    .on('finish', () => {
      const message = 'saved: ' + uploadsDir + '/' + filename;
      if (args.verbose) {
        console.log(message);
      }
      res.end(message);
    });
})

server.listen(port, () => {
  console.log(`upload server for "${uploadsDir}" listening on`, server.address().port);
});

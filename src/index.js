'use strict';

import { createServer } from 'http';
import { createWriteStream } from 'fs';
import args from 'argify';

const port = process.env.PORT || process.env.port || args.port || 0,
  uploadsDir = args.uploadsDir || process.cwd();

const server = createServer((req, res) => {
  let filename = req.url.replace(/^\//, ''),
    stream = createWriteStream(uploadsDir + '/' + filename);

  req.pipe(stream)
    .on('error', (err) => {
      res.statusCode = 400;
      res.statusMessage = err.message;
      res.end('uhoh!');
    })
    .on('finish', () => res.end('saved: ' + uploadsDir + '/' + filename));
})

server.listen(port, () => {
  console.log('upload server listening on', server.address().port);
});

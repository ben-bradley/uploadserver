'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _http = require('http');

var _fs = require('fs');

var _argify = require('argify');

var _argify2 = _interopRequireDefault(_argify);

var port = process.env.PORT || process.env.port || _argify2['default'].port || 0,
    uploadsDir = _argify2['default'].uploadsDir || process.cwd();

var server = (0, _http.createServer)(function (req, res) {
  if (_argify2['default'].cors) {
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
  var filename = req.url.replace(/^\//, '').replace(/\.\.+\//g, ''),
      stream = (0, _fs.createWriteStream)(uploadsDir + '/' + filename);

  req.pipe(stream).on('error', function (err) {
    res.statusCode = 400;
    res.statusMessage = err.message;
    if (_argify2['default'].verbose) {
      console.error(err.message);
    }
    res.end('uhoh!');
  }).on('finish', function () {
    var message = 'saved: ' + uploadsDir + '/' + filename;
    if (_argify2['default'].verbose) {
      console.log(message);
    }
    res.end(message);
  });
});

server.listen(port, function () {
  console.log('upload server for "' + uploadsDir + '" listening on', server.address().port);
});
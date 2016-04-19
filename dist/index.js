'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _http = require('http');

var _fs = require('fs');

var _argify = require('argify');

var _argify2 = _interopRequireDefault(_argify);

var port = process.env.PORT || process.env.port || _argify2['default'].port || 0,
    uploadsDir = _argify2['default'].uploadsDir || process.cwd();

var server = (0, _http.createServer)(function (req, res) {
  var filename = req.url.replace(/^\//, '').replace(/\.\.+\//g, ''),
      stream = (0, _fs.createWriteStream)(uploadsDir + '/' + filename);

  req.pipe(stream).on('error', function (err) {
    res.statusCode = 400;
    res.statusMessage = err.message;
    res.end('uhoh!');
  }).on('finish', function () {
    return res.end('saved: ' + uploadsDir + '/' + filename);
  });
});

server.listen(port, function () {
  console.log('upload server listening on', server.address().port);
});
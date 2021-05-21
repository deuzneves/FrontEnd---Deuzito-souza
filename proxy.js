'use strict';

if (process.argv.length < 2) {
  console.error('Usage: `node proxy.js PORT`');
  return process.exit(1);
}

var httpProxy = require('http-proxy');
const { nextTick } = require('process');
var apiURL = 'http://localhost:8080/Kingswood7';
var port = process.argv[2];

var proxy = httpProxy.createProxyServer({});

var server = require('http').createServer(function(req, res) {
  // API validates origin and referer to prevent certain types of csrf attacks, so delete them
  delete req.headers['origin'];
  delete req.headers['referer'];
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  req.url = '/api/v1' + req.url;
  proxy.web(req, res, { target: apiURL });
});

server.listen(port);
console.log('Started BitMEX proxy on port', port);

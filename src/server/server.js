const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
var MyApp = require('./myApp');
var registryHandlers = require('./views');
// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port = process.argv[2] || 9000;

var myApp = new MyApp();
registryHandlers(myApp);


http.createServer(function (request, response) {
  console.info(`!!__${request.method} - ${request.url}`);

  const staticDir = './dist/prod';
  if (request.url.startsWith('/api')) {
    myApp.handle(request, response);
  } else {
    if (request.method === 'GET' && request.url === '/') {
      handleStatic('/index.html', response, staticDir);
    } else {
      handleStatic(request.url, response, staticDir);
    }

  }
}).listen(parseInt(port));
console.log(`Server listening on port ${port}`);


function handle404(reqPath, response) {
  response.statusCode = 404;
  response.end(`Url ${reqPath} does not exists!`);
}

function handleStatic(reqPath, response, staticDir) {
  const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
  };
  var reqStatic = path.join(staticDir, url.parse(reqPath).pathname);

  fs.exists(reqStatic, function (exist) {
    if (exist) {
      fs.readFile(reqStatic, function (err, data) {
        if (err) {
          response.statusCode = 500;
          response.end(`Error getting the file: ${err}.`);
        } else {
          // based on the URL path, extract the file extention. e.g. .js, .doc, ...
          // if the file is found, set Content-type and send data
          response.statusCode = 200;
          response.setHeader('Content-type', mimeType[path.parse(reqStatic).ext] || 'text/plain');
          // response.setHeader('Access-Control-Allow-Origin', '*');
          response.end(data);
        }
      })
    } else {
      handle404(reqPath, response)
    }

  });

}


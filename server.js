const http = require('http');
const fs = require('fs');

// create the server + log URL and method
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set header content type
  res.setHeader('Content-Type', 'text/HTML');

  /* old code
  res.write('<head><link rel="stylesheet" href="#"></head>')
  res.write('<p>hello everyone!</p>');
  res.write('<p>hello yet again, everyone!</p>');
  res.end();
  */

  let path = './views/';
  switch(req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }

  // send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      //res.write(data);
      res.end(data);
    }
  })
});

// listen for port 3000 on localhost
server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});

const fs = require('fs');
const http = require('http');
const url = require('url');
const tempReplace = require(`${__dirname}/modules/tempReplace`);

const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataProduct = JSON.parse(data);

const server = http.createServer((req, res) => {
  const {query, pathname} = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const cardString = dataProduct.map(el => tempReplace(tempCard, el)).join('');
    const output = tempOverview.replace('{%CARD%}', cardString);
    res.end(output);

  } else if (pathname === '/product') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const product = dataProduct.find(el => String(el.id) === query.id);
    const output = tempReplace(tempProduct, product);
    res.end(output);

  } else if (pathname === '/api') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(typeof data);

  } else {
    res.end('Page not found!');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to port 8000');
});

// first requiring the core modules first
// second third parties modules
// third your own modules

//core modules
const fs = require('fs');
const http = require('http');
const url = require('url');

//third parties modules
const slugify = require('slugify');

/*
TODO

*/

// your own moduels
const replaceTamplate = require('../starter/modules/replaceTemplate');
const { toUnicode } = require('punycode');
const { Z_FIXED } = require('zlib');

const tempOverview = fs.readFileSync('../starter/templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('../starter/templates/template-Card.html', 'utf-8');
const tempProduct = fs.readFileSync('../starter/templates/template-product.html', 'utf-8');

const data = fs.readFileSync('../final/dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);
/*
In order to build a server we have to do two things
1 create server
2 and start the server so we can actually listen the incoming requests
*/

// createServer() is build in method that in http module
// this method takes a callback function

// Create server
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardHTML = dataObj.map((el) => replaceTamplate(tempCard, el)).join('');
    const finalCard = tempOverview.replace('{%PRODUCT_CARDS%}', cardHTML);
    res.end(finalCard);

    // Product Page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTamplate(tempProduct, product);

    res.end(output);

    // Not Found
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    // Not Found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>This is page not found</h1>');
  }
});
// in order to send headers we need to specify the type of the header you
// look this example when there is erro or pages cannot find
// =====> response.writeHead(404, {
//
//})
// what is http headers
// http headers is a piece of informtion about about the response we are going to send back

// the server we created above we stored in a server variable
// then call that server varaible with the listen() method so we can listen all income requests

// the listen method takes to parameters the first one is the number of the port, which means a sub-address of the local host
// and the second one is the to specify the host, which the local host normal have 127.0.0.1 which means the local machine that the node is being run in.
// there is optional third parameter which is callback function the will be fire off when the server is run.
server.listen(8000, '127.0.0.1', () => {
  console.log('Kusoo dawoow server-ka Khadar albaakiisa 8000');
});

//---------------Routing ----------------------
/*
for routing we declared the url module and then use it with the request parameter
and then we 
for different path names we have different action 
*/

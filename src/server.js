// Packages
const http = require('http');

// Controllers
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('./controllers/product.controller');

const server = http.createServer((req, res) => {
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res);
  } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getProduct(req, res, id);
  } else if (req.url === '/api/products' && req.method === 'POST') {
    createProduct(req, res);
  } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'PATCH') {
    const id = req.url.split('/')[3];
    updateProduct(req, res, id);
  } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    deleteProduct(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Product not found' }));
  }
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// Utils
const bodyData = require('../utils/bodyData');

// Models
const Product = require('../models/product.model');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
};

const getProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);

    if(!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product not found' }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(product));
  } catch (err) {
    console.log(err);
  }
};

const createProduct = async (req, res) => {
  try {
    const body = await bodyData(req);
    const { title, description, price } = JSON.parse(body);
    const product = { title, description, price };
    const newProduct = await Product.create(product);

    res.writeHead(201, { 'Content-Type': 'application/json' });

    return res.end(JSON.stringify(newProduct));
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);

    if(!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product Not Found' }));
    } else {
      const body = await bodyData(req);
      const { name, description, price } = JSON.parse(body);
      const productData = {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price
      };
      const updatedProduct = await Product.findByIdAndUpdate(id, productData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updatedProduct));
    }
  } catch (err) {
    console.log(err);
  };
};

const deleteProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);

    if(!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product Not Found' }));
    } else {
      await Product.findByIdAndDelete(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Product ${id} removed` }));
    }
  } catch (err) {
      console.log(err);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};

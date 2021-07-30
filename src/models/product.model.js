// Packages
const { v4: uuidv4 } = require('uuid');

// Data
const products = require('../data/products');

// Utils
const writeData = require('../utils/writeData');

const find = () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
};

const create = (product) => {
  return new Promise((resolve, reject) => {
    const newProduct = {id: uuidv4(), ...product};

    products.push(newProduct);

    writeData('./src/data/products.json', products);

    resolve(newProduct);
  });
};

const findByIdAndUpdate = (id, product) => {
  return new Promise((resolve, reject) => {
      const index = products.findIndex((p) => p.id === id);

      products[index] = {id, ...product};

      writeData('./src/data/products.json', products);

      resolve(products[index]);
  });
};

const findByIdAndDelete = (id) => {
  return new Promise((resolve, reject) => {
      const newProducts = products.filter((p) => p.id !== id);

      writeData('./src/data/products.json', newProducts);

      resolve();
  });
};

module.exports = {
  find,
  findById,
  create,
  findByIdAndUpdate,
  findByIdAndDelete
};

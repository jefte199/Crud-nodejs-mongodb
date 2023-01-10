const express = require('express');
const routes = express.Router();
const productController = require('./Controller/productController');
const userController = require('./Controller/userController');
const postController = require('./Controller/postController');

routes
  .get('/', (_req, res) => res.json({ msg: "OK", data: "Welcome the API bot" }))

  .get('/product', productController.index)
  .get('/product/find/:product', productController.show)
  .delete('/product/delete/:token_bot/:product', productController.delete)
  .post('/product/create', productController.store)
  
  .post('/product/post', postController.post)
  .post('/product/list', postController.list)

  .get('/users', userController.index)
  .get('/user/find/:token_bot', userController.show)
  .delete('/user/delete/:token_bot/:product', userController.delete)
  .post('/user/create', userController.store)

module.exports = routes;

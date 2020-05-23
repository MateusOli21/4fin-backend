const { Router } = require('express');
const multer = require('multer');

const multerConfig = require('./config/multer');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const FileController = require('./app/controllers/FileController');
const CategoriesController = require('./app/controllers/CategoriesController');
const PurchaseController = require('./app/controllers/PurchaseController');

const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/categories', CategoriesController.index);
routes.post('/categories', CategoriesController.store);
routes.put('/categories/:id', CategoriesController.update);
routes.delete('/categories/:id', CategoriesController.delete);

routes.get('/purchases', PurchaseController.index);
routes.post('/purchases', PurchaseController.store);
routes.put('/purchases/:id', PurchaseController.update);
routes.delete('/purchases/:id', PurchaseController.delete);

module.exports = routes;

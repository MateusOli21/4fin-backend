const { Router } = require('express');

const routes = new Router();

routes.get('/users', (req, res) => {
  return res.status(200).json({ message: 'ok' });
});

module.exports = routes;

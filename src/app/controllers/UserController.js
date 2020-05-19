const User = require('../models/User');

class UserController {
  async store(req, res) {
    const user = await User.create({
      name: 'Mateus Oliveira',
      email: 'mateus@teste.com',
      password_hash: '123456',
    });
    return res.status(200).json(user);
  }
}

module.exports = new UserController();

const jwt = require('jsonwebtoken');
const Yup = require('yup');

const User = require('../models/User');
const File = require('../models/File');
const Category = require('../models/Category');
const Purchase = require('../models/Purchase');

const authConfig = require('../../config/auth');

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    const { id } = user;

    const categories = await Category.findAll({
      where: { user_id: id },
      attributes: ['id', 'name', 'max_value'],
    });

    const purchases = await Purchase.findAll({
      where: { user_id: id },
      attributes: ['id', 'name', 'value', 'date', 'category_id'],
    });

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { name, avatar } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        avatar,
        categories,
        purchases,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();

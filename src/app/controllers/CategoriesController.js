const Yup = require('yup');

const Category = require('../models/Category');

class CategoriesController {
  async index(req, res) {
    const user_id = req.userId;

    const categories = await Category.findAll({
      where: { user_id },
      attributes: ['id', 'name', 'max_value'],
    });

    res.status(200).json(categories);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      max_value: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { name, max_value } = req.body;
    const user_id = req.userId;

    const { id } = await Category.create({ name, max_value, user_id });

    res.status(200).json({ id, name, max_value });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      max_value: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { name } = req.body;
    const category = await Category.findOne({ where: { name } });

    if (!category) {
      return res.status(400).json({ error: 'Category does not exists.' });
    }

    const { id, max_value } = await category.update(req.body);

    return res.status(200).json({ id, name, max_value });
  }

  async delete(req, res) {
    const user_id = req.userId;
    const categoryId = req.params.id;

    const categoryToDelete = await Category.findOne({
      where: {
        user_id,
        id: categoryId,
      },
      attributes: ['id', 'name', 'max_value'],
    });

    if (!categoryToDelete) {
      return res.status(400).json({
        error: 'Category not found.',
      });
    }

    await categoryToDelete.destroy();

    return res.status(200).json(categoryToDelete);
  }
}

module.exports = new CategoriesController();

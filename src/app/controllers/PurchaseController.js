const Yup = require('yup');
const { parseISO, isAfter } = require('date-fns');

const Purchase = require('../models/Purchase');
const Category = require('../models/Category');

class PurchaseController {
  async index(req, res) {
    const user_id = req.userId;

    const purchases = await Purchase.findAll({
      where: {
        user_id,
      },
      attributes: ['id', 'name', 'value', 'date', 'category_id'],
      order: ['date'],
    });

    return res.status(200).json(purchases);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      value: Yup.number().required(),
      date: Yup.date().required(),
      category_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { date } = req.body;

    if (isAfter(parseISO(date), new Date())) {
      return res
        .status(400)
        .json({ error: 'You cannot create a purchase in future date.' });
    }

    const user_id = req.userId;
    const { name, value, category_id } = req.body;

    if (category_id) {
      const category = await Category.findOne({
        where: {
          user_id,
          id: category_id,
        },
      });

      if (!category) {
        return res.status(400).json({ error: 'Category not found.' });
      }

      const { id } = await Purchase.create({
        name,
        value,
        date,
        user_id,
        category_id,
      });

      return res.status(200).json({ id, name, value, date, category_id });
    }

    const { id } = await Purchase.create({
      name,
      value,
      date,
      user_id,
    });

    return res.status(200).json({ id, value, date, user_id, category_id });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      value: Yup.number(),
      date: Yup.date(),
      category_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { dateReq } = req.body;

    if (dateReq && isAfter(parseISO(dateReq), new Date())) {
      return res
        .status(400)
        .json({ error: 'You cannot create a purchase in future date.' });
    }

    const purchaseId = req.params.id;

    const purchase = await Purchase.findOne({ where: { id: purchaseId } });

    if (!purchase) {
      return res.status(400).json({ error: 'Purchase not found.' });
    }

    const { category_id } = req.body;

    if (category_id && category_id !== purchase.category_id) {
      const categoryExists = await Category.findOne({
        where: { id: category_id, user_id: purchase.user_id },
      });

      if (!categoryExists) {
        return res.status(400).json({ error: 'Category does not exists.' });
      }
    }

    const { id, value, user_id, name, date } = await purchase.update(req.body);

    return res
      .status(200)
      .json({ id, name, value, date, user_id, category_id });
  }

  async delete(req, res) {
    const user_id = req.userId;
    const purchaseId = req.params.id;

    const purchaseToDelete = await Purchase.findOne({
      where: {
        user_id,
        id: purchaseId,
      },
      attributes: ['id', 'name', 'value', 'category_id'],
    });

    if (!purchaseToDelete) {
      return res.status(400).json({ error: 'Purchase not found.' });
    }

    await purchaseToDelete.destroy();

    return res.status(200).json(purchaseToDelete);
  }
}

module.exports = new PurchaseController();

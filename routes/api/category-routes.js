
const router = require('express').Router();
const { Category, Product } = require('../../models');



router.get('/', async (req, res) => {

  try {
    const catData = await Category.findAll({
      include: [
        {
          model: Product,
        }
      ]
    })
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {

  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
        },
      ],
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {

  try {
    await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json({ message: "Created new category!" })
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {

  try {
    await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    res.status(200).json({ message: "Updated category!" })
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {

  try {
    await Category.destroy({ where: { id: req.params.id } })
    res.status(200).json({ message: "Deleted category" })
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { models: { Project, Todo } } = require('./db');

router.get('/', async(req, res, next) => {
  try {
    const response = await Project.findAll({
      include: [
        { model: Todo }
      ]
    });
    res.send(response)
  } catch(err) {
    next(err);
  }
});


router.get('/:id', async(req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    res.send(project)
  } catch(err) {
    next(err)
  }
});


router.delete('/:id', async(req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    await project.destroy()
  } catch(err) {
    next(err)
  }
});

router.post('/', async(req, res, next) => {
  try {
    await Project.create(req.body)
  } catch(err) {
    next(err)
  }
})

module.exports = router;

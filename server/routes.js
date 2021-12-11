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

module.exports = router;

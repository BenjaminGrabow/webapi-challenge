const express = require("express");
const Action = require("./actionModel");

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Action.get();

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ errorMessage: 'The request failed !!!' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Action.get(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ errorMessage: 'The request failed !!!' });
  }
});

module.exports = router;
const express = require('express');
const Projects = require('./projectModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ errorMessage: 'The request failed !!!' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.get(id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(400).json({ message: 'invalid Id ' })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'The request failed !!!' });
  }
});

router.get('/projectActions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.getProjectActions(id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(400).json({ message: 'invalid Id ' })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'The request failed !!!' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteIt = await Projects.remove(id);
    if (deleteIt) {
      res.status(200).json({ message: 'Project got deleted !' });
    } else {
      res.status(400).json({ message: 'invalid Id ' })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'The request failed !!!' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const update = await Projects.update(req.params.id, req.body);
    if (update) {
      res.status(200).json({ message: 'Project got updated !' });
    } else {
      res.status(400).json({ message: 'invalid Id ' })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'The request failed !!!' });
  }
});

router.post('/', async (req, res) => {
  if (!req.body && !req.body.name && !req.body.description) {
    res.status(400).json({ message: "Please provide more data" })
  } else {
    try {
      const posts = await Projects.insert(req.body);
      res.status(201).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the new project to the database",
      });
    }
  }
});

module.exports = router;
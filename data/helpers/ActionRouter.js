const express = require('express');
const Actions = require('./actionModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Actions.get();

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ errorMessage: 'The request failed !!!' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Actions.get(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ errorMessage: 'The request failed !!!' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteIt = await Actions.remove(id);
        res.status(200).json({ message: 'Post got deleted !' });
  } catch (error) {
    res.status(500).json({ errorMessage: 'The request failed !!!' });
  } 
});

router.put('/:id', async (req, res) => {
  try {
    const update = await Actions.update(req.params.id, req.body);
   
      res.status(200).json({ message: 'Post got updated !' });
      // res.status(400).json({ message: 'Text must be at least 5 characters long !' })
  } catch (error) {
    res.status(500).json({ errorMessage: 'The request failed !!!' });
  }
});

router.post('/', async (req, res) => {
  if (!req.body && !req.body.notes && !req.body.description && !req.body.project_id) {
    res.status(400).json({ message: "Please provide more data" })
  } else {
    try {
      const posts = await Actions.insert(req.body);
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
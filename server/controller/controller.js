const express = require('express');

const router = express.Router();

const step1 = (req, res) => {
    res.status(200).send({
      success: 'true',
    })
  }

  const getTags = (req, res) => {
    const { tags, sortBy, direction } = req.params;
    const sortedValues = ['id', 'author', 'authorId', 'likes', 'popularity', 'reads', 'tags', undefined];
    const trueDirections = ['asc', 'desc', undefined];





module.exports = router; 
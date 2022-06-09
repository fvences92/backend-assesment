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
    const trueDirection = ['asc', 'desc', undefined];


// response status error if parameter is not valid

    if (sortedValues.indexOf(sortBy) === - 1) {
        res.status(400).send({
          error: 'sortBy parameter is not valid',
        });
      }
      if (trueDirection.indexOf(direction) === -1) {
        res.status(400).send({
          error: 'sortBy parameter is not valid',
        });
      }



module.exports = router;
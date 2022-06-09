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
//execution when user selects more than 1 tag
      if (tags.indexOf(',') !== - 1) {
        const tagArray = tags.split(',');
        const getPaths = tagArray.map((tag, i) => {
          return axios.get(`http://hatchways.io/api/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}&direction=${direction}`)
        });
        //Axios is promise-based, which gives you the ability to take advantage of JavaScript’s async and await for more readable asynchronous code.
        axios.all([
          ...getPaths
        ])

module.exports = {router, 
    step1
    }
}};
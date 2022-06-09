const express = require('express');
const path = require ('express');

const app = express();
const bodyParser = require('body-parser');
const posts = require('./routes/posts.js');
const morgan = require('morgan');



app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', posts);

app.get('/', (req, res) => {
    res.json({
        response: "hello world"
    });
});

app.listen(3000, () => console.log("listening on port 3000"))
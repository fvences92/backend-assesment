const express = require('express')
import bodyParser from 'body-parser'

import posts from './routes/posts.js';

const app = express();

app.use(bodyParser, json());

app.use('/api', posts);

app.get('/', (req, res) => {
    res.json ({response: "hello world"
    });
});

app.listen(3000, () => console.log("listening on port 3000"))
const express = require('express');
const path = require ('express');

const app = express();
const bodyParser = require('body-parser');
const posts = require('./server/controller/controller.js');
const morgan = require('morgan');


const PORT = process.env.PORT || 1992;


app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', posts);

//index route (test only)
app.get('/', (req, res) => {
    res.json({
        response: "hello world"
    });
});

//step 1
app.get('/ping', step1)


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
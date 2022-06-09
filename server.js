const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {getTags, step1 } = require('./server/controller/controller.js')

app.use(bodyParser.json());
app.use(morgan('dev'));

//const cache = apicache.middleware;

const PORT = process.env.PORT || 1992;



//index route (test only)
app.get('/', (req, res) => {
    res.json({
        response: "hello world"
    });
});

//step 1
app.get('/api/ping', step1)


//2
app.get('/api/posts/:tags/:sortBy?/:direction?', getTags);

//LISTENER
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
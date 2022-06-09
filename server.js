const express = require('express');
const path = require ('express');

const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
const {step1, getTags } = require('./server/controller/controller.js')

const cache = apicache.middleware;

app.use(express.static(path.join(__dirname, '../client/public')));

const PORT = process.env.PORT || 1992;


app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', getTags);



//index route (test only)
app.get('/', (req, res) => {
    res.json({
        response: "hello world"
    });
});

//step 1
app.get('/ping', cache('1 hour'), step1)


//2
app.get('/api/posts/:tags/:sortBy?/:direction?', cache('1 hour'), getTags);

//LISTENER
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
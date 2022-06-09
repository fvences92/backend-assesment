const axios = require('axios')

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
        let tagArray = tags.split(',');
        let getPaths = tagArray.map((tag, i) => {
            return axios.get(`http://hatchways.io/api/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}&direction=${direction}`)
        });
        //Axios is promise-based, which gives you the ability to take advantage of JavaScript’s async and await for more readable asynchronous code.
        axios.all([
            ...getPaths
        ])
            .then(axios.spread((tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8, tag9) => {
                let data = [
                    tag1 ? tag1.data.posts : '',
                    tag2 ? tag2.data.posts : '',
                    tag3 ? tag3.data.posts : '',
                    tag4 ? tag4.data.posts : '',
                    tag5 ? tag5.data.posts : '',
                    tag6 ? tag6.data.posts : '',
                    tag7 ? tag7.data.posts : '',
                    tag8 ? tag8.data.posts : '',
                    tag9 ? tag9.data.posts : ''
                ]
                // removing duplicates with table
                // post id used as the key in the hash table, to remove duplicates
                let post = {};
                let posts = [];
                for (let i = 0; i < data.length; i++) {
                    let blog = data[i];
                    for (let i = 0; i < blog.length; i++) {
                        post[blog[i].id] = blog[i];
                    }
                }
                // Create response object so we get the format correctly
                for (let key in post) {
                    posts.push(post[key]);
                }
                // when sortBy is utilized , it will be sorted depending on direction
                if (sortBy) {
                    if (direction === 'desc') {
                        posts = posts.sort((a, b) => (b[sortBy] > a[sortBy]) ? 1 : -1);
                    } else {
                        posts = posts.sort((a, b) => (b[sortBy] < a[sortBy]) ? 1 : -1);
                    }
                }
                // once duplicates are removed and our data is sorted per the users request, we will return the data
                 res.status(200).send(posts);
            }))

            .catch(error => {
                res.status(400).send({
                    error: 'Tags parameter is required',
                })
                console.log(error)
            });
    } else {
        //  On one tag searches only searches there is no need to worry about duplicate values
        axios.get(`http://hatchways.io/api/assessment/blog/posts?tag=${tags}&sortBy=${sortBy}&direction=${direction}`)
            .then(request => {
                let data = request.data.posts;
                if (sortBy) {
                    if (direction === 'desc') {
                        data = data.sort((a, b) => (b[sortBy] > a[sortBy]) ? 1 : -1);
                    } else {
                        data = data.sort((a, b) => (b[sortBy] < a[sortBy]) ? 1 : -1);
                    }
                }
                res.status(200).send(data);
            })
            .catch(error => {
                res.status(400).send({
                    error: 'Tags parameter is required',
                })
                console.log(error)
            });
    }
}
module.exports = {
    getTags,
    step1
}

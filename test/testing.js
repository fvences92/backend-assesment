const expect  = require('chai').expect;
const request = require('request');
const axios = require('axios');

describe('Back-End Assessment', function() {
    describe('Step 1', function() {
      it('Testing body for step 1, must be correct', function(done) {
          request('http://localhost:2222/api/ping', function(error, response, body) {
              expect(body).to.equal('{"success":"true"}');
              done();
          });
      });
      it('status code for step 1', function(done) {
        request('http://localhost:2222/api/ping', function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
      });
      it('status code for step 1 where route is not correct', function (done) {
        request('http://localhost:2222/api/pings', function(error, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
        });
      });
    })
    describe('Step 2', function() {
      it('return of status code for step 2 for the correct route', function(done) {
        request('http://localhost:2222/api/posts/tech', function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
      it('status code for step 2 where route is not correct', function(done) {
        request('http://localhost:2222/api/post/tech', function(error, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
        });
      });
      it('Should return the correct status code for step 2 where route does not have a tag', function(done) {
        request('http://localhost:2222/api/posts', function(error, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
        });
      });
      it('Should return the correct status code for step 2 when the user uses all three parameters', function(done) {
        request('http://localhost:2222/api/posts/health,tech/likes/desc', function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
      });
      it('Should pass the test if all posts are unique by checking unique ids', function(done) {
        axios.get('http://localhost:2222/api/posts/tech,history')
        .then(res => {
          let post = res.data;
          let postID = [];
          let postObj = {};
          let test = true;
          // Get post ids
          for (let i = 0; i < post.length; i++) {
            postID.push(post[i].id)
          }
          // ids are placed in an object where the value of the key is the number of times it appears
          postID.forEach(blog => {
            postObj[blog] = postObj[blog] ? postObj[blog] + 1 : 1
          })
          // If greater than 1 then there are duplicates, test will not pass
          for (let key in postObj) {
            if (postObj[key] > 1) {
              test = false
            }
          }
          expect(test).to.equal(true);
          })
          .catch(error => {
            console.log(error)
          })
          done();
      });
      it('testing if all posts are unique with with unique ids using all parameters', function(done) {
        axios.get('http://localhost:2222/api/posts/tech,history/likes/asc')
        .then(res => {
          let post = res.data;
          let postID = [];
          let postObj = {};
          let test = true;
          // Gets all post ids
          for (let i = 0; i < post.length; i++) {
            postID.push(post[i].id)
          }
          // ids are placed in an obj where the value of the key is the number of times it appears
          postID.forEach(blog => {
            postObj[blog] = postObj[blog] ? postObj[blog] + 1 : 1
          })
          // If greater than 1 then there are duplic. and test will not pass
          for (let key in postObj) {
            if (postObj[key] > 1) {
              test = false
            }
          }
          expect(test).to.equal(true);
          })
          .catch(error => {
            console.log(error)
          })
          done();
      });
      it(' testing for correctly sorted values', function(done) {
        axios.get('http://localhost:2222/api/posts/tech,health/likes/desc')
        .then(res => {
          let post = res.data;
          let postLikes = [];
          let test = true;
          // Gets all post likes
          for (let i = 0; i < post.length; i++) {
            postLikes.push(post[i].likes)
          }
          // Loops the likes and if i < i + 1, the test will not pass
          for (let i = 0; i < postLikes.length; i++) {
            if (postLikes[i] < postLikes[i + 1]) {
              test = false;
            }
          }
          expect(test).to.equal(true);
          })
          .catch(error => {
            console.log(error)
          })
          done();
      });
      it(' testing for correctly sorted values given the default parameters', function(done) {
        axios.get('http://localhost:2222/api/posts/tech,health')
        .then(res => {
          let post = res.data;
          let postID = [];
          let test = true;
          // Gets the default value to sort by and all post Ids
          for (let i = 0; i < post.length; i++) {
            postID.push(post[i].id)
          }
          // ids are looped and if i > i + 1, the test fails since the default is asc. 
          for (let i = 0; i < postID.length; i++) {
            if (postID[i] > postID[i + 1]) {
              test = false;
            }
          }
          expect(test).to.equal(true);
          })
          .catch(error => {
            console.log(error)
          })
          done();
      });
    });
  });
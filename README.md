# Backend Assessment - Blog Posts

BackEnd Challenge Assesment (Walnut Position - Hatchways)

# Summary 

This application is created with Javascript (Node.js), and resolves a backend challenge for software engineer position at Walnut. Using an external API, the majority of the code will be found "under server/controller/controller.js" Testing was peformed using test/testing.js

The focus of this project consists of 2 required/mandatory routes. Starting route /api/ping followed by the post route /api/posts.

Two additional routes were created to sort and the information returned to the user. sortBy allows users to sort by any field in the post. The second paramete allows for order of sorting for example: Ascending, Descending. 

Lastly, the user has the option of a full route that allows a search with at least one tag and sorted with the most likes first.

# Requirements 
Javascript (Node.js), Nodemon.

# Getting Started 

1. Open project and once opened, in the terminal run "npm i" or npm "install"
2. run npm start to start the server, PORT: 1992 or localhost:1992 
3. Postman was used to test solutions and check server response
4. Step 1 solution (localhost:1992/api/ping
5. Step 2 solution (localhost:1992/api/posts/:tags/:sortBy?/:direction?
6. In the terminal run npm test to see results

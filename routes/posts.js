import express from 'express';

const router = express.Router();

const apiKey = 'https://api.hatchways.io/assessment/blog/posts'

router.get('/ping', (req, res) => {
    res.json('hello world')
    
})

export default router; 
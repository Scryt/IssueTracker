const router = require('express').Router();
const {getIssues} = require('../database/Issues')

router.get('/issues', (req, res) => {
    getIssues().then(function(result) {
        res.send(result)
    });
})

router.post('/addIssue', (req, res) => {
    console.log(res)
})

router.post('/updateIssue', (req, res) => {
    console.log(res)
})

module.exports = router;
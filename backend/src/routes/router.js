const router = require('express').Router();
const {getIssues, addIssue} = require('../database/Issues')
const {getStatuses} = require('../database/Statuses')

const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();

router.get('/issues', (req, res) => {
    getIssues().then(function(result) {
        res.send(JSON.parse(result))
    });
})

router.get('/statuses', (req, res) => {
    getStatuses().then(function(result) {
        res.send(JSON.parse(result))
    });
})

router.post('/addIssue', jsonParser, (req, res) => {
    addIssue(req.body.title, req.body.description, req.body.status)
})

router.post('/removeIssue', jsonParser, (req, res) => {
    console.log(req.body.id)
    removeIssue(req.body.id)
})

router.post('/updateIssue', jsonParser, (req, res) => {
    console.log(res)
})

module.exports = router;
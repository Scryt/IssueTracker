const router = require('express').Router();
const {getIssues, addIssue, removeIssue, updateIssue} = require('../database/Issues')
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
    addIssue(req.body.title, req.body.description, req.body.status).then(r => console.log(r))
})

router.post('/removeIssue', jsonParser, (req, res) => {
    removeIssue(req.body.id).then(r => console.log(r))
})

router.post('/updateIssue', jsonParser, (req, res) => {
    updateIssue(req.body.id, req.body.title, req.body.description, req.body.status).then(r => console.log(r))
})

module.exports = router;
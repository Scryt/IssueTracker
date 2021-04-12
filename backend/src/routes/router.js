const router = require('express').Router();
const {apiGetIssues} = require('../handler/Issues')

router.get('/issues', (req, res) => {
    apiGetIssues().then(function(result) {
        res.send(result)
    });
})

module.exports = router;
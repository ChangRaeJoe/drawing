const express = require('express')
const router = express.Router()

router.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = router
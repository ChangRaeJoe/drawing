const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/listboard.html', (request, response) => {
    response.render('talkboard/talkboard.ejs')
})
router.get('/update_list.html', (request, response) => {

})
router.get('/delete_list.html', (request, response) => {

})

module.exports = router
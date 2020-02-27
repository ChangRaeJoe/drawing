const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/listboard.html', (request, response) => {
    const params = {
        title: 'share Drawing-talkBoard', 
        main: 'boardMain.ejs',
        aside: 'aside',
        cssList: ['style', 'mainLayout', 'loginRes', 'talkBoard'], 
        jsList: ['login']
    }
    response.render('index', params)
})
router.get('/update_list.html', (request, response) => {

})
router.get('/delete_list.html', (request, response) => {

})

module.exports = router
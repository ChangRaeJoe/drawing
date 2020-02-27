const express = require('express')
const router = express.Router()
const fs = require('fs')

/*
    toDo: board
    - board db schema create
    - 서버사이드 렌더링으로
    0. ajax로 요청한다.
    1. 서버에서 db서버로부터 데이터를 가져온다.
    2. 서버에서 html로 렌더링한다.
    3. 클라이언트로 렌더링된 html코드를 응답한다.
    - 클라이언트사이드로
    2. 클라이언트로 json객체를 응답한다.
    3. 클라이언트는 객체를 html로 렌더링해서 보여준다.
*/
router.get('/imgboard.html', (request, response) => {
    const params = {
        title: 'share Drawing-Board', 
        main: 'boardMain.ejs',
        aside: 'aside',
        cssList: ['style', 'mainLayout', 'loginRes', 'talkBoard', 'board'], 
        jsList: ['login', 'imgboard.paging'],
    }
    response.render('index', params)
})
router.get('/update_imgb.html', (request, response) => {
})

router.get('/createDraw.html', (request, response) => {
    const params = {
        title: 'share Drawing-createDraw', 
        main: 'createDrawMain.ejs',
        aside: 'aside',
        cssList: ['style', 'mainLayout', 'loginRes'], 
        jsList: ['canvasDraw', 'login']
    }
    response.render('index', params)
})

module.exports = router
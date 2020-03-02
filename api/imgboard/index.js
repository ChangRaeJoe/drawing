const exprees = require('express')
const router = exprees.Router()
const bControl = require('./imgboard.control')


module.exports = function(dbconfig) {
        
    //route pahth: /api/imgboard?offset=
    router.get('/imgboard', function(req, res,next) {
        const post = req.query.offset
        const offset = parseInt(post)
        const limit = 10
        if(Number.isNaN(offset)) {
            return res.status(400).send()
        }

        //db로부터 게시판조회 - 렌더링 - 전송
        const db = dbconfig.getConnect();
        db.query('SELECT id, title, user_id, hit, imgpath, date FROM ImgBoard LIMIT ? OFFSET ?;', [limit, offset], function(err, result) {
            if(err) throw err
            const params = {
                boardList: result
            }
            return res.render('template/imgboardList', params)
        })  
    })

    // route path: /api/imgboard/:number
    router.get('/imgboard/:num', function(req, res, next) {
        const numId = parseInt(req.params.num, 10)
        if(Number.isNaN(numId)) {
            return res.status(400).send()
        }
        
        const params = {
            title: 'share Drawing-Board', 
            main: 'viewImgBoard.ejs',
            aside: 'aside',
            cssList: ['style', 'mainLayout', 'loginRes', 'talkBoard', 'board'], 
            jsList: ['login'],
            loggined: req.loggined

        }
        const db = dbconfig.getConnect();
        db.query('SELECT * FROM ImgBoard WHERE id=?;', [numId], function(err, result) {
            if(err) throw err
            params.showBoard = result[0]
            return res.render('index', params)
        })  
        
    })

    // /api/imgboard    session_id확인 body: {title, description, auther_id, imgFile}
    router.post('/imgboard', function(req, res, next) {
        // body: {title, context, imgp}, imgpath와 세션id의 유저id가져오기
        
    })

    // /api/imgboard/:number    session_id확인 body: {title, description, imgFile}
    router.put('/imgboard/:num', function(req, res, next) {
        // num확인 - body(title, context, img/path)확인 - user_id와 접속유저id확인 - 완료

    })

    // /api/imgboard/:number    session_id확인
    router.delete('/imgboard/:num', function(req, res, next) {
        //num을 찾고 아이디일치확인하고 제거
        const numId = parseInt(req.params.num, 10)
        if(Number.isNaN(numId)) {
            res.status(400).send()
        }

        const db = dbconfig.getConnect();
        db.query(`SELECT id, user_id FROM ImgBoard WHERE id=?`, [numId], function(err, result) {
            //게시글유저id === 접속유저id

        })
        
        
        db.query(`DELETE FROM ImgBoard WHERE id=?`, [numId, ], function(err, result) {
            if(err) throw err
            else return res.status(204).send()
        })

    })
    return router
}
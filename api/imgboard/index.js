const exprees = require('express')
const router = exprees.Router()
const bControl = require('./imgboard.control')
const {W_SIZE} = require('../../routes/iboard/paging')

module.exports = function(dbconfig) {
        
    //route pahth: /api/imgboard?page=
    router.get('/imgboard', function(req, res,next) {
        const post = req.query.page
        const page = parseInt(post)
        const limit = W_SIZE
        if(Number.isNaN(page)) {
            return res.status(400).send()
        }

        //db로부터 게시판조회 - 렌더링 - 전송
        const db = dbconfig.getConnect();
        db.query('SELECT id, title, user_id, hit, imgpath, date FROM ImgBoard LIMIT ? OFFSET ?;', [limit, (page-1)*limit], function(err, result) {
            if(err) throw err
            const params = {
                layout: 'layout/iboardLayout.ejs',
                boardList: result,
            }
            return res.render('layout/iboardLayout', params)
        })  
    })

    // route path: /api/imgboard/:number
    router.get('/imgboard/:num', function(req, res, next) {
        const numId = parseInt(req.params.num, 10)
        if(Number.isNaN(numId)) {
            return res.status(400).send()
        }
        const db = dbconfig.getConnect();
        db.query('SELECT * FROM ImgBoard WHERE id=?;', [numId], function(err, result) {
            if(err) throw err
            const showBoard = result[0]
            return res.render('iboard/iboard.view.ejs', showBoard)
        })  
        
    })

    // /api/imgboard    session_id확인 body: {title, description, auther_id, imgFile}
    router.post('/imgboard', function(req, res, next) {
        // body: {title, context, imgp}, imgpath와 세션id의 유저id가져오기
        if(req.user === undefined) {
            return res.status(400).send()
        }
        const post = req.body
        const imgpath = base64ToAscii(post.img)
        db.query(`INSERT INTO imgboard VALUES(?, ?, ?, 0, ?, NOW())`,[post.title, post.content, req.user.id, imgpath], function(err, result) {
            //완료 콘솔출력
            if(err) throw err;
            console.log('1 record insert')
        })
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
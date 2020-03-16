const exprees = require('express')
const router = exprees.Router()
const path = require('path')

const bControl = require('./imgboard.control')
const {W_SIZE} = require('../../routes/iboard/paging')
const imgDecode = require('../../lib/base64-decode')
const valid = require('../../lib/validRouter')

const dbcofig = require('../../configs/dbconfig')
const db = dbcofig.getConnect()

module.exports = function() {
        
    //route pahth: /api/imgboard?page=
    router.get('/imgboard', function(req, res,next) {
        const post = req.query.page
        const page = parseInt(post)
        const limit = W_SIZE
        if(Number.isNaN(page)) {
            return res.status(400).send()
        }

        //db로부터 게시판조회 - 렌더링 - 전송
        db.query('SELECT id, title, user_id, hit, imgpath, date FROM ImgBoard LIMIT ? OFFSET ?;', [limit, (page-1)*limit])
        .then(([results, fiedls])=>{
            const params = {
                layout: 'layout/iboardLayout.ejs',
                boardList: results,
            }
            return params 
        })
        .then(params =>{
            res.render('layout/iboardLayout', params)
        })
        .catch(error =>{
            console.log('error')
            throw error

        })
    })

    // route path: /api/imgboard/:number
    router.get('/imgboard/:num', function(req, res, next) {
        
        valid.existPageNumber(req.params.num)
        .then(numId =>{
            return db.query('SELECT * FROM ImgBoard WHERE id=?;', [numId])
        })
        .then(([results, fiedls])=>{
            const showBoard = results[0]
            return res.render('iboard/iboard.view.ejs', showBoard)
        })
        .catch(err =>{
            throw err
        })
        
        
    })

    // /api/imgboard    session_id확인 body: {title, description, auther_id, imgFile}
    router.post('/imgboard', function(req, res, next) {
        // body: {title, context, imgp}, imgpath와 세션id의 유저id가져오기
        valid.getSession(req.user)
        .then(user =>{
            const post = req.body
            const obj = imgDecode.base64ToAscii(post.img)
            const path = imgDecode.makeRandPath(obj)
            imgDecode.imgFileWrite(path, obj)

            console.log('insert')
            return db.query(`INSERT INTO imgboard(title, context, user_id, hit, imgpath, date) VALUES(?, ?, ?, 0, ?, NOW())`,[post.title, post.content, user.id, path.basePath + path.filename])
            
        })
        .then(([results, fiedls])=>{
            console.log('1 record insert')
            //get(/api/imgboard/:number) 리다이렉트
            return res.redirect(`/api/imgboard/${results.insertId}`)
        })
        .catch(err =>{
            throw err
        })
        
    })

    // /api/imgboard/:number    session_id확인 body: {title, description, imgFile}
    router.put('/imgboard/:num', function(req, res, next) {
        const numId = parseInt(req.params.num, 10)
        const rcvData = req.body

        valid.existPageNumber(numId)
        .then(numId =>{
            return valid.getSession(req.user)
        })
        .then(user=>{
            //put으로 온 body값 가져오기
            // getRowData()
            // setRowDate()
            // const imgpath = base64ToAscii()
            //디비에 수정, 완료
            return db.query(`SELECT * FROM ImgBoard WHERE id=?`, [numId])
        })
        .then(([results]) =>{
            const row = results[0]
            
            // rowdb의 user_id와 세션id비교
            if(row.user_id !== req.user.id) {
                throw('noop')
            }
            // 받은 데이터를 db에 수정
            const queryDB = db.query(`UPDATE ImgBoard SET title = ?,context=? WHERE id = ?`, 
            [rcvData.title,rcvData.content,numId])
            return Promise.all([row, queryDB])
        })
        .then(([row, results]) =>{
            console.log(results.affectedRows + " record(s) updated");
            return row
        })
        .then((row)=>{
            // rowdb의 imgpath에 받은 이미지를 덮어쓰기
            const obj = imgDecode.base64ToAscii(rcvData.img)
            const defaultPath = imgDecode.makeRandPath(obj, path.parse(row.imgpath).name)

            imgDecode.imgFileWrite(defaultPath, obj)
            // 204응답
            res.status(204).send()
        })
        .catch(reason =>{
            console.log("Error dir:", __dirname)
            console.log(reason)
            res.status(400).send()
        })
    })

    // /api/imgboard/:number    session_id확인
    router.delete('/imgboard/:num', function(req, res, next) {
        //num을 찾고 아이디일치확인하고 제거
        const numId = parseInt(req.params.num, 10)
        valid.existPageNumber(numId)
        .then(numId =>{
            return valid.getSession(req.user)
        })
        .then(user=>{
            return db.query(`SELECT * FROM ImgBoard WHERE id=?`, [numId])
        })
        .then(([ results]) =>{
            const row = results[0]
            if(row.user_id !== req.user.id) {
                throw('noop')
            }
            
            return db.query(`DELETE FROM ImgBoard WHERE id=?`, [numId])
        })
        .then(([ results]) =>{
            res.status(204).send()
        })
        .catch(reason =>{
            return res.status(400).send()
        })
    })
    return router
}

// 사용자 접근제어 추가
// 목록버튼 생성
// db정렬, db promise화 리팩토링

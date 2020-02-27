const express = require('express')
const router = express.Router()
const bControl = require('./board.control')


module.exports = function(dbconfig) {
    // route path: /api/board/:number
    router.get('/board/:num', function(req, res, next) {

    })

    // /api/board    session_id확인 body: {title, description, auther_id, imgFile}
    router.post('/board', function(req, res, next) {

    })

    // /api/board/:number    session_id확인 body: {title, description, imgFile}
    router.put('/board/:num', function(req, res, next) {

    })

    // /api/board/:number    session_id확인
    router.delete('/board/:num', function(req, res, next) {

    })
    return router
}
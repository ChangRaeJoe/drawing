const expree = require('express')
const router = expree.Router()
const login = require('../../lib/login')

module.exports = function(dbconfig){
    router.post('/register', (request, response) => {
        const db = dbconfig.getConnect();
        login.getRegister(request, response, db);
    })
    router.post('/login', (request, response) => {
        const db = dbconfig.getConnect();
        login.getLogin(request, response, db);
    })
    router.post('/redu/id', (request, response) => {
        const db = dbconfig.getConnect();
        login.postAjaxId(request, response, db);
    })
    router.post('/redu/nick', (request, response) => {
        const db = dbconfig.getConnect();
        login.postAjaxNick(request, response,db);
    })
    router.post('/redu/email', (request, response) => {
        const db = dbconfig.getConnect();
        login.postAjaxEmail(request, response,db);
    })
    return router
}
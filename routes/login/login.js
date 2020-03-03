const expree = require('express')
const router = expree.Router()
const signup = require('./signup')
const validation = require('./validation')

module.exports = function(dbconfig, passport){
    router.post('/register', (request, response) => {
        const db = dbconfig.getConnect();
        signup.getRegister(request, response, db);
    })
    
    router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/' }));
    router.get('/logout', function(req, res) {
        req.logOut()
        res.redirect('/')
    })
    router.post('/redu/id', (request, response) => {
        const db = dbconfig.getConnect();
        validation.postAjaxId(request, response, db);
    })
    router.post('/redu/nick', (request, response) => {
        const db = dbconfig.getConnect();
        validation.postAjaxNick(request, response,db);
    })
    router.post('/redu/email', (request, response) => {
        const db = dbconfig.getConnect();
        validation.postAjaxEmail(request, response,db);
    })
    return router
}
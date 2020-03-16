const expree = require('express')
const router = expree.Router()
const signup = require('./signup')
const validation = require('./validation')

module.exports = function(dbconfig, passport){
    router.post('/register', (request, response) => {
        signup.getRegister(request, response, );
    })
    
    router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/' }));
    router.get('/logout', function(req, res) {
        req.logOut()
        res.redirect('/')
    })
    router.post('/redu/id', (request, response) => {
        validation.postAjaxId(request, response);
    })
    router.post('/redu/nick', (request, response) => {
        validation.postAjaxNick(request, response);
    })
    router.post('/redu/email', (request, response) => {
        validation.postAjaxEmail(request, response);
    })
    return router
}
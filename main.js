var createError = require('http-errors')
const http = require('http');
const fs = require('fs')
const dbconfig = require('./configs/dbconfig'); 
const login = require('./lib/login');

dbconfig.handleDisconnect();

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const session = require('express-session')
const compression = require('compression')

const morgan = require('morgan');
const {logger,logStream} = require('./configs/winston')

const {NotfoundHandler, errorHandler} = require('./routes/errorHandler')

app.set('views', './views')
app.set('view engine', 'ejs');


app.use((function(req, res, next){
    if(process.env.NODE_ENV === 'production') {
        return morgan("combined",{
            stream: logStream
        })
    } else {
        return morgan("dev")
    }})()
)

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//session, cookie

// routing
app.get('(/index.html|/)', (request, response) => {
    const params = {
        title: 'share Drawing', 
        main: 'main1234',
        aside: 'aside',
        cssList: ['style', 'mainLayout', 'loginRes'], 
        jsList: ['login']
    }
    response.render('main', params)
})
app.get('/about.html', (request, response) => {
    const params = {
        title: 'share Drawing-about', 
        main: fs.readFileSync(__dirname + '/public/aboutMain.html'),
        aside: 'aside',
        cssList: ['style', 'mainLayout', 'loginRes', 'about'], 
        jsList: ['login']
    }
    response.render('main', params)
})

app.get('/board.html', (request, response) => {
    const params = {
        title: 'share Drawing-Board', 
        main: fs.readFileSync(__dirname + '/public/boardMain.html'),
        aside: 'aside',
        cssList: ['style', 'mainLayout', 'loginRes', 'talkBoard', 'board'], 
        jsList: ['login']
    }
    response.render('main', params)
})
app.get('/update_board.html', (request, response) => {
})
app.get('/delete_board.html', (request, response) => {
})


app.get('/talk.html', (request, response) => {
    const params = {
        title: 'share Drawing-talkBoard', 
        main: fs.readFileSync(__dirname + '/public/talkMain.html'),
        aside: 'aside',
        cssList: ['style', 'mainLayout', 'loginRes', 'talkBoard'], 
        jsList: ['login']
    }
    response.render('main', params)
})
app.get('/update_talk.html', (request, response) => {

})
app.get('/delete_talk.html', (request, response) => {

})

app.get('/createDraw.html', (request, response) => {
    const params = {
        title: 'share Drawing-createDraw', 
        main: fs.readFileSync(__dirname + '/public/createDrawMain.html'),
        aside: 'aside',
        cssList: ['style', 'mainLayout', 'loginRes'], 
        jsList: ['canvasDraw', 'login']
    }
    response.render('main', params)
})
app.post('/login/register', (request, response) => {
    const db = dbconfig.getConnect();
    login.getRegister(request, response, db);
})
app.post('/login/login', (request, response) => {
    const db = dbconfig.getConnect();
    login.getLogin(request, response, db);
})
app.post('/ajax/redu/id', (request, response) => {
    const db = dbconfig.getConnect();
    login.postAjaxId(request, response, db);
})
app.post('/ajax/redu/nick', (request, response) => {
    const db = dbconfig.getConnect();
    login.postAjaxNick(request, response,db);
})
app.post('/ajax/redu/email', (request, response) => {
    const db = dbconfig.getConnect();
    login.postAjaxEmail(request, response,db);
})

app.use(NotfoundHandler)
app.use(errorHandler)
module.exports = app


/*
    ToDo: http -> https(ssl)
    ToDo: 템플릿으로 html코드생성, 회원가입생성, 비번암호화(mysql, server, brower, 전송방식선택)
    ToDo: mysql설치설정, 노드설치설정, 서버프로그램들을 배포를 위한 서버로 옮겨야함. 이것들을 간편히 하려면?
*/
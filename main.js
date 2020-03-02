const dbconfig = require('./configs/dbconfig'); 

dbconfig.handleDisconnect();

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const redis = require('redis')
const session = require('express-session')
const compression = require('compression')

const morgan = require('morgan');
const {logger,logStream} = require('./configs/winston')

const {NotfoundHandler, errorHandler} = require('./routes/errorHandler')
const iboardRouter = require('./routes/board/img')
const lboardRouter = require('./routes/board/list')
const loginRouter = require('./routes/login/login')
const auth = require('./routes/login/auth')

const iboardAPI = require('./api/board')
const lboardAPI = require('./api/imgboard')

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
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()
app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true
    })
  )
app.use(auth.passport.initialize());
app.use(auth.passport.session());
auth.initLocal()

// 
app.use(function(req, res, next) {
    console.log('main:', req.user)
    if(req.user !== undefined) {
        req.loggined = req.user.nick
    } else {
        req.loggined = undefined
    }
    next()
})
// api
app.use('/api', iboardAPI(dbconfig))
app.use('/api', lboardAPI(dbconfig))

// routing
app.get('(/index.html|/)', (request, response) => {
    const params = {
        title: 'share Drawing', 
        main: 'main.ejs',
        aside: 'aside',
        cssList: ['style', 'mainLayout', 'loginRes'], 
        jsList: ['login'],
        loggined: request.loggined
    }
    response.render('index', params)
})
app.get('/about.html', (request, response) => {
    const params = {
        title: 'share Drawing-about', 
        main: 'aboutMain.ejs',
        aside: 'aside',
        cssList: ['style', 'mainLayout', 'loginRes', 'about'], 
        jsList: ['login'],
        loggined: request.loggined
    }
    response.render('index', params)
})

app.use('/board', iboardRouter)
app.use('/board',lboardRouter)

app.use('/login', loginRouter(dbconfig, auth.passport))


app.use(NotfoundHandler)
app.use(errorHandler)
module.exports = app


/*
    ToDo: http -> https(ssl)
    ToDo: 템플릿으로 html코드생성, 회원가입생성, 비번암호화(mysql, server, brower, 전송방식선택)
    ToDo: mysql설치설정, 노드설치설정, 서버프로그램들을 배포를 위한 서버로 옮겨야함. 이것들을 간편히 하려면?
*/
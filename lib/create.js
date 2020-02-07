const fs = require('fs');
const querystring = require('querystring');
const template = require('./template');

const bkfd2Password = require("pbkdf2-password");
const hasher = bkfd2Password();

exports.index = function(request, response){
    const css = template.CSS(['style', 'mainLayout', 'loginRes']);
    const script = template.SCRIPT(['login']);
    const index = template.html('share Drawing', 'main', 'aside', css, script);
    response.writeHead(200, {'Content-Type': 'text/html'});

    response.end(index);
};

exports.about = function(request, response){
    const css = template.CSS(['style', 'mainLayout', 'loginRes', 'about']);
    const script = template.SCRIPT(['login']);
    const main = fs.readFileSync(__dirname + '/../public/aboutMain.html');
    const about = template.html('share Drawing-about', main, 'aside', css, script);
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(about);
};

exports.board = function(request, response){
    const css = template.CSS(['style', 'mainLayout', 'loginRes', 'talkBoard', 'board']);
    const script = template.SCRIPT(['login']);
    const main = fs.readFileSync(__dirname + '/../public/boardMain.html');

    const board = template.html('share Drawing-Board', main, 'aside', css, script);

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(board);
};

exports.talk = function(request, response){
    const css = template.CSS(['style', 'mainLayout', 'loginRes', 'talkBoard']);
    const script = template.SCRIPT(['login']);
    const main = fs.readFileSync(__dirname + '/../public/talkMain.html');

    const talkBoard = template.html('share Drawing-talkBoard', main, 'aside', css, script);

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(talkBoard);
};

exports.createDraw = function(request, response){
    const css = template.CSS(['style', 'mainLayout', 'loginRes']);
    const script = template.SCRIPT(['canvasDraw', 'login']);
    const main = fs.readFileSync(__dirname + '/../public/createDrawMain.html');

    const createDraw = template.html('share Drawing-createDraw', main, 'aside', css, script);

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(createDraw);
};

exports.getLogin = function(request, response, db){
    let body = '';
    request.on('data', (chunk) => {
        body += chunk;
    });
    request.on('end', (chunk) =>{
        const post = querystring.parse(body);

        
        db.query('SELECT * FROM User WHERE id=?', [post.loginId], function(error, results, fields){
            if (error) throw error;
            if(results.length === 0)
            {
                //불일치 alert뜨게 하기;
                const jsAlert = `<script type="text/javascript">alert('ID incorrect');
                                </script>`;
                const refresh = ` <script type="text/javascript">history.back();
                </script>`;
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(jsAlert);
                response.write(refresh);
                response.end();
            }
            else
            {
                //일치 세션생성, 메인페이지 이동
                hasher({password:post.loginPwd, salt:results[0].salt}, function(err, pass, salt, hash) {
                    if(hash === results[0].pwd)
                    {
                        //세션저장, 로그인성공페이지로 이동
                        const jsAlert = `<script type="text/javascript">alert('Login OKay');
                                    </script>`;
                        //response.writeHead(302, {"Location": "./index.html"});
                        response.writeHead(200, {'Content-Type': 'text/html'});
                        response.write(jsAlert);
                        response.end();
                    }
                    else
                    {
                        const jsAlert = `<script type="text/javascript">alert('PWD incorrect');
                                    </script>`;
                        const refresh = ` <script type="text/javascript">history.back();
                        </script>`;
                        response.writeHead(200, {'Content-Type': 'text/html'});
                        response.write(jsAlert);
                        response.write(refresh);
                        response.end();
                    }
                 });
                
            }
        });
    });
    request.on('error', (chunk)=>{
        console.log('receive Error');
    });
}

exports.getRegister = function(request,response, db){
    let body = '';
    request.on('data', (chunk) => {
        body += chunk;
    });
    request.on('end', (chunk) =>{
        const post = querystring.parse(body);
        //toDo: 서버에서 재 유효성검사(id, nick, email)

        //암호화 uid upwd upwdRe unick uemail
        hasher({password:post.upwd}, function(err, pass, salt, hash) {
            //디비입력
            const sql = `INSERT INTO User
                        VALUES (?, ?, ?, ?, NOW(), ?);`;
            const value = [post.uid, hash, post.unick, post.uemail, salt];
            db.query(sql, value,function(err, result){
                if(err) throw err;
                console.log('insert DB: 1 record inserted');

                //리다이렉트, ux(성공메시지)
                const jsAlert = `<script type="text/javascript">alert('회원가입이 완료되었습니다.');
                            </script>`;
                const refresh = ` <script type="text/javascript">history.back();
                            </script>`;
                response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                response.write(jsAlert);
                response.write(refresh);
                response.end();
            });
            
         });
    });
    request.on('error', (err)=>{
        console.log('receive Error=>', err);
        response.writeHead(400, {'Content-Type': 'text/html'});
        response.end('Bad Requset');
    });

}

exports.postAjaxId = function(request, response, db)
{
    let body = '';
    request.on('data', (chunk) => {
        body += chunk;
    });
    request.on('end', (chunk) =>{
        const post = JSON.parse(body);

        //어떤 json의 key를 가지는지 알고 명세를 알고 있어야한다.
        //{id:value}확인 -> 유효성+db검색 -> {reduplication:value} -> stringify전송
        console.log('ajax받은데이터:', post);

        const sendData = {
            type:"id",
            reduplication: false
        }
        db.query(`SELECT id FROM User WHERE id=?`,[post.id], function(err, result, fields){
            if (err) throw err;
            if(result.length >=1)
            {
                sendData.reduplication = true;
            }
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(sendData));
        });
    });
    request.on('error', (err)=>{
        console.log('receive Error=>', err);
        response.writeHead(400, {'Content-Type': 'text/html'});
        response.end('Bad Requset');
    });

}
exports.postAjaxNick = function(request, response, db)
{
    let body = '';
    request.on('data', (chunk) => {
        body += chunk;
    });
    request.on('end', (chunk) =>{
        const post = JSON.parse(body);

        //{nick:value}확인 -> 유효성+db검색 -> {reduplication:value} -> stringify전송
        console.log('ajax받은데이터:', post);

        const sendData = {
            type: "nick",
            reduplication: false
        }
        db.query(`SELECT id FROM User WHERE nick=?`,[post.nick], function(err, result, fields){
            if (err) throw err;
            if(result.length >=1)
            {
                sendData.reduplication = true;
            }
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(sendData));
        });
    });
    request.on('error', (err)=>{
        console.log('receive Error=>', err);
        response.writeHead(400, {'Content-Type': 'text/html'});
        response.end('Bad Requset');
    });
}

exports.postAjaxEmail = function(request, response, db)
{
    let body = '';
    request.on('data', (chunk) => {
        body += chunk;
    });
    request.on('end', (chunk) =>{
        const post = JSON.parse(body);

        //{email:value}확인 -> 유효성+db검색 -> {reduplication:value} -> stringify전송
        console.log('ajax받은데이터:', post);

        const sendData = {
            type: "email",
            reduplication: false
        }
        db.query(`SELECT id FROM User WHERE email=?`,[post.email], function(err, result, fields){
            if (err) throw err;
            if(result.length >=1)
            {
                sendData.reduplication = true;
            }
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(sendData));
        });
    });
    request.on('error', (err)=>{
        console.log('receive Error=>', err);
        response.writeHead(400, {'Content-Type': 'text/html'});
        response.end('Bad Requset');
    });
}
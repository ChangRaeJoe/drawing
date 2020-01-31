const fs = require('fs');
const querystring = require('querystring');
const template = require('./template');

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
        db.query('SELECT * FROM User WHERE id=? AND pwd=?', [post.loginId, post.loginPwd], function(error, results, fields){
            if (error) throw error;
            if(results.length === 0)
            {
                //불일치 alert뜨게 하기;
                const jsAlert = `<script type="text/javascript">alert('ID/PWD incorrect');
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
                response.writeHead(302, {"Location": "./index.html"});
                response.end();
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
        
    });
    request.on('error', (chunk)=>{
        console.log('receive Error');
    });

    response.writeHead(200);
    response.end('ok');
}
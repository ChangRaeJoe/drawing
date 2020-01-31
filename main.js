const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const dbconfig = require('./dbconfig'); 
const template = require('./lib/template');
const create = require('./lib/create');


dbconfig.handleDisconnect();


const app = http.createServer(function(request, response){
    const db = dbconfig.getConnect();

    /*
        1. url을 가져온다.
        2. if로 routing한다.
        3. 페이지를 보여준다.
    */
   /*
     ToDo: http -> https(ssl)
     ToDo: 템플릿으로 html코드생성, 회원가입생성, 비번암호화(mysql, server, brower, 전송방식선택)
     ToDo: mysql설치설정, 노드설치설정, 서버프로그램들을 배포를 위한 서버로 옮겨야함. 이것들을 간편히 하려면?
   */
   let _url = request.url;
   let queryData = url.parse(_url, true).query;
   let pathname = url.parse(_url, true).pathname;
   
   console.log('queryData:', queryData);
   console.log('pathname:', pathname);

   if(pathname === '/' || pathname === '/index.html')
   {
      create.index(request, response);

   }
   else if(pathname === '/about.html')
   {
      create.about(request, response);
   }
   else if(pathname === '/board.html')
   {
      create.board(request, response);
   }
   else if(pathname === '/update_board.html')
   {
       
   }
   else if(pathname === '/delete_board.html')
   {
       
   }
   else if(pathname === '/talk.html')
   {
      create.talk(request, response);
   }
   else if(pathname === '/update_talk.html')
   {

   }
   else if(pathname === '/delete_talk.html')
   {
       
   }
   else if(pathname === '/createDraw.html')
   {
      create.createDraw(request, response);
   }
   else if(pathname === '/login/register')
   {
      create.getRegister(request, response, db);
   }
   else if(pathname === '/login/login')
   {
      create.getLogin(request, response, db);
   }
   //static file: css, js, img
   else if(path.extname(pathname) === '.css')
   {
     response.writeHead(200, {'Content-Type': 'text/css'});
     response.end(fs.readFileSync(`${__dirname}/public/css${pathname}`));
   }
   else if(path.extname(pathname) === '.js')
   {
     response.writeHead(200, {'Content-Type': 'text/javascript'});
     response.end(fs.readFileSync(`${__dirname}/public/js${pathname}`));
   }
   else if(path.dirname(pathname) === '/public/img')
   {
     response.writeHead(200, {'Content-Type': 'img/jpeg'});
     response.end(fs.readFileSync(__dirname + pathname));
   }
   //404: not found
   else
   {
       response.writeHead(404);
       response.end('Not found');
   }
   
});


app.listen(3000);

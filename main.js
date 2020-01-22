const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const dbconfig = require('./dbconfig'); 

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
     ToDo: 템플릿으로 html코드생성, 회원가입생성
   */
   let _url = request.url;
   let queryData = url.parse(_url, true).query;
   let pathname = url.parse(_url, true).pathname;
   

   console.log('queryData:', queryData);
   console.log('pathname:', pathname);

   if(pathname === '/' || pathname === '/index.html')
   {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(fs.readFileSync(__dirname + '/public/index.html'));
   }
   else if(pathname === '/about.html')
   {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(fs.readFileSync(__dirname + '/public/about.html'));
   }
   else if(pathname === '/board.html')
   {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(fs.readFileSync(__dirname + '/public/board.html'));
   }
   else if(pathname === '/update_board.html')
   {
       
   }
   else if(pathname === '/delete_board.html')
   {
       
   }
   else if(pathname === '/talk.html')
   {
     response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(fs.readFileSync(__dirname + '/public/talk.html'));
   }
   else if(pathname === '/update_talk.html')
   {

   }
   else if(pathname === '/delete_talk.html')
   {
       
   }
   else if(pathname === '/createDraw.html')
   {
     response.writeHead(200, {'Content-Type': 'text/html'});
     response.end(fs.readFileSync(__dirname + '/public/createDraw.html'));
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

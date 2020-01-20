const http = require('http');
const url = require('url');
const fs = require('fs');

const dbconfig = require('./dbconfig'); 

dbconfig.handleDisconnect();


const app = http.createServer(function(request, response){
    const db = dbconfig.getConnect();

    /*
        1. url을 가져온다.
        2. if로 routing한다.
        3. 페이지를 보여준다.
    */
   let _url = request.url;
   let queryData = url.parse(_url, true).query;
   let pathname = url.parse(_url, true).pathname;
   

   console.log('queryData:', queryData);
   console.log('pathname:', pathname);
   if(pathname === '/' || pathname === '/index.html')
   {
        response.writeHead(200);
        response.end(fs.readFileSync(__dirname + '/index.html'));
   }
   else if(pathname === '/about.html')
   {
        response.writeHead(200);
        response.end(fs.readFileSync(__dirname + '/about.html'));
   }
   else if(pathname === '/board.html')
   {
        response.writeHead(200);
        response.end(fs.readFileSync(__dirname + '/board.html'));
   }
   else if(pathname === '/update_board.html')
   {
       
   }
   else if(pathname === '/delete_board.html')
   {
       
   }
   else if(pathname === '/talk.html')
   {
        response.writeHead(200);
        response.end(fs.readFileSync(__dirname + '/talk.html'));
   }
   else if(pathname === '/update_talk.html')
   {

   }
   else if(pathname === '/delete_talk.html')
   {
       
   }
   //css, js
   else if(pathname === '/style.css')
   {
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.end(fs.readFileSync(__dirname + '/style.css'));
   }
   else if(pathname === '/mainLayout.css')
   {
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.end(fs.readFileSync(__dirname + '/mainLayout.css'));
   }
   else if(pathname === '/reset.css')
   {
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.end(fs.readFileSync(__dirname + '/reset.css'));
   }
   else
   {
       response.writeHead(404);
       response.end('Not found');
   }
   
});


app.listen(3000);

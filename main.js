const http = require('http');
const dbconfig = require('./dbconfig'); 


dbconfig.handleDisconnect();

const app = http.createServer(function(request, response){
    console.log('hey');

    response.writeHead(200);
    response.end('hello world');
});


app.listen(3000);

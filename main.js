const http = require('http');
const dbconfig = require('./dbconfig'); 

dbconfig.handleDisconnect();

// dbconfig.getConnect(); //처음생성된 연결선..

function test(){
    console.log("handle:");
}

const app = http.createServer(function(request, response){
    const db = dbconfig.getConnect();
    console.log('hey');
    test();
    db.query(`SELECT * FROM author`, function(error, results){
        if(error) throw error;
    });
    response.writeHead(200);
    response.end('hello world');
});


app.listen(3000);

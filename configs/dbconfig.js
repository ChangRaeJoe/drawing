const mysql = require('mysql');
const db_config = require('./db/db.json')[process.env.NODE_ENV];     //db.js==dbTemplete.js

function dbWrapper()
{
    let dbConnection = undefined;

    function handleDisconnect() {
        dbConnection = mysql.createConnection(db_config);

        dbConnection.connect(function(err) {
            if(err) {
                console.log('error when connecting to db:', err);
                setTimeout(handleDisconnect, 2000);
            }
        });

        dbConnection.on('error', function(err) {
            console.log('db error', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                setTimeout(handleDisconnect, 2000);
            } else {
                throw err;
            }
        });
    
        //log파일은 어떻게 만들어서 처리하지?이렇게하나;
        console.log('log: DB connect');
    }

    function getConnect(){
        return dbConnection;
    }
    return {
        handleDisconnect : handleDisconnect,
        getConnect : getConnect
    };
}

module.exports = dbWrapper();

// call by reference, value가 js에선 어찌 쓰이나?
// 아.. defined있는 걸 return해주네.
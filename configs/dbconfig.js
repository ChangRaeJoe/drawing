const mysql = require('mysql2');
const db_config = require('./db/db.json')["development"];     //db.js==dbTemplete.js

function dbWrapper()
{
    let pool = undefined
    let promisePool = undefined

    function handleDisconnect() {
        pool = mysql.createPool(db_config);
        promisePool = pool.promise();
        
        console.log('log: DB connect');
    }

    function getConnect(){
        return promisePool;
    }


    return {
        handleDisconnect : handleDisconnect,
        getConnect : getConnect
    };
}

module.exports = dbWrapper();

// call by reference, value가 js에선 어찌 쓰이나?
// 아.. defined있는 걸 return해주네.
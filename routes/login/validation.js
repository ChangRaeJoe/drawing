const dbcofig = require('../../configs/dbconfig')
const db = dbcofig.getConnect()

exports.postAjaxId = function(request, response)
{
    // const post = JSON.parse(body);
    const post = request.body

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
        response.json(sendData)
    });

}

exports.postAjaxNick = function(request, response)
{
    const post = request.body;
    // const post = JSON.parse(body);
    //{nick:value}확인 -> 유효성+db검색 -> {reduplication:value} -> stringify전송
    console.log('ajax받은데이터:', post);

    const sendData = {
        type: "nick",
        reduplication: false
    }
    db.query(`SELECT id FROM User WHERE nick=?`,[post.nick],function(err, result, fields){
        if (err) throw err;
        if(result.length >=1)
        {
            sendData.reduplication = true;
        }
        response.json(sendData)
    });
}

exports.postAjaxEmail = function(request, response)
{
    const post = request.body

    //{email:value}확인 -> 유효성+db검색 -> {reduplication:value} -> stringify전송
    console.log('ajax받은데이터:', post);

    const sendData = {
        type: "email",
        reduplication: false
    }
    db.query(`SELECT id FROM User WHERE email=?`,[post.email], function(err, result, fields){
        if (err) throw err;
        if(result.length >=1) {
            sendData.reduplication = true;
        }
        response.json(sendData)
    });
}
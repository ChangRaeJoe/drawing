const bkfd2Password = require("pbkdf2-password");
const hasher = bkfd2Password();

const dbcofig = require('../../configs/dbconfig')
const db = dbcofig.getConnect()

exports.getLogin = function(username, password, done){
    db.query('SELECT * FROM User WHERE id=?', [username], function(error, results, fields){
        if (error) throw error;
        if(results.length === 0)
        {
            //불일치 alert뜨게 하기;
            return done(null, false, { message: 'Incorrect username.' });
        }
        else
        {
            //일치 세션생성, 메인페이지 이동
            hasher({password:password, salt:results[0].salt}, function(err, pass, salt, hash) {
                if(hash === results[0].pwd)
                {
                    //세션저장, 로그인성공페이지로 이동
                    return done(null, results[0]);
                }
                else
                {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            });
            
        }
    });
}
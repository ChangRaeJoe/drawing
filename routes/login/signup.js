
const bkfd2Password = require("pbkdf2-password");
const hasher = bkfd2Password();

const dbcofig = require('../../configs/dbconfig')
const db = dbcofig.getConnect()


exports.getRegister = function(request,response){
    const post = request.body;
        //toDo: 서버에서 재 유효성검사(id, nick, email)

    //암호화 uid upwd upwdRe unick uemail
    hasher({password:post.upwd}, function(err, pass, salt, hash) {
        //디비입력
        const sql = `INSERT INTO User
                    VALUES (?, ?, ?, ?, NOW(), ?);`;
        const value = [post.uid, hash, post.unick, post.uemail, salt];
        db.query(sql, value, function(err, result){
            if(err) throw err;
            console.log('insert DB: 1 record inserted');

            //리다이렉트, ux(성공메시지)
            const jsAlert = `<script type="text/javascript">alert('회원가입이 완료되었습니다.');
                        </script>`;
            const refresh = ` <script type="text/javascript">history.back();
                        </script>`;
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.write(jsAlert);
            response.write(refresh);
            response.end();
        });
        
        });

}
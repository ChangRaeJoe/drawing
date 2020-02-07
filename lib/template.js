function registerScreen()
{
    return `
    <form action="/login/register" method="post">
                    <table>
                        <tbody>
                            <tr>
                                <td><label for="userid">아이디</label></td>
                                <td><input type="text" id="userid" name="uid"  required /></td>   
                                <td><button class='jsIdDup'>중복확인</button></td>                     
                            </tr>
                            <tr>
                                <td><label for="password">비밀번호</label></td>
                                <td><input type="password" id="password" name="upwd"  required/></td>
                                <td></td>                        
                            </tr>
                            <tr>
                                <td><label for="pwdRe">비번확인</label></td>
                                <td><input type="password" id="pwdRe" name="upwdRe"  required/></td>
                                <td></td>                        
                            </tr>
                            <tr>
                                <td> <label for="usernick">닉네임</label></td>
                                <td><input type="text" id="usernick" name="unick" required/></td>
                                <td><button class='jsNickDup'>중복확인</button></td>                        
                            </tr>
                            <tr>
                                <td> <label for="useremail">이메일</label></td>
                                <td>
                                    <input type="email" id="useremail" name="uemail" required/>
                                </td>
                                <td><button class='jsEmailDup'>인증받기</button></td>                        
                            </tr>
                        </tbody>
                    </table>
                
                <div>
                    <button class='jsRegBtn' type="submit">가입</button>
                    <button class='jsCancel'>취소</button>
                </div>
    </form>
    `;
}

exports.CSS = function(list){
    let cssList = '';
    for(let i=0; i<list.length; i++)
    {
        cssList += `<link rel="stylesheet" href="./${list[i]}.css" />`;
    }
    return cssList;
};

exports.SCRIPT = function(list){
    let jsList = '';
    for(let i=0; i<list.length; i++)
    {
        jsList += `<script src="./${list[i]}.js"></script>`;
    }
    return jsList;
};

exports.html = function(title, main, aside, css, script)
{
    return `
        <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        ${css}
        <title>${title}</title>
        
    </head>
    <body>
        <div class="container">
            <div class="content fixedHead">
                <header>
                    <a class='link' href='./index.html'>Drawing</a>
                </header>
                <nav>
                    <ul>
                        <li><a href="./about.html" class="link">About</a></li>
                        <li><a href="./board.html" class="link">Board</a></li>
                        <li><a href="./talk.html" class="link">Talk</a></li>
                    </ul>
                </nav>  
            </div>
            <div class="fixedHead under">
                <form action="/login/login" method="post" onSubmit="return loginValidation()">
                    <input type="text" placeholder="id" name="loginId" class="loginId"/>
                    <input type="password" placeholder="password" name="loginPwd" class="loginPwd"/>
                    
                    <button type="submit" class="loginBtn" >Login</button>
                    <button class="loginBtn" id='jsSignUp'>Sign Up</button>
                </form>
            </div>
            
            <section class='content'>
                
                <main>${main}</main>
                <aside>${aside}</aside>
            </section>

            
            <footer>
                Inquire : ckdfo1995@gmail.com</footer>
        </div>

        <div class="displayRegister displayRegisterOff">
            <div class='backSignUp'></div>
            <div class="signUp">
                ${registerScreen()}
                <div class='oAuth'>
                    <hr>
                    OAuth2.0
                </div>
            </div>
        </div>
        ${script}
    </body>
    </html>`;
}


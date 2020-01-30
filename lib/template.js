function registerScreen()
{
    return `
    <form action="">
                    <table>
                        <tbody>
                            <tr>
                                <td><label for="userid">아이디</label></td>
                                <td><input type="text" id="userid"></td>
                                <td><button>중복확인</button></td>                        
                            </tr>
                            <tr>
                                <td><label for="password">비밀번호</label></td>
                                <td><input type="password" id="password"></td>
                                <td></td>                        
                            </tr>
                            <tr>
                                <td><label for="pwdRe">비번확인</label></td>
                                <td><input type="password" id="pwdRe"></td>
                                <td></td>                        
                            </tr>
                            <tr>
                                <td> <label for="usernick">닉네임</label></td>
                                <td><input type="text" id="usernick"></td>
                                <td><button>중복확인</button></td>                        
                            </tr>
                            <tr>
                                <td> <label for="useremail">이메일</label></td>
                                <td>
                                    <input type="text" id="useremail"> @
                                    <select name="" id="">
                                        <option value="" default>naver.com</option>
                                        <option value="">daum.net</option>
                                        <option value="">gmail.com</option>
                                        <option value="">nate.com</option>
                                        <option value="">직접입력</option>
                                    </select>
                                </td>
                                <td><button>인증받기</button></td>                        
                            </tr>
                        </tbody>
                    </table>

                

                <div>
                    <button>가입</button>
                    <button>취소</button>
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

                <form action="">
                    <input type="text" placeholder="id">
                    <input type="password" placeholder="password">
                    
                    <button class="loginBtn" >Login</button>
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


const displayRegister = document.querySelector('.displayRegister');
const jsSignUp = document.querySelector('#jsSignUp');

//회원가입창
const regBtn = document.querySelector('.jsRegBtn');
const cancel = document.querySelector('.jsCancel');

const inputs = document.querySelectorAll('input');

const inputId = document.querySelector('.loginId');
const inputPwd = document.querySelector('.loginPwd');
const inputSubmit = document.querySelector('.loginBtn');

function handleDisplay(event)
{
    event.preventDefault();
    displayRegister.classList.toggle('displayRegisterOff');
}

function handleCancel(event)
{
    displayRegister.classList.toggle('displayRegisterOff');
    inputs.forEach(function(item){
        item.value = "";
    });
}

//정규식
const re = /^[a-zA-Z0-9]{4,12}$/;
const reEmail = /^[\w_]([-_\.]?[\w])*@[\w]([-_\.]?[\w])*\.[a-zA-Z]{2,3}$/i;
// 유효성검사 아이디4~12글자, 비번4~12글자
function loginValidation()
{

    if(!re.test(inputId.value)){
        alert('4~12글자의 아이디를 입력해주세요.');
        return false;
    }

    if(!re.test(inputPwd.value)){
        alert('4~12글자의 비번을 입력해주세요.');
        return false;
    }
    return true;
}

function validationRegi(event)
{
    event.preventDefault();
    
    const id = document.querySelector('[name="uid"]');
    const pwd = document.querySelector('[name="upwd"]');
    const pwdRe = document.querySelector('[name="upwdRe"]');
    const nick = document.querySelector('[name="unick"]');
    const email = document.querySelector('[name="uemail"]');



    if(!re.test(id.value)){
        alert('4~12글자,특수문자제외한 아이디를 입력해주세요.');
        return;
    }

    if(!re.test(pwd.value)){
        alert('4~12글자의 비번을 입력해주세요.');
        return;
    }
    if(!re.test(pwdRe.value)){
        alert('4~12글자의 비번을 입력해주세요.');
        return;
    }
    if(pwd.value !== pwdRe.value)
    {
        alert('두 개의 비번이 일치하지 않습니다.');
        return;
    }
    if(!re.test(nick.value)){
        alert('4~12글자의 닉네임을 입력해주세요.');
        return;
    }
    if(!reEmail.test(email.value)){
        alert('이메일이 잘못되었습니다. 다시 작성해주세요.');
        return;
    }

    //ajax 중복확인, 이메일확인버튼 체크
    const allClear = (document.querySelector('.jsIdDup').disabled === true) && (document.querySelector('.jsNickDup').disabled === true);
    if(!allClear)
    {
        alert('중복확인후 클릭해주세요.');
        return;
    }
    //post전송
    const form = document.querySelector('[action="/login/register"]');
    form.submit();
}

function jsonContents()
{
    try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            const data = JSON.parse(httpRequest.responseText);
            
            if(data['reduplication'])
            {
                //'중복됩니다' innerText출력
                alert('중복입니다');
            }
            else
            {
                //'사용가능한 id/nick입니다' innerText출력
                if(data['type'] === 'id')
                {
                    alert('사용가능한 id입니다');
                    document.querySelector('.jsIdDup').disabled = true;
                }
                else if(data['type'] === 'nick')
                {
                    alert('사용가능한 nick입니다');
                    document.querySelector('.jsNickDup').disabled = true;
                }
                else if(data['type'] === 'email')
                {
                    alert('사용가능한 email입니다');
                    document.querySelector('.jsEmailDup').disabled = true;
                }
                else
                {
                    alert('유효한 타입이 없습니다.');
                }
                
            }
          } else {
            alert('There was a problem with the request.');
          }
        }
      }
      catch( e ) {
        alert('Caught Exception: ' + e.description);
      }
}

function makeRequest(method, pathname, data, callback)
{
    httpRequest = new XMLHttpRequest();

    if(!httpRequest) {
        alert('XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ');
        return false;
    }
    httpRequest.onreadystatechange = callback;
    httpRequest.open(method, pathname);

    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(data));
}

function handleIdReduplication(event)
{
    event.preventDefault();
    const inputId = document.querySelector('[name="uid"]');
    const data = {
        id: inputId.value
    };

    //toDo: 유효성검사 in server

    //ajax json요청, 응답
    makeRequest("POST", 'ajax/redu/id', data, jsonContents);
}
function handleNcikReduplication(event)
{
    event.preventDefault();
    const inputNick = document.querySelector('[name="unick"]');
    const data = {
        nick: inputNick.value
    }
    //ajax json요청
    makeRequest("POST", 'ajax/redu/nick', data, jsonContents)
}
function handleEmailReduplication(event)
{
    event.preventDefault();
    const inputEmail = document.querySelector('[name="uemail"]');

    //toDo: 중복확인,  인증코드
    const data = {
        email: inputEmail.value
    }
    //ajax json요청
    makeRequest("POST", 'ajax/redu/email', data, jsonContents)
}


function handleIdChange(event)
{
    console.log('변경됨!');
    const jsBtn = document.querySelector('.jsIdDup');
    if(jsBtn.disabled == true)
    {
        jsBtn.disabled = false;
    }
}
function handleNickChange(event)
{
    console.log('변경됨!');
    const jsBtn = document.querySelector('.jsNickDup');
    if(jsBtn.disabled == true)
    {
        jsBtn.disabled = false;
    }
}
function handleEmailChange(event)
{
    console.log('변경됨!');
    const jsBtn = document.querySelector('.jsEmailDup');
    if(jsBtn.disabled == true)
    {
        jsBtn.disabled = false;
    }
}

jsSignUp.addEventListener('click', handleDisplay);
cancel.addEventListener('click', handleCancel);
regBtn.addEventListener('click', validationRegi);

document.querySelector('.jsIdDup').addEventListener('click', handleIdReduplication);
document.querySelector('.jsNickDup').addEventListener('click', handleNcikReduplication);
document.querySelector('.jsEmailDup').addEventListener('click', handleEmailReduplication)

//input change => button abled
document.querySelector('[name="uid"]').addEventListener('change', handleIdChange);
document.querySelector('[name="unick"]').addEventListener('change', handleNickChange);
document.querySelector('[name="uemail"]').addEventListener('change', handleEmailChange);
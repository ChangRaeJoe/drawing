# drawing
website as share platform, drawing, board etc.

## Introduce
frontend: paint.js
backend: mysql, api, 
using library: 

## Why
- nodejs서버 돌림면서 서비스중단없이 재배포 시키는법
- db재연결 때, 2초딜레이시키는 이유
- moudle.exports는 외부참조는 어떤식으로 컴파일이 되는가?


## toDo
- DB -> DB connection pool
- passport, redis, log code refactoring
- chatting, 영화크롤링, 알고리즘문제, 기본공부, toy프로젝트(저녁), 문서정리, 목표세워서 이뤄나가자.(작은 프로젝트, 행동들)

## toDo2
    세션,
    1. 세션이 있는지 확인한다.
    2. 세션이 있으면 조건에 맞게 브라우저에 전송한다.

    로그인할 때,
    v 1. 입력된 아이디/비번을 가져온다.
    v 2. db에서 아이디/비번(hash)/salt/을 가져온다.
    v 3. 입력된 비번과 salt로 hash를 생성한다.
    v 4. db에서 가져온 비번과 생성된 hash와 비교한다.
     5. 일치하면 세션을 만든다.
    브라우저에선?
    1. POST방식 + SSL로 감싸서 보낸다.
    제한조건
    1. 패스워드 실패회수 10회로 제한두기.

    회원가입할 때,
    v 1. 브라우저에서 유효성검사를 한다.
    v 2. 중복확인
      3. 이메일인증을 확인한다.
      4. 이상없으면 post방식, ssl로 전송한다.

    oAuth방식으로 로그인할 때,

    프로세스: 이론, 코드작성 -> 연습, 응용, 정리 -> 리팩토링

## toRead
Callback 언제사용하는지, Callback모듈화는 어떤식으로 생성시키는지.  
중복체크결과를 브라우저에서 받을지, script로 받을지와 전체페이지를 리로딩할지, 팝업창을띄워할지...등.
템플릿엔진, 생활코딩ajax
https://eine.tistory.com/entry/Nodejs-Async-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EC%BD%9C%EB%B0%B1-%ED%95%A8%EC%88%98-%ED%92%80%EC%96%B4%EB%82%B4%EA%B8%B0
https://coding-factory.tistory.com/143
reversProxy: https://cinema4dr12.tistory.com/825?category=494869
: https://m.blog.naver.com/azure0777/220469049820

문서로 작성해서 정리하기.(위에거 프론트쪽임.)
백엔드가 해야하는 일들, 어려운 일들->뭘해야하는지 알아보자.





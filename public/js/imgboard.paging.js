
//ajax 요청
//응답
//boardcontainer.innerHTML에 추가
//종료

function pageRequest(page=0) {
    const boardContainer = document.querySelector('.boardContainer')
    let httpRequest;

    function receiveList()
    {
        try {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
              if (httpRequest.status === 200) {
                // const data = JSON.parse(httpRequest.responseText);
                boardContainer.innerHTML = httpRequest.responseText
              } else {
                alert('There was a problem with the request.');
              }
            }
          }
        catch( e ) {
            alert('Caught Exception: ' + e.description);
        }
    }
    function makeRequest(method, pathname, callback)
    {
        httpRequest = new XMLHttpRequest();
    
        if(!httpRequest) {
            alert('ajax 전송실패');
            return false;
        }
        httpRequest.onreadystatechange = callback;
        httpRequest.open(method, pathname);
    
        httpRequest.send()
    }
    
    
    function initpage(page)
    {
        //ajax json요청, 응답
        makeRequest("GET", `/api/imgboard?page=${page}`, receiveList);
    }
    initpage(page)
}


// paging
// 번호 버튼클릭 시 이벤트발생
const pageBtns = document.querySelectorAll('.btnMaginSide')

function handlerPage(event) {
  pageRequest(event.target.innerText)
}

pageBtns.forEach(val => {
  val.addEventListener('click', handlerPage)
  
})

pageRequest(pageBtns[0].innerText)

//ajax 요청
//응답
//boardcontainer.innerHTML에 추가
//종료

(function() {
    const boardContainer = document.querySelector('.boardContainer')
    let httpRequest;

    function receiveList()
    {
        try {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
              if (httpRequest.status === 200) {
                // const data = JSON.parse(httpRequest.responseText);
                
                boardContainer.innerHTML = httpRequest.responseText
                console.log(httpRequest.responseText)

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
    
    
    function initpage(offset=0)
    {
        //ajax json요청, 응답
        makeRequest("GET", `/api/imgboard?offset=${offset}`, receiveList);
    }
    initpage()
})()
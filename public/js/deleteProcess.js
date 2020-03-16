(function()
{
        //ajax
    function makeRequest(method, pathname, data, callback)
    {
        httpRequest = new XMLHttpRequest();

        if(!httpRequest) {
            alert('XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ');
            return false;
        }
        httpRequest.onreadystatechange = ()=>{
            try {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 204) {
                    window.location = 'http://localhost:3000/board/imgboard.html'
                } else {
                    alert(httpRequest.status + 'There was a problem with the request.');
                }
                }
            }
            catch( e ) {
                alert('Caught Exception: ' + e.description);
            }
        };
        httpRequest.open(method, pathname);

        httpRequest.setRequestHeader('Content-Type', 'application/json');
        httpRequest.send(JSON.stringify(data));
    }


    const delBtn = document.querySelector('.delBtn')

    delBtn.addEventListener('click', function() {
        const pageId = window.location.href.split( '/' )
        makeRequest("DELETE", `/api/imgboard/${pageId[pageId.length-1]}`)
    })
})()
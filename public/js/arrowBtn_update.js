

function showTab(n) {
    const x = document.getElementsByClassName('tab')
    x[n].style.display = 'block'

    if (n==0) {
        document.getElementById('btn-prev').style.display = "none"
    } else {
        document.getElementById('btn-prev').style.display = 'inline'
    }

    if(n == (x.length-1)) {
        document.getElementById('btn-next').innerText = "Update"
    } else {
        document.getElementById('btn-next').innerText = "Next"
    }
}

function validationForm() {
    let valid = true
    const x = document.getElementsByClassName('tab')

    if(currentTab === x.length-1) {
        const y = x[currentTab].getElementsByTagName('input')
        console.dir()
        for(let i=0; i<y.length; i++) {
            if (y[i].value == "" && (y[i].type !== "hidden")) {
                y[i].className += " invalid"
                valid = false
                console.log('true', i)
            }
        }
    } else {
        valid = true
    }
    return valid
}

function nextPrev(n) {
    const x = document.getElementsByClassName('tab')

    if(n===1 && !validationForm()) return false //form 유효성검사

    //현재 탭 none
    x[currentTab].style.display = 'none'

    //다음 탭 연산, 마지막이면 제출, 탭실행
    currentTab += n

    if(currentTab >= x.length) {
        const data = {}
        const canvas = document.getElementById("jsCanvas");
        data.img = canvas.toDataURL()

        const form = Array.from(document.getElementById('writeForm'))
        form.forEach(tag =>{
            if(tag.name === 'title') {
                data.title = tag.value
            } else if(tag.name === 'content') {
                data.content = tag.value
            } else if(tag.name ==='id'){
                data.id = tag.value
            } else {
                console.log('default error')
            }
        })

        makeRequest("PUT", `/api/imgboard/${data.id}`, data, jsonContents);

        return false
    }
    showTab(currentTab)
}


document.getElementById('btn-prev').addEventListener('click', function(){ nextPrev(-1)})
document.getElementById('btn-next').addEventListener('click', function(){ nextPrev(1)})

let currentTab = 0
showTab(currentTab)

//arrowBtn을 create와 update사용가능하도록 분리시키기.

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
                console.log(window.location)
                window.location = location.origin + '/api/imgboard/' + data.id
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
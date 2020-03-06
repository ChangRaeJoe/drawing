

function showTab(n) {
    const x = document.getElementsByClassName('tab')
    x[n].style.display = 'block'

    if (n==0) {
        document.getElementById('btn-prev').style.display = "none"
    } else {
        document.getElementById('btn-prev').style.display = 'inline'
    }

    if(n == (x.length-1)) {
        document.getElementById('btn-next').innerText = "Submit"
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
        const canvas = document.getElementById("jsCanvas");
        document.getElementById('input_img').value = canvas.toDataURL();

        

        document.getElementById('writeForm').submit();
        return false
    }
    showTab(currentTab)
}


document.getElementById('btn-prev').addEventListener('click', function(){ nextPrev(-1)})
document.getElementById('btn-next').addEventListener('click', function(){ nextPrev(1)})

let currentTab = 0
showTab(currentTab)
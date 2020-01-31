const displayRegister = document.querySelector('.displayRegister');
const jsSignUp = document.querySelector('#jsSignUp');
const cancel = document.querySelector('.jsCancel');
const inputs = document.querySelectorAll('input');
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
jsSignUp.addEventListener('click', handleDisplay);
cancel.addEventListener('click', handleCancel);
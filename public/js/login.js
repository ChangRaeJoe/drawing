const displayRegister = document.querySelector('.displayRegister');
const jsSignUp = document.querySelector('#jsSignUp');
const backSignUp = document.querySelector('.backSignUp');

function handleDisplay(event)
{
    event.preventDefault();
    displayRegister.classList.toggle('displayRegisterOff');
}

function handleEmptyClick(event)
{
    displayRegister.classList.toggle('displayRegisterOff');
}
jsSignUp.addEventListener('click', handleDisplay);
backSignUp.addEventListener('click', handleEmptyClick);
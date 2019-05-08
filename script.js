'use strict';

const submit = document.getElementById('Submit');

const validate = (event) => {

  event.preventDefault();

  const username = document.loginForm.uname;
  const password = document.loginForm.psw;

  console.log(username.value);

  if (username.value === '') {
    alert('No blank values allowed');
    username.style.border = '2px solid red';
    return false;
  } else {
    return true;
  }
};

submit.addEventListener('submit', validate);

const myFunction = () => {
  document.getElementById('myDropdown').classList.toggle('show');
};

window.onclick = (e) => {
  if (!e.target.matches('.linkkinap')) {
    const myDropdown = document.getElementById('myDropdown');
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
};
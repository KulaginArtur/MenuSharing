'use strict';

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
};

window.onclick = (e) => {
  if (!e.target.matches('.linkkinap')) {
    const myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
};

function fun() {
  const x = document.getElementById("uploadform");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  };
};
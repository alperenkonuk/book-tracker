const loginContainer = document.getElementById("login-container");
const registerContainer = document.getElementById("register-container");
const loginHeader = document.getElementById("login-header");
const registerHeader = document.getElementById("register-header");

function display(el) {
  console.log(el);
  if (el === 1) {
    loginContainer.removeAttribute("hidden");
    loginHeader.classList.add('selected');
    registerContainer.setAttribute("hidden", "true");
    registerHeader.classList.remove('selected');
  } else {
    registerContainer.removeAttribute("hidden");
    registerHeader.classList.add('selected');
    loginContainer.setAttribute("hidden", "true");
    loginHeader.classList.remove('selected');

  }
}

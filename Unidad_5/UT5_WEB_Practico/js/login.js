import { USER_PASS } from "./constantes.js";

let arrUP = recogerUsuarios();

const submitLogin = document.getElementById("submitLogin");
const inputNombre = document.getElementById("inputUsuario");
const inputPassword = document.getElementById("inputPassword");
const passErr = document.getElementById("passError");
const userErr = document.getElementById("userError");

submitLogin.addEventListener("click", (event) => {
  event.preventDefault();

  userErr.textContent = passErr.textContent = "";
  let user = {
    nombre: inputNombre.value,
    password: inputPassword.value,
  };
  let existenceCheck = comprobarExistencia(user);
  let formatCheck = comprobarFormat(user);
  if (existenceCheck === "exists") {
    window.location.href = "numGlob.html";
  }
  if (existenceCheck === "wrongpsswd") {
    passErr.textContent = "La contraseña no es correcta para este usuario";
    passErr.style.display = "block";
  } else {
    if (formatCheck && existenceCheck === "notexists") {
      newUsuario(user);
      window.location.href = "numGlob.html";
    }
  }
});
function comprobarFormat(user) {
  let reu = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
  let rep = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}$/;
  let check = false;
  !reu.test(user.nombre)
    ? ((userErr.textContent = "El nombre debe contener solo letras y numeros"),
      (userErr.style.display = "block"))
    : !rep.test(user.password)
    ? ((passErr.textContent =
        "La contraseña debe contener mayusculas, minusculas, numeros y un simbolo de los siguientes: !@#$%^&*"),
      (passErr.style.display = "block"))
    : (check = true);
  return check;
}
function comprobarExistencia(user) {
  let existencia = "notexists";
  arrUP.forEach((usuario) => {
    if (usuario.nombre === user.nombre) {
      if (usuario.password === user.password) {
        existencia = "exists";
      } else {
        existencia = "wrongpsswd";
      }
    }
  });
  return existencia;
}
function recogerUsuarios() {
  return JSON.parse(localStorage.getItem(USER_PASS) || "[]");
}
function newUsuario(user) {
  arrUP.push(user);
  localStorage.setItem(USER_PASS, JSON.stringify(arrUP));
  window.location.href = "numGlob.html";
}

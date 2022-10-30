import {loginUser, getProfile} from "../../scripts/api.js";

function getLogin() {
    const inputEmail = document.getElementById("input-email");
    const inputPassword = document.getElementById("input-password");
    const btnLogin = document.getElementById('btn-login');
    const form = document.querySelector('.form');
    const error = document.querySelector(".error");

    form.addEventListener("keyup", ()=> {
        if(inputEmail.value != '' && inputPassword.value != '') {
            btnLogin.removeAttribute('disabled');
        }
    }); 
    form.addEventListener("submit", async (e)=> {
        e.preventDefault();
        if(inputEmail.value != '' && inputPassword.value != '') {
            btnLogin.innerHTML = `<img src="./pages/assets/spinner.png" class='spinner' alt="Carregando...">`
            const response = await loginUser(inputEmail.value, inputPassword.value);
            if(response.responseJson.message) {
                error.innerHTML = `
                <i class="fa-solid fa-circle-check"></i>
                ${response.responseJson.message}` 
            } else {
                await getProfile();
                setTimeout(()=> { 
                    window.location.href = '../../pages/home/index.html'
                }, 1000)
            }
        }
    })
}

const goToRegister = () => {
    const btnRegisterPage = document.querySelector('.register-btn');
    const btnRegister = document.getElementById('register');

    btnRegisterPage.addEventListener("click", ()=> {
        window.location.href = '../../pages/signin/index.html'
    })
    btnRegister.addEventListener("click", ()=> {
        window.location.href = '../../pages/signin/index.html'
    })
}

getLogin();
goToRegister();
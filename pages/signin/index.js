import {registerUser} from "../../scripts/api.js"

 function getInputsRegister() {
    const inputName = document.getElementById('username')
    const inputEmail = document.getElementById('user-email')
    const inputAvatar = document.getElementById('user-photo')
    const inputPassword = document.getElementById('user-password')
    const form =  document.querySelector('.form');
    const btnCadastrar = document.querySelector('#register-btn');
    const modal = document.querySelector(".modal");
    const modalTitle = document.getElementById("title-modal")
    const modalMessage = document.getElementById("message-modal")

    form.addEventListener("keyup", ()=> {
        if(inputName.value != '' && inputEmail.value != '' && inputPassword.value != '') { 
            btnCadastrar.removeAttribute('disabled');
        }
    }) 
    form.addEventListener("submit", async (e) => {  
        e.preventDefault();
        if(inputName.value != '' && inputEmail.value != '' && inputPassword.value != '') { 
            btnCadastrar.innerHTML = `<img src="../assets/spinner.png" class="spinner" alt="Carregando...">            `
            const response = await registerUser(inputName.value, inputEmail.value, inputAvatar.value, inputPassword.value);
            
            if(response.responseJson.message) {
                modal.style.display = "flex";
                modalMessage.innerText = `
                <i class="fa-solid fa-circle-check"></i>
                ${response.responseJson.message}`;
                modalTitle.innerText = `Sua conta não foi criada com sucesso :(`
                modalTitle.style.color = 'red';
            } else { 
                setTimeout(()=> { 
                    window.location.href = '../../index.html';
                }, 1000)
                modal.style.display = "flex";
                modalMessage.innerHTML = `Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a href="../../index.html">Acessar página de login</a>`;
                modalTitle.innerText = `Sua conta foi criada com sucesso!`
                modalTitle.style.color = 'green';
                inputName.value = '';
                inputEmail.value = '';
                inputAvatar.value = '';
                inputPassword.value = '';
            }
        }
    });
}

function goToLogin() {
    const btnLogin =  document.getElementById('login');
    btnLogin.addEventListener("click", ()=> {
        window.location.href = "../../index.html"
    })
}

goToLogin();
getInputsRegister();
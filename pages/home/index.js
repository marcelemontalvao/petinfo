import { getPosts, patchPost, createContentPost, deletePost } from "../../scripts/api.js";

function createPost(post) {
    const article = document.createElement('article');
    article.classList.add("post");

    const title = document.createElement('div');
    title.classList.add('title-article');

    const perfil = document.createElement('div');

    const avatar = document.createElement('img');
    avatar.src = post.user.avatar;

    const username = document.createElement('span');
    username.classList.add('border');
    username.innerText = post.user.username;

    const date = document.createElement('span');
    date.innerText = adjustPostDate(post.createdAt);

    const userLogado = JSON.parse(localStorage.getItem("profile")).username;
    
    if(post.user.username == userLogado) { 
        const btnsDiv = document.createElement('div');

        const btnEdit = document.createElement("button");
        btnEdit.innerText = 'Editar';

        btnEdit.addEventListener("click", ()=> {
            const edit = document.querySelector('.edit');
            edit.style.display = 'flex';
            const containerModal = document.querySelector('.container-modal')
            containerModal.style.display = 'flex';
            createModalEdit(post);
        });

        const btnDelete = document.createElement("button");
        btnDelete.innerText = 'Excluir';
        btnDelete.addEventListener('click', ()=> {
            createModalDelete(post.id);
            const containerModal = document.querySelector(".container-modal");
            containerModal.style.display = 'flex';
            const deleteModal = document.querySelector(".delete");
            deleteModal.style.display = 'flex';
        });

        btnsDiv.append(btnEdit, btnDelete);
        title.append(perfil, btnsDiv);
    } else {
        title.append(perfil);
    }
    const content = document.createElement("p");
    if(post.content.length > 150) {
        const contentBiggerThan150 = post.content.substring(0, 150);
        content.innerText = `${contentBiggerThan150}...`;
    } else {
        content.innerText = post.content;
    }

    const titleContent = document.createElement("span");
    titleContent.classList.add('bold');
    titleContent.innerText = post.title;

    /*const content = document.createElement("p");
    content.innerText = post.content;*/

    const btnAcess = document.createElement("button");
    btnAcess.classList.add('acess');
    btnAcess.innerText = 'Acessar publicação';
    btnAcess.addEventListener("click", ()=> {
        openPost(post);
    });

    perfil.append(avatar, username, date);
    article.append(title, titleContent, content, btnAcess);
    return article;
}

function createModalEdit(post) {
    const form = document.querySelector(".edit");
  
    const titleArticle = document.createElement('div');
    titleArticle.classList.add('title-article');

    const divEdit = document.createElement('div');

    const spanEdit = document.createElement('span');
    spanEdit.innerText = 'Edição';

    const btnX = document.createElement('button');
    btnX.type = 'button';
    btnX.innerText = 'X';
    btnX.setAttribute("id", 'btnCloseEdit');
    btnX.addEventListener('click', ()=> {
        const containerModal = document.querySelector('.container-modal');
        containerModal.style.display = 'none';
        const modalEdit = document.querySelector('.edit');
        modalEdit.innerHTML = '';
        modalEdit.style.display = 'none';
    })

    const titlePost = document.createElement("label");
    titlePost.classList.add('title-post');

    const spanTitlePost =  document.createElement('span');
    spanTitlePost.innerText = 'Título do post';

    const inputTitle = document.createElement("input");
    inputTitle.value = post.title;
    inputTitle.type = 'text';
    inputTitle.placeholder = 'Digite o título aqui...';
    inputTitle.setAttribute('id', 'input-title-edit');

    const contentPost = document.createElement("label");
    contentPost.classList.add('content-post');
    
    const spanContentPost =  document.createElement('span');
    spanContentPost.innerText = 'Conteúdo do post';

    const textareaContentPost = document.createElement("textarea");
    textareaContentPost.name = 'text';
    textareaContentPost.value = post.content;
    textareaContentPost.cols = 30;
    textareaContentPost.rows = 12;
    textareaContentPost.placeholder = 'Digite o conteúdo do post aqui...'
    textareaContentPost.setAttribute('id', 'input-content-edit');

    const btns = document.createElement("div")
    btns.classList.add("btns");

    const btnCancel = document.createElement('button');
    btnCancel.textContent = 'Cancelar';
    btnCancel.type = 'button';
    btnCancel.addEventListener("click", ()=> {
        const containerModal = document.querySelector(".container-modal");
        containerModal.style.display = 'none';
        const modalEdit = document.querySelector(".edit");
        modalEdit.innerHTML = '';
        modalEdit.style.display = 'none';
    })
    
    const btnSaveAlterations = document.createElement('button');
    btnSaveAlterations.innerText = 'Salvar Alterações';
    btnSaveAlterations.type = 'submit';
    btnSaveAlterations.setAttribute("id", 'btnSaveAlterations');
    btnSaveAlterations.addEventListener('click', async (e) => {
        e.preventDefault();
        const titlePost = document.getElementById('input-title-edit');
        const contentPost = document.getElementById('input-content-edit');
        const containerModal = document.querySelector('.container-modal');
        const edit = document.querySelector('.edit');

        if(titlePost.value && contentPost.value) {
            await patchPost(post.id, titlePost.value, contentPost.value);

            containerModal.style.display = 'none';
            edit.style.display = 'none';
            await renderPosts();
        }
    });

    divEdit.append(spanEdit);
    titleArticle.append(divEdit, btnX);
    titlePost.append(spanTitlePost, inputTitle);
    contentPost.append(spanContentPost, textareaContentPost);
    btns.append(btnCancel, btnSaveAlterations);
    form.append(titleArticle, titlePost, contentPost, btns);
}

function createModalDelete(idPost) {
    const form = document.querySelector(".delete");
    form.innerHTML = '';

    const titleArticle = document.createElement('div');
    titleArticle.classList.add('title-article');

    const divDelete = document.createElement('div');

    const spanDelete = document.createElement('span');
    spanDelete.innerText = 'Confirmação de exclusão';

    const btnX = document.createElement('button');
    btnX.type = 'button';
    btnX.innerText = 'X';
    btnX.setAttribute("id", 'btnCloseDelete');
    btnX.addEventListener("click", ()=> {
        const containerModal = document.querySelector(".container-modal");
        containerModal.style.display = 'none';
        const modalDelete = document.querySelector(".delete");
        modalDelete.innerHTML = '';
        modalDelete.style.display = 'none';
    })

    const confirm = document.createElement("span");
    confirm.innerText = 'Tem certeza que deseja excluir este post?';

    const alert = document.createElement("p");
    alert.innerText = 'Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir'

    const btns = document.createElement("div")
    btns.classList.add("btns");

    const btnCancel = document.createElement('button');
    btnCancel.textContent = 'Cancelar';
    btnCancel.type = 'button';
    btnCancel.addEventListener("click", ()=> {
        const containerModal = document.querySelector(".container-modal");
        containerModal.style.display = 'none';
        const modalDelete = document.querySelector(".delete");
        modalDelete.innerHTML = '';
        modalDelete.style.display = 'none';
    })
    
    const btnDeletePost = document.createElement('button');
    btnDeletePost.innerText = 'Sim, excluir este post';
    btnDeletePost.type = 'button';
    btnDeletePost.addEventListener('click', async ()=>{
        const containerModal = document.querySelector(".container-modal");
        await deletePost(idPost);   
        const modalAlert = document.querySelector(".modal-alert");
        modalAlert.style.display = 'flex';      
        setTimeout(()=> {
            modalAlert.style.display = 'none';
        },2000)
        
        containerModal.style.display = 'none';
        const modalDelete = document.querySelector(".delete");
        modalDelete.style.display = 'none';
        await renderPosts();
    });

    divDelete.append(spanDelete);
    titleArticle.append(divDelete, btnX);
    btns.append(btnCancel, btnDeletePost);
    form.append(titleArticle, confirm, alert, btns);
}

async function renderPosts () {
    const navPosts = document.querySelector('.posts');
    navPosts.innerHTML = '';
    const {responseJson} = await getPosts();
    responseJson.reverse();
    responseJson.forEach((post) => {
        navPosts.append(createPost(post));
    });
}

function createModalCreate() {
    const form = document.querySelector(".create");
    form.innerHTML = '';
    const titleArticle = document.createElement('div');
    titleArticle.classList.add('title-article');

    const divCreate = document.createElement('div');

    const spanCreate = document.createElement('span');
    spanCreate.innerText = 'Criar novo post';

    const btnX = document.createElement('button');
    btnX.type = 'button';
    btnX.innerText = 'X';
    btnX.addEventListener("click", ()=> {
        const containerModal = document.querySelector(".container-modal");
        containerModal.style.display = 'none';
        const modalCreate = document.querySelector(".create");
        modalCreate.innerHTML = '';
        modalCreate.style.display = 'none';
    })
    btnX.setAttribute("id", 'btnCloseCreate');

    const titlePost = document.createElement("label");
    titlePost.classList.add('title-post');

    const spanTitlePost =  document.createElement('span');
    spanTitlePost.innerText = 'Título do post';

    const inputTitle = document.createElement("input");
    inputTitle.type = 'text';
    inputTitle.placeholder = 'Digite o título aqui...';
    inputTitle.setAttribute('id', 'input-title-create');

    const contentPost = document.createElement("label");
    contentPost.classList.add('content-post');
    
    const spanContentPost =  document.createElement('span');
    spanContentPost.innerText = 'Conteúdo do post';

    const textareaContentPost = document.createElement("textarea");
    textareaContentPost.name = 'text';
    textareaContentPost.cols = 30;
    textareaContentPost.rows = 12;
    textareaContentPost.placeholder = 'Digite o conteúdo do post aqui...'
    textareaContentPost.setAttribute('id', 'input-content-create');

    const btns = document.createElement("div")
    btns.classList.add("btns");

    const btnCancel = document.createElement('button');
    btnCancel.textContent = 'Cancelar';
    btnCancel.addEventListener("click", ()=> {
        const containerModal = document.querySelector(".container-modal");
        containerModal.style.display = 'none';
        const modalCreate = document.querySelector(".create");
        modalCreate.innerHTML = '';
        modalCreate.style.display = 'none';
    })
    btnCancel.type = 'button';
    
    const btnCreatePost = document.createElement('button');
    btnCreatePost.innerText = 'Publicar';
    btnCreatePost.type = 'button';
    btnCreatePost.addEventListener('click', async ()=> {
        const inputTitle = document.getElementById('input-title-create');
        const inputContent = document.getElementById('input-content-create')
        if(inputTitle.value && inputContent.value) {
           await createContentPost(inputTitle.value, inputContent.value); 
           const containerModal = document.querySelector(".container-modal");
           containerModal.style.display = 'none';
           const createModal = document.querySelector(".create");
           createModal.style.display = 'none';
           await renderPosts();  
        }
    });

    divCreate.append(spanCreate);
    titleArticle.append(divCreate, btnX);
    titlePost.append(spanTitlePost, inputTitle);
    contentPost.append(spanContentPost, textareaContentPost);
    btns.append(btnCancel, btnCreatePost);
    form.append(titleArticle, titlePost, contentPost, btns);
}

function openModalCreate() {
    const btn = document.getElementById('createModalCreate');
    btn.addEventListener("click", ()=> {
        const containerModal = document.querySelector(".container-modal");
        containerModal.style.display = 'flex';
        createModalCreate()
        const modalCreate = document.querySelector(".create");
        modalCreate.style.display = 'flex';
    });  
}

function openPost(post) {
    const containerModal = document.querySelector(".container-modal");
    const modalPost = document.querySelector(".modal-post");
    modalPost.innerHTML = '';
    modalPost.insertAdjacentHTML('beforeend', `
        <div class="title-article">
            <div>
                <img src="${post.user.avatar}" alt="">
                <span class="border">${post.user.username}</span>
                <span>${adjustPostDate(post.createdAt)}</span>
            </div>
            <button id='btn-close-modal-post'>X</button>
        </div>
        <span>${post.title}</span>
        <p>${post.content}</p>
    `);
    containerModal.style.display = 'flex';
    modalPost.style.display = 'flex';
    const btnClose = document.getElementById('btn-close-modal-post');
    btnClose.addEventListener('click', ()=> {
        containerModal.style.display = 'none';
        modalPost.innerHTML = '';
        modalPost.style.display = 'none';
    })
}

function adjustPostDate(date){
    const dateArr = date.split("-");
    const month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    const dateIndexMonth = dateArr[1]-1
    return `${month[dateIndexMonth]} de ${dateArr[0]}`
}

function userLogout() {
    const btnLogout = document.querySelector('#logout');
    btnLogout.addEventListener('click', ()=> {
        localStorage.removeItem("profile")
        localStorage.removeItem("token")
        window.location.href = "../../index.html";        
    });
}

function userAvatarData() {
    const img = document.getElementById('userAvatar');
    const user = JSON.parse(localStorage.getItem("profile")); 
    img.src = user.avatar;
    const username = document.querySelector(".username");
    username.innerText = `@${user.username}`;
}

function startAplication() {
    if(localStorage.getItem('profile')) {
        userAvatarData();
        renderPosts();
        openModalCreate();
        userLogout();
    } else {
        window.location.href = "../../index.html";  
    }
}

startAplication();
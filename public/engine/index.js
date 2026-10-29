async function initializeLogin() {
    var email = document.getElementById('emailLogin').value
    var senha = document.getElementById('senhaLogin').value
    try {
        const response = await fetch('./engine/users.json')
        const users = await response.json()
        const userValided = users.find(u =>
            u.email === email
            &&
            u.senha === senha)

        if (userValided) {
            localStorage.setItem("usuarioAtual", JSON.stringify(userValided))
            setTimeout(() => {
                window.location.href = './dashboard.html'
            }, 5000)
        } else {
            alert('Erro ao processar, Dados não podem ser conferidos, neste estabelecimento.')
        }
    } catch (e) {
        console.error(error)
    }
}

async function storageUsersInfo() {
    const userLoged = JSON.parse(localStorage.getItem('usuarioAtual'))

    if(userLoged.photoUrl != ""){
        document.getElementById("login-img").innerHTML = `<img src="${userLoged.photoUrl}" class="img-fluid rounded-start" alt="${userLoged.email}" width="100%">`
    } else {
        document.getElementById("login-img").innerHTML = `<img src="./assets/logo_claro.png" class="img-fluid rounded-start" alt="..." width="100%">`
    }

    document.getElementById("login-name").innerText = userLoged.name
    document.getElementById("login-email").innerText = userLoged.email
    document.getElementById("login-date").innerText = Date.now()
}

// ELEMENTOS DO HTML
const formLogin = document.getElementById("formLogin");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const botaoMostrarSenha = document.getElementById("mostrarSenha");
const mensagem = document.getElementById("mensagem");

// MOSTRAR E OCULTAR SENHA
botaoMostrarSenha.addEventListener("click", function () {

    const mostrar = campoSenha.type === "password";

    campoSenha.type = mostrar ? "text" : "password";

    botaoMostrarSenha.setAttribute(
        "aria-label",
        mostrar ? "Ocultar senha" : "Mostrar senha"
    );

    botaoMostrarSenha.setAttribute(
        "aria-pressed",
        String(mostrar)
    );

});

// LOGIN COM E-MAIL E SENHA
formLogin.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = campoEmail.value.trim();
    const senha = campoSenha.value.trim();

    // VERIFICAR SE OS CAMPOS ESTÃO PREENCHIDOS
    if (email === "" || senha === "") {

        mensagem.textContent = "Preencha todos os campos.";
        return;

    }

    // VALIDAR FORMATO DO E-MAIL
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(email)) {

        mensagem.textContent = "Digite um e-mail válido.";
        campoEmail.focus();
        return;

    }

    // VERIFICAR TAMANHO DA SENHA
    if (senha.length < 6) {

        mensagem.textContent =
            "A senha deve ter pelo menos 6 caracteres.";

        campoSenha.focus();
        return;

    }

    // MENSAGEM DE LOGIN
    mensagem.textContent =
        "Interface pronta! Conecte o sistema de autenticação para entrar.";

});

// LOGIN SOCIAL
function loginSocial(provedor) {

    if (provedor === "Google") {

        mensagem.textContent =
            "O login com Google precisa ser configurado.";

    }

    else if (provedor === "Apple") {

        mensagem.textContent =
            "O login com Apple precisa ser configurado.";

    }

}

// LIMPAR MENSAGEM AO DIGITAR
campoEmail.addEventListener("input", function () {

    mensagem.textContent = "";

});

campoSenha.addEventListener("input", function () {

    mensagem.textContent = "";

});

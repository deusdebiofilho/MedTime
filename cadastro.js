
// ==================================
// MEDTIME - SISTEMA DE CADASTRO
// ==================================

const formulario = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");


// MOSTRAR E OCULTAR SENHA
document.querySelectorAll(".mostrar-senha").forEach(botao => {

    botao.addEventListener("click", function() {

        const id = this.dataset.senha;
        const campo = document.getElementById(id);

        const mostrando = campo.type === "password";

        campo.type = mostrando ? "text" : "password";

        this.classList.toggle("visivel", mostrando);

        this.setAttribute("aria-pressed", String(mostrando));

        this.setAttribute(
            "aria-label",
            mostrando ? "Ocultar senha" : "Mostrar senha"
        );
    });

});


// EXIBIR MENSAGENS
function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;
    mensagem.className = tipo;

}


// FORMATAÇÃO DO TELEFONE
document.getElementById("telefone").addEventListener("input", function() {

    let valor = this.value.replace(/\D/g, "").substring(0, 11);

    if (valor.length > 10) {
        valor = valor.replace(
            /^(\d{2})(\d{5})(\d{4})$/,
            "($1) $2-$3"
        );
    } else if (valor.length > 6) {
        valor = valor.replace(
            /^(\d{2})(\d{4})(\d{0,4})$/,
            "($1) $2-$3"
        );
    } else if (valor.length > 2) {
        valor = valor.replace(
            /^(\d{2})(\d{0,5})$/,
            "($1) $2"
        );
    }

    this.value = valor;

});


// CADASTRAR USUÁRIO
formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.replace(/\D/g, "");
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const termos = document.getElementById("aceitarTermos").checked;

    // VALIDAR NOME
    if (nome.length < 3) {
        mostrarMensagem("Digite seu nome completo.", "mensagem-erro");
        return;
    }

    // VALIDAR TELEFONE
    if (telefone.length < 10 || telefone.length > 11) {
        mostrarMensagem("Digite um telefone válido.", "mensagem-erro");
        return;
    }

    // VALIDAR SENHA
    if (senha.length < 8) {
        mostrarMensagem("A senha precisa ter 8 caracteres ou mais.", "mensagem-erro");
        return;
    }

    // CONFIRMAR SENHA
    if (senha !== confirmarSenha) {
        mostrarMensagem("As senhas não coincidem!", "mensagem-erro");
        return;
    }

    // TERMOS
    if (!termos) {
        mostrarMensagem("Aceite os termos para continuar.", "mensagem-erro");
        return;
    }

    const botao = formulario.querySelector(".botao-cadastrar");

    botao.disabled = true;
    botao.textContent = "Cadastrando...";

    try {

        // ENVIAR DADOS PARA O SERVIDOR
        const resposta = await fetch("http://localhost:3000/api/cadastro", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome,
                email,
                telefone,
                senha
            })

        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || "Erro ao cadastrar.");
        }

        mostrarMensagem(
            "Cadastro realizado com sucesso! Bem-vindo ao MedTime.",
            "mensagem-sucesso"
        );

        formulario.reset();

    } catch (erro) {

        console.error(erro);

        mostrarMensagem(
            "Não foi possível conectar ao servidor. Verifique se ele está ligado.",
            "mensagem-erro"
        );

    } finally {

        botao.disabled = false;
        botao.textContent = "Cadastrar";

    }

});

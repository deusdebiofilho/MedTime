
// ELEMENTOS DA TELA

const cartoes = document.querySelectorAll(".cartao");
const mensagem = document.getElementById("mensagem");

const botaoNotificacao = document.getElementById("btnNotificacao");
const botaoVoltar = document.getElementById("btnVoltar");


// FUNÇÃO PARA MOSTRAR MENSAGEM

function mostrarMensagem(texto) {

    mensagem.textContent = texto;

    mensagem.style.display = "block";

    setTimeout(function() {

        mensagem.style.display = "none";

    }, 3000);

}


// CLIQUE NOS CARTÕES

cartoes.forEach(function(cartao) {

    cartao.addEventListener("click", function() {

        const pagina = this.dataset.pagina;

        if (pagina === "notificacoes") {

            mostrarMensagem("Você selecionou Notificações.");

        }

        else if (pagina === "privacidade") {

            mostrarMensagem("Você selecionou Privacidade e Segurança.");

        }

        else if (pagina === "sobre") {

            mostrarMensagem("Você selecionou Sobre o site.");

        }

    });

});


// BOTÃO DE NOTIFICAÇÕES

botaoNotificacao.addEventListener("click", function() {

    mostrarMensagem("Você clicou nas notificações.");

});


// BOTÃO VOLTAR

botaoVoltar.addEventListener("click", function() {

    window.history.back();

});


// MENU LATERAL

const itensMenu = document.querySelectorAll(".item-menu");

itensMenu.forEach(function(item) {

    item.addEventListener("click", function(evento) {

        evento.preventDefault();

        itensMenu.forEach(function(elemento) {

            elemento.classList.remove("ativo");

        });

        this.classList.add("ativo");

    });

});

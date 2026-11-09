alert("JavaScript conectado ao MedTime!");
alert("Botão encontrado: " + !!document.querySelector(".editar"));
document.addEventListener("DOMContentLoaded", function () {

    // =================================
    // MEDTIME - PERFIL DO USUÁRIO
    // =================================

    const botaoEditar = document.querySelector(".editar");
    const nomePerfil = document.querySelector(".informacoes h2");
    const dadosPerfil = document.querySelectorAll(".informacoes p");

    // Confere se os elementos existem
    if (botaoEditar && nomePerfil && dadosPerfil.length >= 3) {

        // Recupera informações salvas
        let perfil;

        try {
            perfil = JSON.parse(localStorage.getItem("medtimePerfil"));
        } catch (erro) {
            perfil = null;
        }

        if (!perfil) {
            perfil = {
                nome: nomePerfil.textContent.trim(),
                email: dadosPerfil[0].textContent.trim(),
                telefone: dadosPerfil[1].textContent.trim(),
                cidade: dadosPerfil[2].textContent.trim()
            };
        }

        // Atualiza os dados sem apagar os ícones
        function atualizarTexto(elemento, valor) {
    const textos = Array.from(elemento.childNodes)
        .filter(no =>
            no.nodeType === Node.TEXT_NODE &&
            no.textContent.trim() !== ""
        );

    if (textos.length > 0) {
        textos[textos.length - 1].textContent = " " + valor;
    }
}

        function mostrarPerfil() {
            nomePerfil.textContent = perfil.nome;

            atualizarTexto(dadosPerfil[0], perfil.email);
            atualizarTexto(dadosPerfil[1], perfil.telefone);
            atualizarTexto(dadosPerfil[2], perfil.cidade);
        }

        // Botão de editar
       
botaoEditar.addEventListener("click", function () {


const nome = prompt("Digite seu nome:", perfil.nome);


    if (nome === null) return;

    const email = prompt("Digite seu e-mail:", perfil.email);
    if (email === null) return;

    const telefone = prompt("Digite seu telefone:", perfil.telefone);
    if (telefone === null) return;

    const cidade = prompt("Digite sua cidade:", perfil.cidade);
    if (cidade === null) return;

            perfil = {
                nome: nome.trim(),
                email: email.trim(),
                telefone: telefone.trim(),
                cidade: cidade.trim()
            };

            localStorage.setItem(
                "medtimePerfil",
                JSON.stringify(perfil)
            );

            mostrarPerfil();

            alert("Perfil atualizado com sucesso!");
        });

        mostrarPerfil();

    } else {
        console.error("Não foi possível encontrar os elementos do perfil.");
    }

    // =================================
    // VOLUME DOS ALERTAS
    // =================================

    const volume = document.getElementById("volume");
    const valorVolume = document.getElementById("valorVolume");

    if (volume && valorVolume) {
        function atualizarVolume() {
            valorVolume.textContent = volume.value + "%";
        }

        volume.addEventListener("input", atualizarVolume);
        atualizarVolume();
    }

    // =================================
    // MODO ESCURO
    // =================================

    const modoEscuro = document.getElementById("modoEscuro");

    if (modoEscuro) {
        modoEscuro.addEventListener("change", function () {
            document.body.classList.toggle(
                "escuro",
                modoEscuro.checked
            );
        });
    }

});

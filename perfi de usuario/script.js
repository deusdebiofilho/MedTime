alert("JavaScript do Meu Perfil está funcionando!");
document.addEventListener("DOMContentLoaded", function () {

    // CARREGAR DADOS DO PERFIL

    let perfil;

    try {
        perfil = JSON.parse(localStorage.getItem("medtimePerfil"));
    } catch (erro) {
        perfil = null;
    }

    if (!perfil) {
        perfil = {
            nome: "João da Silva",
            email: "joao@email.com",
            telefone: "(89) 99999-9999",
            cidade: "Floriano - PI"
        };

        localStorage.setItem("medtimePerfil", JSON.stringify(perfil));
    }

    // ELEMENTOS DA TELA

    const nomePerfil = document.getElementById("nomePerfil");
    const nomeCabecalho = document.getElementById("nomeCabecalho");
    const emailPerfil = document.getElementById("emailPerfil");
    const telefonePerfil = document.getElementById("telefonePerfil");
    const localizacaoPerfil = document.getElementById("localizacaoPerfil");

    // EXIBIR DADOS

    if (nomePerfil) nomePerfil.textContent = perfil.nome;
    if (nomeCabecalho) nomeCabecalho.textContent = perfil.nome;
    if (emailPerfil) emailPerfil.textContent = perfil.email;
    if (telefonePerfil) telefonePerfil.textContent = perfil.telefone;
    if (localizacaoPerfil) localizacaoPerfil.textContent = perfil.cidade;

    // CARREGAR FOTO JÁ SALVA

    const foto = localStorage.getItem("fotoPerfil");

    if (foto) {
        const fotoPerfil = document.getElementById("fotoPerfil");
        const fotoCabecalho = document.getElementById("fotoCabecalho");

        if (fotoPerfil) fotoPerfil.src = foto;
        if (fotoCabecalho) fotoCabecalho.src = foto;
    }

    // VOLUME DOS ALERTAS

    const volume = document.getElementById("volume");
    const valorVolume = document.getElementById("valorVolume");

    if (volume && valorVolume) {
        function atualizarVolume() {
            valorVolume.textContent = volume.value + "%";
        }

        volume.addEventListener("input", atualizarVolume);
        atualizarVolume();
    }

    // MODO ESCURO

    const modoEscuro = document.getElementById("modoEscuro");

    if (modoEscuro) {
        modoEscuro.addEventListener("change", function () {
            document.body.classList.toggle("escuro", modoEscuro.checked);
        });
    }

});


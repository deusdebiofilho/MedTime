
/* =====================================
   INICIALIZAÇÃO
===================================== */

function iniciarPagina() {

    const formPerfil = document.getElementById("formPerfil");

    const campoNome = document.getElementById("nome");
    const campoEmail = document.getElementById("email");
    const campoLocalizacao = document.getElementById("localizacao");
    const campoTelefone = document.getElementById("telefone");

    const nomeCabecalho = document.getElementById("nomeCabecalho");
    const mensagem = document.getElementById("mensagem");

    const btnFoto = document.getElementById("btnFoto");
    const arquivoFoto = document.getElementById("arquivoFoto");
    const btnSenha = document.getElementById("btnSenha");

    /* CARREGAR DADOS */

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

    if (campoNome) campoNome.value = perfil.nome || "";
    if (campoEmail) campoEmail.value = perfil.email || "";
    if (campoLocalizacao) campoLocalizacao.value = perfil.cidade || "";
    if (campoTelefone) campoTelefone.value = perfil.telefone || "";

    if (nomeCabecalho) {
        nomeCabecalho.textContent = perfil.nome || "Usuário";
    }

    /* SALVAR DADOS */

    if (formPerfil) {
        formPerfil.addEventListener("submit", function(event) {
            event.preventDefault();

            perfil = {
                nome: campoNome.value.trim(),
                email: campoEmail.value.trim(),
                telefone: campoTelefone.value.trim(),
                cidade: campoLocalizacao.value.trim()
            };

            localStorage.setItem("medtimePerfil", JSON.stringify(perfil));

            if (nomeCabecalho) {
                nomeCabecalho.textContent = perfil.nome || "Usuário";
            }

         if (mensagem) {
    mensagem.textContent = "Perfil atualizado com sucesso!";
}

setTimeout(function() {
    window.location.href = "../perfi%20de%20usuario/index.html";
}, 1000);
        });
    }

    /* FOTO - MANTIDA COMO ESTAVA */

    if (btnFoto && arquivoFoto) {
        btnFoto.addEventListener("click", function() {
            arquivoFoto.click();
        });

        arquivoFoto.addEventListener("change", function() {
            const arquivo = this.files[0];

            if (!arquivo) return;

            if (!arquivo.type.startsWith("image/")) {
                alert("Selecione um arquivo de imagem.");
                return;
            }

            const leitor = new FileReader();

            leitor.onload = function(event) {
                const imagem = event.target.result;

                localStorage.setItem("fotoPerfil", imagem);

                document.querySelectorAll(
                    ".foto-usuario, .identificacao img"
                ).forEach(function(img) {
                    img.src = imagem;
                });
            };

            leitor.readAsDataURL(arquivo);
        });
    }

    const fotoSalva = localStorage.getItem("fotoPerfil");

    if (fotoSalva) {
        document.querySelectorAll(
            ".foto-usuario, .identificacao img"
        ).forEach(function(img) {
            img.src = fotoSalva;
        });
    }

    /* SENHA - MANTIDA COMO ESTAVA */

    if (btnSenha) {
        btnSenha.addEventListener("click", function() {
            alert(
                "A alteração real da senha precisa ser conectada ao sistema de autenticação."
            );
        });
    }

    /* MENU LATERAL */

    const itensMenu = document.querySelectorAll(".menu a");

    itensMenu.forEach(function(item) {
        item.addEventListener("click", function() {
            itensMenu.forEach(function(opcao) {
                opcao.classList.remove("ativo");
            });

            this.classList.add("ativo");
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarPagina);
} else {
    iniciarPagina();
}

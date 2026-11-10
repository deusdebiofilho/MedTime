document.addEventListener("DOMContentLoaded", function () {

    // ELEMENTOS
    const searchInput = document.querySelector(".search-wrap input");
    const medicationList = document.querySelector(".medication-list");
    const addButton = document.querySelector(".add-button");

    const STORAGE_KEY = "medtime_medicamentos";

    // MEDICAMENTOS INICIAIS
    const medicamentosIniciais = [
        {
            nome: "Paracetamol 500mg",
            categoria: "Dor e febre",
            frequencia: "A cada 8h",
            proximaDose: "Amanhã, 20h",
            ativo: true
        },
        {
            nome: "Magnésio 400mg",
            categoria: "Suplemento",
            frequencia: "1 vez ao dia",
            proximaDose: "Amanhã, 22h",
            ativo: true
        },
        {
            nome: "Vitamina D 2000UI",
            categoria: "Suplemento",
            frequencia: "1 vez ao dia",
            proximaDose: "Hoje, 12h",
            ativo: false
        }
    ];

    // CARREGAR DADOS
    function carregarMedicamentos() {
        try {
            const dados = localStorage.getItem(STORAGE_KEY);

            if (dados === null) {
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(medicamentosIniciais)
                );

                return [...medicamentosIniciais];
            }

            const lista = JSON.parse(dados);

            if (!Array.isArray(lista)) {
                throw new Error("Lista inválida");
            }

            return lista.map(med => ({
                nome: String(med.nome || ""),
                categoria: String(med.categoria || ""),
                frequencia: String(med.frequencia || ""),
                proximaDose: String(med.proximaDose || ""),
                ativo: med.ativo === true
            }));

        } catch (erro) {
            console.error("Erro ao carregar:", erro);

            return [...medicamentosIniciais];
        }
    }

    let medicamentos = carregarMedicamentos();

    // SALVAR DADOS
    function salvarMedicamentos() {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(medicamentos)
        );
    }

    // PROTEGER TEXTO
    function escaparHTML(texto) {
        const div = document.createElement("div");
        div.textContent = texto;
        return div.innerHTML;
    }

    // CRIAR CARTÃO
    function criarCard(medicamento, index) {

        const card = document.createElement("article");

        card.className = medicamento.ativo
            ? "medication-card"
            : "medication-card paused";

        card.innerHTML = `
            <div class="med-icon">
                <img src="./img/Icone Cápsula.png" alt="Medicamento">
            </div>

            <div class="med-info">
                <h2>${escaparHTML(medicamento.nome)}</h2>

                <p class="category">
                    ${escaparHTML(medicamento.categoria)}
                </p>

                <div class="details">
                    <div>
                        <span>Frequência</span>
                        <small>${escaparHTML(medicamento.frequencia)}</small>
                    </div>

                    <div>
                        <span>Próxima dose</span>
                        <small>${escaparHTML(medicamento.proximaDose)}</small>
                    </div>
                </div>
            </div>

            <div class="med-status">

                <label class="switch">
                    <input
                        type="checkbox"
                        data-index="${index}"
                        ${medicamento.ativo ? "checked" : ""}
                    >
                    <span></span>
                </label>

                <strong>
                    ${medicamento.ativo ? "Ativo" : "Pausado"}
                </strong>

                <p class="reminder">
                    <img src="./img/Icone Lembrete.png" alt="Lembrete">
                    ${medicamento.ativo
                        ? "Lembrete ativo"
                        : "Lembrete pausado"}
                </p>

            </div>
        `;

        return card;
    }

    // ATUALIZAR A TELA
    function mostrarMedicamentos() {

        const addCard = document.querySelector(".add-card");

        medicationList.querySelectorAll(".medication-card")
            .forEach(card => card.remove());

        medicamentos.forEach((medicamento, index) => {

            const card = criarCard(medicamento, index);

            medicationList.insertBefore(card, addCard);

        });

        configurarInterruptores();
        filtrarMedicamentos();
    }

    // ATIVAR E PAUSAR
    function configurarInterruptores() {
        const interruptores = document.querySelectorAll(".switch input");

        interruptores.forEach((input) => {
            input.addEventListener("change", function () {
                const index = Number(this.dataset.index);
                const ativo = this.checked;

                if (!medicamentos[index]) return;

                // Atualiza o estado do medicamento
                medicamentos[index].ativo = ativo;

                // Atualiza a aparência do cartão
                const card = this.closest(".medication-card");

                if (card) {
                    card.classList.toggle("paused", !ativo);

                    // Atualiza o texto do status
                    const status = card.querySelector(".med-status strong");

                    if (status) {
                        status.textContent = ativo ? "Ativo" : "Pausado";
                    }

                    // Atualiza o lembrete
                    const reminder = card.querySelector(".reminder");

                    if (reminder) {
                        const imagem = reminder.querySelector("img");

                        reminder.textContent = ativo
                            ? "Lembrete ativo"
                            : "Lembrete pausado";

                        if (imagem) {
                            reminder.prepend(imagem);
                        }
                    }
                }

                // Salva as alterações
                salvarMedicamentos();

                mostrarNotificacao(
                    ativo
                        ? "Medicamento ativado!"
                        : "Medicamento pausado!"
                );
            });
        });
    }

    // PESQUISAR
    function filtrarMedicamentos() {

        const termo = searchInput.value.toLowerCase().trim();

        const cards = document.querySelectorAll(".medication-card");

        cards.forEach(card => {

            const nome = card.querySelector("h2")
                .textContent.toLowerCase();

            const categoria = card.querySelector(".category")
                .textContent.toLowerCase();

            card.style.display =
                nome.includes(termo) || categoria.includes(termo)
                    ? "grid"
                    : "none";

        });
    }

    searchInput.addEventListener("input", filtrarMedicamentos);

    // ADICIONAR MEDICAMENTO
    function adicionarMedicamento() {

        const nome = prompt("Nome do medicamento:");

        if (!nome || !nome.trim()) return;

        const categoria = prompt("Categoria:");

        if (!categoria || !categoria.trim()) return;

        const frequencia = prompt("Frequência (Ex: A cada 8h):");

        if (!frequencia || !frequencia.trim()) return;

        const proximaDose = prompt("Próxima dose (Ex: Amanhã, 20h):");

        if (!proximaDose || !proximaDose.trim()) return;

        medicamentos.push({
            nome: nome.trim(),
            categoria: categoria.trim(),
            frequencia: frequencia.trim(),
            proximaDose: proximaDose.trim(),
            ativo: true
        });

        salvarMedicamentos();

        searchInput.value = "";

        mostrarMedicamentos();

        mostrarNotificacao("Medicamento cadastrado com sucesso!");
    }

    addButton.addEventListener("click", adicionarMedicamento);

    // NOTIFICAÇÕES
    function mostrarNotificacao(mensagem) {

        const notificacao = document.createElement("div");

        notificacao.className = "toast-notification";
        notificacao.textContent = mensagem;

        document.body.appendChild(notificacao);

        setTimeout(() => {
            notificacao.remove();
        }, 3000);
    }

    // BOTÃO DE NOTIFICAÇÕES
    const notificationButton = document.querySelector(".notification");

    notificationButton.addEventListener("click", function () {

        const ativos = medicamentos.filter(med => med.ativo).length;

        alert(`Você possui ${ativos} medicamento(s) ativo(s).`);

    });

    // BOTÃO VOLTAR
    const backButton = document.querySelector(".back-button");

    backButton.addEventListener("click", function () {

        if (history.length > 1) {
            history.back();
        } else {
            mostrarNotificacao("Você está na página principal.");
        }

    });

    // INICIAR
    mostrarMedicamentos();

});
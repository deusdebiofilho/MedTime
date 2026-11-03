
"use strict";

// ==========================================
// 1. DATASET: 40 CLIENTES FICTÍCIOS
// ==========================================

const X = [
    1, 2, 3, 4, 5, 6, 1, 2, 3, 4,
    5, 6, 1, 2, 3, 4, 5, 6, 1, 2,
    3, 4, 5, 6, 1, 2, 3, 4, 5, 6,
    1, 2, 3, 4, 5, 6, 1, 2, 3, 4
];

const Y = [
    70, 85, 100, 115, 130, 145,
    72, 87, 98, 117, 128, 147,
    68, 83, 102, 113, 132, 143,
    71, 86, 101, 116, 131, 146,
    69, 84, 99, 114, 129, 144,
    73, 88, 103, 118, 133, 148,
    67, 82, 97, 112
];

const nomesClientes = [
    "Ana Silva", "Bruno Costa", "Carla Lima", "Daniel Rocha",
    "Fernanda Alves", "Gabriel Souza", "Helena Santos",
    "Igor Martins", "Julia Ferreira", "Lucas Oliveira",
    "Mariana Costa", "Pedro Almeida", "Rafaela Lima",
    "Samuel Rocha", "Tatiane Alves", "Victor Souza",
    "Amanda Santos", "Bernardo Martins", "Camila Ferreira",
    "Diego Oliveira", "Eduarda Costa", "Felipe Almeida",
    "Giovana Lima", "Henrique Rocha", "Isabela Alves",
    "João Souza", "Karen Santos", "Leonardo Martins",
    "Manuela Ferreira", "Nicolas Oliveira", "Olivia Costa",
    "Paulo Almeida", "Quezia Lima", "Ricardo Rocha",
    "Sofia Alves", "Thiago Souza", "Ursula Santos",
    "Vinicius Martins", "Wesley Ferreira", "Yasmin Oliveira"
];

const clientes = X.map((dias, i) => ({
    id: i + 1,
    nome: nomesClientes[i],
    dias: dias,
    mensalidade: Y[i]
}));

// ==========================================
// 2. REGRESSÃO LINEAR MANUAL
// ==========================================

function calcularRegressao(x, y) {
    if (x.length !== y.length || x.length < 2) {
        throw new Error("Dataset inválido.");
    }

    const n = x.length;

    const mediaX =
        x.reduce((soma, valor) => soma + valor, 0) / n;

    const mediaY =
        y.reduce((soma, valor) => soma + valor, 0) / n;

    let numerador = 0;
    let denominador = 0;

    for (let i = 0; i < n; i++) {
        numerador +=
            (x[i] - mediaX) * (y[i] - mediaY);

        denominador +=
            (x[i] - mediaX) ** 2;
    }

    if (denominador === 0) {
        throw new Error("Não foi possível calcular a regressão.");
    }

    const beta1 = numerador / denominador;
    const beta0 = mediaY - beta1 * mediaX;

    return { beta0, beta1, mediaX, mediaY };
}

const modelo = calcularRegressao(X, Y);

function prever(dias) {
    return modelo.beta0 + modelo.beta1 * dias;
}

const moeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

const numero = valor => valor.toFixed(2).replace(".", ",");

function elemento(id) {
    return document.getElementById(id);
}

// ==========================================
// 3. NAVEGAÇÃO ENTRE AS TELAS
// ==========================================

function abrirTela(nome) {
    document.querySelectorAll(".page-view").forEach(tela => {
        tela.classList.add("hidden");
    });

    const telaEscolhida = elemento("view-" + nome);

    if (telaEscolhida) {
        telaEscolhida.classList.remove("hidden");
    }

    document.querySelectorAll("[data-view]").forEach(botao => {
        const ativo = botao.dataset.view === nome;
        botao.classList.toggle("active", ativo);

        if (botao.classList.contains("nav-link")) {
            botao.setAttribute("aria-current", ativo ? "page" : "false");
        }
    });

    if (nome === "dados") {
        renderizarTabela();
    }

    if (nome === "graficos") {
        desenharGrafico("graficoGrande");
    }
}

document.querySelectorAll("[data-view]").forEach(botao => {
    botao.addEventListener("click", () => {
        abrirTela(botao.dataset.view);
    });
});

// ==========================================
// 4. FREQUÊNCIA INTERATIVA
// ==========================================

const controleDias = elemento("dias");

function atualizarFrequencia() {
    const dias = Number(controleDias.value);

    elemento("diasTexto").textContent = dias;
    elemento("resultadoDias").textContent = dias + " dias/semana";
    elemento("statDias").textContent = dias + " dias";

    document.querySelectorAll("[data-day]").forEach(botao => {
        const selecionado = Number(botao.dataset.day) === dias;

        botao.classList.toggle("selected", selecionado);
        botao.setAttribute("aria-pressed", String(selecionado));
    });

    desenharGrafico("grafico");
    desenharGrafico("graficoGrande");

    elemento("legendaGrafico").textContent =
        "Para " + dias + " dia(s) por semana, a previsão do modelo é " +
        moeda.format(prever(dias)) + ".";
}

controleDias.addEventListener("input", atualizarFrequencia);

document.querySelectorAll("[data-day]").forEach(botao => {
    botao.addEventListener("click", () => {
        controleDias.value = botao.dataset.day;
        atualizarFrequencia();
    });
});

// ==========================================
// 5. FORMULÁRIO E CÁLCULO DA PREVISÃO
// ==========================================

elemento("formulario").addEventListener("submit", event => {
    event.preventDefault();

    const nome = elemento("nome").value.trim();
    const idadeTexto = elemento("idade").value.trim();
    const dias = Number(controleDias.value);
    const objetivo = elemento("objetivo").value;
    const plano = elemento("plano").value;

    elemento("formFeedback").textContent = "";

    if (!nome) {
        elemento("formFeedback").textContent =
            "Informe o nome do cliente.";
        elemento("nome").focus();
        return;
    }

    if (idadeTexto !== "") {
        const idade = Number(idadeTexto);

        if (!Number.isInteger(idade) || idade < 16 || idade > 100) {
            elemento("formFeedback").textContent =
                "Informe uma idade entre 16 e 100 anos.";
            elemento("idade").focus();
            return;
        }
    }

    if (!Number.isInteger(dias) || dias < 1 || dias > 6) {
        elemento("formFeedback").textContent =
            "Selecione de 1 a 6 dias por semana.";
        return;
    }

    // A idade, o objetivo e o plano não entram na regressão.
    const valor = prever(dias);

    elemento("preco").textContent = moeda.format(valor);
    elemento("saudacao").textContent =
        "Simulação para " + nome + " · Plano " + plano + ".";

    elemento("resultadoDias").textContent = dias + " dias/semana";
    elemento("statDias").textContent = dias + " dias";
    elemento("statObjetivo").textContent = objetivo;

    elemento("equacao").textContent =
        "Y = " + numero(modelo.beta0) +
        " + " + numero(modelo.beta1) + " × X";

    elemento("beta0").textContent = moeda.format(modelo.beta0);
    elemento("beta1").textContent =
        moeda.format(modelo.beta1) + " por dia adicional";

    elemento("interpretacao").textContent =
        "Neste dataset, cada dia semanal adicional está associado a uma " +
        "variação estimada de " + moeda.format(modelo.beta1) +
        " na mensalidade.";

    elemento("variacao").textContent = "Previsão calculada ✓";

    adicionarHistorico({
        nome,
        idade: idadeTexto || "Não informada",
        dias,
        objetivo,
        plano,
        valor,
        data: new Date().toLocaleString("pt-BR")
    });

    elemento("resultado").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

    desenharGrafico("grafico");
    desenharGrafico("graficoGrande");
});

// ==========================================
// 6. HISTÓRICO DE SIMULAÇÕES
// ==========================================

let historico = [];
let proximoId = 1;

function adicionarHistorico(dados) {
    historico.unshift({
        id: proximoId++,
        ...dados
    });

    // Mantém as 20 simulações mais recentes.
    historico = historico.slice(0, 20);

    renderizarHistorico();
}

function renderizarHistorico() {
    const container = elemento("historico");

    if (historico.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span>◷</span>
                <p>Nenhuma simulação salva.</p>
                <small>Calcule uma mensalidade para começar.</small>
            </div>
        `;
        return;
    }

    container.replaceChildren();

    historico.forEach(item => {
        const card = document.createElement("article");
        card.className = "history-item";

        const informacoes = document.createElement("div");

        const nome = document.createElement("strong");
        nome.textContent = item.nome;

        const detalhes = document.createElement("small");
        detalhes.textContent =
            item.dias + " dias/semana · " + item.objetivo;

        const acoes = document.createElement("div");
        acoes.className = "history-actions";

        const recuperar = document.createElement("button");
        recuperar.type = "button";
        recuperar.className = "mini-button";
        recuperar.textContent = "Recuperar";
        recuperar.addEventListener("click", () => recuperarSimulacao(item.id));

        const excluir = document.createElement("button");
        excluir.type = "button";
        excluir.className = "mini-button";
        excluir.textContent = "Excluir";
        excluir.addEventListener("click", () => excluirSimulacao(item.id));

        acoes.append(recuperar, excluir);
        informacoes.append(nome, detalhes, acoes);

        const preco = document.createElement("strong");
        preco.className = "history-price";
        preco.textContent = moeda.format(item.valor);

        card.append(informacoes, preco);
        container.append(card);
    });
}

function recuperarSimulacao(id) {
    const item = historico.find(registro => registro.id === id);

    if (!item) return;

    elemento("nome").value = item.nome;
    elemento("idade").value =
        item.idade === "Não informada" ? "" : item.idade;

    controleDias.value = item.dias;
    elemento("objetivo").value = item.objetivo;
    elemento("plano").value = item.plano;

    atualizarFrequencia();

    elemento("formulario").requestSubmit();

    abrirTela("inicio");
}

function excluirSimulacao(id) {
    historico = historico.filter(item => item.id !== id);
    renderizarHistorico();
}

elemento("limparHistorico").addEventListener("click", () => {
    if (historico.length === 0) return;

    const confirmar = window.confirm(
        "Deseja apagar todas as simulações deste histórico?"
    );

    if (confirmar) {
        historico = [];
        renderizarHistorico();
    }
});

// ==========================================
// 7. TABELA COM PESQUISA E PAGINAÇÃO
// ==========================================

let paginaAtual = 1;
const itensPorPagina = 10;

function obterClientesFiltrados() {
    const busca = elemento("pesquisa").value
        .trim()
        .toLocaleLowerCase("pt-BR");

    return clientes.filter(cliente => {
        const nome = cliente.nome.toLocaleLowerCase("pt-BR");
        const frequencia = String(cliente.dias);

        return nome.includes(busca) || frequencia.includes(busca);
    });
}

function renderizarTabela() {
    const filtrados = obterClientesFiltrados();
    const totalPaginas = Math.max(
        1,
        Math.ceil(filtrados.length / itensPorPagina)
    );

    paginaAtual = Math.min(paginaAtual, totalPaginas);

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const pagina = filtrados.slice(inicio, inicio + itensPorPagina);

    const tbody = elemento("tabelaDados");
    tbody.replaceChildren();

    if (pagina.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 3;
        td.textContent = "Nenhum cliente encontrado.";
        tr.append(td);
        tbody.append(tr);
    }

    pagina.forEach(cliente => {
        const tr = document.createElement("tr");

        [
            cliente.id + ". " + cliente.nome,
            cliente.dias + (cliente.dias === 1 ? " dia" : " dias"),
            moeda.format(cliente.mensalidade)
        ].forEach(texto => {
            const td = document.createElement("td");
            td.textContent = texto;
            tr.append(td);
        });

        tbody.append(tr);
    });

    elemento("paginaInfo").textContent =
        "Página " + paginaAtual + " de " + totalPaginas +
        " · " + filtrados.length + " clientes";

    elemento("paginaAnterior").disabled = paginaAtual <= 1;
    elemento("paginaProxima").disabled = paginaAtual >= totalPaginas;
}

elemento("pesquisa").addEventListener("input", () => {
    paginaAtual = 1;
    renderizarTabela();
});

elemento("paginaAnterior").addEventListener("click", () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        renderizarTabela();
    }
});

elemento("paginaProxima").addEventListener("click", () => {
    const total = Math.ceil(
        obterClientesFiltrados().length / itensPorPagina
    );

    if (paginaAtual < total) {
        paginaAtual++;
        renderizarTabela();
    }
});

// ==========================================
// 8. EXPORTAÇÃO DOS DADOS EM CSV
// ==========================================

elemento("exportarCSV").addEventListener("click", () => {
    const linhas = [
        ["Cliente", "Dias por semana", "Mensalidade (R$)"],
        ...clientes.map(c => [
            c.nome,
            c.dias,
            c.mensalidade.toFixed(2).replace(".", ",")
        ])
    ];

    const conteudo = "\uFEFF" + linhas.map(linha =>
        linha.map(valor =>
            '"' + String(valor).replace(/"/g, '""') + '"'
        ).join(";")
    ).join("\r\n");

    const arquivo = new Blob([conteudo], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(arquivo);
    const link = document.createElement("a");

    link.href = url;
    link.download = "dataset_academia.csv";
    link.click();

    URL.revokeObjectURL(url);
});

// ==========================================
// 9. GRÁFICO DE DISPERSÃO E RETA DE REGRESSÃO
// ==========================================

function desenharGrafico(idCanvas) {
    const canvas = elemento(idCanvas);

    if (!canvas || canvas.clientWidth === 0) return;

    const largura = canvas.clientWidth;
    const altura = canvas.clientHeight;

    if (largura < 10 || altura < 10) return;

    const escala = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(largura * escala);
    canvas.height = Math.round(altura * escala);

    const ctx = canvas.getContext("2d");
    ctx.scale(escala, escala);

    ctx.clearRect(0, 0, largura, altura);

    const margem = {
        esquerda: 48,
        direita: 15,
        topo: 18,
        baixo: 37
    };

    const areaLargura =
        largura - margem.esquerda - margem.direita;

    const areaAltura =
        altura - margem.topo - margem.baixo;

    const xMin = 1;
    const xMax = 6;
    const yMin = 60;
    const yMax = 160;

    const px = x =>
        margem.esquerda + ((x - xMin) / (xMax - xMin)) * areaLargura;

    const py = y =>
        margem.topo + ((yMax - y) / (yMax - yMin)) * areaAltura;

    // Fundo do gráfico
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, largura, altura);

    ctx.font = "11px Arial";
    ctx.textBaseline = "middle";

    // Linhas de grade e rótulos do eixo Y
    for (let valor = 60; valor <= 160; valor += 20) {
        const y = py(valor);

        ctx.beginPath();
        ctx.moveTo(margem.esquerda, y);
        ctx.lineTo(largura - margem.direita, y);
        ctx.strokeStyle = "#e8eef5";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = "#74859a";
        ctx.textAlign = "right";
        ctx.fillText(String(valor), margem.esquerda - 9, y);
    }

    // Rótulos do eixo X
    for (let valor = 1; valor <= 6; valor++) {
        const x = px(valor);

        ctx.beginPath();
        ctx.moveTo(x, margem.topo);
        ctx.lineTo(x, altura - margem.baixo);
        ctx.strokeStyle = "#eef2f7";
        ctx.stroke();

        ctx.fillStyle = "#74859a";
        ctx.textAlign = "center";
        ctx.fillText(String(valor), x, altura - margem.baixo + 17);
    }

    // Eixos
    ctx.beginPath();
    ctx.moveTo(margem.esquerda, margem.topo);
    ctx.lineTo(margem.esquerda, altura - margem.baixo);
    ctx.lineTo(largura - margem.direita, altura - margem.baixo);
    ctx.strokeStyle = "#93a3b7";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Pontos observados
    clientes.forEach(cliente => {
        ctx.beginPath();
        ctx.arc(
            px(cliente.dias),
            py(cliente.mensalidade),
            3.3,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#3984e8";
        ctx.fill();
    });

    // Reta de regressão
    ctx.beginPath();
    ctx.moveTo(px(1), py(prever(1)));
    ctx.lineTo(px(6), py(prever(6)));
    ctx.strokeStyle = "#08a780";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Marcador da frequência selecionada
    const dias = Number(controleDias.value);
    const valorPrevisto = prever(dias);
    const xSelecionado = px(dias);
    const ySelecionado = py(valorPrevisto);

    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(xSelecionado, margem.topo);
    ctx.lineTo(xSelecionado, altura - margem.baixo);
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.arc(xSelecionado, ySelecionado, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#f59e0b";
    ctx.stroke();

    // Títulos dos eixos
    ctx.fillStyle = "#526780";
    ctx.font = "11px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
        "Dias de treino por semana",
        margem.esquerda + areaLargura / 2,
        altura - 7
    );

    ctx.save();
    ctx.translate(13, margem.topo + areaAltura / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillText("Mensalidade (R$)", 0, 0);
    ctx.restore();
}

// ==========================================
// 10. INFORMAÇÕES ESTATÍSTICAS
// ==========================================

elemento("totalRegistros").textContent = clientes.length;

elemento("beta0").textContent = moeda.format(modelo.beta0);
elemento("beta1").textContent =
    moeda.format(modelo.beta1) + " por dia";

elemento("equacao").textContent =
    "Y = " + numero(modelo.beta0) +
    " + " + numero(modelo.beta1) + " × X";

elemento("explicaBeta0").textContent =
    "O intercepto é " + moeda.format(modelo.beta0) +
    ". Ele representa a estimativa matemática quando X = 0, " +
    "fora da faixa de frequência observada no dataset.";

elemento("explicaBeta1").textContent =
    "A inclinação é " + moeda.format(modelo.beta1) +
    " por dia semanal adicional. É uma associação encontrada " +
    "++nos dados fictícios, não uma regra comercial.";

elemento("interpretacao").textContent =
    "Cada dia semanal adicional está associado a uma variação estimada de " +
    moeda.format(modelo.beta1) + " na mensalidade.";

renderizarTabela();
renderizarHistorico();
atualizarFrequencia();

window.addEventListener("resize", () => {
    desenharGrafico("grafico");
    desenharGrafico("graficoGrande");
});

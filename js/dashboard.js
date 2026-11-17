// ===== Caminho base das imagens (altere aqui se mudar a pasta) =====
const IMG = "file:///C:/Users/Windows/Documents/TADS/enginner/MedTime/img/";

// Ícone do "Início" (aparece ao lado da pílula verde ativa)
document.documentElement.style.setProperty("--icone-inicio", `url("${IMG}inicio.png")`);

// ===== Dados do usuário (troque pelos dados reais / API) =====
const usuario = {
  nome: "Xxxxxxx",
  nomeCompleto: "Xxxxxxxxxx",
  lembretesHoje: 5,
  medicamentosAtivos: 3,
  adesaoSemana: 98,
  diasSeguidos: 12,
};

// Últimos medicamentos tomados (aparece em "Recentes")
// Doses do dia (troque pelos dados reais / API)
// alerta: "notificacao" | "voz" | "vibracao"
const doses = [
  { id: 1, nome: "Donepezila 10mg",   qtd: "1 comprimido", freq: "A cada 12 horas", hora: "Hoje às 08:00",   alerta: "notificacao" },
  { id: 2, nome: "Paracetamol 500mg", qtd: "1 comprimido", freq: "A cada 00:00",    hora: "Hoje às 10:00",   alerta: "voz" },
  { id: 3, nome: "Anticocepcional",   qtd: "1 comprimido", freq: "A cada 24 horas", hora: "Amanhã às 20:00", alerta: "notificacao" },
  { id: 4, nome: "Alta+D call 300mg", qtd: "1 comprimido", freq: "A cada 12 horas", hora: "Hoje às 22:00",   alerta: "vibracao" },
];

const ALERTAS = {
  notificacao: { texto: "Notificação",    icone: IMG + "sinoalerta.png" },
  voz:         { texto: "Mensagem voz",   icone: IMG + "volume.png" },
  vibracao:    { texto: "Vibraçao",       icone: IMG + "sinoalerta.png" },
};

// ===== Preenche textos =====
document.getElementById("nomeUsuario").textContent = usuario.nome;
document.getElementById("nomeTopo").textContent = usuario.nomeCompleto;
document.getElementById("numLembretes").textContent = usuario.lembretesHoje;
document.getElementById("numAtivos").textContent = usuario.medicamentosAtivos;
document.getElementById("numAdesao").textContent = usuario.adesaoSemana + "%";
document.getElementById("numDias").textContent = usuario.diasSeguidos;

// ===== Menu lateral: troca de item ativo =====
const itensMenu = document.querySelectorAll(".menu-item");
itensMenu.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    itensMenu.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    // Para navegar entre páginas, use por exemplo:
    // window.location.href = item.dataset.page + ".html";
  });
});

// ===== Botão voltar =====
document.getElementById("btnVoltar").addEventListener("click", () => {
  window.history.back();
});

// ===== Sino de notificações =====
const btnSino = document.getElementById("btnSino");
btnSino.addEventListener("click", () => {
  btnSino.classList.toggle("tem-alerta");
});

// ===== Confirmação de doses =====
// Status de cada dose: "tomado" | "nao-tomado" | (sem registro = pendente)
const CHAVE = "medtime_doses_" + new Date().toISOString().slice(0, 10);

function carregarStatus() {
  try { return JSON.parse(localStorage.getItem(CHAVE)) || {}; }
  catch (e) { return {}; }
}
function salvarStatus(obj) {
  try { localStorage.setItem(CHAVE, JSON.stringify(obj)); } catch (e) {}
}

let status = carregarStatus();

const dosesLista = document.getElementById("dosesLista");
const dosesResumo = document.getElementById("dosesResumo");
const listaRecentes = document.getElementById("listaRecentes");

function renderDoses() {
  dosesLista.innerHTML = "";

  doses.forEach((d) => {
    const st = status[d.id] || "";
    const al = ALERTAS[d.alerta];

    const row = document.createElement("div");
    row.className = "dose " + st;
    row.innerHTML = `
      <div class="dose-med">
        <div class="med-icone teal"><img src="${IMG}iconeRemedio.png" alt=""></div>
        <div>
          <h3>${d.nome}</h3>
          <p>${d.qtd}</p>
        </div>
      </div>
      <div class="dose-freq">${d.freq}</div>
      <div class="dose-hora">${d.hora}</div>
      <div class="dose-alerta"><img src="${al.icone}" alt=""><span>${al.texto}</span></div>
      <div class="dose-botoes">
        <button class="btn-dose btn-tomei" data-id="${d.id}" data-acao="tomado">
          <span class="marca">&#10003;</span> Já tomei
        </button>
        <button class="btn-dose btn-nao" data-id="${d.id}" data-acao="nao-tomado">
          <span class="marca">&#10005;</span> Não tomei
        </button>
      </div>`;
    dosesLista.appendChild(row);
  });

  atualizarResumo();
  renderRecentes();
}

function atualizarResumo() {
  const tomadas = doses.filter((d) => status[d.id] === "tomado").length;
  const pendentes = doses.filter((d) => !status[d.id]).length;

  dosesResumo.textContent = `${tomadas} de ${doses.length} doses confirmadas`;
  document.getElementById("numLembretes").textContent = pendentes;
}

function renderRecentes() {
  listaRecentes.innerHTML = "";
  doses.forEach((d) => {
    if (!status[d.id]) return;
    const li = document.createElement("li");
    li.className = status[d.id];
    const rotulo = status[d.id] === "tomado" ? "Tomado" : "Não tomado";
    li.innerHTML = `<span>${d.nome}</span><span>${rotulo} · ${d.hora}</span>`;
    listaRecentes.appendChild(li);
  });
}

// Clique nos botões (delegação de eventos)
dosesLista.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-dose");
  if (!btn) return;

  const id = btn.dataset.id;
  const acao = btn.dataset.acao;

  // Clicar de novo no mesmo botão desfaz a marcação
  if (status[id] === acao) delete status[id];
  else status[id] = acao;

  salvarStatus(status);
  renderDoses();
});

renderDoses();
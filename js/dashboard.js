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
const recentes = [
  // { nome: "Paracetamol 500mg", hora: "Hoje, 08:00" },
];

// ===== Preenche textos =====
document.getElementById("nomeUsuario").textContent = usuario.nome;
document.getElementById("nomeTopo").textContent = usuario.nomeCompleto;
document.getElementById("numLembretes").textContent = usuario.lembretesHoje;
document.getElementById("numAtivos").textContent = usuario.medicamentosAtivos;
document.getElementById("numAdesao").textContent = usuario.adesaoSemana + "%";
document.getElementById("numDias").textContent = usuario.diasSeguidos;

// Marca como ativo o item da página atual
const paginaAtual = location.pathname.split("/").pop();

document.querySelectorAll(".menu-item").forEach((item) => {
  const destino = item.getAttribute("href").split("/").pop();
  item.classList.toggle("active", destino === paginaAtual);
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

// ===== Lista de recentes =====
const listaRecentes = document.getElementById("listaRecentes");
recentes.forEach((r) => {
  const li = document.createElement("li");
  li.className = "tomado";
  li.innerHTML = `<span>${r.nome}</span><span>${r.hora}</span>`;
  listaRecentes.appendChild(li);
});
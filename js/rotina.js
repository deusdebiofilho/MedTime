/* ================================================
   MEDTIME – Página de Rotina
   Troque os dados abaixo pelos do seu sistema/back-end.
   ================================================ */

// Nome do usuário (troque quando tiver login)
const NOME_USUARIO = 'Xxxxxxxxxx';

// Caminhos das imagens de alerta (coloque os arquivos na pasta /imagens)
const ICONES_ALERTA = {
  notificacao: 'imagens/alerta-notificacao.png',
  voz:         'imagens/alerta-voz.png',
  vibracao:    'imagens/alerta-vibracao.png'
};

const TEXTO_ALERTA = {
  notificacao: 'Notificação',
  voz:         'Mensagem voz',
  vibracao:    'Vibração'
};

// Lista de medicamentos da rotina
let rotina = [
  { id: 1, nome: 'Donepezila 10mg',    dose: '1 comprimido', frequencia: 'A cada 12 horas', proxima: 'Hoje às 08:00',  alerta: 'notificacao', status: null },
  { id: 2, nome: 'Paracetamol 500mg',  dose: '1 comprimido', frequencia: 'A cada 00:00',    proxima: 'Hoje às 10:00',  alerta: 'voz',         status: null },
  { id: 3, nome: 'Anticoncepcional',   dose: '1 comprimido', frequencia: 'A cada 24 horas', proxima: 'Amanhã às 20:00', alerta: 'notificacao', status: null },
  { id: 4, nome: 'Alta+D call 300mg',  dose: '1 comprimido', frequencia: 'A cada 12 horas', proxima: 'Hoje às 22:00',  alerta: 'vibracao',    status: null }
];

/* ---------- Elementos ---------- */
const lista    = document.getElementById('listaRotina');
const msgVazia = document.getElementById('msgVazia');

/* ---------- Data de hoje em português ---------- */
function mostrarData() {
  const hoje = new Date();
  const texto = hoje.toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
  // "sábado, 31 de maio de 2026"
  document.getElementById('dataHoje').textContent = texto;
}

/* ---------- Monta as linhas ---------- */
function esconderSeFalhar(img) {
  img.addEventListener('error', () => { img.style.visibility = 'hidden'; });
}

function criarLinha(med) {
  const linha = document.createElement('article');
  linha.className = 'linha';
  linha.dataset.id = med.id;

  linha.innerHTML = `
    <div class="item">
      <div class="item-icone">
        <img src="imagens/item-comprimido.png" alt="">
      </div>
      <div>
        <div class="item-nome"></div>
        <div class="item-dose"></div>
      </div>
    </div>

    <div class="frequencia"></div>
    <div class="proxima"></div>

    <div class="alerta">
      <img src="${ICONES_ALERTA[med.alerta]}" alt="">
      <span>${TEXTO_ALERTA[med.alerta]}</span>
    </div>

    <div class="tomei">
      <button class="btn-status btn-sim ${med.status === 'sim' ? 'marcado' : ''}" data-acao="sim">
        <img src="imagens/botao-check.png" alt="">Já tomei
      </button>
      <button class="btn-status btn-nao ${med.status === 'nao' ? 'marcado' : ''}" data-acao="nao">
        <img src="imagens/botao-x.png" alt="">Não tomei
      </button>
    </div>

    <div class="acoes">
      <button class="btn-excluir" data-acao="excluir" aria-label="Excluir ${med.nome}">
        <img src="imagens/lixeira.png" alt="">
      </button>
    </div>
  `;

  // textos inseridos com textContent (evita HTML indesejado)
  linha.querySelector('.item-nome').textContent  = med.nome;
  linha.querySelector('.item-dose').textContent  = med.dose;
  linha.querySelector('.frequencia').textContent = med.frequencia;
  linha.querySelector('.proxima').textContent    = med.proxima;

  linha.querySelectorAll('img').forEach(esconderSeFalhar);
  return linha;
}

function renderizar() {
  lista.innerHTML = '';
  rotina.forEach(med => lista.appendChild(criarLinha(med)));
  msgVazia.hidden = rotina.length > 0;
}

/* ---------- Cliques (Já tomei / Não tomei / Excluir) ---------- */
lista.addEventListener('click', (e) => {
  const botao = e.target.closest('button[data-acao]');
  if (!botao) return;

  const id  = Number(botao.closest('.linha').dataset.id);
  const med = rotina.find(m => m.id === id);
  const acao = botao.dataset.acao;

  if (acao === 'excluir') {
    if (confirm(`Remover "${med.nome}" da rotina?`)) {
      rotina = rotina.filter(m => m.id !== id);
      renderizar();
    }
    return;
  }

  // clicar de novo no mesmo botão desmarca
  med.status = (med.status === acao) ? null : acao;
  renderizar();
});

/* ---------- Menu lateral: marca o item clicado ---------- */
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('ativo'));
    item.classList.add('ativo');
    // Para trocar de página, use por exemplo: window.location.href = 'calendario.html';
  });
});

/* ---------- Botão voltar ---------- */
document.getElementById('btnVoltar').addEventListener('click', () => history.back());

/* ---------- Início ---------- */
document.getElementById('nomeUsuario').textContent = NOME_USUARIO;
document.querySelectorAll('.img-opcional').forEach(esconderSeFalhar);
mostrarData();
renderizar();
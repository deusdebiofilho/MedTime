const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

let month = 4, year = 2026, selected = 10;

const grid = document.getElementById('calendar');
const modal = document.getElementById('modal');

// Medicamentos fictícios para demonstração
const medicamentosFicticios = [
    { data: '2026-01-04', nome: 'Vitamina C', dose: '500 mg', time: '08:00' },
    { data: '2026-01-04', nome: 'Ômega 3', dose: '1000 mg', time: '12:00' },
    { data: '2026-01-10', nome: 'Vitamina D', dose: '1000 UI', time: '09:00' },

    { data: '2026-02-05', nome: 'Vitamina B12', dose: '500 mcg', time: '08:00' },
    { data: '2026-02-05', nome: 'Multivitamínico', dose: '1 comprimido', time: '20:00' },
    { data: '2026-02-14', nome: 'Ômega 3', dose: '1000 mg', time: '12:00' },

    { data: '2026-03-07', nome: 'Vitamina C', dose: '500 mg', time: '08:00' },
    { data: '2026-03-07', nome: 'Vitamina D', dose: '1000 UI', time: '09:00' },
    { data: '2026-03-18', nome: 'Vitamina B12', dose: '500 mcg', time: '18:00' },

    { data: '2026-04-04', nome: 'Ômega 3', dose: '1000 mg', time: '12:00' },
    { data: '2026-04-10', nome: 'Vitamina C', dose: '500 mg', time: '08:00' },
    { data: '2026-04-22', nome: 'Multivitamínico', dose: '1 comprimido', time: '20:00' },

    { data: '2026-05-04', nome: 'Vitamina C', dose: '500 mg', time: '08:00' },
    { data: '2026-05-04', nome: 'Ômega 3', dose: '1000 mg', time: '12:00' },
    { data: '2026-05-07', nome: 'Vitamina D', dose: '1000 UI', time: '09:00' },
    { data: '2026-05-08', nome: 'Vitamina B12', dose: '500 mcg', time: '18:00' },
    { data: '2026-05-10', nome: 'Multivitamínico', dose: '1 comprimido', time: '20:00' },
    { data: '2026-05-11', nome: 'Vitamina C', dose: '500 mg', time: '08:00' },
    { data: '2026-05-13', nome: 'Ômega 3', dose: '1000 mg', time: '12:00' },
    { data: '2026-05-16', nome: 'Vitamina D', dose: '1000 UI', time: '09:00' },
    { data: '2026-05-18', nome: 'Vitamina B12', dose: '500 mcg', time: '18:00' },
    { data: '2026-05-22', nome: 'Multivitamínico', dose: '1 comprimido', time: '20:00' },
    { data: '2026-05-24', nome: 'Vitamina C', dose: '500 mg', time: '08:00' },
    { data: '2026-05-28', nome: 'Ômega 3', dose: '1000 mg', time: '12:00' },

    { data: '2026-06-04', nome: 'Vitamina D', dose: '1000 UI', time: '09:00' },
    { data: '2026-06-12', nome: 'Vitamina C', dose: '500 mg', time: '08:00' },
    { data: '2026-06-20', nome: 'Ômega 3', dose: '1000 mg', time: '12:00' },

    { data: '2026-07-03', nome: 'Vitamina B12', dose: '500 mcg', time: '08:00' },
    { data: '2026-07-15', nome: 'Multivitamínico', dose: '1 comprimido', time: '20:00' },
    { data: '2026-07-28', nome: 'Vitamina C', dose: '500 mg', time: '12:00' },

    { data: '2026-08-05', nome: 'Ômega 3', dose: '1000 mg', time: '12:00' },
    { data: '2026-08-12', nome: 'Vitamina D', dose: '1000 UI', time: '09:00' },
    { data: '2026-08-25', nome: 'Vitamina B12', dose: '500 mcg', time: '18:00' },

    { data: '2026-09-04', nome: 'Vitamina C', dose: '500 mg', time: '08:00' },
    { data: '2026-09-13', nome: 'Ômega 3', dose: '1000 mg', time: '12:00' },
    { data: '2026-09-21', nome: 'Multivitamínico', dose: '1 comprimido', time: '20:00' },

    { data: '2026-10-02', nome: 'Vitamina D', dose: '1000 UI', time: '09:00' },
    { data: '2026-10-10', nome: 'Vitamina B12', dose: '500 mcg', time: '08:00' },
    { data: '2026-10-18', nome: 'Vitamina C', dose: '500 mg', time: '12:00' },

    { data: '2026-11-03', nome: 'Ômega 3', dose: '1000 mg', time: '12:00' },
    { data: '2026-11-11', nome: 'Vitamina D', dose: '1000 UI', time: '09:00' },
    { data: '2026-11-27', nome: 'Multivitamínico', dose: '1 comprimido', time: '20:00' },

    { data: '2026-12-04', nome: 'Vitamina C', dose: '500 mg', time: '08:00' },
    { data: '2026-12-12', nome: 'Vitamina B12', dose: '500 mcg', time: '18:00' },
    { data: '2026-12-20', nome: 'Ômega 3', dose: '1000 mg', time: '12:00' }
];

// Formata a data
function formatarData(y, m, d) {
    return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

// Mostrar medicamentos do dia
function mostrarMedicamentos(data) {
    const lista = document.getElementById('task-list');
    lista.innerHTML = '';

    const encontrados = medicamentosFicticios.filter(
        medicamento => medicamento.data === data
    );

    if (encontrados.length === 0) {
        lista.innerHTML = '<p>Nenhum medicamento cadastrado neste dia.</p>';
        return;
    }

    encontrados.forEach(medicamento => {
        const item = document.createElement('article');
        item.className = 'task';

        const icon = document.createElement('b');
        icon.textContent = '✎';

        const info = document.createElement('div');

        const title = document.createElement('strong');
        title.textContent = medicamento.nome;

        const detail = document.createElement('small');
        detail.textContent = medicamento.dose;

        info.append(title, detail);

        const timing = document.createElement('div');
        timing.className = 'time';

        const hour = document.createElement('strong');
        hour.textContent = medicamento.time;

        const freq = document.createElement('small');
        freq.textContent = 'Horário marcado';

        timing.append(hour, freq);
        item.append(icon, info, timing);

        lista.appendChild(item);
    });
}

// Desenhar calendário
function render() {
    grid.innerHTML = '';

    document.getElementById('month').textContent = months[month];
    document.getElementById('year').textContent = year;
    document.getElementById('heading-month').textContent = `(${months[month]} ${year})`;

    const first = new Date(year, month, 1).getDay();
    const total = new Date(year, month + 1, 0).getDate();
    const prevTotal = new Date(year, month, 0).getDate();

    for (let i = 0; i < 42; i++) {
        let n, m = month, y = year, out = false;

        if (i < first) {
            n = prevTotal - first + i + 1;
            m--;
            out = true;

            if (m < 0) {
                m = 11;
                y--;
            }
        } else if (i >= first + total) {
            n = i - first - total + 1;
            m++;
            out = true;

            if (m > 11) {
                m = 0;
                y++;
            }
        } else {
            n = i - first + 1;
        }

        const b = document.createElement('button');
        b.className = 'day' + (out ? ' out' : '');

        const data = formatarData(y, m, n);
        b.dataset.date = data;

        if (!out && n === selected) {
            b.classList.add('selected');
        }

        b.textContent = String(n).padStart(2, '0');

        const medicamentosDoDia = medicamentosFicticios.filter(
            medicamento => medicamento.data === data
        );

        if (medicamentosDoDia.length > 0) {
            const dots = document.createElement('span');
            dots.className = 'dots';

            medicamentosDoDia.forEach(medicamento => {
                const ponto = document.createElement('i');
                ponto.title = `${medicamento.nome} - ${medicamento.time}`;
                dots.appendChild(ponto);
            });

            b.appendChild(dots);
        }

        b.onclick = () => {
            month = m;
            year = y;
            selected = n;

            render();
            mostrarMedicamentos(formatarData(year, month, selected));
        };

        grid.appendChild(b);
    }

    document.getElementById('date').textContent =
        `${String(selected).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;

    mostrarMedicamentos(formatarData(year, month, selected));
}

// Navegação dos meses
function shiftMonth(v) {
    month += v;

    if (month < 0) {
        month = 11;
        year--;
    }

    if (month > 11) {
        month = 0;
        year++;
    }

    selected = 1;
    render();
}

document.getElementById('prev').onclick = () => shiftMonth(-1);
document.getElementById('next').onclick = () => shiftMonth(1);

document.getElementById('prevYear').onclick = () => {
    year--;
    render();
};

document.getElementById('nextYear').onclick = () => {
    year++;
    render();
};

// Modal de adicionar medicamento
document.getElementById('add').onclick = () => modal.showModal();

document.getElementById('cancel').onclick = () => modal.close();

// Cadastrar medicamento
document.getElementById('form').onsubmit = e => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const dose = document.getElementById('dose').value.trim();
    const time = document.getElementById('time').value;

    const data = formatarData(year, month, selected);

    const novoMedicamento = {
        data: data,
        nome: name,
        dose: dose || 'Dosagem não informada',
        time: time
    };

    medicamentosFicticios.push(novoMedicamento);

    e.target.reset();
    modal.close();

    render();
    mostrarMedicamentos(data);
};

// Iniciar calendário
render();
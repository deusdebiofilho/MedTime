const tabs = document.querySelectorAll('.tab');
const notifications = document.querySelectorAll('.notification');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(item => item.classList.remove('active'));
        tab.classList.add('active');

        const tipo = tab.dataset.tab;

        notifications.forEach(notification => {
            if (tipo === 'todas') {
                notification.style.display = 'flex';
            }

            if (tipo === 'nao-lidas') {
                notification.style.display =
                    notification.classList.contains('unread') ? 'flex' : 'none';
            }

            if (tipo === 'lidas') {
                notification.style.display =
                    !notification.classList.contains('unread') ? 'flex' : 'none';
            }
        });
    });
});

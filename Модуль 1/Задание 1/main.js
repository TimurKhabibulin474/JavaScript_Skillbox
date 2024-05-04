(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const openButton = document.querySelector('.js-open-dropdown');
        const dropdownMenu = document.querySelector(openButton.dataset.target);

        document.addEventListener('click', event => {
            if(event.target.classList.contains("js-open-dropdown"))
                dropdownMenu.classList.toggle('dropdown-menu__visible');
            else if (!(event.target.classList.contains("dropdown-menu") || event.target.classList.contains("dropdown-item")))
                dropdownMenu.classList.remove('dropdown-menu__visible');
        });
    });
})();
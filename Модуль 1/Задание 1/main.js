(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const openButton = document.querySelector('.js-open-dropdown');
        const dropdownMenu = document.querySelector(openButton.dataset.target);

        openButton.addEventListener('click', event => {
            dropdownMenu.classList.toggle('dropdown-menu__visible');
            event._isClickOnButton = true;
        });

        dropdownMenu.addEventListener('click', event => {
            event._isClickOnDropdownMenu = true;
        });

        document.addEventListener('click', event => {
            if(event._isClickOnDropdownMenu || event._isClickOnButton) return;
            dropdownMenu.classList.remove('dropdown-menu__visible');
        });
    });
})();
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const button = document.querySelector('.btn-scroll');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100)
                button.classList.add('btn-show'); 
            else
                button.classList.remove('btn-show');
        }, { passive: true });
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
})();


    
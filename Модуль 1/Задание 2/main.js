(() => {
    const VALID_CHARACTERS = /[а-яА-ЯёЁ\s-]/g;
    const CONTROL_KEYS = ['Backspace', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete'];
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('.js-form');
        const inputs = document.querySelectorAll('.js-input');
        const paragraphs = document.querySelector('.paragraphs');

        form.addEventListener('submit', event => {
            event.preventDefault();
            const surname = document.getElementById('input-sur-name').value;
            const firstname = document.getElementById('input-first-name').value;
            const middlename = document.getElementById('input-middle-name').value;
            const fullName = `${correctionValue(surname)} ${correctionValue(firstname)} ${correctionValue(middlename)}`;
            const p = document.createElement('p');
            p.textContent = fullName;
            paragraphs.append(p);
            form.reset();
        })

        inputs.forEach(input => {
            input.addEventListener('keydown', event => {
                if (!(VALID_CHARACTERS.test(event.key) || CONTROL_KEYS.includes(event.key))) {
                    event.preventDefault();
                }
            })

            input.addEventListener('blur', function() {
                this.value = correctionValue(this.value);
            })
        });

        function correctionValue(value) {
            let valid_value = value.trim().toLowerCase().replaceAll(/[^А-яё]/g, '');
            valid_value = valid_value.replace(/^[-\s]+|[-\s]+$/g, '').replace(/[-\s]+/g, match => match.includes('-') ? '-' : ' ');
            return valid_value.charAt(0).toUpperCase() + valid_value.slice(1);
        }
    });
})();
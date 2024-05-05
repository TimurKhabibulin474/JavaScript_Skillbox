import createForm from './dom-helpers.js';

test('Функция должны создать форму', () => {
	const expectedText = '<form><div class=\"wrapper-number\"><input class=\"input-number\" placeholder=\"Номер карты\"><img class=\"image-card-name\"></div><div class=\"wrapper-date-code\"><input class=\"input-date\" placeholder=\"ММ/ГГ\"><input class=\"input-code\" placeholder=\"CVC/CVV\"></div><input placeholder=\"Адрес электронной почты\"><button class=\"btn\" disabled=\"\">Оплатить</button></form>';
	const el = createForm();
	expect(el).toBeInstanceOf(HTMLFormElement);
	expect(el.outerHTML).toBe(expectedText);
})

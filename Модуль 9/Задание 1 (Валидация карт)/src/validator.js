import {
	isValid,
	isSecurityCodeValid,
} from 'creditcard.js';


export const isValidCardNumber = (value) => isValid(value);
// Номер карты при проверки CVC/CVV нужен так как есть плтаженые системы у которых длина кода 4 а не 3
export const isValidCVC = (cardNumber, value) =>
	isSecurityCodeValid(cardNumber, value);

import { isValid, isExpirationDateValid, isSecurityCodeValid } from 'creditcard.js';
import IMask from 'imask';
import { validate } from "email-validator";

const form = document.getElementById("form");
const inputCardNumber = document.createElement("input");
const wrapperDateCode = document.createElement("div");
const inputExpirationDate = document.createElement("input");
const inputSecurityCode = document.createElement("input");
const inputEmail = document.createElement("input");
const button = document.createElement("button");

wrapperDateCode.classList.add("wrapper-date-code");
inputExpirationDate.classList.add("input-date");
inputSecurityCode.classList.add("input-code");
button.classList.add("btn");

inputCardNumber.placeholder = "Номер карты";
inputExpirationDate.placeholder = "ММ/ГГ";
inputSecurityCode.placeholder = "CVC/CVV";
inputEmail.placeholder = "Адрес электронной почты";
button.textContent = "Оплатить";
button.disabled = true;
const correctInputs = new Set();

inputCardNumber.oninput = e => {e.target.classList.remove("input-error")};
inputExpirationDate.oninput = e => {e.target.classList.remove("input-error")};
inputSecurityCode.oninput = e => {e.target.classList.remove("input-error")};
inputEmail.oninput = e => {e.target.classList.remove("input-error")};

const maskCardNumber = IMask(inputCardNumber, {
    mask: '0000 0000 0000 0000 00',
})

const maskExpirationDate = IMask(inputExpirationDate, {
    mask: "m/y",
    blocks: {
        m: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
        },
        y: {
            mask: IMask.MaskedRange,
            from: 24,
            to: 99,
        }
    }
})

const maskSecurityCode = IMask(inputSecurityCode, {
    mask: "000"
})

inputCardNumber.addEventListener("blur", e => {
    inputSecurityCode.blur();
    const isCorrect = isValid(maskCardNumber.unmaskedValue);
    handlingInput(e.target, isCorrect)
})

inputExpirationDate.addEventListener("blur", e => {
    const month = maskExpirationDate.unmaskedValue.substring(0, 2);
    const year = maskExpirationDate.unmaskedValue.substring(2, 4);
    const isCorrect = isExpirationDateValid(month, year);
    handlingInput(e.target, isCorrect);
})

inputSecurityCode.addEventListener("blur", e => {
    const isCorrect = isSecurityCodeValid(maskCardNumber.unmaskedValue, maskSecurityCode.unmaskedValue);
    handlingInput(e.target, isCorrect);
})

inputEmail.addEventListener("blur", e => {
    const isCorrect = validate(e.target.value.trim());
    console.log(isCorrect);
    handlingInput(e.target, isCorrect);
})

function handlingInput(input, isCorrect){
    if(isCorrect){
        correctInputs.add(input);
        input.classList.remove("input-error");
        if(correctInputs.size >= 4){
            button.disabled = false;
        }
    } else {
        correctInputs.delete(input);
        input.classList.add("input-error");
        button.disabled = true;
    }
}

wrapperDateCode.append(inputExpirationDate, inputSecurityCode);
form.append(inputCardNumber, wrapperDateCode, inputEmail, button);
import Card from "./card.js";

const form = document.getElementById("form");
const select = document.getElementById("select");
const buttonStart = document.querySelector(".form_btn");
const cardContainer = document.getElementById("game");
const sizes = ["4", "6", "8", "10"];

form.addEventListener("submit", (e) => {
	e.preventDefault();
	cardContainer.innerHTML = "";
	cardContainer.className = "game";
	buttonStart.disabled = true;
	startGame(select.value);
});

function startGame(size) {
	setSizeContainer(size);
	const countPairs = (size * size) / 2;
	const cardsNumberArray = getRandomArr(countPairs);
	let currentScore = 0;
	let openCard = null;
	let isCanPick = true;
	for (const cardNumber of cardsNumberArray) {
		new Card(cardContainer, cardNumber, function (card) {
			if (card.success || card.open || !isCanPick) return;
			card.open = true;
			if (!openCard) {
				openCard = card;
				return;
			}
			if (openCard.cardNumber === card.cardNumber) {
				openCard.success = true;
				card.success = true;
				openCard = null;
				currentScore++;
				if (currentScore === countPairs) buttonStart.disabled = false;
			} else {
				isCanPick = false;
				setTimeout(() => {
					openCard.open = false;
					card.open = false;
					openCard = null;
					isCanPick = true;
				}, 500);
			}
		});
	}
}

function setSizeContainer(size) {
	if (!sizes.includes(size)) {
		return cardContainer.classList.add("game-10");
	}
	cardContainer.classList.add(`game-${size}`);
}

function getRandomArr(maxCard) {
	const arr = [];
	for (let i = 1; i <= maxCard; i++) {
		arr.push(i);
		arr.push(i);
	}
	shuffle(arr);
	return arr;
}

function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
}

/// <reference types="cypress" />
describe("Игра пары", () => {
	beforeEach(() => {
		cy.visit("http://localhost:5173");
		cy.get("button").click();
	});
	it("В начале игры в каждой клетке цифра должна быть невидима", () => {
		cy.get(".game div").should("not.have.class", "card-open");
	});
	it("При нажатии на одну карточку она останется открытой", () => {
		const firstCard = cy.get(".game div").eq(0);
		firstCard.click();
		cy.wait(1000);
		firstCard.should("have.class", "card-open");
	});
	// Самому не нравится такая вложенность но не смог найти способа остановить цикл по-другому
	it("Найденная пара карточек остается открытой", () => {
		let isFound = false;
		for (let i = 1; i < 16; i++) {
			cy.then(() => {
				if (!isFound) {
					cy.get(".game div").should(($div) => {
						$div.get(0).click();
						$div.get(i).click();
						if ($div.get(0).innerText === $div.get(i).innerText) {
							expect($div.get(0)).have.class("card-success");
							expect($div.get(i)).have.class("card-success");
							isFound = true;
						}
					});
					cy.wait(1000);
				}
			});
		}
	});
	it("При двух открытых карточках открыть третью невозможно", () => {
		cy.get(".game div").should(($div) => {
			$div.get(0).click();
			$div.get(1).click();
			$div.get(2).click();
			expect($div.get(2)).not.have.class("card-open");
		});
	});
	it("При нахождении пары другая карта открывается", () => {
		let isFound = false;
		for (let i = 1; i < 16; i++) {
			cy.then(() => {
				if (!isFound) {
					cy.get(".game div").should(($div) => {
						$div.get(0).click();
						$div.get(i).click();
						if ($div.get(0).innerText === $div.get(i).innerText) {
							const anotherIndex = i === 1 ? 2 : 1;
							$div.get(anotherIndex).click();
							expect($div.get(anotherIndex)).have.class("card-open");
							isFound = true;
						}
					});
					cy.wait(1000);
				}
			});
		}
	});
});

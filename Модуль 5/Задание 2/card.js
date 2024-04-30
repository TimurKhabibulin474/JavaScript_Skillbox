export default class Card {
    constructor(container, cardNumber, flip){
        this.container = container;
        this.cardNumber = cardNumber;
        this.element = this.createElement();
        this.flip = flip;
    }

    set cardNumber(number) {
        this._cardNumber = number;
    }

    get cardNumber() {
        return this._cardNumber;
    }

    createElement(){
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = this.cardNumber;

        card.addEventListener("click", () => {
            this.flip(this);
        })
        this.container.append(card);
        return card;
    }

    set open(bool){
        this._open = bool;
        if(bool) this.element.classList.add("card-open");
        else this.element.classList.remove("card-open");
    }

    get open() {
        return this._open;
    }

    set success(bool){
        this._success = bool;
        if(bool){
            this.open = false;
            this.element.classList.add("card-success");
        } 
        else this.element.classList.remove("card-success");
    }

    get success(){
        return this._success;
    }
}
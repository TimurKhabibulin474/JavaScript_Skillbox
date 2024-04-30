import Card from "./card.js";
export default class AmazingCard extends Card {
    constructor(cardContainer, cardNumber, flip) {
        super(cardContainer, cardNumber, flip);
    }

    set image(img){
        this._image = img;
    }

    get image(){
        return this._image;
    }

    createElement() {
        const card = document.createElement("div");
        card.classList.add("card");
        this.image = document.createElement("img");
        this.image.onerror = function() {
            this.src = `icon/default.png`;
            throw new Error("Не существующий адрес изображения");
        }
        this.image.src = `icon/${this.cardNumber}.png`;
        this.image.alt = "card image";
        this.image.classList.add("card_image");
        card.append(this.image);
        card.addEventListener("click", () => {
            this.flip(this);
        })
        this.container.append(card);
        return card;
    }

    set open(bool){
        this._open = bool;
        if(!this._success){
            if(bool){
                this.element.classList.add("card-open");
                this.image.classList.add("card_image-show");
            } 
            else{
                this.element.classList.remove("card-open");
                this.image.classList.remove("card_image-show");
            } 
        } else {
            this.element.classList.remove("card-open");
        }
    }

    get open() {
        return this._open;
    }
}
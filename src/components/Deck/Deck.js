import Component from "../../component";
import Card from '../Card';
import './Deck.css';

export default class Deck extends Component{
    static getRootClass(){
        return '.deck';
    }

    constructor(root, cardNum){
        super(root);
        this.gameOver = false;
        this.cardNum = cardNum;
        this.cards = [];
        root.innerHTML = '';
        for(let i = 0; i<this.cardNum; i++){
            let cardEl = document.createElement('div');
            cardEl.classList.add('card');
            root.appendChild(cardEl);
            let card = new Card(cardEl);
            card.on('click', this.handleCardClick.bind(this));
            this.cards.push(card);
        }
        this.pickedColor = this.getAnswerColor();
    }

    setCards(num){
        this.gameOver = false;
        this.root.innerHTML = '';
        this.cards=[];
        for(let i = 0; i<num; i++){
            let cardEl = document.createElement('div');
            cardEl.classList.add('card');
            this.root.appendChild(cardEl);
            let card = new Card(cardEl);
            card.on('click', this.handleCardClick.bind(this));
            this.cards.push(card);
        }
        this.pickedColor = this.getAnswerColor();
    }

    reset(){
        this.gameOver = false;
        this.cards.forEach(card=>{
            card.enable();
        });
        this.pickedColor = this.getAnswerColor();
    }

    overGame(){
        this.gameOver = true;
        this.cards.forEach(card=>{
            card.disable();
        });
    }

    handleCardClick(firerCard, color){
        if(this.gameOver === true) return;
        console.log(color);
        if(color===this.pickedColor){
            this.fire('rightClick', color);
            this.overGame();
        } else {
            this.fire('wrongClick');
            firerCard.fadeOut();
        }
    }

    getAnswerColor(){
        return this.cards[Math.floor(Math.random()*this.cards.length)].getColor();
    }

}
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
        this.colors = this.getRandomColors();
        this.pickedColor = this.getAnswerColor();
        this.cards = [];
        this.cardsDom = root.querySelectorAll('.card');
        this.cardsDom.forEach((cardDomEl, i)=>{
            if(this.colors[i]!=null){
                const card = new Card(cardDomEl, this.colors[i]);
                card.on('click', this.handleCardClick.bind(this));
                this.cards.push(card);
            }
        });
    }

    reset(){
        this.gameOver = false;
        this.colors = this.getRandomColors();
        this.pickedColor = this.getAnswerColor();
        this.cards.forEach((card, i)=>{
            card.enable(this.colors[i]);
        });
    }

    handleCardClick(firerCard, color){
        if(this.gameOver === true) return;
        console.log(color);
        if(color===this.pickedColor){
            this.fire('rightClick', color);
            this.gameOver = true;
            this.cards.forEach(card=>{
                card.disable();
            });
        } else {
            this.fire('wrongClick');
            firerCard.fadeOut();
        }
    }


    getColor(){
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    getRandomColors(){
        let colors = [];
        for(let i=0; i<this.cardNum; i++){
            colors.push(this.getColor())
        }
        return colors;
    }

    getAnswerColor(){
        return this.colors[Math.floor(Math.random()*this.colors.length)];
    }

}
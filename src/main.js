import Component from './component';
import Navbar from './components/Navbar';
import Deck from './components/Deck';
import Board from './components/Board';
import Reset from './components/Reset';
import Footer from './components/Footer';

import './main.css';

export default class Main extends Component {
    static getRootClass(){
        return '.main';
    }
    
    constructor(root){
        super(root);
        this.cardNum = 3;
        this.navbar = new Navbar(root.querySelector('.navbar'));
        this.navbar.on('changeMode', this.handleMode.bind(this));

        this.deck = new Deck(root.querySelector('.deck'), this.cardNum);
        this.deck.on('rightClick', this.handleDeckRightClick.bind(this));
        this.deck.on('wrongClick', this.handleDeckWrongClick.bind(this));

        this.board = new Board(root.querySelector('.board'), this.deck.pickedColor);

        this.reset = new Reset(root.querySelector('.reset'));
        this.reset.on('click', this.handleResetClcik.bind(this));
    }

    handleDeckRightClick(firer, pickedColor){
        console.log('right click');
        this.root.style.backgroundColor = pickedColor;
        this.board.showCorrectMsg();
        this.reset.showPlayAgain();
    }

    handleDeckWrongClick(){
        console.log('wrong click');
        this.board.showWrongMsg();
    }

    handleMode(firer, gameMode){
        this.root.style.backgroundColor = 'rgb(35, 35, 35)';
        this.reset.reset();
        switch (gameMode){
            case 'easy':
                this.cardNum = 3;
                // set deck
                this.deck.setCards(this.cardNum);
                // set board
                this.board.reset(this.deck.pickedColor);
                break;
            case 'hard':
                this.cardNum = 6;
                this.deck.setCards(this.cardNum);
                this.board.reset(this.deck.pickedColor);
                break;
            case 'nightmare':
                this.cardNum = 6;
                this.deck.setCards(this.cardNum);
                this.board.reset(this.deck.pickedColor);
                break;
        }
        
    }

    handleResetClcik(){
        console.log('reset click');
        this.root.style.backgroundColor = 'rgb(35, 35, 35)';
        // generate new deck
        this.deck.reset();
        // update board
        this.board.reset(this.deck.pickedColor);
        // reset text of reset btn
        this.reset.reset();
    }
}

window.onload = () => {
    let body = document.querySelector('body');
    new Main(body);
}
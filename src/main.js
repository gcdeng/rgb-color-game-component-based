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
        this.gameMode = '';
        this.navbar = new Navbar(root.querySelector('.navbar'));
        this.navbar.on('changeMode', this.handleMode.bind(this));

        this.deck = new Deck(root.querySelector('.deck'), this.cardNum);
        this.pickedColor = this.deck.pickedColor;
        this.deck.on('rightClick', this.handleDeckRightClick.bind(this));
        this.deck.on('wrongClick', this.handleDeckWrongClick.bind(this));

        this.board = new Board(root.querySelector('.board'), this.pickedColor);
        this.board.on('timeout', this.handleTimeOut.bind(this));
        this.board.on('blinkBg', this.blinkBg.bind(this));
        this.board.on('removeBlinkBg', this.removeBlinkBg.bind(this));

        this.reset = new Reset(root.querySelector('.reset'));
        this.reset.on('click', this.handleResetClcik.bind(this));
    }

    blinkBg() {
        this.root.style.backgroundColor = '#fff';
        this.blinkBgId = setTimeout(()=>{
            this.root.style.backgroundColor = 'rgb(35, 35, 35)';
            clearTimeout(this.blinkBgId);
        }, 100);
    }

    removeBlinkBg(){
        clearTimeout(this.blinkBgId);
    }

    handleTimeOut(){
        this.root.style.backgroundColor = this.pickedColor;
        this.deck.overGame();
        this.reset.reset();
    }

    handleDeckRightClick(firer, pickedColor){
        console.log('right click');
        if(this.gameMode === 'nightmare'){
            this.board.stopCoutDown();
            this.removeBlinkBg();
        }
        this.root.style.backgroundColor = pickedColor;
        this.board.showCorrectMsg();
        this.reset.showPlayAgain();
    }

    handleDeckWrongClick(){
        console.log('wrong click');
        this.board.showWrongMsg();
    }

    clearAllTimingEvents(){
        this.board.stopCoutDown();
    }

    resetMain(){
        this.root.style.backgroundColor = 'rgb(35, 35, 35)';
    }

    handleMode(firer, gameMode){
        this.resetMain();
        this.reset.reset();
        this.board.removeCountDown();
        this.removeBlinkBg();
        this.gameMode = gameMode;
        switch (gameMode){
            case 'easy':
                this.cardNum = 3;
                this.deck.setCards(this.cardNum);
                this.pickedColor = this.deck.pickedColor;
                this.board.reset(this.pickedColor);
                break;
            case 'hard':
                this.cardNum = 6;
                this.deck.setCards(this.cardNum);
                this.pickedColor = this.deck.pickedColor;
                this.board.reset(this.pickedColor);
                break;
            case 'nightmare':
                this.cardNum = 6;
                this.deck.setCards(this.cardNum);
                this.pickedColor = this.deck.pickedColor;
                this.board.reset(this.pickedColor);
                this.board.startCountDown();
                break;
        }
        
    }

    handleResetClcik(){
        console.log('reset click');
        this.resetMain();
        // generate new deck
        this.deck.reset();
        this.pickedColor = this.deck.pickedColor;
        // update board
        this.board.reset(this.pickedColor);
        // reset text of reset btn
        this.reset.reset();
        if(this.gameMode==='nightmare'){
            this.board.startCountDown();
        }
    }
}

window.onload = () => {
    let body = document.querySelector('body');
    new Main(body);
}
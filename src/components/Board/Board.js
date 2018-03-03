import Component from "../../component";
import './Board.css';

export default class Board extends Component{
    static getRootClass(){
        return '.board';
    }
    constructor(root, pickedColor){
        super(root);
        console.log(pickedColor);
        this.title = root.querySelector('.color-picked');
        this.message = root.querySelector('#message');
        this.reset(pickedColor);
        // this.countDownText = root.querySelector('#countdown');
        // this.handleCountDown();
    }

    reset(color){
        this.title.innerHTML = color.toUpperCase();
        this.message.innerHTML = 'WHAT\'S THE COLOR?';
    }

    showCorrectMsg(){
        this.message.innerHTML = 'CORRECT!';
    }

    showWrongMsg(){
        this.message.innerHTML = 'TRY AGAIN!';
    }

    showTimeOutMsg(){
        this.message.innerHTML = 'TIMEOUT!';
    }

    handleCountDown(){

    }

}
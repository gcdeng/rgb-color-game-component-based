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
        this.countDownText = root.querySelector('#countdown');
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

    startCountDown(){
        clearInterval(this.countdownId);
        this.countDownText.style.display = 'block';
        this.timeout = 5;
        this.countDownText.innerHTML = this.timeout;
        this.countdownId = setInterval(()=>{
            this.timeout--;
            this.countDownText.innerHTML = this.timeout;
            this.fire('blinkBg');
            if(this.timeout===0){
                this.showTimeOutMsg();
                clearInterval(this.countdownId);
                this.fire('removeBlinkBg');
                this.fire('timeout');
            }
        }, 1000);

    }

    stopCoutDown(){
        clearInterval(this.countdownId);
    }

    removeCountDown(){
        this.timeout = 0;
        clearInterval(this.countdownId);
        this.countDownText.style.display = 'none';

    }

}
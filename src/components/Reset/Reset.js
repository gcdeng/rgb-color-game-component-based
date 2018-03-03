import Component from "../../component";
import './Reset.css'

export default class Reset extends Component{
    static getRootClass(){
        return '.reset';
    }

    constructor(root){
        super(root);
        root.addEventListener('click', this.handleDomClick.bind(this));
        this.resetText = root.querySelector('.reset-text');
        this.reset();
    }

    reset(){
        this.resetText.textContent = 'New Color';
    }

    showPlayAgain(){
        this.resetText.textContent = 'Play Again';
    }

    handleDomClick(){
        this.fire('click');
    }
}
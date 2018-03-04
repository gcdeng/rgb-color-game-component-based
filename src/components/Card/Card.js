import Component from "../../component";
import './Card.css';

export default class Card extends Component{
    static getRootClass(){
        return '.card';
    }
    constructor(root){
        super(root);
        this.enable();
        root.addEventListener('click', this.handleDomClick.bind(this));
    }

    enable(){
        this.color = this.getRandomColor();
        this.root.style.display = 'inline-block';
        this.root.style.backgroundColor = this.color;
        this.root.style.opacity = 1;
        this.root.style.cursor = 'pointer';
    }

    disable(){
        this.root.style.display = 'inline-block';
        this.root.style.backgroundColor = '#fff';
        this.root.style.opacity = 1;
        this.root.style.cursor = 'default';
    }

    fadeOut(){
        this.root.style.opacity = 0;
        this.root.style.cursor = 'default';
    }

    getColor(){
        return this.color;
    }

    getRandomColor(){
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    handleDomClick(){
        this.fire('click', this.color);
    }
}
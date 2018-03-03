import Component from "../../component";
import './Card.css';

export default class Card extends Component{
    static getRootClass(){
        return '.card';
    }
    constructor(root, color){
        super(root);
        this.enable(color);
        root.addEventListener('click', this.handleDomClick.bind(this));
    }

    enable(color){
        this.color = color;
        this.root.style.display = 'block';
        this.root.style.backgroundColor = color;
        this.root.style.opacity = 1;
        this.root.style.cursor = 'pointer';
    }

    disable(){
        this.root.style.display = 'block';
        this.root.style.backgroundColor = '#fff';
        this.root.style.opacity = 1;
        this.root.style.cursor = 'default';
    }

    fadeOut(){
        this.root.style.opacity = 0;
        this.root.style.cursor = 'default';
    }

    handleDomClick(){
        this.fire('click', this.color);
    }
}
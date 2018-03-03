import Component from "../../component";
import './Footer.css';

export default class Footer extends Component{
    static getRootClass(){
        return '.footer';
    }
    constructor(root){
        super(root);
    }
}
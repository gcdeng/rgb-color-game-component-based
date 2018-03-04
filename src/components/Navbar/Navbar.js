import Component from "../../component";
import './Navbar.css';

export default class Navbar extends Component{
    static getRootClass(){
        return '.navbar';
    }

    constructor(root){
        super(root);
        this.navItems = root.querySelectorAll('.nav-item');
        this.navBtn = root.querySelector('.navbar-toggler');
        this.navbarContent = root.querySelector('#navbarSupportedContent');
        this.gameMode = '';
        this.navItems.forEach(item => {
            item.addEventListener('click', this.handleDomClick.bind(this, item));
        });
    }

    handleDomClick(item){
        this.removeActiveClassFromNavItems();
        item.classList.add('active');
        this.gameMode = item.querySelector('a').innerHTML.toLowerCase();
        this.fire('changeMode', this.gameMode);
        this.navBtn.classList.toggle('collapsed');
        this.navbarContent.classList.toggle('show');
    }

    removeActiveClassFromNavItems(){
        this.navItems.forEach(item=>{
            item.classList.remove('active');
        });
    }
}
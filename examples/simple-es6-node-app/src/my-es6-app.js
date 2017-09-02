export default class myApp{

    constructor(){

        this.message = null;
    }

    init(){

        this.message = 'hello world!';
    }

    run(){

        console.log(this.message);
    }
}

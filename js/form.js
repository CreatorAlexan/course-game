class Form{
    constructor(){
        this.button = createButton("PLAY")
    }

    display(){
        this.button.position(displayWidth/2,displayHeight/2+30)
        this.button.mousePressed(()=>{
            game.updateGameState(1);
        })
        
    }

    hide1(){
        this.button.hide();
    }
}
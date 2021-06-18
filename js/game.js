class Game{
    constructor(){

    }
    display(){
        if(gameState == 0){
           
            form.display();
        }
        if(gameState == 1){
            form.hide1();
        }
        if(gameState == 2){
            console.log("GAME OVER!!")
        }
    }

    updateGameState(state){
        db.ref("/").update({gameState: state})
    }

    readGameState(){
        var gameStateRef = db.ref("gameState");
        gameStateRef.on("value",(data)=>{
            gameState = data.val();
        })
    }
    
}
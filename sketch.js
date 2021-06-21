var db;
var gameState = 0;
var plyStatus = 0, courseStatus = 1;
var playerCount;
var form;
var playerArr = [];
var player;
var man,wall,ground,spawn,startLine,water;
var boulder, hurdle, bird,shark,coral,fish,oxygenBubbles;
var boulderGRP, hurdleGRP,birdGRP,sharkGRP,coralGRP,fishGRP,oxyGRP;
var lvlButtons;
var timer1 = 30, timer2 = 45,timer3 = 70;
var heart1,heart2,heart3,heartTrigger = 11;
var bubble1,bubble2,bubble3,bubbleLives = 14;

var gameOverImg,winImg;
var heartImg,bubbleImg,boulderImg,groundImg,skyBGImg,fish1Image,fish2Image,fish3Image,wallImg,sharkImg,oxyImg,cloudImg,birdImg1,birdImg2;
var standingImg,runningImg,jumpingImg,swimmingImg,climbImg;



function preload(){

    heartImg = loadImage("images/heartImage.png")
    bubbleImg = loadImage("images/bubbleImage.png")
    boulderImg = loadImage("images/boulderImage.png")
    groundImg = loadImage("images/groundImage.png")
    skyBGImg = loadImage("images/skyImage.jpg")
    fish1Image = loadImage("images/fish1Image.png")
    fish2Image = loadImage("images/fish2Image.png")
    fish3Image = loadImage("images/fish3Image.png")
    wallImg = loadImage("images/rockWall.jpg")
    sharkImg = loadImage("images/sharkImage.png")
    oxyImg = loadImage("images/oxyImage.png")
    cloudImg = loadImage("images/cloudImage.png")
    birdImg1 = loadAnimation("images/birdImage.png")
    birdImg2 = loadAnimation("images/birdImage2.png")

    standingImg = loadAnimation("images/standingStickmanImage.png")
    runningImg = loadAnimation("images/runningStickman.png")
    jumpingImg = loadAnimation("images/jumpingStickman.png")
    swimmingImg = loadAnimation("images/swimmingStickmanImage.png")
    climbImg = loadAnimation("images/climbingStickmanImage.png")

}

function setup(){
    createCanvas(displayWidth-100,displayHeight-150)
    db = firebase.database();

    game = new Game();
    form = new Form();
    lvlButtons = new Buttons();

    boulderGRP = new Group();
    hurdleGRP = createGroup();
    birdGRP = new Group();
    sharkGRP = createGroup();
    coralGRP = new Group();
    fishGRP = new Group();
    oxyGRP = new Group();

    game.readGameState();

    gameOverImg = loadImage("images/gameOver.png")
    winImg = loadImage("images/youWin.png")

    ground = createSprite(displayWidth/2,displayHeight/2+320,displayWidth,70)
    ground.shapeColor = "black"
    ground.addImage(groundImg)
    ground.scale = 2
    ground.debug = false;
    ground.setCollider("rectangle",0,0,1000,110)

    wall = createSprite(displayWidth/2+380,displayHeight/2-95,displayWidth/2,displayHeight/2+320)
    wall.shapeColor = 'grey'
    wall.debug = false;
    wall.addImage(wallImg)
    wall.scale = 1.5
    

    spawn = createSprite(displayWidth/2-600,displayHeight/2+210,displayWidth/2-600,20)
    spawn.shapeColor = "green"

    startLine = createSprite(340,displayHeight/2+210,30,70)
    startLine.shapeColor = "red"
    startLine.visible = false;
    
    man = createSprite(spawn.x,spawn.y-75,20,115)
    man.shapeColor = "red"
    man.visible = false;
    man.debug = false;
    man.addAnimation("standing",standingImg)
    man.scale = 0.7
    man.setCollider("rectangle",0,0,90,160)

    man.addAnimation("running",runningImg)
    man.addAnimation("climbing",climbImg)
    man.addAnimation("swimming",swimmingImg)
    man.addAnimation("jump",jumpingImg)
    
    heart1 = createSprite(100,130,30,30)
    heart1.shapeColor = "pink"
    heart1.addImage(heartImg)
    heart1.scale = 0.2
    
    heart2 = createSprite(200,130,30,30)
    heart2.shapeColor = "pink"
    heart2.addImage(heartImg)
    heart2.scale = 0.2
    
    heart3 = createSprite(300,130,30,30)
    heart3.shapeColor = "pink"
    heart3.addImage(heartImg)
    heart3.scale = 0.2

    water = createSprite(displayWidth/2,displayHeight/2,displayWidth,500)
    water.shapeColor =  "blue"
    water.visible = false;

    bubble1 = createSprite(100,200,30,30)
    bubble1.shapeColor = "cyan"
    bubble1.visible = false;
    bubble1.addImage(bubbleImg)
    bubble1.scale = 0.2

    bubble2 = createSprite(200,200,30,30)
    bubble2.shapeColor = "cyan"
    bubble2.visible = false;
    bubble2.addImage(bubbleImg)
    bubble2.scale = 0.2

    bubble3 = createSprite(300,200,30,30)
    bubble3.shapeColor = "cyan"
    bubble3.visible = false;
    bubble3.addImage(bubbleImg)
    bubble3.scale = 0.2
    
    

}

function draw(){
    background(skyBGImg)

    
    game.display();
    lvlButtons.display();

    
    if(gameState == 1){

        man.velocityY = +3

        courseLevel();
        playerStatus();

        man.visible = true;
        man.collide(spawn)
        man.collide(ground)

        if(heartTrigger <8){
            heart3.destroy();
        }
        if(heartTrigger <4){
            heart2.destroy();
        }
        if(heartTrigger ==0){
            heart1.destroy();
        }
        if(heartTrigger <0){
            console.log("Ran out of hearts")
            gameState = 2;
        }
        
        
    
    }
    if(gameState == 2){
        var BlankBoard = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight)
        BlankBoard.depth = 10000
        BlankBoard.shapeColor = "white"
        var gmOverSprite = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight)
        gmOverSprite.addImage(gameOverImg)
        gmOverSprite.scale = 0.5
        textSize(40)
        fill("red")
        text("GAME OVER",displayWidth/2,displayHeight/2)
    }

    
    drawSprites();

}

function keyPressed(){
    if(keyCode == UP_ARROW){
        man.y = man.y - 9
    }
    if(keyCode == DOWN_ARROW){
        man.y = man.y + 9
    }
    if(keyCode == LEFT_ARROW){
        man.x = man.x - 9

    }
    if(keyCode == RIGHT_ARROW){
        man.x = man.x + 9
    }
    
}
function spawnInteractives(){
    
    
    if(courseStatus == 1&&frameCount % 50 == 0){
        var rand = Math.round(random(620,1320))
        boulder = createSprite(rand,0,90,90)
        boulder.velocityY = + 10
        boulder.shapeColor = "white"
        boulder.lifetime = 150
        boulder.depth = wall.depth +1;
        boulder.addImage(boulderImg)
        boulder.scale = 0.8
        boulderGRP.add(boulder)
    }
    if(plyStatus == 2&&frameCount % 40 == 0){
        hurdle = createSprite(displayWidth,ground.y-90,20,120)
        hurdle.shapeColor = "white"
        hurdle.velocityX = -10
        hurdle.lifetime = 150
        hurdleGRP.add(hurdle)
        
    }
    if(plyStatus== 2&& frameCount % 67 == 0){
        var rand = Math.round(random(120,400))
        bird = createSprite(displayWidth,rand,30,30)
        bird.shapeColor = "black"
        bird.velocityX = -12
        bird.lifetime = 130
        bird.addAnimation("glide",birdImg1)
        bird.scale = 0.2
    }

    if(plyStatus == 3&& frameCount % 300 == 0){
        var rand = Math.round(random(250,450))
        shark = createSprite(displayWidth,rand,175,110)
        shark.shapeColor = "gray"
        shark.velocityX = -9
        shark.lifetime = 200
        shark.addImage(sharkImg)
        shark.scale = 0.3
        sharkGRP.add(shark);
    }
    if(plyStatus == 3&&frameCount % 40==0){
        var rand = Math.round(random(250,590))
        
        fish = createSprite(displayWidth,rand,50,30)
        var randImg = Math.round(random(1,3))
        if(randImg == 1){
            fish.addImage(fish1Image)
        }
        else if(randImg == 2){
            fish.addImage(fish2Image)
        }
        else{
            fish.addImage(fish3Image)
        }
        fish.scale = 0.15
        fish.shapeColor = "orange"
        fish.velocityX = -8
        fish.lifetime = 210
        fishGRP.add(fish)
    }
    if(plyStatus == 3&&frameCount % 150==0){
        var rand = Math.round(random(260,575))
        oxygenBubbles = createSprite(displayWidth,rand,30,30)
        oxygenBubbles.shapeColor = "cyan"
        oxygenBubbles.velocityX = -12
        oxygenBubbles.lifetime = 120
        oxygenBubbles.addImage(oxyImg)
        oxygenBubbles.scale = 0.2
        oxyGRP.add(oxygenBubbles)
   }
}

function playerStatus(){
    
    if(courseStatus == 1 && !man.isTouching(wall)){
        frameCount = 0;
        if(keyDown("left")||keyDown("right")){
            keyPressed();
            man.changeAnimation("running")
            man.scale = 0.3
            man.setCollider("rectangle",65,0,215,275)
        }
        else{
            man.changeAnimation("standing")
            man.scale = 0.7
            man.setCollider("rectangle",0,0,90,160)
        }
    }
    if(courseStatus == 2&& man.x <366){
        if(keyDown("right")){
            keyPressed();
            man.changeAnimation("running")
            man.scale = 0.3
            man.setCollider("rectangle",65,0,215,275)
        }
        else{
            man.changeAnimation("standing")
            man.scale = 0.7
            man.setCollider("rectangle",0,0,90,160)
        }
    }
    if(courseStatus == 2&&man.x <366){
        frameCount = 0;
    }
    if(courseStatus == 3&&man.y >240){
        plyStatus = 3
    }
    if(!man.isTouching(water)&&courseStatus==3){
        frameCount = 0;
        man.velocityY = 0
    }

    if(plyStatus == 1){

        man.velocityY = 0;
        man.y = man.y - 4
        if(keyDown("left")||keyDown("right")){
            keyPressed();
            man.changeAnimation("climbing")
            man.scale = 0.3
            man.setCollider("rectangle",0,-50,245,395)
        }

        if(man.y < 400){
            ground.y = ground.y + 2
            spawn.y = spawn.y + 2
        }

        if(man.collide(boulderGRP)){
            heartTrigger = heartTrigger -4
            ground.y = displayHeight/2+320
            spawn.y = displayHeight/2+210
            man.x = spawn.x
            man.y = spawn.y-75
            console.log(heartTrigger)
        }

        if(man.x>605){
            createBarrier(displayWidth/2+200,270,displayWidth/2,20,man,false)
            createBarrier(displayWidth/2-175,displayHeight/2+30,25,445,man,false)
            createBarrier(displayWidth/2+575,displayHeight/2+30,25,445,man,false)
         }

        
        
    }
    if(plyStatus == 2){
        man.changeAnimation("running")
        man.scale = 0.3
        man.setCollider("rectangle",15,0,215,275)

        man.velocityY = +4
        startLine.x = startLine.x -4;
        createBarrier(366,displayHeight/2+30,20,300,man,false)
        createBarrier(404,displayHeight/2+30,20,300,man,false)
        if(keyDown("space")&&man.y >=300){
            man.velocityY = -50
        }
        man.velocityY = man.velocityY +10

        

        if(man.isTouching(hurdleGRP)){
            heartTrigger = heartTrigger - 1;
            console.log(heartTrigger)
        }
        
    }
    if(plyStatus == 3){
        man.changeAnimation("swimming")
        man.scale = 0.6
        man.setCollider("rectangle",0,0,175,100)
        man.velocityY = +3
        if(keyDown("up")||keyDown("down")){
            keyPressed();
        }
        if(man.isTouching(oxyGRP)&&bubbleLives <= 11){
            bubbleLives = bubbleLives + 2.5
        }
        if(man.isTouching(fishGRP)){
            heartTrigger = heartTrigger - 0.2
        }
        if(man.isTouching(sharkGRP)){
            heartTrigger = heartTrigger - 0.2
        }
    }

}

function courseLevel(){
    spawnInteractives();
    //setting the conditions to change player status
    if(man.isTouching(wall)&&courseStatus == 1){
        plyStatus = 1;
    }
    else if(man.x >= 367&&courseStatus == 2){
        plyStatus = 2;
    }
    else{
        plyStatus = 0;
    }
    
    //course status conditions
    if(courseStatus == 1){
        man.depth = wall.depth + 1;
        ground.depth = wall.depth + 1;

        textSize(25)
        fill("black")
        text("Time left: "+timer1,400,300)
        if(frameCount % 25 == 0&&timer1 > 0){
            timer1 = timer1 - 1
        }
        if(timer1 == 0){
            courseStatus = 2
            plyStatus = 0;
            man.x = spawn.x
            console.log("Timer1 = 0")
        }
        
        console.log(timer1)    

    }

    if(courseStatus == 2){
        wall.destroy();
        boulderGRP.destroyEach();
        var bgGround = createSprite(displayWidth/2,displayHeight/2+280,displayWidth,70)
        bgGround.shapeColor = "brown"
        ground.y = displayHeight/2+210
        ground.shapeColor = "green"
        
        spawn.visible = false;

        startLine.visible = true;


        textSize(25)
        fill("black")
        text("Time left: "+timer2,140,300)
        if(frameCount % 25 == 0&&timer2 > 0){
            timer2 = timer2 - 1
        }
        if(timer2 == 0){
            man.y = 50
            man.x = 100
            courseStatus = 3
            plyStatus = 0;
            man.x = spawn.x
            console.log("timer2 = 0")
        }

        
    }
    if(courseStatus == 3){
        bubble1.visible = true;
        bubble2.visible = true;
        bubble3.visible = true;

        wall.destroy();
        startLine.destroy();
        hurdleGRP.destroyEach();
        birdGRP.destroyEach();
        spawn.destroy();
        ground.shapeColor = "brown"
        ground.y = 715

        if(keyDown("space")){
            man.y = 200
        }

        textSize(25)
        fill("black")
        text("Time left: "+timer3,200,50)
        if(frameCount % 25 == 0&&timer3 > 0){
            timer3 = timer3 - 1
        }
        if(timer3 == 0){
            courseStatus = 4
            plyStatus = 0;
            console.log("Timer3 = 0")
        }
        if(frameCount % 30 == 0){
            bubbleLives = bubbleLives - 2
        }
        if(bubbleLives <12){
            bubble3.visible = false;
        }
        if(bubbleLives <-8){
            bubble2.visible = false;
        }
        if(bubbleLives <-16){
            bubble1.visible = false;
        }
        if(bubble1.visible == false&&frameCount % 120 == 0){
            heartTrigger = heartTrigger - 4;
        }

        man.depth = water.depth + 1
        water.visible = true;

    }
    if(courseStatus == 4){
        water.destroy();
        fishGRP.destroyEach();
        sharkGRP.destroyEach();
        ground.destroy();
        bubble1.destroy();
        bubble2.destroy();
        bubble3.destroy();
        var blankBoard = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight)
        blankBoard.shapeColor = "yellow"
        var youWin = createSprite()
    }
}

function createBarrier(x,y,width,height,obj1,visibility){
    var invsBarrier = createSprite(x,y,width,height)
    obj1.collide(invsBarrier)
    invsBarrier.shapeColor = "black"
    invsBarrier.visible = visibility;
    
}
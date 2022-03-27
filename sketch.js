var bat; 
var batImg;
var timmy; 
var timmyImg;
var background1, backgroundImg;
var PLAY = 1;
var END = 0;
var gameState = "play";
var ground;
var gameOver;
var restart;
var score = 0;


var stoneGroup;


function preload() {
    batImg = loadImage("nein.png");
    timmyImg = loadImage("Timmy.png");
    backgroundImg = loadImage("forest.jpg")

    gameOverImg = loadImage("gameOver.png")
    restartImg = loadImage("restart.png")

    stoneImg = loadImage("stone.png")


}

function setup() {
    createCanvas(600, 350);

    stoneGroup = new Group();

     background1 = createSprite(600,200,700,300)
    background1.addImage(backgroundImg)
   background1.scale = 5;

    gameOver = createSprite(600, 350, 50, 50);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;

    restart = createSprite(600, 400, 50, 50);
    restart.addImage(restartImg);
    restart.scale = 0.5;





    bat = createSprite(150, 200);
    bat.addImage(batImg);

    timmy = createSprite(400, 320)
    timmy.addImage(timmyImg);
    timmy.scale = 0.25;




    ground = createSprite(600, 350, 1500, 50)
    ground.visible = false;


    stoneGroup = new Group();


}

function draw() {
    background(200);

    bat.velocityX = timmy.velocityX;
    bat.velocityY = timmy.velocityY;

    fill("blue")
    text("Score: " + score, 500, 50);
    
  console.log(gameState)

    if (gameState === "play") {

        gameOver.visible = false;
        restart.visible = false;

        background1.velocityX = -(4 + 3 * score / 100)
        
        score = score + Math.round(getFrameRate() / 60);

        spawnStone();
        console.log(timmy.y)

        if (background1.x < 0) {
            background1.x = background1.width / 2;
        }





        if (keyDown("space") && timmy.y >= 250) {
            timmy.velocityY = -15;

        }

        timmy.velocityY = timmy.velocityY + 0.5;


        if (stoneGroup.isTouching(timmy)) {
            gameState = "end";
    
    
        }
    }

    

        if (gameState === "end") {
          
        background(0)
        textSize(30);
        gameOver.visible = true;
        restart.visible = true;
   

        fill("yellow");
        text("GAME OVER", 200 , 200);
        
      







        background.velocityX = 0;
        timmy.velocityY = 0;




        stone.velocityX = 0;


        if ((restart)) {
            reset();
        }
       
        

    }




    
    timmy.collide(ground);

    
    
    timmy.debug = true;     
    timmy.setCollider("rectangle", 0, 0, 300, 300);

    drawSprites();
    
   

    
}

function spawnStone() {

    if (frameCount % 100 === 0) {
        var stone = createSprite(700, 500, 0, 0);
        stone.y = Math.round(random(250, 300));
        stone.addImage(stoneImg);
        stone.scale = 0.35;
        stone.velocityX = -5;
        stone.setCollider("rectangle", 0, 0, stone.height, stone.width);


        stone.depth = timmy.depth;
        timmy.depth = timmy.depth + 1;

        stoneGroup.add(stone)


    }
    
}

function reset() {
    gameState = PLAY;

    score = 0;
}
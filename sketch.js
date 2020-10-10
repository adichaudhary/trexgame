var trex, trexAnimation, trexCollided, ground, groundImage, invisibleGround, cloud, cloudImage, obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, cloudGroup, obstacleGroup, score, restart, restartImage, gameOver, gameOverSprite;

var PLAY=1, END=0, gameState=PLAY;

function preload(){
  trexAnimation = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexCollided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restartImage = loadImage("restart.png");
  gameOverSprite = loadImage('gameOver.png');
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(25,190, 20, 20);
  trex.addAnimation("run", trexAnimation);
  trex.addAnimation("stop", trexCollided);
  trex.scale = 0.5;
  
  ground = createSprite(300, 190, 600, 10);
  ground.addImage("floor", groundImage);
  ground.velocityX=-5;
  
  invisibleGround = createSprite(300, 200, 600, 10);
  invisibleGround.visible = false;
  
  restart = createSprite (300, 100);
  restart.addImage("reset", restartImage);
  restart.visible = false;
  restart.scale = 0.5;
  
  gameOver = createSprite (300, 50);
  gameOver.addImage("over", gameOverSprite);
  gameOver.visible = false;
  gameOver.scale = 0.5;

  score = 0;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(255);
  
  text("Score: " + score, 500, 50);
  trex.collide(invisibleGround);
  
  if(gameState===PLAY){
    if(ground.x<0){
    ground.x=ground.width/2;
    }
    
    ground.velocityX=-5;

    if(keyDown("space")&&trex.y===171.5){
      trex.velocityY = -12;
    }
    trex.velocityY = trex.velocityY+0.8;  
    
    score = score + Math.round(getFrameRate()/60);

    spawnClouds();
    spawnObstacles();
    
    if(obstacleGroup.isTouching(trex)){
      gameState=END;
    }
  }
  
  else if(gameState===END){
    ground.velocityX = 0;
    trex.velocityY=0;
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);  
    
    trex.changeAnimation("stop", trexCollided);
    gameOver.visible = true;
    restart.visible = true;
    
    if (mousePressedOver(restart)){
      reset();
    }
  }
  
  drawSprites();
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("run", trexAnimation);
  
  score = 0;
  
}
function spawnClouds() {
  if (frameCount%80===0) {
    cloud = createSprite(600, 140,10,10);
    cloud.addImage("rain", cloudImage);
    cloud.velocityX = -5;
    cloud.scale = 0.5;
    cloud.depth = trex.depth;
    trex.depth = trex.depth +1;
    cloud.lifetime = 120;
    cloudGroup.add(cloud);
    }  
}

function spawnObstacles(){
  if(frameCount%60===0){
    obstacle = createSprite(600, 175, 10, 10);
    obstacle.velocityX = -5;
    obstacle.scale=0.5;
    rand = Math.round(random(1, 6));
    
  switch(rand){
     case 1:
       obstacle.addImage(obstacle1);
     break;
     case 2:
       obstacle.addImage(obstacle2);
     break;
     case 3:
       obstacle.addImage(obstacle3);
     break;    
     case 4:
       obstacle.addImage(obstacle4);
     break;    
     case 5:
       obstacle.addImage(obstacle5);
     break; 
     case 6:
       obstacle.addImage(obstacle6);
     break;    
     default:
     break;
    }
    
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}
  
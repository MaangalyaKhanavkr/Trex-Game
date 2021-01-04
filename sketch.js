var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstaclesGroup, cloudsGroup;
var END = 0, PLAY = 1;
var gameState = PLAY;
var gameOver, restart, gameOverImage, restartImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloud_image = loadImage("cloud.png");
  groundImage = loadImage("ground2.png")
  obstacle_1 = loadImage("obstacle1.png");
  obstacle_2 = loadImage("obstacle2.png");
  obstacle_3 = loadImage("obstacle3.png");
  obstacle_4 = loadImage("obstacle4.png");
  obstacle_5 = loadImage("obstacle5.png");
  obstacle_6 = loadImage("obstacle6.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(300, 100, 20, 20);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  restart = createSprite(300, 140, 20, 20);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;
  
  score = 0;
  
}

function draw() {
  background(180);
  
  text ("score: "+ score, 500, 50);
  
  trex.collide(invisibleGround);
  
  
  if (gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  ground.velocityX = -6;
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
  spawnClouds();
  spawnObstacles();
  
    if (trex.isTouching(obstaclesGroup)){
      gameState = END;
    }
  
  }
  else if (gameState === END){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach (0);
    cloudsGroup.setVelocityXEach(0);
    trex.velocityY = 0;
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided", trex_collided);
    gameOver.visible = true;
    restart.visible = true;
    
    if (mousePressedOver(restart)){
      reset();
    }
  }
  drawSprites();
}

function spawnClouds(){
  if (frameCount % 60===0){
    cloud = createSprite(600, 150, 20, 20);
    cloud.scale = 0.5;
    cloud.velocityX = -2;
    cloud.addImage(cloud_image);
    cloud.y = Math.round (random(50,150));
    cloud.lifetime = 300;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles(){
  if (frameCount % 60===0){
    obstacle = createSprite(600, 170, 20, 20);
    obstacle.scale = 0.5;
    obstacle.velocityX = -6;
    rand = Math.round(random(1, 6));
    switch(rand){
      case 1: obstacle.addImage(obstacle_1);
              break;
      case 2: obstacle.addImage(obstacle_2);
              break;
      case 3: obstacle.addImage(obstacle_3);
              break;
      case 4: obstacle.addImage(obstacle_4);
              break;
      case 5: obstacle.addImage(obstacle_5);
              break;
      case 6: obstacle.addImage(obstacle_6);
              break;
      default: break;
    }
    obstacle.lifetime = 100;
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  score = 0;
  
}

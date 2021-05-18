var PC;
var Ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ObstaclesGroup;
var Score = 0;
var cloudsGroup;
var cloudImage;
var PCImage;
var ObstaclesImage;
function preload(){
  cloudImage = loadImage("/rainbow-clouds-png.png");
  PCImage = loadImage("/images.jpeg");
  ObstaclesImage = loadImage("/5-51323_clip-art-cactus-cactus-clipart.png");
}
function setup() {
  createCanvas(800,400);
  PC = createSprite(50, 380, 50, 50);
  Ground = createSprite(400,380,1600,20);
  Ground.x = Ground.width/2;
  ObstaclesGroup = new Group();
  cloudsGroup = new Group();
  PC.addImage(PCImage);
  PC.scale = 0.5
}

function draw() {
  background(255,255,255); 
  text("Score: "+Score, 700, 200);
  if(gameState === PLAY){
    Score = Score+Math.round((frameRate()/60));
    if(keyDown("space") && PC.y === 345){
      PC.velocityY = -10;
    } 
    PC.velocityY = PC.velocityY+0.5;
    Ground.velocityX = -8;
    if(Ground.x<0){
      Ground.x = Ground.width/2;
    }
    if(PC.isTouching(ObstaclesGroup)){
      gameState = END;
    }
    spawnObtacles();
    spawnClouds();
  }
  else{
    text("Game Over", 350,200);
    Ground.velocityX = 0;
   // Score = 0;
    ObstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  }

  
  PC.collide(Ground);
  console.log(PC.y);
  
  drawSprites();
}
function spawnObtacles(){
  if(frameCount%100===0){
    var Obstacles = createSprite(800,360,10,30);
    Obstacles.velocityX = -2;
    ObstaclesGroup.add(Obstacles);
    Obstacles.addImage(ObstaclesImage);
    Obstacles.scale = 0.3;
    Obstacles.collide(Ground);
  }
  
}
function spawnClouds(){
  if(frameCount%100===0){
    var clouds = createSprite(800,100, 20, 20);
    clouds.addImage(cloudImage);
    clouds.scale = 0.2;
    clouds.velocityX = -3;
    clouds.y = Math.round(random(60,100));
    cloudsGroup.add(clouds);
    console.log(clouds.depth);
    console.log(PC.depth);
    clouds.depth = PC.depth;
    PC.depth = PC.depth + 2;
  }
}
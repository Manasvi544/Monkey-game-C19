var PLAY = 1;
var END = 0;
var gameState = PLAY;

var banana,bananaImage,Obstaclegroup,obstacleImage,ground,bananagroup;
var background,score,player,player_running;
var score ;  
var gameOver,restart;
var gameOver_img,restart_img;

function preload(){
 backImage=loadImage("jungle.jpg");
  
player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
bananaImage = loadImage("Banana.png");
obstacleImage = loadImage("stone.png");
   gameOver_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");
}


function setup() {
  createCanvas(600,300);
  score = 0;
  bananagroup = new Group();
  Obstaclegroup = new Group();
  
  ground = createSprite(400,280,800,10);
  ground.velocityX = -4;
  ground.visible = false;
  
  background = createSprite(10,0,600,300);
  background.addImage("background",backImage);
  background.scale = 1.2;
  background.velocityX = -2;
  background.x = background.width/2;

  stroke("black");
  textSize(20);
  fill("white");

  player = createSprite(100,250,20,50);
  player.addAnimation("player",player_running);   
  player.scale = 0.1;
   
   gameOver = createSprite(280,100);
   restart = createSprite(300,140);
   gameOver.addAnimation("gameOver",gameOver_img);
   gameOver.scale = 0.5;
   restart.addAnimation("restart",restart_img);
   restart.scale = 0.5;
   gameOver.visible = false;
   restart.visible = false;
}
                             

function draw(){
if (background.x<0) {
   background.x = background.width/2;
}
  
   if(gameState === PLAY){
    if(bananagroup.isTouching(player)){
  bananagroup.destroyEach();
  score = score+2;
}      
     switch(score){
    case 10 : player.scale = 0.12;
              break;
    case 20 : player.scale = 0.14;
              break;
    case 30 : player.scale = 0.16;  
              break;
    case 40 : player.scale = 0.18;
              break;
    default: break;
}
 if(Obstaclegroup.isTouching(player)){
    player.scale = 0.1;
  }
     
   ground.x = ground.width/2;
  
if(keyDown("space")&&player.collide(ground)){
  player.velocityY = -10 ;
}
  
  player.velocityY = player.velocityY + 0.8;
     
  Obstacles();
  Banana();
     if(Obstaclegroup.isTouching(player)){
     gameState = END;
     }
   }
   else if(gameState === END){
     ground.velocityX = 0;
    player.velocityY = 0;
    Obstaclegroup.setVelocityXEach(0);
    bananagroup.setVelocityXEach(0);
    
     Obstaclegroup.setLifetimeEach(-1);
    bananagroup.setLifetimeEach(-1);
    
  gameOver.visible =true;
  restart.visible = true;
   }
  
  

 

  player.collide(ground);
 

  
 
  drawSprites();
  text("Score:"+score,100,80);
 }

function Banana(){
if(World.frameCount % 80 === 0){
    var banana = createSprite(600,200,40,10);
    banana.y = random(120,200);
    banana.addAnimation("Banana",bananaImage);
    banana.scale = 0.06;
    banana.velocityX = -3;
    banana.lifetime = 195;
    bananagroup.add(banana);
 }
}
function Obstacles() {
if(World.frameCount % 300 === 0) {
   var obstacle = createSprite(600,250,30,40);
   obstacle.velocityX = -6;
   obstacle.addImage("obstacle",obstacleImage);
   obstacle.scale = 0.15;
   obstacle.lifetime = 290;
   Obstaclegroup.add(obstacle);
  }
}

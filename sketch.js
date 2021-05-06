var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;
 
var player,playerimage;
var background1,background1image;
var tiger,tigerimage,TigersGroup;
var coin,coinimage,CoinsGroup ;

var youdied,youdiedimage,restart,restartimage;

var score = 0;

  function preload()
  {
    
  playerimage=loadAnimation("image1.png","image2.png","image3.png","image4.png","image5.png","image6.png","image7.png","image8.png","image9.png","image10.png");
    
  tigerimage=loadAnimation("tiger1-removebg-preview.png","tiger2-removebg-preview.png","tiger3-removebg-preview.png","tiger4-removebg-preview.png","tiger5-removebg-preview.png","tiger5-removebg-preview.png")  ;
    
    
  background1image=loadImage("background1.png");
    
  coinimage=loadAnimation("coin1-removebg-preview.png","coin2-removebg-preview.png","coin3-removebg-preview.png","coin4-removebg-preview.png","coin5-removebg-preview.png","coin6-removebg-preview.png","coin7-removebg-preview.png","coin8-removebg-preview.png")  
    
  youdiedimage=loadImage("youdied-removebg-preview.png");
  restartimage=loadImage("restart-removebg-preview.png"); 
    
    
    
  score = 0; 
    
  }


  function setup() {
  createCanvas(600, 450);
  
  //creating background
    
  background1=createSprite(300,225,60,50);  
  background1.addImage("background1",background1image)
  background1.scale= 0.50;
    
    
  player=createSprite(50,370,100,100); 
  player.addAnimation("player",playerimage) ; 
  player.scale=0.60;
    
    
  invisibleGround = createSprite(60,420,8000,10);
  invisibleGround.visible = false;  
  
    
   youdied=createSprite(300,100,20,20);  
   youdied.addImage(youdiedimage) ;
    
    
    
   restart=createSprite(300,280,20,20);
   restart.addImage(restartimage);
   restart.scale= 0.5; 
    
    
    
  
   CoinsGroup = new Group();
   TigersGroup = new Group();
    
    
    youdied.visible = false;
    restart.visible = false;
  
  }

  function draw() {
  
    if (gameState===PLAY){
      
  
   background1.velocity.x =-8;
    
     if (background1.x < 0)
      {
      background1.x = background1.width/6;
      }
      
      if(keyDown("space")) {
      player.velocityY = -15;
    }
     
    player.velocityY = player.velocityY + 0.5      ;
  
     if( CoinsGroup.isTouching(player)){ 
     CoinsGroup.destroyEach();
     score = score+1  
       
     }
      
      
     if(TigersGroup.isTouching(player))
     {
      CoinsGroup.destroyEach();
      gameState =END;       
       
       }     
    }
   
    
   if(gameState===END){
     
     youdied.visible = true;
     restart.visible = true;
     
     coin.visible =false
     tiger.visible =false;
     player.visible =false;
     
     
      background1.velocityX = 0;
     player.velocityY=0;
     CoinsGroup.setVelocityXEach(0);
     TigersGroup.setVelocityXEach(0)
     
     
     CoinsGroup.setLifetimeEach(-1)
     TigersGroup.setLifetimeEach(-1)
     
     if(mousePressedOver(restart)) {
      reset();
    }
     
     
   } 
    
    
    
  player.collide(invisibleGround);
    
  
  drawSprites();
  spawnCoins();
  spawnTigers();
    
    fill("black");
   text("score = " + score, 50,50);
 
  }



  function spawnCoins(){
    
  if (frameCount % 40 === 0){
  coin = createSprite(400,150,100,100);
  coin.y = Math.round(random(100,130))  
  coin.addAnimation("coin",coinimage); 
  coin.scale=0.40; 
  coin.velocityX = -3;  
    
  //coin.debug = true
    
   CoinsGroup.add(coin);
    
    
   }
  }

  
  
   function spawnTigers(){
     
     
     
   if (frameCount % 150 === 0){  
  tiger=createSprite(500,390,100,100); 
  tiger.x = Math.round(random(450,500)) 
  tiger.addAnimation("tiger",tigerimage);
  tiger.velocityX = -8; 
     
  //tiger.debug = true   
     
  TigersGroup.add(tiger);
     
     
    }
   }

 function reset(){  
   gameState = PLAY;
   
     youdied.visible = false;
     restart.visible = false;
    
     CoinsGroup.destroyEach();
    TigersGroup.destroyEach();
   
     coin.visible =true;
     tiger.visible =true;
    player.visible =true;

   
     


 }

 
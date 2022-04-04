var trex, trexRunning, trexCollide;
var edges;
var solo, imageSolo;
var SoloInvisivel;
var clouds, imageClouds;
var cactos, imageCacto1, imageCacto2, imageCacto3, imageCacto4, imageCacto5, imageCacto6; 
var score=0;
var play=1;
var end=0;
var gameState=play;
var cloudsGroup, cactosGroup;
var gameOver, imageGameOver;
var restart, imageRestart;
var record=0;
var soundJump, soundDie, soundCheckpoint;



//preload carrega as midías
function preload(){
 //animação do Trex
  trexRunning = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexCollide = loadAnimation("trex_collided.png");
  //imagem do solo
  imageSolo = loadImage("ground2.png");
  // imagem nuvens
  imageClouds = loadImage("cloud.png");
  imageCacto1 = loadImage("obstacle1.png");
  imageCacto2 = loadImage("obstacle2.png");
  imageCacto3 = loadImage("obstacle3.png");
  imageCacto4 = loadImage("obstacle4.png");
  imageCacto5 = loadImage("obstacle5.png");
  imageCacto6 = loadImage("obstacle6.png");

  imageGameOver = loadImage("gameOver.png");
  imageRestart = loadImage("restart.png");

  soundJump = loadSound("jump.mp3");
  soundDie = loadSound("die.mp3");
  soundCheckpoint = loadSound("checkpoint.mp3");

}
//setup faz aconfiguração
function setup(){
  createCanvas(windowWidth,windowHeight)
  // criando as bordas
  edges = createEdgeSprites();
  //crie um sprite de trex
  trex = createSprite(50,height-40,20,50);
  // adicione dimensão e posição ao trex
  trex.addAnimation("running", trexRunning);
  trex.addAnimation("collided", trexCollide);
  trex.scale=0.5;
  trex.debug=false;
  trex.setCollider("rectangle", 0, 0, 50,50, 60);
  //trex.setCollider("circle", 0, 0, 20)
  //sprite do solo
  solo =createSprite(width/2,height-30,width,2);
  solo.addImage("solo", imageSolo);
  soloInvisivel = createSprite(width/2,height-10,width,2);
  soloInvisivel.visible = false;

  cloudsGroup=new Group();
  cactosGroup=new Group();

  gameOver=createSprite(width/2,height-140,100,20);
  gameOver.addImage(imageGameOver);
  gameOver.scale=0.6;
  gameOver.visible=false;
  restart=createSprite(width/2,height-100,80,20);
  restart.addImage(imageRestart);
  restart.scale=0.5;
  restart.visible=false;
}
//draw faz o movimento, a ação do jogo
function draw(){
  background("white");

  if(trex.isTouching(cactosGroup)){
    gameState=end;

    soundDie.play(); 


  }

  if(gameState===play){
    score+=Math.round(getFrameRate()/60);
    if(score%100===0&&score>0){
      soundCheckpoint.play();
    }
    if(touches.length>0||keyDown("space")&& trex.y>height-36) {
      trex.velocityY = -13;

      soundJump.play();

      touches=[];

    }
    solo.velocityX =-(12 +score/100);
      if( solo.x<800){
        solo.x=solo.width/2;
      }
      createCactos();
      createClouds();

  }
  
  if(gameState===end){
    trex.changeAnimation("collided", trexCollide);
    solo.velocityX=0;
    cloudsGroup.setVelocityXEach(0);
    cactosGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    cactosGroup.setLifetimeEach(-1);

    gameOver.visible=true;
    restart.visible=true;

    if(record<score){
      record=score;
    }

    if(mousePressedOver(restart)){
      gameState=play;
      gameOver.visible=false;
      restart.visible=false;

      cactosGroup.destroyEach();
      cloudsGroup.destroyEach();   

      trex.changeAnimation("running", trexRunning);

      //frameCount=0; 
      score=0;


    }
  }

  //var sorteio = Math.round(random(1,6));
  //  console.log(sorteio);
  // dando velocidade ao solo
  
//texto para vida
  textSize(18);
  textAlign(CENTER, TOP);
  stroke("black");
  fill("black");
  text("Score: " +score, width-60,height-175);
  text("Record: " +record, width-60,height-150);
 // chamando a  função de gravidade
  gravity();
  //colisão do trex com as bordas
    trex.collide(soloInvisivel);
    //console.log(trex.Y); 
   //coordenadas do mouse na tela
  text("X: "+mouseX+"/ Y: "+mouseY,mouseX,mouseY);
  drawSprites();

}
// função de gravidade
function gravity(){
  trex.velocityY+=0.5;
}
function createClouds(){
  if(frameCount%80==0){
    clouds = createSprite(width,random(height-182,height-107),40,10);
    clouds.velocityX=-(5 +score/100);
    clouds.addImage(imageClouds)
    clouds.scale=random(0.4,1.4);
    clouds.depth=trex.depth-1;
    clouds.lifetime=width/clouds.velocityX;
    cloudsGroup.add(clouds);
  }
}
function createCactos(){
  if(frameCount%80==0){
    cactos = createSprite(width,height-35,40,10);
    cactos.velocityX=-(6 +score/100);
    cactos.scale=0.5;
    cactos.depth=trex.depth;
    cactos.lifetime=width/cactos.velocityX;
    cactosGroup.add(cactos);
    var sorteioCactos = Math.round(random(1,6));
    switch (sorteioCactos){
      case 1: cactos.addImage(imageCacto1);
      break;
      case 2: cactos.addImage(imageCacto2);
      break;
      case 3: cactos.addImage(imageCacto3);
      break;
      case 4: cactos.addImage(imageCacto4);
      break;
      case 5: cactos.addImage(imageCacto5);
      break;
      case 6: cactos.addImage(imageCacto6);
      break;
    }
  }
}



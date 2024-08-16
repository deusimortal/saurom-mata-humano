var guerra,guerraimg;
var saurom,sauromimg,humanos,humanosimg;
var sauromatira;
var horda
var oparatodosgovernar;
var anelimg,anel2img,oparatodosgovernarimg;
var nazgul,nazguls;
var nazgulsimg;

function preload(){
  guerraimg = loadImage("assets/fundo mordor.jpg");
  sauromimg = loadImage("assets/olho saurom.png");
  humanosimg = loadImage("assets/guerreiro.png");
  sauromatira = loadImage("assets/sauromatira.png");
  oparatodosgovernarimg = loadImage("assets/anel.png");
  nazgulsimg = loadImage("assets/nazgul.png");
  //anelimg = loadImage("assets/heart_1.png");
  //anel2img = loadImage("assets/heart_2.png");

}

function setup() {
createCanvas(windowWidth,windowHeight);

guerra = createSprite(windowWidth/2,windowHeight/2+40,30,31)
guerra.addImage(guerraimg);
guerra.scale = 1.4;
saurom= createSprite(windowWidth/2-540,windowHeight/2+100,60,60);
saurom.addImage(sauromimg);
saurom.scale = 0.4;
saurom.setCollider("rectangle",0,0,500,400);
saurom.debug = true;
horda = new Group();
/*anel = createSprite(windowWidth-150,40,20,20);
anel.addImage(amorimg);
anel.scale = 0.4;
anel.visible = true;
amor2 = createSprite(windowWidth-100,40,20,20);
amor2.addImage(amor2img);
amor2.scale = 0.4
amor2.visible = false;*/
oparatodosgovernar = createSprite(windowWidth-150,40,20,20);
oparatodosgovernar.addImage(oparatodosgovernarimg);
oparatodosgovernar.scale = 0.35
oparatodosgovernar.visible = true;
nazguls = new Group();
}

function draw() {
  background(0);
  if(keyDown("UP_ARROW")||touches.lenght>0.1){
    saurom.y = saurom.y-15;
  }
  if(keyDown("DOWN_ARROW")||touches.lenght>0.1){
    saurom.y = saurom.y+15;
  }
  if(keyDown("LEFT_ARROW")||touches.lenght>0.1){
    saurom.x = saurom.x-15;
  }
  if(keyDown("RIGHT_ARROW")||touches.lenght>0.1){
    saurom.x = saurom.x+15;
  }
  if(keyWentDown("t")||touches.lenght>2){
    saurom.addImage(sauromatira);
    nazgul = createSprite(saurom.x+75,saurom.y-30,15,15);
    nazgul.velocityX = 20;
    nazgul.setCollider("rectangle",0,0,16,16);
    nazgul.lifetime = 40
    nazgul.depth = guerra.depth;
    nazgul.depth = nazgul.depth+1;
    nazgul.depth = nazgul.depth;
    nazgul.addImage(nazgulsimg);
    nazgul.scale = 0.3;
    nazguls.add(nazgul);
     
  }
  else if(keyWentUp("t")){
    saurom.addImage(sauromimg)
  }

  if(horda.isTouching(nazguls)|| horda.isTouching(saurom)){
   for(var rei = 0;
    rei<horda.length;
    rei++){
      if(horda[rei].isTouching(nazguls)|| horda[rei].isTouching(saurom)){
        horda[rei].destroy();
      }
    } 
  }
  
  criarguerreiros();
  
  drawSprites();
}

function criarguerreiros(){
  if(frameCount%20===0){
    humanos =createSprite(random(1401,1499),random(500,822),40,40);
    humanos.addImage(humanosimg);
    humanos.scale = 0.4;
    humanos.lifetime = 201;
    humanos.velocityX = -7;
    humanos.setCollider("rectangle",0,0,300,450);
    humanos.debug = true;
    horda.add(humanos); 
  }
}
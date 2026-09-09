var guerra, guerraimg;
var sauron, sauronimg, humanosimg, sauronAtira;
var anel, anelimg, nazgulsimg;
var horda, nazguls;
var estado = "menu";
var pontuacao = 0;
var vidas = 3;
var nivel = 1;
var proximoDisparo = 0;
var ultimoSpawn = 0;
var toqueDisparou = false;
var ataqueAnterior = false;

var VELOCIDADE_SAURON = 9;
var INTERVALO_DISPARO = 10;
var LARGURA_BOTAO_TOQUE = 190;

function preload() {
  guerraimg = loadImage("assets/fundo mordor.jpg");
  sauronimg = loadImage("assets/olho saurom.png");
  humanosimg = loadImage("assets/guerreiro.png");
  sauronAtira = loadImage("assets/sauromatira.png");
  anelimg = loadImage("assets/anel.png");
  nazgulsimg = loadImage("assets/nazgul.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  horda = new Group();
  nazguls = new Group();

  guerra = createSprite(width / 2, height / 2, width, height);
  guerra.addImage(guerraimg);
  ajustarFundo();
  guerra.depth = 0;

  sauron = createSprite(100, height / 2, 60, 60);
  sauron.addImage(sauronimg);
  sauron.scale = 0.4;
  sauron.setCollider("rectangle", 0, 0, 180, 150);
  sauron.depth = 5;

  anel = createSprite(width - 60, 44, 30, 30);
  anel.addImage(anelimg);
  anel.scale = 0.22;
  anel.depth = 6;
}

function draw() {
  background(12, 10, 12);

  if (estado === "jogando") {
    moverSauron();
    controlarDisparo();
    criarGuerreiros();
    atualizarColisoes();
  }

  drawSprites();
  desenharInterface();
}

function moverSauron() {
  var movimentoX = 0;
  var movimentoY = 0;

  if (keyIsDown(UP_ARROW)) movimentoY -= 1;
  if (keyIsDown(DOWN_ARROW)) movimentoY += 1;
  if (keyIsDown(LEFT_ARROW)) movimentoX -= 1;
  if (keyIsDown(RIGHT_ARROW)) movimentoX += 1;

  if (touches.length > 0 && touches[0].x < LARGURA_BOTAO_TOQUE) {
    var centroX = 95;
    var centroY = height - 95;
    var diferencaX = touches[0].x - centroX;
    var diferencaY = touches[0].y - centroY;

    if (abs(diferencaX) > abs(diferencaY)) {
      movimentoX = diferencaX < 0 ? -1 : 1;
    } else if (abs(diferencaY) > 20) {
      movimentoY = diferencaY < 0 ? -1 : 1;
    }
  }

  sauron.x += movimentoX * VELOCIDADE_SAURON;
  sauron.y += movimentoY * VELOCIDADE_SAURON;
  sauron.x = constrain(sauron.x, 45, width - 45);
  sauron.y = constrain(sauron.y, 80, height - 55);
}

function controlarDisparo() {
  var ataqueAtivo = keyIsDown(84) || keyIsDown(32);
  var disparou = ataqueAtivo && !ataqueAnterior;

  if (touches.length > 0 && touches[0].x >= LARGURA_BOTAO_TOQUE) {
    if (!toqueDisparou) {
      disparou = true;
      toqueDisparou = true;
    }
  } else {
    toqueDisparou = false;
  }

  if (disparou && frameCount >= proximoDisparo) {
    dispararNazgul();
    proximoDisparo = frameCount + INTERVALO_DISPARO;
  }

  if (ataqueAtivo) {
    sauron.addImage(sauronAtira);
  } else {
    sauron.addImage(sauronimg);
  }
  ataqueAnterior = ataqueAtivo;
}

function dispararNazgul() {
  var nazgul = createSprite(sauron.x + 55, sauron.y - 8, 18, 18);
  nazgul.addImage(nazgulsimg);
  nazgul.scale = 0.3;
  nazgul.velocityX = 18;
  nazgul.lifetime = 70;
  nazgul.depth = 4;
  nazgul.setCollider("rectangle", 0, 0, 18, 18);
  nazguls.add(nazgul);
}

function criarGuerreiros() {
  var intervalo = max(9, 25 - nivel * 2);

  if (frameCount - ultimoSpawn >= intervalo) {
    var guerreiro = createSprite(width + 45, random(90, height - 65), 40, 40);
    guerreiro.addImage(humanosimg);
    guerreiro.scale = 0.4;
    guerreiro.velocityX = -(4 + nivel * 0.7);
    guerreiro.setCollider("rectangle", 0, 0, 120, 180);
    guerreiro.depth = 3;
    horda.add(guerreiro);
    ultimoSpawn = frameCount;
  }
}

function atualizarColisoes() {
  for (var indice = horda.length - 1; indice >= 0; indice--) {
    var guerreiro = horda[indice];

    if (guerreiro.x < -60) {
      guerreiro.destroy();
      vidas--;
    } else if (guerreiro.isTouching(sauron)) {
      guerreiro.destroy();
      vidas--;
    } else {
      for (var tiro = nazguls.length - 1; tiro >= 0; tiro--) {
        if (guerreiro.isTouching(nazguls[tiro])) {
          guerreiro.destroy();
          nazguls[tiro].destroy();
          pontuacao += 10;
          atualizarNivel();
          if (pontuacao >= 500) {
            estado = "vitoria";
            limparEntidades();
          }
          break;
        }
      }
    }
  }

  if (vidas <= 0) {
    estado = "fim";
    limparEntidades();
  }
}

function atualizarNivel() {
  nivel = floor(pontuacao / 100) + 1;
}

function iniciarJogo() {
  limparEntidades();
  pontuacao = 0;
  vidas = 3;
  nivel = 1;
  ultimoSpawn = 0;
  proximoDisparo = 0;
  ataqueAnterior = false;
  sauron.x = 100;
  sauron.y = height / 2;
  estado = "jogando";
}

function limparEntidades() {
  for (var indice = horda.length - 1; indice >= 0; indice--) {
    horda[indice].destroy();
  }
  for (var tiro = nazguls.length - 1; tiro >= 0; tiro--) {
    nazguls[tiro].destroy();
  }
}

function desenharInterface() {
  fill(255);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(18);

  if (estado === "jogando") {
    text("Pontos: " + pontuacao, 20, 18);
    text("Vidas: " + vidas, 20, 43);
    text("Nivel: " + nivel, 20, 68);
    textAlign(RIGHT, TOP);
    text("T ou ESPACO para atacar", width - 20, 75);
    desenharControlesToque();
  } else {
    desenharPainelEstado();
  }
}

function desenharPainelEstado() {
  fill(0, 0, 0, 185);
  rect(0, 0, width, height);
  textAlign(CENTER, CENTER);
  fill(255, 215, 110);
  textSize(min(42, width / 10));
  text(estado === "menu" ? "SAURON: DEFESA DE MORDOR" : "MORDOR FOI INVADIDA", width / 2, height / 2 - 70);
  fill(255);
  textSize(20);
  text(estado === "menu" ? "Derrote os guerreiros antes que eles alcancem Sauron" : estado === "vitoria" ? "Mordor esta segura. Pontuacao: " + pontuacao : "Pontuacao final: " + pontuacao, width / 2, height / 2 - 18);
  textSize(18);
  text("Setas movimentam  |  T ou ESPACO ataca", width / 2, height / 2 + 25);
  fill(255, 215, 110);
  text(estado === "menu" ? "Clique ou pressione ENTER para comecar" : "Clique ou pressione ENTER para jogar novamente", width / 2, height / 2 + 75);
}

function desenharControlesToque() {
  if (width > 700) return;

  noFill();
  stroke(255, 215, 110, 150);
  ellipse(95, height - 95, 130, 130);
  ellipse(width - 75, height - 75, 90, 90);
  noStroke();
  fill(255, 215, 110, 190);
  textAlign(CENTER, CENTER);
  textSize(14);
  text("MOVER", 95, height - 95);
  text("ATACAR", width - 75, height - 75);
}

function mousePressed() {
  if (estado !== "jogando") iniciarJogo();
}

function keyPressed() {
  if (keyCode === ENTER && estado !== "jogando") iniciarJogo();
}

function touchStarted() {
  if (estado !== "jogando") iniciarJogo();
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ajustarFundo();
  anel.x = width - 60;
  anel.y = 44;
  if (estado !== "jogando") {
    sauron.x = 100;
    sauron.y = height / 2;
  }
}

function ajustarFundo() {
  guerra.x = width / 2;
  guerra.y = height / 2;
  guerra.scale = max(width / guerraimg.width, height / guerraimg.height);
}
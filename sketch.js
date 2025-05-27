// Definindo Variais globais
let jardineiro;
let plantas = [];
let temperatura = 10;
let totalArvores = 0;


function setup() {
  createCanvas(600, 400);
  jardineiro = new Jardineiro(width / 2, height - 50);
}

function draw() {
  // Usando map () para ajustara cor de fundo de forma mais controlada
  let corFundo = lerpColor(
    color(217, 112, 26),
    color(219, 239, 208),
    map(totalArvores, 0, 100, 0, 1));

  background(corFundo);

  mostrarInformacoes();

  temperatura += 0.1;

  jardineiro.atualizar();
  jardineiro.mostrar();

  //Verifica se o Jogo acabou
  verificarFimDeJogo();

  // Usando map() para aplicar o comportamento de arvores plantadas
  plantas.map((arvore) => arvore.mostrar());
  
  
}
//Função para mostrar as informacoes tela
function mostrarInformacoes() {
  textSize(26);
  fill(0);
  text("Vamos plantar arvores para reduzir a temperatura?", 10,30);
  textSize(14);
  fill("white");
  text("Temperatura: " + temperatura.toFixed(2), 10, 390);
  text("Arvores plantadas: " + totalArvores, 460, 390);
  text("Para movimentar o personagem use as setas do teclado. ", 10, 60);
  text("Para plantar arvores use P ou espaço.", 10, 80);
}

// Função para verificar se o jogo acabou
function verificarFimDeJogo() {
  if (totalArvores > temperatura) {
    mostrarMensagemDeVitoria();
  } else if (temperatura > 50) {
    mostrarMensagemDeDerrota();
  }
}

//Função para mostrar a mensagem de vitoria
function mostrarMensagemDeVitoria() {
  textSize(20);
  fill(0, 0, 0);
  text("✌😜✌ Voce venceu! Voce plantou muitas arvores!", 100, 200);
  noLoop();
}

//Função para mostrar a mensagem de derrota
function mostrarMensagemDeDerrota() {
  textSize(20);
  fill(255, 0, 0);
  text("😔👎 Voce perdeu! A temperatura esta muito alta.", 100, 200);
  noLoop();
}

//Classe que cria o Jardineiro
class Jardineiro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.emoji = "👨‍🌾";
    this.velocidade = 3;
  }

  //Função para atualizar a posiçãodo jardineiro
  atualizar() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.velocidade;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.velocidade;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.velocidade;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.velocidade;
    }
  }

  //Função para desenhar o jardineiro na tela
  mostrar() {
    textSize(32);
    text(this.emoji, this.x, this.y);
  }
}

//Função para criar e plantar uma arvore
function keyPressed() {
  if (key === ' ' || key === 'p') {
    let arvore = new Arvore(jardineiro.x, jardineiro.y);
    plantas.push(arvore);
    totalArvores++;
    temperatura -= 3;
    if (temperatura < 0) temperatura = 0;
  }
}

// Classe que cria a arvore
class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.emoji = '🌳';
  }

  // Função para desenhar arvore na tela
  mostrar() {
    textSize(32);
    text(this.emoji, this.x, this.y);
  
}
}

import "./style.css";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

//variáveis da bola
let xBola = 300;
let yBola = 200;
const diametroBola = 20;
const raioBola = diametroBola / 2;

//velocidade da bola
let velocidadeXBola = 5;
let velocidadeYBola = 5;

//raquete 1
let xRaquete = 0;
let yRaquete = 150;
let wRaquete = 10;
let hRaquete = 90;

//oponente
let xOponente = 590;
let yOponente = 150;
let wOponente = 10;
let hOponente = 90;

//velocidade do oponente
let velocidadeYOponente = 0;

//placar
let meusPontos = 0;
let oponentePontos = 0;

//tamanho do canvas
canvas.width = 600;
canvas.height = 400;

//controles
let cimaPrecionado = false;
let baixoPrecionado = false;

//cria a bola
function desenhaBola() {
    ctx.beginPath();
    ctx.arc(xBola, yBola, raioBola, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

//cria a raquete
function desenhaRaquete() {
    ctx.beginPath();
    ctx.rect(xRaquete, yRaquete, wRaquete, hRaquete);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function desenhaRaqueteOponente() {
    ctx.beginPath();
    ctx.rect(xOponente, yOponente, wOponente, hOponente);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function posicaobola() {
    xBola += velocidadeXBola;
    yBola += velocidadeYBola;
}

function colisaoComBorda() {
    if (xBola + raioBola > 600 || xBola - raioBola < 0) {
        velocidadeXBola *= -1;
    }
    if (yBola + raioBola > 400 || yBola - raioBola < 0) {
        velocidadeYBola *= -1;
    }
}

function moveRaquete() {
    document.onkeydown = (e) => {
        if (e.code === "ArrowDown") {
            baixoPrecionado = true;
        } else if (e.code === "ArrowUp") {
            cimaPrecionado = true;
        }
    };
    document.onkeyup = (e) => {
        if (e.code === "ArrowDown") {
            baixoPrecionado = false;
        } else if (e.code === "ArrowUp") {
            cimaPrecionado = false;
        }
    };

    if (baixoPrecionado && yRaquete < canvas.height - hRaquete) {
        yRaquete += 7;
    } else if (cimaPrecionado && yRaquete > 0) {
        yRaquete -= 7;
    }
}

function colisaoRaquete() {
    if (
        xBola - raioBola < xRaquete + wRaquete &&
        yBola - raioBola < yRaquete + hRaquete &&
        yBola + raioBola > yRaquete
    ) {
        velocidadeXBola *= -1;
    }
}

function colisaoOponente() {
    if (
        xBola + raioBola > xOponente &&
        yBola - raioBola < yOponente + hOponente &&
        yBola + raioBola > yOponente
    ) {
        velocidadeXBola *= -1;
    }
}

function oponenteJoga() {
    velocidadeYOponente = yBola - yOponente - hRaquete / 2;
    yOponente += velocidadeYOponente;
}

function pontuacao() {
    if (xBola - raioBola < -1) {
        oponentePontos += 1;
    }
    if (xBola + raioBola > 601) {
        meusPontos += 1;
    }
}

function placar() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "deeppink";
    ctx.fillText(`${meusPontos}`, 260, 25);

    ctx.font = "24px Arial";
    ctx.fillStyle = "deeppink";
    ctx.fillText(`${oponentePontos}`, 340, 25);
}

function desenha() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenhaBola();
    desenhaRaquete();
    desenhaRaqueteOponente();
    posicaobola();
    colisaoComBorda();
    moveRaquete();
    colisaoRaquete();
    oponenteJoga();
    colisaoOponente();
    pontuacao();
    placar();

    requestAnimationFrame(desenha);
}

desenha();

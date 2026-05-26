var canvas = document.querySelector('canvas');
canvas.width = 801;
canvas.height = 601;

var c = canvas.getContext('2d');

var posXQuadrado1 = 50;
var posYQuadrado1 = 50;
var tam = 50;

var teclas = {};
var velocidadeX = 5;
var velocidadeY = 15;

var gravidadeValor = 0.5;
var velGravidadeY = 0;
var onGround = false;

var colisoes = [
    { x: 0, y: 600, width: 800, height: 1, cor: "#000000" },
    { x: 0, y: 0, width: 800, height: 1, cor: "#000000" },
    { x: 800, y: 0, width: 1, height: 600, cor: "#000000" },
    { x: 0, y: 0, width: 1, height: 600, cor: "#000000" },

    { x: 100, y: 400, width: 200, height: 5, cor: "#005fb8" },
    { x: 400, y: 300, width: 200, height: 5, cor: "#00B806" },
    { x: 300, y: 200, width: 100, height: 5, cor: "#00B806" },
    { x: 350, y: 100, width: 100, height: 5, cor: "#00B806" },
    { x: 350, y: 350, width: 20, height: 200, cor: "#00B806" }
];

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && onGround) {
        velGravidadeY = -velocidadeY;
        onGround = false;
    }
    teclas[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    teclas[event.key] = false;
});

logicaBase();

function logicaBase() {
    requestAnimationFrame(logicaBase);
    c.clearRect(0, 0, canvas.width, canvas.height);
    desenharMapa();
    movimentoBase();
}

function desenharMapa() {
    for (let bloco of colisoes) {
        c.fillStyle = bloco.cor;
        c.fillRect(bloco.x, bloco.y, bloco.width, bloco.height);
    }
}

function colisaoAABB(xQuadrado, yQuadrado, wQuadrado, hQuadrado, xCenario, yCenario, wCenario, hCenario) {
    return xQuadrado < xCenario + wCenario && // se a borda esquerda do player tá antes da borda direita do cenário
        xQuadrado + wQuadrado > xCenario && // se a borda direita do player passou da borda esquerda do cenário
        yQuadrado < yCenario + hCenario && // se o topo do player está acima da base do cenário
        yQuadrado + hQuadrado > yCenario; // se a base do player está acima do topo do cenário
    // se tudo for verdadeiro, ent significa que tá colidindo
}

function movimentoBase() {
    let nextX = posXQuadrado1;

    if (teclas["ArrowLeft"]) {
        nextX -= velocidadeX;
    }
    if (teclas["ArrowRight"]) {
        nextX += velocidadeX;
    }

    for (let bloco of colisoes) {
        if (colisaoAABB(nextX, posYQuadrado1, tam, tam, bloco.x, bloco.y, bloco.width, bloco.height)) {
            if (nextX > posXQuadrado1) {
                nextX = bloco.x - tam;
            } else if (nextX < posXQuadrado1) {
                nextX = bloco.x + bloco.width;
            }
        }
    }

    posXQuadrado1 = nextX;

    velGravidadeY += gravidadeValor;
    let nextY = posYQuadrado1 + velGravidadeY;

    onGround = false;

    for (let bloco of colisoes) {
        if (colisaoAABB(posXQuadrado1, nextY, tam, tam, bloco.x, bloco.y, bloco.width, bloco.height)) {
            if (velGravidadeY > 0) {
                nextY = bloco.y - tam;
                velGravidadeY = 0;
                onGround = true;
            } else if (velGravidadeY < 0) {
                nextY = bloco.y + bloco.height;
                velGravidadeY = 0;
            }
        }
    }

    posYQuadrado1 = nextY;

    c.fillStyle = "#f4f800c4";
    c.fillRect(posXQuadrado1, posYQuadrado1, tam, tam);
}

function mouseBotao() {

}
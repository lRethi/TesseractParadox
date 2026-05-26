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

var mouseX = 0;
var mouseY = 0;
var x = 250, y = 150;

var gameMap = [
    { x: 0, y: 600, width: 800, height: 1, cor: "#000000", colPlayer: true, colMouse: true },
    { x: 0, y: 0, width: 800, height: 1, cor: "#000000", colPlayer: true, colMouse: true },
    { x: 800, y: 0, width: 1, height: 600, cor: "#000000", colPlayer: true, colMouse: true },
    { x: 0, y: 0, width: 1, height: 600, cor: "#000000", colPlayer: true, colMouse: true },

    { x: 100, y: 400, width: 200, height: 5, cor: "#00b80f", colPlayer: true, colMouse: true },
    { x: 400, y: 300, width: 200, height: 5, cor: "#00b81f", colPlayer: true, colMouse: true },
    { x: 300, y: 200, width: 100, height: 5, cor: "#00B806", colPlayer: true, colMouse: true },
    { x: 350, y: 100, width: 100, height: 5, cor: "#b86800", colPlayer: true, colMouse: false },
    { x: 350, y: 350, width: 20, height: 200, cor: "#b80099", colPlayer: false, colMouse: true },

    { x: 350, y: 350, width: 20, height: 20, cor: "#000000", colPlayer: true, colMouse: true },
    { x: 350, y: 530, width: 20, height: 20, cor: "#000000", colPlayer: true, colMouse: true }
];

canvas.addEventListener("mousemove", function (event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
});

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
    mouseBolinha();
}

function desenharMapa() {
    for (let bloco of gameMap) {
        c.fillStyle = bloco.cor;
        c.fillRect(bloco.x, bloco.y, bloco.width, bloco.height);
    }
}

function colisaoAABB(xQuadrado, yQuadrado, wQuadrado, hQuadrado, xCenario, yCenario, wCenario, hCenario, podeColidir) {
    return xQuadrado < xCenario + wCenario && // se a borda esquerda do player tá antes da borda direita do cenário
        xQuadrado + wQuadrado > xCenario && // se a borda direita do player passou da borda esquerda do cenário
        yQuadrado < yCenario + hCenario && // se o topo do player está acima da base do cenário
        yQuadrado + hQuadrado > yCenario && // se a base do player está acima do topo do cenário
        podeColidir == true;
    // se tudo for verdadeiro, ent significa que tá colidindo
}

function mouseBolinha() {
    let raio = 10;

    let nextX = x + (mouseX - x) * 0.1;
    let nextY = y + (mouseY - y) * 0.1;

    for (let bloco of gameMap) {
        if (!bloco.colMouse) continue;

        if (colisaoAABB(
            nextX - raio, y - raio, raio * 2, raio * 2,
            bloco.x, bloco.y, bloco.width, bloco.height,
            true
        )) {
            if (nextX > x) {
                nextX = bloco.x - raio - 0.001;
            } else if (nextX < x) {
                nextX = bloco.x + bloco.width + raio + 0.001;
            }
        }
    }

    x = nextX;

    for (let bloco of gameMap) {
        if (!bloco.colMouse) continue;

        if (colisaoAABB(
            x - raio, nextY - raio, raio * 2, raio * 2,
            bloco.x, bloco.y, bloco.width, bloco.height,
            true
        )) {
            if (nextY > y) {
                nextY = bloco.y - raio - 0.001;
            } else if (nextY < y) {
                nextY = bloco.y + bloco.height + raio + 0.001;
            }
        }
    }

    y = nextY;

    c.beginPath();
    c.arc(x, y, raio, 0, Math.PI * 2);
    c.fillStyle = "#00c3ff";
    c.fill();
}

function movimentoBase() {
    let nextX = posXQuadrado1;

    if (teclas["ArrowLeft"]) {
        nextX -= velocidadeX;
    }
    if (teclas["ArrowRight"]) {
        nextX += velocidadeX;
    }

    for (let bloco of gameMap) {
        if (colisaoAABB(nextX, posYQuadrado1, tam, tam, bloco.x, bloco.y, bloco.width, bloco.height, bloco.colPlayer)) {
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

    for (let bloco of gameMap) {
        if (colisaoAABB(posXQuadrado1, nextY, tam, tam, bloco.x, bloco.y, bloco.width, bloco.height, bloco.colPlayer)) {
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

    desenharPlayer();
}
function desenharPlayer() {
    c.fillStyle = "#f4f800";
    c.fillRect(posXQuadrado1, posYQuadrado1, tam, tam);
    for (var i = 1; i <= 2; i++) {
        c.fillStyle = "#000000";
        switch (i) {
            case 1:
                c.fillRect(posXQuadrado1 + 10, posYQuadrado1 + 15, 5, 5);
                break;
            case 2:
                c.fillRect(posXQuadrado1 + 35, posYQuadrado1 + 15, 5, 5);
                break;
        }
    }
    c.fillRect(posXQuadrado1 + 10, posYQuadrado1 + 35, 30, 5);
    c.fillRect(posXQuadrado1 + 5, posYQuadrado1 + 30, 5, 5);
    c.fillRect(posXQuadrado1 + 40, posYQuadrado1 + 30, 5, 5);
}

function mouseBotao() {

}
var canvas = document.querySelector('canvas');
canvas.width = 800;
canvas.height = 600;

var mouseX, mouseY = 0;
var x = 250, y = 150;

var c = canvas.getContext('2d');

var posXQuadrado1 = 50;
var posYQuadrado1 = 50;
var tam = 50;

var teclas = {};
var velocidadeX = 5;
var velocidadeY = 10;

var gravidadeValor = 0.5;
var velGravidadeY = 0;
var onGround = false;

document.addEventListener("mousemove", function(event) {
    const react = canvas.getBoundingClientRect();
    mouseX = event.clientX - react.left;
    mouseY = event.clientY - react.top;
})

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && posYQuadrado1 + tam >= canvas.height) {
        velGravidadeY = -velocidadeY;
    }
    teclas[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    teclas[event.key] = false;
});

c.fillStyle = 'rgb(0, 71, 0)';
c.fillRect(100, 100, 200, 300);

logicaBase();

function logicaBase(){
    requestAnimationFrame(logicaBase);
    movimentoBase();
}

function movimentoBase() {
    c.fillStyle = "#FFFFFF";
    c.fillRect(posXQuadrado1, posYQuadrado1, tam, tam);

    if (teclas["ArrowLeft"]) {
        let newPosX = posXQuadrado1 - velocidadeX;
        if (newPosX >= 0) posXQuadrado1 = newPosX;
    };
    if (teclas["ArrowRight"]) {
        let newPosX = posXQuadrado1 + velocidadeX;
        if (newPosX + tam <= canvas.width) posXQuadrado1 = newPosX;
    };

    velGravidadeY += gravidadeValor;
    posYQuadrado1 += velGravidadeY;

    if (posYQuadrado1 + tam > canvas.height) {
        posYQuadrado1 = canvas.height - tam;
        velGravidadeY = 0;
    }

    c.fillStyle = "#f4f800c4";
    c.fillRect(posXQuadrado1, posYQuadrado1, tam, tam);
}

function mouseBotao() {

}
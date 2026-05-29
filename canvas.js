var canvas = document.querySelector('canvas');
canvas.width = 1920;
canvas.height = 1080;

var c = canvas.getContext('2d');

var posXQuadrado1 = 50;
var posYQuadrado1 = 50;
var tam = 50;

var teclas = {};
var velMovimentoX = 5;
var velMovimentoY = 15;

var gravidadeValor = 0.5;
var velGravidadeY = 0;
var onGround = false;

var mouseX = 0;
var mouseY = 0;
var mouseClick = false;
var x = 250, y = 150; // pos inicial do mouse
// variaveis muito legais acima ! haha !

// jeito muito estupido de desenhar o mapa e as colisoes™
// id: fodase mas usa pra caçar coisa pra apagar, x, y, w e h sao obvios, cor é a cor do bagulhete no mapa, colPlayer é se colidecom o quadrado, colMouse é se colide com o mouse
// clickableMouse é pra ver se é clicavel pelo mouse ou nao, targetId, botApertado, objAtivo e playerClickable mesma merda tudo so serve pra verificar coisa de botao
// eu amo flags! >:D
var activeGameMap = [];

var gameMaps = [
    gameMap1 = [
        { id: "bordaDireita", x: 0, y: 600, width: 800, height: 1, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null },
        { id: "bordaEsquerda", x: 0, y: 0, width: 800, height: 1, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null },
        { id: "bordaInferior", x: 800, y: 0, width: 1, height: 600, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null },
        { id: "bordaSuperior", x: 0, y: 0, width: 1, height: 600, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null },

        { id: "caminho1", x: 100, y: 400, width: 200, height: 5, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null },
        { id: "caminho2", x: 400, y: 300, width: 200, height: 5, cor: "#00b81f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null },
        { id: "caminho3", x: 300, y: 200, width: 100, height: 5, cor: "#00B806", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null },

        { id: "mouseTravessa1", x: 350, y: 100, width: 100, height: 5, cor: "#b86800", colPlayer: true, colMouse: false, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null },
        { id: "cuboTravessa1", x: 350, y: 350, width: 20, height: 200, cor: "#b80099", colPlayer: false, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null },

        { id: "bordaTravessa1", x: 350, y: 350, width: 20, height: 20, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null },
        { id: "bordaTravessa2", x: 350, y: 530, width: 20, height: 20, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null },

        { id: "botaoIrado", x: 150, y: 200, width: 40, height: 40, cor: "#ff0000", colPlayer: false, colMouse: false, clickableMouse: true, targetId: null, botApertado: false, objAtivo: true, playerClickable: false, mapaAlvo: 1 },
        { id: "botaoIradoPlayer", x: 300, y: 200, width: 40, height: 40, cor: "#ff0000", colPlayer: false, colMouse: false, clickableMouse: false, targetId: "cuboTravessa1", botApertado: false, objAtivo: true, playerClickable: true, mapaAlvo: null },
    ],
    gameMap2 = [
        { id: "bordaDireita", x: 0, y: 600, width: 800, height: 1, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null },
        { id: "bordaEsquerda", x: 0, y: 0, width: 800, height: 1, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null },
        { id: "bordaInferior", x: 800, y: 0, width: 1, height: 600, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null },
        { id: "bordaSuperior", x: 0, y: 0, width: 1, height: 600, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null },

        { id: "botaoIrado", x: 180, y: 100, width: 40, height: 40, cor: "#ff0000", colPlayer: false, colMouse: false, clickableMouse: true, targetId: "cuboTravessa1", botApertado: false, objAtivo: true, playerClickable: false, mapaAlvo: 0 }
    ],
];

// eu sem querer pensei nsiso e é um jeito legal de fazer vários mapas funcionar ! eba !
// a gente fez fraud™ from ultrakill chapter 8

canvas.addEventListener("mousemove", function (event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
    // nao seiexplicar mas tava no bagulhete do slide entao fiz igual
});

document.addEventListener("keydown", (event) => {
    // mecanica de pulo!
    if ((event.key === "ArrowUp" && onGround) || (event.key === "w" && onGround) || (event.key === " " && onGround)) {
        velGravidadeY = -velMovimentoY;
        onGround = false;
        // dentro daqui pra nao ficar batendo atoa no keyup, pq ele tava deixando o movimento incompleto por causa disso
        // aperta, faz o velGravidadeY reduzir oq faz o bicho subir pq tá constantemente aplicando a gravidade
        // faz só uma vez pq verifica onGround e nao ta no chao se pulou ne
    }
    teclas[event.key] = true;
    // isso aqui é pro resto das teclas funcionar!
});

document.addEventListener("keyup", (event) => {
    teclas[event.key] = false;
});

document.addEventListener("mousedown", (event) => {
    mouseClick = true;
})

document.addEventListener("mouseup", (event) => {
    mouseClick = false;
})

logicaBase();
activeGameMap = gameMap1;
// surgiu do nada massurgiu legal !

function logicaBase() {
    requestAnimationFrame(logicaBase);
    c.clearRect(0, 0, canvas.width, canvas.height);
    desenharMapa();
    movimentoBase();
    mouseBolinha();
}

function desenharMapa() {
    for (let bloco of activeGameMap) {
        if (!bloco.objAtivo) continue;
        // skipa qualquer bloco que nao ta ativo na hora de desenhar

        c.fillStyle = bloco.cor;
        c.fillRect(bloco.x, bloco.y, bloco.width, bloco.height);
        // pinta as coisa no mapa
    }
}

function colisaoAABB(xQuadrado, yQuadrado, wQuadrado, hQuadrado, xCenario, yCenario, wCenario, hCenario, podeColidir) {
    return xQuadrado < xCenario + wCenario && // se a borda esquerda do player tá antes da borda direita do cenário
        xQuadrado + wQuadrado > xCenario && // se a borda direita do player passou da borda esquerda do cenário
        yQuadrado < yCenario + hCenario && // se o topo do player está acima da base do cenário
        yQuadrado + hQuadrado > yCenario && // se a base do player está acima do topo do cenário
        podeColidir == true;
    // se tudo for verdadeiro, ent significa que tá colidindo
    // (é um jeito mt estupido de fazer isso funcionar btw mas eu nao sei se tem como criar objeeto novo)
}

function trocarMapa(mapaAlvo) {
    activeGameMap = gameMaps[mapaAlvo];
}

function ativarBotao(botao) {
    if (botao.botApertado) return;
    botao.botApertado = true;
    botao.cor = "#5f5f5f"
    // faz o botao fica cinza depois de apertar

    for (let bloco of activeGameMap) {
        if (bloco.id === botao.targetId) {
            bloco.objAtivo = false;
            // procura todos os blcoos dentro da colisao ate achar o que tem o id alvo e marca ele como desativado
            // usa isso pra abrir porta !
        }
    }
    if(botao.mapaAlvo != null) trocarMapa(botao.mapaAlvo);
    // inicia fraud
}

function mouseBolinha() {
    let raio = 10;
    // tamanho da bolinha do mouse

    let varMovX = (mouseX - x) * 0.1;
    let varMovY = (mouseY - y) * 0.1;
    // *0.1 pra fazer lerp :*

    let maxPPF = 10; // deslocamento máximo em pixels que pode fazer por frame (maxPPF pq pixel per frame é engraçado)

    if (Math.abs(varMovX) > maxPPF) varMovX = Math.sign(varMovX) * maxPPF;
    if (Math.abs(varMovY) > maxPPF) varMovY = Math.sign(varMovY) * maxPPF;
    // pega o valor absoluto de variação de pixel, se for maior que o PPF, então dá clamp no ppf

    // sem isso a colisão atravessa quando o mouse afasta muito

    let nextX = x + varMovX;
    let nextY = y + varMovY;

    // colisão no X
    for (let bloco of activeGameMap) { // verifica todos os blocos do mapa
        if (!bloco.colMouse || !bloco.objAtivo) continue; // só ignora se for algo q n tem pq verificar colisão

        if (colisaoAABB(nextX - raio, y - raio, raio * 2, raio * 2, bloco.x, bloco.y, bloco.width, bloco.height, true)) // manda tudo pro colisãoAABB pra verificar se tá colidindo
        {
            if (nextX > x) {
                nextX = bloco.x - raio - 0.001; // matemática legau pra garantir que tá na posição certa quando colidindo em +X
            } else if (nextX < x) {
                nextX = bloco.x + bloco.width + raio + 0.001; // mesma coisa mas agora pra =X
            }
        }
    }

    x = nextX;

    // mesma coisa acima mas agora pra Y uau
    for (let bloco of activeGameMap) {
        if (!bloco.colMouse || !bloco.objAtivo) continue;

        if (colisaoAABB(x - raio, nextY - raio, raio * 2, raio * 2, bloco.x, bloco.y, bloco.width, bloco.height, true)) {
            if (nextY > y) {
                nextY = bloco.y - raio - 0.001;
            } else if (nextY < y) {
                nextY = bloco.y + bloco.height + raio + 0.001;
            }
        }
    }

    y = nextY;

    for (let bloco of activeGameMap) {
        if (!bloco.clickableMouse || !bloco.objAtivo) continue;

        if (
            mouseClick &&
            colisaoAABB(
                x - raio, y - raio, raio * 2, raio * 2,
                bloco.x, bloco.y, bloco.width, bloco.height,
                true
            )
        ) {
            ativarBotao(bloco);
            // se for um objeto apertável pelo mouse, e clicar, entra no ativarBotao.
        }
    }

    c.beginPath();
    c.arc(x, y, raio, 0, Math.PI * 2);
    c.fillStyle = "#00c3ff";
    c.fill();
    // desenha a bolota () <- bola !
}

function movimentoBase() {
    let nextX = posXQuadrado1;

    if (teclas["ArrowLeft"] || teclas["a"]) {
        nextX -= velMovimentoX;
    }
    if (teclas["ArrowRight"] || teclas["d"]) {
        nextX += velMovimentoX;
    }
    // verifica se qualquer uma das teclas de movimento horizontal tão apertadas e já soma isso no nextX

    for (let bloco of activeGameMap) {
        if (!bloco.objAtivo) continue;

        if (colisaoAABB(nextX, posYQuadrado1, tam, tam, bloco.x, bloco.y, bloco.width, bloco.height, bloco.colPlayer)) {
            if (nextX > posXQuadrado1) {
                nextX = bloco.x - tam;
            } else if (nextX < posXQuadrado1) {
                nextX = bloco.x + bloco.width;
            }
        }
    }

    // verifica colisão, se tiver batendo, faz o mesmo esquema de +X e -X do colisor, se não, só taca o bloco pra frente no movimento normal

    posXQuadrado1 = nextX;

    velGravidadeY += gravidadeValor;
    let nextY = posYQuadrado1 + velGravidadeY;

    // aplicando gravidade constnatemente pq é o jeito mais facil de fazer isso

    onGround = false;

    for (let bloco of activeGameMap) {
        if (!bloco.objAtivo) continue;

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

    // e ai verifica se tá colidindo ou não com qualquer coisa, se tiver faz parar de cair baseando em +Y ou -Y do colisor por ficar continuamente setando a velocidadeY em 0

    posYQuadrado1 = nextY;

    for (let bloco of activeGameMap) {
        if (!bloco.playerClickable || !bloco.objAtivo) continue;

        if (
            colisaoAABB(
                posXQuadrado1, posYQuadrado1, tam, tam,
                bloco.x, bloco.y, bloco.width, bloco.height,
                true
            )
        ) {
            ativarBotao(bloco);
        }
    }
    // mesma porcaria do verificador de clique do mouse mas agora é de tocar pelo preyah

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
    // pra ele ter um sorrisinho :)
}
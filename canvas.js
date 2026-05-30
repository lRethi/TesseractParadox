/*
Talk box:
[This message will autodestroy when you see it, after texting your text delete the others message, notes are temporary, this is not a text channel]

Fred: Maybe a cool idea for the cube to collide with the ball!
Also Pressure plates and the win conditon needs both players to be on the square OR 2 win squares one for each player
ALSO SORRY FOR THE MATH AND THE STUPID CHUD NUMBERS
AAAAAAAALSOOO i had an idea about the buttons to make them modular also, by taking the exclusionId of the wall we want to delete in an atribute maybe called "linkedWall: bordaTravessa1" and it deletes the wall listed below as an example, but idk how to do that
{ exclusionId: "bordaTravessa1", x: 395, y: 101, width: 5, height: 5, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false },
anyway just to make my job easier so i can just make buttons easily work..
add the atribute to all objects, imagine the player clicks a button and the map wall just dissapears >:]

Liv:
exclusionId é o id que vai ser usado pra ser afetado pelo targetId, se mais de um bloco tiver o mesmo exclusionId, o targetId do botão vai afetar todos
botAcao tem que ser "ativa", "desativa" ou "toggle", pq sao as acoes uqe o botao pode fazer com coisa
pra fazer botao q é pressure plate do mainecraft é só ativar botPressurePlate na flag que ele automaticamente entra lá assim que detecta colisoes

*/
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
// exclusionId: fodase mas usa pra caçar coisa pra apagar, x, y, w e h sao obvios, cor é a cor do bagulhete no mapa, colPlayer é se colidecom o quadrado, colMouse é se colide com o mouse
// clickableMouse é pra ver se é clicavel pelo mouse ou nao, targetId, botApertado, objAtivo e playerClickable mesma merda tudo so serve pra verificar coisa de botao
// eu amo flags! >:D

// por consistencia, coisa de cor roxa = o cubo atravessa, coisa de cor marrom = o mouse atravessa, 
var activeGameMap = [];

var gameMaps = [
    {
        nome: "where have you been all this time?",
        descricao: `
        <p><b>This is your personal torture chamber.</b></p>
        <i>Vamos ver o quão longe você chega. :*</i> <br></br>
        <p>Use WAD ou suas setinhas + espaço para mover a <i>Completely Useless Box Object</i>, ou, CUBO, você!</p>
        <p>Controle a Bolinha™ com o movimento do seu mouse e o clique.</p>
        <p>Um jogador pode controlar o CUBO, e o outro a Bolinha, ou você pode ser maluco e jogar com ambos ao mesmo tempo.</p>
        <p>O seu objetivo é ver o quão longe você chega em sua própria câmara de <b><i>tormento eterno</i></b>, boa sorte! :D</p>
        `,
        dados: [
            { objId: "background", exclusionId: null, x: 0, y: 0, width: 800, height: 600, cor: "#FFFFFF", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },

            { objId: "bordaDireita", exclusionId: null, x: 0, y: 600, width: 800, height: 2, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "bordaEsquerda", exclusionId: null, x: 0, y: 0, width: 800, height: 2, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "bordaInferior", exclusionId: null, x: 800, y: 0, width: 2, height: 600, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "bordaSuperior", exclusionId: null, x: 0, y: 0, width: 2, height: 600, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },

            { objId: "chao1", exclusionId: null, x: 1, y: 101, width: 399, height: 5, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "chao2", exclusionId: null, x: 1, y: 201, width: 503, height: 5, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "chao3", exclusionId: null, x: 504, y: 101, width: 296, height: 5, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "chao4", exclusionId: null, x: 699, y: 496, width: 101, height: 5, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },

            { objId: "parede1", exclusionId: null, x: 499, y: 1, width: 5, height: 105, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "parede2", exclusionId: null, x: 499, y: 201, width: 5, height: 399, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "parede3", exclusionId: null, x: 599, y: 101, width: 5, height: 400, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "parede4", exclusionId: null, x: 699, y: 201, width: 5, height: 300, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "a", exclusionId: null, x: 1, y: 1, width: 1, height: 1, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },

            { objId: "mouseTravessa1", exclusionId: null, x: 499, y: 106, width: 5, height: 95, cor: "#ff9100", colPlayer: true, colMouse: false, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },

            { objId: "cuboTravessa1", exclusionId: null, x: 400, y: 101, width: 99, height: 5, cor: "#b80099", colPlayer: false, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "cuboTravessa2", exclusionId: null, x: 699, y: 501, width: 5, height: 99, cor: "#b80099", colPlayer: false, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },

            { objId: "bordaTravessa1", exclusionId: null, x: 395, y: 101, width: 5, height: 5, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "bordaTravessa2", exclusionId: null, x: 499, y: 101, width: 5, height: 5, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "bordaTravessa3", exclusionId: null, x: 499, y: 201, width: 5, height: 5, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "bordaTravessa4", exclusionId: null, x: 699, y: 496, width: 5, height: 5, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "bordaTravessa5", exclusionId: null, x: 699, y: 496 + 99 + 5, width: 5, height: 5, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },

            { objId: "botaoIrado", exclusionId: null, x: 20, y: 20, width: 40, height: 40, cor: "#ff0000", colPlayer: false, colMouse: false, clickableMouse: true, targetId: null, botApertado: false, objAtivo: true, playerClickable: false, mapaAlvo: 1, trocaMapa: true, botRepeatable: true, botAcao: null, botPressurePlate: false },
            { objId: "botaoIradoPlayer", exclusionId: null, x: 733, y: 560 + 30, width: 40, height: 10, cor: "#ff0000", colPlayer: false, colMouse: false, clickableMouse: false, targetId: "cuboTravessa1", botApertado: false, objAtivo: true, playerClickable: true, mapaAlvo: 0, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "testWinSquare", exclusionId: null, x: 760, y: 1, width: 40, height: 40, cor: "#1eff00", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: false, objAtivo: true, playerClickable: true, mapaAlvo: 2, trocaMapa: true, botRepeatable: false, winSquare: true, botAcao: null, botPressurePlate: false },

            { objId: "testPressurePlayer", exclusionId: null, x: 100, y: 50, width: 40, height: 40, cor: "#ff0000", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: false, objAtivo: true, playerClickable: true, mapaAlvo: 1, trocaMapa: false, botRepeatable: false, botAcao: "ativa", botPressurePlate: true },
            { objId: "testPressureMouse", exclusionId: null, x: 100, y: 150, width: 40, height: 40, cor: "#ff0000", colPlayer: false, colMouse: false, clickableMouse: true, targetId: null, botApertado: false, objAtivo: true, playerClickable: false, mapaAlvo: 1, trocaMapa: false, botRepeatable: false, botAcao: "ativa", botPressurePlate: true },
        ]
    },
    {
        nome: "Thinking with colors.",
        descricao: `
        <p style="font-family: 'Times New Roman', Times, serif;">Parágrafo de teste!</p>
        `,
        dados: [
            { objId: "background", exclusionId: null, x: 0, y: 0, width: 800, height: 800, cor: "#000000", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },

            { objId: "bordaDireita", exclusionId: null, x: 0, y: 800, width: 800, height: 2, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "bordaEsquerda", exclusionId: null, x: 0, y: 0, width: 800, height: 2, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "bordaInferior", exclusionId: null, x: 800, y: 0, width: 2, height: 800, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },
            { objId: "bordaSuperior", exclusionId: null, x: 0, y: 0, width: 2, height: 800, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false },

            { objId: "botaoIrado", exclusionId: null, x: 180, y: 100, width: 40, height: 40, cor: "#ff0000", colPlayer: false, colMouse: false, clickableMouse: true, targetId: null, botApertado: false, objAtivo: true, playerClickable: false, mapaAlvo: 0, trocaMapa: true, botRepeatable: true, botAcao: null, botPressurePlate: false },
            { objId: "botaoIradoQueAbreAPorta", exclusionId: null, x: 380, y: 200, width: 40, height: 40, cor: "#ff0000", colPlayer: false, colMouse: false, clickableMouse: true, targetId: "cuboTravessa1", botApertado: false, objAtivo: true, playerClickable: false, mapaAlvo: 0, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false }
        ]
    },
    {
        nome: "The end of the rainbow.",
        descricao: ``,
        dados: [
            { objId: "background", exclusionId: null, x: 0, y: 0, width: 1920, height: 1080, cor: "#FFFFFF", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false }
        ]
    }
];
// eu sem querer pensei nsiso e é um jeito legal de fazer vários mapas funcionar ! eba !
// a gente fez fraud™ from ultrakill chapter 8
// novas flags de fraud: mapaAlvo e trocaMapa, mapaAlvo é uma int (começa em 0) que aponta pra qual mapa é o alvo do botão, tanto pra ser qual mapa vai trocar quanto pra ser qual mapa ele vai caçar o obj alvo do targetId
// trocaMapa é só uma bool pra verificar se o botão troca de mapa ou não
// botRepeatable tá ai só pra casoo seja um botão que pode apertar mais de uma vez, se for taca em true

// dá pra trocar a fonte da descrição por paragŕafo :3
// exemplo: <p style="font-family: 'Times New Roman', Times, serif;">Parágrafo de teste!</p>, também dá pra usar qualquer outro dos estilos, aka fonte-size e eu só sei esses mesmos visse

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
    // isso aqui é pro resto das teclas funcionar! no caso salva elas num array pra caso vc aperta mais de uma tecla ao mesmo tempo dã
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

activeGameMap = gameMaps[0].dados;
var currentMap = 0;
atualizarNomeMapa();
logicaBase();
// surgiu do nada massurgiu legal !

function endGame() {
    // faz aparecer algum texto na tela via html talvez? deixo nas maos de vc meu caro fred
}

function logicaBase() {
    requestAnimationFrame(logicaBase);
    c.clearRect(0, 0, canvas.width, canvas.height);
    if (currentMap !== 2) { // trocar o valor pro "mapa de vitória" real, que basicamente só limpa o canvas
        desenharMapa();
        movimentoBase();
        mouseBolinha();
        detectarPressurePlate();
    } else {
        endGame();
    }
}

function atualizarNomeMapa() {
    document.getElementById("mapName").innerText = gameMaps[currentMap].nome;
    document.getElementById("mapDescription").innerHTML = gameMaps[currentMap].descricao;
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
    // (é um jeito mt estupido de fazer isso funcionar btw mas eu nao sei se tem como criar objeeto novo ehntao foi assim que foi feito)
}

function trocarMapa(mapaAlvo) {
    activeGameMap = gameMaps[mapaAlvo].dados;
    currentMap = mapaAlvo;
    atualizarNomeMapa();
}

function changeStatePressurePlate(botao, varAtivo) {
    for (let bloco of gameMaps[botao.mapaAlvo].dados) {
        if (bloco.exclusionId && bloco.exclusionId === botao.targetId) {
            if (botao.botAcao === "ativa") bloco.objAtivo = varAtivo;
            else if (botao.botAcao === "desativa") bloco.objAtivo = !varAtivo;
        }
    }
    // exata mesma merda do ativar botao btw unica coisa que muda é que depende do valor de varAtivo pq ele é oq o detectarPressurePlate manda pra ver se ta pisando ou nao
}

function detectarPressurePlate() {
    for (let bloco of activeGameMap) {
        if (!bloco.botPressurePlate || !bloco.objAtivo) continue;

        let varAtivo = false;

        if (bloco.playerClickable) {
            if (
                colisaoAABB(
                    posXQuadrado1, posYQuadrado1, tam, tam,
                    bloco.x, bloco.y, bloco.width, bloco.height,
                    true
                )
            ) {
                varAtivo = true;
            }
        }
        // verifica se o player tá encima, se tiver, ptchuuum tá tryue

        if (bloco.clickableMouse) {
            if (
                mouseClick &&
                colisaoAABB(
                    x - 10, y - 10, 20, 20,
                    bloco.x, bloco.y, bloco.width, bloco.height,
                    true
                )
            ) {
                varAtivo = true;
            }
        }
        // mesma coisa mas agora é o mouse clicano zé

        if (varAtivo !== bloco.botApertado) {
            bloco.botApertado = varAtivo;

            changeStatePressurePlate(bloco, varAtivo);

            if (varAtivo) {
                bloco.cor = "#5f5f5f";
            } else {
                bloco.cor = "#ff0000";
            }
        }
        // corzinha pra ficar bonito quando tá ativado e/ou desligado
    }
}

function ativarBotao(botao) {
    if (botao.botApertado) return;
    if (!botao.botRepeatable) {
        botao.botApertado = true;
        botao.cor = "#5f5f5f"
    }
    // faz o botao fica cinza depois de apertar (se for um botao maligno que só aperta uma vez e para de funcionar)

    if (botao.targetId) {
        for (let bloco of gameMaps[botao.mapaAlvo].dados) {
            if (bloco.exclusionId && bloco.exclusionId === botao.targetId) {
                if (botao.botAcao === "ativa") bloco.objAtivo = true;
                else if (botao.botAcao === "desativa") bloco.objAtivo = false;
                else if (botao.botAcao === "toggle") bloco.objAtivo = !bloco.objAtivo;
                // procura todos os blcoos dentro da colisao ate achar o que tem o id alvo e marca ele como desativado
                // usa isso pra abrir porta !
                // edit: agora usa o valor de botAcao pra poder ter alg7uns botoes que fazem cosia aparecer ao inves de só sumir
            }
        }
    }
    if (botao.trocaMapa) trocarMapa(botao.mapaAlvo);
    // inicia fraud (ts is crazy dude)
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
                nextX = bloco.x + bloco.width + raio + 0.001; // mesma coisa mas agora pra -X
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
        if (!bloco.clickableMouse || !bloco.objAtivo || bloco.botPressurePlate) continue;

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

    if (mouseClick) { // pra quando ta clicando pra ter feedback visual
        c.beginPath();
        c.arc(x, y, raio, 0, Math.PI * 2);
        c.fillStyle = "#ff5e00";
        c.fill();
        // outline pra ficar BONITO !

        c.beginPath();
        c.arc(x, y, raio - 2, 0, Math.PI * 2);
        c.fillStyle = "#00ff9d";
        c.fill();
        // desenha a bolota () <- bola !
    } else { // ela normalzinha
        c.beginPath();
        c.arc(x, y, raio, 0, Math.PI * 2);
        c.fillStyle = "#ff9100";
        c.fill();
        // outline pra ficar BONITO !

        c.beginPath();
        c.arc(x, y, raio - 2, 0, Math.PI * 2);
        c.fillStyle = "#00c3ff";
        c.fill();
        // desenha a bolota () <- bola !
    }
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
        if (!bloco.playerClickable || !bloco.objAtivo || bloco.botPressurePlate) continue;

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
    c.fillStyle = "#b80099";
    c.fillRect(posXQuadrado1, posYQuadrado1, tam, tam);
    // outline pra ele fica ninito

    c.fillStyle = "#f4f800";
    c.fillRect(posXQuadrado1 + 1, posYQuadrado1 + 1, tam - 2, tam - 2);
    // pinta ele de amarelio

    let eyePosA, eyePosB, mouthCornerPosA, mouthCornerPosB, mouthLinePos;
    // iedia do fred do rosto mexer pro lado

    if (teclas["ArrowLeft"] || teclas["a"]) {
        eyePosA = 7;
        eyePosB = 30;
        mouthCornerPosA = 7;
        mouthCornerPosB = 37;
        mouthLinePos = 2;
    }
    else if (teclas["ArrowRight"] || teclas["d"]) {
        eyePosA = 15;
        eyePosB = 40;
        mouthCornerPosA = 13;
        mouthCornerPosB = 43;
        mouthLinePos = 8;
    }
    else {
        eyePosA = 10;
        eyePosB = 35;
        mouthCornerPosA = 10;
        mouthCornerPosB = 40;
        mouthLinePos = 5;
    }

    for (var i = 1; i <= 2; i++) {
        c.fillStyle = "#000000";
        switch (i) {
            case 1:
                c.fillRect(posXQuadrado1 + eyePosA, posYQuadrado1 + 15, 5, 5);
                break;
            case 2:
                c.fillRect(posXQuadrado1 + eyePosB, posYQuadrado1 + 15, 5, 5);
                break;
        }
    }
    // let my son see

    c.fillRect(posXQuadrado1 + mouthCornerPosA, posYQuadrado1 + 35, 30, 5);
    c.fillRect(posXQuadrado1 + mouthLinePos, posYQuadrado1 + 30, 5, 5);
    c.fillRect(posXQuadrado1 + mouthCornerPosB, posYQuadrado1 + 30, 5, 5);
    // and let him smile :)
}
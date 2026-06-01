/*
Talk box:
[This message will autodestroy when you see it, after texting your text delete the others message, notes are temporary, this is not a text channel]

Fred:

Liv:

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
var victoryMapId = 4;
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
        <i>vamos ver o quão longe a gente chega. :*</i> <br></br>
        <p>Use WAD ou suas setinhas + espaço para mover a <i>Completely Useless Box Object</i>, ou, CUBO, você!</p>
        <p>Controle a Bolinha™ com o movimento do seu mouse e o clique.</p>
        <p>Um jogador pode controlar o CUBO, e o outro a Bolinha, ou você pode ser maluco e jogar com ambos ao mesmo tempo.</p>
        <p>O seu objetivo é ver o quão longe você chega em sua própria câmara de <b><i>tormento eterno</i></b>, boa sorte! :D</p>
        `,
        dados: [
            { objId: "background", exclusionId: null, x: 0, y: 0, width: 800, height: 600, cor: "#FFFFFF", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "bordaInferior", exclusionId: null, x: 0, y: 600, width: 800, height: 2, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "bordaSuperior", exclusionId: null, x: 0, y: 0, width: 800, height: 2, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "bordaDireita", exclusionId: null, x: 800, y: 0, width: 2, height: 600, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "bordaEsquerda", exclusionId: null, x: 0, y: 0, width: 2, height: 600, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "flr1", exclusionId: null, x: 2, y: 101, width: 398, height: 5, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "flr2", exclusionId: null, x: 2, y: 201, width: 502, height: 5, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "flr3", exclusionId: null, x: 504, y: 101, width: 296, height: 5, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "flr4", exclusionId: null, x: 699, y: 496, width: 101, height: 5, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "fakeFlrTop2", exclusionId: null, x: 2, y: 340, width: 103, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "a", exclusionId: null, x: 2, y: 2, width: 0, height: 0, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "wall1", exclusionId: null, x: 499, y: 2, width: 5, height: 104, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "wall2", exclusionId: null, x: 499, y: 201, width: 5, height: 399, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "wall3", exclusionId: null, x: 599, y: 101, width: 5, height: 400, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "wall4", exclusionId: null, x: 699, y: 201, width: 5, height: 300, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "seconds turn into millenia inside a fast mind like yours", exclusionId: "cbBut1", x: 699, y: 501, width: 5, height: 99, cor: "#ad081e", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "mouseTravessa1", exclusionId: "msBut1", x: 499, y: 106, width: 5, height: 95, cor: "#ff9100", colPlayer: true, colMouse: false, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "cuboTravessa1", exclusionId: "cbBut1", x: 400, y: 101, width: 99, height: 5, cor: "#b80099", colPlayer: false, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "cuboTravessa2", exclusionId: "cbBut1", x: 699, y: 501, width: 5, height: 99, cor: "#b80099", colPlayer: false, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "border", exclusionId: null, x: 395, y: 101, width: 5, height: 5, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "border", exclusionId: null, x: 499, y: 101, width: 5, height: 5, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "border", exclusionId: null, x: 499, y: 201, width: 5, height: 5, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "👁️", exclusionId: null, x: 699, y: 496, width: 5, height: 5, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "border", exclusionId: null, x: 699, y: 496 + 99 + 5, width: 5, height: 5, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "botaoM1", exclusionId: null, x: 733, y: 436, width: 40, height: 40, cor: "#00c3ff", colPlayer: false, colMouse: false, clickableMouse: true, targetId: "msBut1", botApertado: false, objAtivo: true, playerClickable: false, mapaAlvo: 0, trocaMapa: true, botRepeatable: false, botAcao: "desativa", botPressurePlate: false, botPermaColor: null },
            { objId: "botaoM2", exclusionId: null, x: 30, y: 34, width: 40, height: 40, cor: "#00c3ff", colPlayer: false, colMouse: false, clickableMouse: true, targetId: "msBut2", botApertado: false, objAtivo: true, playerClickable: false, mapaAlvo: 1, trocaMapa: true, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "botaoC1", exclusionId: null, x: 750, y: 590, width: 40, height: 10, cor: "#f4f800", colPlayer: false, colMouse: false, clickableMouse: false, targetId: "cbBut1", botApertado: false, objAtivo: true, playerClickable: true, mapaAlvo: 0, trocaMapa: false, botRepeatable: false, botAcao: "toggle", botPressurePlate: false, botPermaColor: null },

            { objId: "testWinSquare", exclusionId: null, x: 760, y: 2, width: 40, height: 40, cor: "#1eff00", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: false, objAtivo: true, playerClickable: true, mapaAlvo: 4, trocaMapa: true, botRepeatable: false, winSquare: true, botAcao: null, botPressurePlate: false, botPermaColor: null },
        ]
    },
    {
        nome: "alone, at the edge of a universe",
        descricao: `
        <i>aqui vai uma dica, alguns botões precisam ficar sendo pressionados pra continuarem funcionando! :b</i><br></br>
        <p>Essa área é situada no fim da sua capacidade de processamento,</p>
        <p>ela pode te levar até onde você precisa ir, ou pode te levar até o seu <i>fim</i>.</p>
        <p>Vamos ver como você se sai.</p>
        `,
        dados: [
            { objId: "background", exclusionId: "trickyButton", x: 0, y: 0, width: 800, height: 800, cor: "#000000", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "bordaDireita1", exclusionId: null, x: 0, y: 800, width: 800, height: 2, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "bordaEsquerda1", exclusionId: null, x: 0, y: 0, width: 800, height: 2, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "bordaInferior1", exclusionId: null, x: 800, y: 0, width: 2, height: 800, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "bordaSuperior1", exclusionId: null, x: 0, y: 0, width: 2, height: 800, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "bordaDireita2", exclusionId: "trickyButton", x: 0, y: 800, width: 800, height: 2, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "bordaEsquerda2", exclusionId: "trickyButton", x: 0, y: 0, width: 800, height: 2, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "bordaInferior2", exclusionId: "trickyButton", x: 800, y: 0, width: 2, height: 800, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "bordaSuperior2", exclusionId: "trickyButton", x: 0, y: 0, width: 2, height: 800, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "mTravessa1", exclusionId: "switcharoo", x: 600, y: 90, width: 200, height: 5, cor: "#ff9100", colPlayer: true, colMouse: false, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "mTravessa1_Alt", exclusionId: "switcharoo", x: 600, y: 90, width: 200, height: 5, cor: "#b80099", colPlayer: false, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "fakeFlr1", exclusionId: "trickyButton", x: 2, y: 700, width: 697, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "fakeFlr2", exclusionId: "trickyButton", x: 694, y: 519, width: 106, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "fakeFlrTop1", exclusionId: "trickyButton", x: 100, y: 90, width: 5, height: 250, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "fakeFlrTop2", exclusionId: "trickyButton", x: 2, y: 340, width: 103, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "fakeWallTop3", exclusionId: "trickyButton", x: 100, y: 90, width: 698, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "fakeWallTop1", exclusionId: "trickyButton", x: 400, y: 0, width: 5, height: 90, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "fakeWallTop2", exclusionId: "trickyButton", x: 600, y: 2, width: 5, height: 60, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "flrTop1", exclusionId: "trickyButton", x: 2, y: 90, width: 600, height: 5, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "flrTop2", exclusionId: "trickyButton", x: 400, y: 0, width: 5, height: 90, cor: "#b80099", colPlayer: false, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            
            { objId: "flr1", exclusionId: "trickyButton", x: 2, y: 700, width: 697, height: 5, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "flr2", exclusionId: "trickyButton", x: 694, y: 524, width: 106, height: 5, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "flr3", exclusionId: "trickyButton", x: 250, y: 524, width: 450, height: 5, cor: "#00b80f", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "cTravessa", exclusionId: "switcharoo", x: 250, y: 524, width: 5, height: 176, cor: "#b80099", colPlayer: false, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "cTravessa_Alt", exclusionId: "switcharoo", x: 250, y: 524, width: 5, height: 176, cor: "#ff9100", colPlayer: true, colMouse: false, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "mTravessa", exclusionId: "switcharoo", x: 2, y: 524, width: 248, height: 5, cor: "#ff9100", colPlayer: true, colMouse: false, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "mTravessa_Alt", exclusionId: "switcharoo", x: 0, y: 524, width: 250, height: 5, cor: "#b80099", colPlayer: false, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "botaoM2_Hold", exclusionId: "trickyButton", x: 500, y: 600, width: 40, height: 40, cor: "#003cff", colPlayer: false, colMouse: false, clickableMouse: true, targetId: "switcharoo", botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: 1, trocaMapa: false, botRepeatable: false, botAcao: "toggle", botPressurePlate: true, botPermaColor: "#003cff" },
            { objId: "botaoC2_Hold", exclusionId: "trickyButton", x: 25, y: 680, width: 40, height: 20, cor: "#8df800", colPlayer: false, colMouse: false, clickableMouse: false, targetId: "switcharoo", botApertado: null, objAtivo: false, playerClickable: true, mapaAlvo: 1, trocaMapa: false, botRepeatable: false, botAcao: "toggle", botPressurePlate: true, botPermaColor: "#8df800" },
            
            { objId: "removableWall1", exclusionId: "trickyButton", x: 694, y: 524, width: 5, height: 180, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "removableWall2", exclusionId: "trickyButton", x: 250, y: 524, width: 5, height: 176, cor: "#000000", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "removableWall3", exclusionId: "trickyButton", x: 2, y: 524, width: 248, height: 5, cor: "#000000", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "entretainment", exclusionId: "trickyButton", x: 2, y: 170, width: 799, height: 354, cor: "#797272", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: false, objAtivo: false, playerClickable: true, mapaAlvo: 2, trocaMapa: true, botRepeatable: true, botAcao: "toggle", botPressurePlate: false, botPermaColor: "#fafafa" },
            { objId: "realityStep", exclusionId: "trickyButton", x: 600, y: 165, width: 200, height: 5, cor: "#ffffff", colPlayer: true, colMouse: false, clickableMouse: false, targetId: null, botApertado: false, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: "ativa", botPressurePlate: false, botPermaColor: null },

            { objId: "botaoM1", exclusionId: null, x: 700, y: 27, width: 40, height: 40, cor: "#00c3ff", colPlayer: false, colMouse: false, clickableMouse: true, targetId: "trickyButton", botApertado: false, objAtivo: true, playerClickable: false, mapaAlvo: 1, trocaMapa: false, botRepeatable: false, botAcao: "toggle", botPressurePlate: false, botPermaColor: null },

            { objId: "botaoC1", exclusionId: "trickyButton", x: 2, y: 705, width: 40, height: 10, cor: "#f4f800", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: false, objAtivo: true, playerClickable: true, mapaAlvo: 2, trocaMapa: true, botRepeatable: false, botAcao: "ativa", botPressurePlate: false, botPermaColor: null },
            { objId: "botaoC2", exclusionId: null, x: 40, y: 328, width: 10, height: 10, cor: "#f4f800", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: false, objAtivo: true, playerClickable: true, mapaAlvo: 0, trocaMapa: true, botRepeatable: false, botAcao: "ativa", botPressurePlate: false, botPermaColor: null },

        ]
    },
    {
        nome: "<b><i>... the stars are falling, like melting obelisks ...</i></b>",
        descricao: `<i>esse é um lugar que não existe... cuidado onde pisa! :[ <p> se você cair, f5 é seu amigo! :D </p></i> <br></br> ...`,
        dados: [
            { objId: "background", exclusionId: null, x: 0, y: 0, width: 1024, height: 800, cor: "#000000", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "flr1", exclusionId: null, x: 0, y: 800, width: 200, height: 5, cor: "#ad081e", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "flr2", exclusionId: null, x: 0, y: 700, width: 200, height: 5, cor: "#ad081e", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "flr3", exclusionId: null, x: 0, y: 574, width: 200, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "wall1", exclusionId: null, x: 0, y: 700, width: 2, height: 105, cor: "#ad081e", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "wall2", exclusionId: null, x: 200, y: 700, width: 5, height: 105, cor: "#ad081e", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "flr1", exclusionId: null, x: 0, y: 80, width: 1024, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "step1", exclusionId: null, x: 650, y: 150, width: 100, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step2", exclusionId: "switchState2", x: 260, y: 720, width: 100, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "stepButton", exclusionId: "switchState2", x: 293, y: 710, width: 40, height: 10, cor: "#ff9100", colPlayer: false, colMouse: false, clickableMouse: false, targetId: "failSafeButton", botApertado: null, objAtivo: false, playerClickable: true, mapaAlvo: 2, trocaMapa: false, botRepeatable: false, botAcao: "ativa", botPressurePlate: false, botPermaColor: null },
            { objId: "step3", exclusionId: "switchState2", x: 480, y: 660, width: 75, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step4", exclusionId: "switchState", x: 320, y: 610, width: 100, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step5", exclusionId: "switchState2", x: 780, y: 560, width: 80, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step6", exclusionId: "switchState", x: 820, y: 510, width: 100, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step7", exclusionId: "switchState", x: 600, y: 460, width: 75, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step8", exclusionId: "switchState2", x: 340, y: 410, width: 100, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step9", exclusionId: "switchState", x: 300, y: 360, width: 50, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step10", exclusionId: "switchState2", x: 220, y: 310, width: 100, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step11", exclusionId: "switchState", x: 580, y: 270, width: 80, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step12", exclusionId: "switchState", x: 320, y: 230, width: 100, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step13", exclusionId: "switchState", x: 500, y: 200, width: 75, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step14", exclusionId: "switchState2", x: 135, y: 180, width: 50, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step15", exclusionId: "switchState", x: 820, y: 230, width: 80, height: 5, cor: "#ffffff", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            
            { objId: "failSafeStep", exclusionId: "failSafeButton", x: 0, y: 795, width: 1024, height: 5, cor: "#ff00d44b", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: false, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },

            { objId: "botaoM1", exclusionId: null, x: 500, y: 40, width: 40, height: 40, cor: "#00c3ff", colPlayer: false, colMouse: false, clickableMouse: true, targetId: null, botApertado: false, objAtivo: true, playerClickable: false, mapaAlvo: 1, trocaMapa: true, botRepeatable: false, botAcao: "ativa", botPressurePlate: false, botPermaColor: null },
            { objId: "botaoM_Hold", exclusionId: null, x: 324, y: 600, width: 40, height: 40, cor: "#003cff", colPlayer: false, colMouse: false, clickableMouse: true, targetId: "switchState", botApertado: false, objAtivo: true, playerClickable: false, mapaAlvo: 2, trocaMapa: false, botRepeatable: false, botAcao: "toggle", botPressurePlate: true, botPermaColor: "#003cff" },
            { objId: "botaoM2_Hold", exclusionId: null, x: 424, y: 600, width: 40, height: 40, cor: "#003cff", colPlayer: false, colMouse: false, clickableMouse: true, targetId: "switchState2", botApertado: false, objAtivo: true, playerClickable: false, mapaAlvo: 2, trocaMapa: false, botRepeatable: false, botAcao: "toggle", botPressurePlate: true, botPermaColor: "#003cff" },
            { objId: "botaoC1", exclusionId: null, x: 700, y: 110, width: 40, height: 40, cor: "#cf00f8", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: false, objAtivo: true, playerClickable: true, mapaAlvo: 1, trocaMapa: true, botRepeatable: true, botAcao: "ativa", botPressurePlate: false, botPermaColor: null },
        ]
    },
    {
        nome: "<b><i>where am i</i></b>",
        descricao: `<i>where am i<p>where am i</p></i> <br></br> ...`,
        dados: [
            { objId: "flr1", exclusionId: null, x: 1, y: 328, width: 300, height: 5, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step1", exclusionId: null, x: 321, y: 288, width: 40, height: 5, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step2", exclusionId: null, x: 381, y: 248, width: 40, height: 5, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step3", exclusionId: null, x: 441, y: 208, width: 40, height: 5, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "step4", exclusionId: null, x: 501, y: 168, width: 40, height: 5, cor: "#000000", colPlayer: true, colMouse: true, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null },
            { objId: "testTpSquare", exclusionId: null, x: 650, y: 28, width: 40, height: 40, cor: "#1eff00", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: false, objAtivo: true, playerClickable: true, mapaAlvo: 0, trocaMapa: true, botRepeatable: false, winSquare: true, botAcao: null, botPressurePlate: false, botPermaColor: null },
        ]
    },
    {
        nome: "the end of the rainbow",
        descricao: `
        <p>Parabéns, você chegou no fim do arco-íris, a sala final, o seu descanso, o seu elísio.</p>
        <p>E agora, você pergunta? Eu já disse, essa é a sua própria câmara de <b>tormento eterno</b>, e não tem por onde sair.</p>
        <p>Continue percorrendo esse mesmo caminho, de novo e de novo, com resultados cada vez melhores.</p>
        <p style="letter-spacing: 2px;">Afinal, é só pra isso que você existe.</p>
        <p style="line-height: 2.5;"><i>pressione f5 pra começar de novo :3</i></p>
        <br></br>
        <br></br>

        <h3 style="
        color: #13a000;
        letter-spacing: 1px;
        text-align: center;">Tesseract Paradox: Thinking with Dimensions - <b>Trabalho de DAPL</b></h3>

        <p style="
        line-height: 0px;
        color: #969300;
        letter-spacing: 1px;
        text-align: center;">- Feito por <b>Fred</b> e <b>Liv</b> - </p>
        `,
        dados: [
            { objId: "background", exclusionId: null, x: 0, y: 0, width: 1920, height: 1080, cor: "#FFFFFF", colPlayer: false, colMouse: false, clickableMouse: false, targetId: null, botApertado: null, objAtivo: true, playerClickable: false, mapaAlvo: null, trocaMapa: false, botRepeatable: false, botAcao: null, botPressurePlate: false, botPermaColor: null }
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
        if(currentMap == 3){
        velMovimentoY = 10;
    }
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

var currentMap = 0;
activeGameMap = gameMaps[currentMap].dados;
atualizarNomeMapa();
logicaBase();
// surgiu do nada massurgiu legal !

function endGame() {
    // faz aparecer algum texto na tela via html talvez? deixo nas maos de vc meu caro fred
}

function logicaBase() {
    requestAnimationFrame(logicaBase);
    c.clearRect(0, 0, canvas.width, canvas.height);
    if (currentMap !== victoryMapId) { // trocar o valor pro "mapa de vitória" real, que basicamente só limpa o canvas
        desenharMapa();
        movimentoBase();
        mouseBolinha();
        detectarPressurePlate();
    } else {
        endGame();
    }
}

function atualizarNomeMapa() {
    if (currentMap !== 4 && currentMap !== 3) {
        document.getElementById("gameTitle").innerHTML = `<p style="font-family: 'Fira Code', monospace;
    color: #1eff00;
    background-color: #000000;
    padding: 10px;
    letter-spacing: 1px;
    text-transform: lowercase;
    text-align: center;">tesseract paradox: thinking with dimensions...</p>`
    } else {
        document.getElementById("gameTitle").innerHTML = ""
    }
    document.getElementById("mapName").innerHTML = gameMaps[currentMap].nome;
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
            else if (botao.botAcao === "toggle") bloco.objAtivo = !bloco.objAtivo;
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
                bloco.cor = bloco.botPermaColor;
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
    // [LMAOOOO]
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

    // verifica colisão, se tiver batendo, faz o mesmo esquema de +X e -X do colisor, se não, só taca o raiobloco pra frente no movimento normal

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
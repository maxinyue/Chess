var chessboard = {
    horizonNumber: 9,
    verticalNumber: 5,
    spacing: 50,
    padding: 40,
    x: 80,
    y: 80
};

var pieces = [
    {text: '将', color: 'red', value: 6},
    {text: '士', color: 'red', value: 5},
    {text: '士', color: 'red', value: 5},
    {text: '象', color: 'red', value: 4},
    {text: '象', color: 'red', value: 4},
    {text: '马', color: 'red', value: 3},
    {text: '马', color: 'red', value: 3},
    {text: '车', color: 'red', value: 2},
    {text: '车', color: 'red', value: 2},
    {text: '炮', color: 'red', value: 1},
    {text: '炮', color: 'red', value: 1},
    {text: '卒', color: 'red', value: 0},
    {text: '卒', color: 'red', value: 0},
    {text: '卒', color: 'red', value: 0},
    {text: '卒', color: 'red', value: 0},
    {text: '卒', color: 'red', value: 0},
    {text: '帅', color: 'black', value: 6},
    {text: '士', color: 'black', value: 5},
    {text: '士', color: 'black', value: 5},
    {text: '相', color: 'black', value: 4},
    {text: '相', color: 'black', value: 4},
    {text: '马', color: 'black', value: 3},
    {text: '马', color: 'black', value: 3},
    {text: '车', color: 'black', value: 2},
    {text: '车', color: 'black', value: 2},
    {text: '炮', color: 'black', value: 1},
    {text: '炮', color: 'black', value: 1},
    {text: '兵', color: 'black', value: 0},
    {text: '兵', color: 'black', value: 0},
    {text: '兵', color: 'black', value: 0},
    {text: '兵', color: 'black', value: 0},
    {text: '兵', color: 'black', value: 0}
];
var positions = [];

var status = {
    current: 'choose_side',
    list:['choose_side','red_turn', 'black_turn']
};

var my_turn=true;

var initPositions = function () {
    var i;
    var j;
    var length1 = chessboard.horizonNumber - 1;
    var length2 = chessboard.verticalNumber - 1;
    for (i = 0; i < length1; i++) {
        for (j = 0; j < length2; j++) {
            positions.push({indexX: i, indexY: j, x: (i + 1 / 2) * chessboard.spacing + chessboard.padding + chessboard.x, y: (j + 1 / 2) * chessboard.spacing + chessboard.padding + chessboard.y});
            //      console.log("x=" + ((i + 1) * chessboard.spacing + chessboard.x ) + " y=" + ((j + 1) * chessboard.spacing + chessboard.y));
        }
    }
};

var canvas = document.getElementById("chess");
/**
 * 绘制棋盘
 */
var drawChessboard = function () {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = 'burlywood';
    var innerWidth = (chessboard.horizonNumber - 1) * chessboard.spacing;
    var innerhieght = (chessboard.verticalNumber - 1) * chessboard.spacing;
    var outerWidth = innerWidth + chessboard.padding * 2;
    var outerhieght = innerhieght + chessboard.padding * 2;
    ctx.fillRect(chessboard.x, chessboard.y, outerWidth, outerhieght);
    ctx.strokeRect(chessboard.x + chessboard.padding, chessboard.y + chessboard.padding, innerWidth, innerhieght);
    /**
     * 竖线
     */
    for (var i = 1; i < chessboard.horizonNumber; i++) {
        ctx.strokeRect(chessboard.x + chessboard.padding + i * chessboard.spacing, chessboard.y + chessboard.padding, 0, innerhieght);
    }
    /**
     * 横线
     */
    for (var j = 1; j < chessboard.verticalNumber; j++) {
        ctx.strokeRect(chessboard.x + chessboard.padding, chessboard.y + chessboard.padding + j * chessboard.spacing, innerWidth, 0);
    }
};

var randomsort = function (a, b) {
    return Math.random() > .5 ? -1 : 1;
};
var disorder = function (array) {
    array.sort(randomsort);
};

var drawPiece = function (color, text, x, y) {
    drawBlankPiece(x, y);
    drawCharacter(color, text, x, y);
};

var randomPositions = function () {
    disorder(positions);
};

var randomPieces = function () {
    var i;
    var length = pieces.length;
    for (i = 0; i < length; i++) {
        pieces[i].position = positions[i];
    }
};

var drawBlankPieces = function () {
    var i;
    var length = positions.length;
    for (i = 0; i < length; i++) {
        drawBlankPiece(positions[i].x, positions[i].y);
    }
};

var drawBlankPiece = function (x, y) {
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = 'brown';
    ctx.beginPath();
    ctx.arc(x, y, chessboard.padding / 2, 0, 2 * Math.PI);
    ctx.stroke();
};

var drawCharacter = function (color, text, x, y) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = 'red';
    ctx.font = chessboard.padding + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
};

var init = function () {
    drawChessboard();
    initPositions();
    randomPositions();
    randomPieces();
    drawBlankPieces();
    status.current='choose_side'
};

init();

canvas.addEventListener('mousedown', function (e) {
    console.log("layerX" + e.layerX + " layerY" + e.layerY);
    var x = e.layerX + chessboard.spacing / 2 - (e.layerX - chessboard.x - chessboard.padding) % chessboard.spacing;
    var y = e.layerY + chessboard.spacing / 2 - (e.layerY - chessboard.y - chessboard.padding) % chessboard.spacing;
    drawPiece('#ffffff', '车', x, y);
});








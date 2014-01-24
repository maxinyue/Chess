var chessboard = {
    horizonNumber: 9,
    verticalNumber: 5,
    spacing: 50,
    padding: 30,
    x: 80,
    y: 80
};

chessboard.middleXY = ((chessboard.lineNumber + 1) / 2 - 1) * chessboard.spacing;
var pieces = [
    {text: '车', color: 'red'},
    {text: '马', color: 'red'},
    {text: '炮', color: 'red'},
    {text: '将', color: 'red'},
    {text: '象', color: 'red'},
    {text: '士', color: 'red'},
    {text: '卒', color: 'red'},
    {text: '车', color: 'black'},
    {text: '马', color: 'black'},
    {text: '炮', color: 'black'},
    {text: '帅', color: 'black'},
    {text: '相', color: 'black'},
    {text: '士', color: 'black'},
    {text: '兵', color: 'black'}
];
var positions = [];

var initPositions = function () {
    var i;
    var j;
    var length1 = chessboard.horizonNumber - 1;
    var length2 = chessboard.verticalNumber - 1;
    for (i = 0; i < length1; i++) {
        for (j = 0; j < length2; j++) {
            positions.push({x: (i + 1) * chessboard.spacing + chessboard.x, y: (j + 1) * chessboard.spacing + chessboard.y});
            console.log("x=" + ((i + 1) * chessboard.spacing + chessboard.x ) + " y=" + ((j + 1) * chessboard.spacing + chessboard.y));
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
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    ctx.font = chessboard.padding + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
    ctx.beginPath();
    ctx.arc(x, y, chessboard.padding / 2, 0, 2 * Math.PI);
    ctx.stroke();
};

var randomPositions = function () {
    disorder(positions);
};

var initPieces = function () {

};

var init = function () {
    drawChessboard();
    initPositions();
    randomPositions();
};

init();


canvas.addEventListener('mousedown', function (e) {
    console.log("layerX" + e.layerX + " layerY" + e.layerY);
    var x = e.layerX + chessboard.spacing / 2 - (e.layerX - chessboard.x - chessboard.padding) % chessboard.spacing;
    var y = e.layerY + chessboard.spacing / 2 - (e.layerY - chessboard.y - chessboard.padding) % chessboard.spacing;
    drawPiece('#ffffff', '车', x, y);
});








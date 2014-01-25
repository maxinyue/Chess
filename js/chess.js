var chessboard = {
    horizonNumber: 9,
    verticalNumber: 5,
    spacing: 50,
    padding: 40,
    x: 80,
    y: 80
};

var pieces = [
    {text: '将', color: 'red', value: 6, obverse: false },
    {text: '士', color: 'red', value: 5, obverse: false },
    {text: '士', color: 'red', value: 5, obverse: false },
    {text: '象', color: 'red', value: 4, obverse: false },
    {text: '象', color: 'red', value: 4, obverse: false },
    {text: '马', color: 'red', value: 3, obverse: false },
    {text: '马', color: 'red', value: 3, obverse: false },
    {text: '车', color: 'red', value: 2, obverse: false },
    {text: '车', color: 'red', value: 2, obverse: false },
    {text: '炮', color: 'red', value: 1, obverse: false },
    {text: '炮', color: 'red', value: 1, obverse: false },
    {text: '卒', color: 'red', value: 0, obverse: false },
    {text: '卒', color: 'red', value: 0, obverse: false },
    {text: '卒', color: 'red', value: 0, obverse: false },
    {text: '卒', color: 'red', value: 0, obverse: false },
    {text: '卒', color: 'red', value: 0, obverse: false },
    {text: '帅', color: 'black', value: 6, obverse: false },
    {text: '士', color: 'black', value: 5, obverse: false },
    {text: '士', color: 'black', value: 5, obverse: false },
    {text: '相', color: 'black', value: 4, obverse: false },
    {text: '相', color: 'black', value: 4, obverse: false },
    {text: '马', color: 'black', value: 3, obverse: false },
    {text: '马', color: 'black', value: 3, obverse: false },
    {text: '车', color: 'black', value: 2, obverse: false },
    {text: '车', color: 'black', value: 2, obverse: false },
    {text: '炮', color: 'black', value: 1, obverse: false },
    {text: '炮', color: 'black', value: 1, obverse: false },
    {text: '兵', color: 'black', value: 0, obverse: false },
    {text: '兵', color: 'black', value: 0, obverse: false },
    {text: '兵', color: 'black', value: 0, obverse: false },
    {text: '兵', color: 'black', value: 0, obverse: false },
    {text: '兵', color: 'black', value: 0, obverse: false }
];
var positions = [];

var game_status = {
    current: 'choose_side',
    list: ['choose_side', 'red_turn', 'black_turn']
};

var my_turn = true;

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

var get_indexX = function (x) {
    return ((x - chessboard.x - chessboard.padding) / chessboard.spacing - 1 / 2);
};

var get_indexY = function (y) {
    return ((y - chessboard.y - chessboard.padding) / chessboard.spacing - 1 / 2);
};

var randomsort = function (a, b) {
    return Math.random() > .5 ? -1 : 1;
};
var disorder = function (array) {
    array.sort(randomsort);
};

var drawNewPiece = function (color, text, x, y) {
    drawBlankPiece(x, y);
    drawCharacter(color, text, x, y);
};

var drawPiece = function (piece) {
    drawNewPiece(piece.color, piece.text, piece.position.x, piece.position.y);
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
    ctx.fillStyle = color;
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
    game_status.current = 'choose_side'
};

init();

canvas.addEventListener('mousedown', function (e) {
    console.log("layerX" + e.layerX + " layerY" + e.layerY);
    var x = adjustx(e.layerX);
    var y = adjusty(e.layerY);
    console.log("x=" + x + " y" + y);
    var piece = getPieceByXY(x, y);
    if (game_status.current == 'choose_side') {
        devers_piece(piece);
        switch_turn(game_status.current, piece);
    } else if (game_status.current == 'red_turn' || game_status.current == 'black_turn') {
        if (piece.obverse) {

        } else {
            devers_piece(piece);
            switch_turn(game_status.current, piece);
        }
    }
});
//挑边
var choose_side = function (piece) {

};
//翻子
var devers_piece = function (piece) {
    if (piece.obverse) {
        console.log("已经是正面，不能翻子！");
    } else {
        drawPiece(piece);
        piece.obverse = true;
    }
};

var switch_turn = function (side_complete, piece) {
    if (side_complete == 'red_turn') {
        game_status.current = 'black_turn';
        $("span").text("黑方");
    } else if (side_complete == 'black_turn') {
        game_status.current = 'red_turn';
        $("span").text("红方");
    } else if (side_complete == 'choose_side' && piece.color == 'black') {
        game_status.current = 'red_turn';
        $("span").text("红方");
    } else if (side_complete == 'choose_side' && piece.color == 'red') {
        game_status.current = 'black_turn';
        $("span").text("黑方");
    }
};

var getPieceByXY = function (x, y) {
    var i;
    var length = pieces.length;
    for (i = 0; i < length; i++) {
        if (pieces[i].position.x == x && pieces[i].position.y == y) {
            return pieces[i];
        }
    }
    console.log("坐标xy上无棋子");
    return null;
};

var isObverse = function (piece) {
    return piece.obverse;
};


var adjustx = function (x) {
    return x + chessboard.spacing / 2 - (x - chessboard.x - chessboard.padding) % chessboard.spacing;
};
var adjusty = function (y) {
    return y + chessboard.spacing / 2 - (y - chessboard.y - chessboard.padding) % chessboard.spacing;
};









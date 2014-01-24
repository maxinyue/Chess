var chessboard = {
    lineNumber: 15,
    spacing: 50,
    padding: 30,
    x: 80,
    y: 80
};
chessboard.middleXY = ((chessboard.lineNumber + 1) / 2 - 1) * chessboard.spacing;
var piece = {
    color: '#000000',
    x: chessboard.middleXY,
    y: chessboard.middleXY
};
var count = 0;

var canvas = document.getElementById("game");
/**
 * 绘制棋盘
 */
var drawChessboard = function () {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = 'burlywood';
    var innerWidth = (chessboard.lineNumber - 1) * chessboard.spacing;
    var innerhieght = (chessboard.lineNumber - 1) * chessboard.spacing;
    var outerWidth = innerWidth + chessboard.padding * 2;
    var outerhieght = innerhieght + chessboard.padding * 2;
    ctx.fillRect(chessboard.x, chessboard.y, outerWidth, outerhieght);
    ctx.strokeRect(chessboard.x + chessboard.padding, chessboard.y + chessboard.padding, innerWidth, innerhieght);
    /**
     * 竖线
     */
    for (var i = 1; i < chessboard.lineNumber; i++) {
        ctx.strokeRect(chessboard.x + chessboard.padding + i * chessboard.spacing, chessboard.y + chessboard.padding, 0, innerhieght);
    }
    /**
     * 横线
     */
    for (var j = 1; j < chessboard.lineNumber; j++) {
        ctx.strokeRect(chessboard.x + chessboard.padding, chessboard.y + chessboard.padding + j * chessboard.spacing, innerhieght, 0);
    }
    ctx.fillStyle = '#000000';
    var innerX = chessboard.x + chessboard.padding;
    var innerY = chessboard.y + chessboard.padding;
    var middleXY = chessboard.middleXY;
    ctx.beginPath();
    ctx.arc(innerX + 3 * chessboard.spacing, innerY + 3 * chessboard.spacing, 5, 0, Math.PI * 2, true);
    ctx.arc(innerX + (chessboard.lineNumber - 3 - 1) * chessboard.spacing, innerY + 3 * chessboard.spacing, 5, 0, Math.PI * 2, true);
    ctx.arc(innerX + 3 * chessboard.spacing, innerY + (chessboard.lineNumber - 3 - 1) * chessboard.spacing, 5, 0, Math.PI * 2, true);
    ctx.arc(innerX + middleXY, innerY + middleXY, 5, 0, Math.PI * 2, true);
    ctx.arc(innerX + (chessboard.lineNumber - 3 - 1) * chessboard.spacing, innerY + (chessboard.lineNumber - 3 - 1) * chessboard.spacing, 5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

var drawPiece = function (color, x, y) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, chessboard.spacing / 2 - 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
};

drawChessboard();

canvas.addEventListener('mousedown', function (e) {
    if (count++ % 2 === 0) {
        piece.color = '#000000';
    } else {
        piece.color = '#ffffff';
    }
    piece.x = e.layerX + chessboard.spacing / 2 - (e.layerX - chessboard.x - chessboard.padding + chessboard.spacing / 2) % chessboard.spacing;
    piece.y = e.layerY + chessboard.spacing / 2 - (e.layerY - chessboard.y - chessboard.padding + chessboard.spacing / 2) % chessboard.spacing;
    drawPiece(piece.color, piece.x, piece.y);
});




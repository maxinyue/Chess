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

var innerWidth = (chessboard.horizonNumber - 1) * chessboard.spacing;
var innerhieght = (chessboard.verticalNumber - 1) * chessboard.spacing;
var outerWidth = innerWidth + chessboard.padding * 2;
var outerhieght = innerhieght + chessboard.padding * 2;

var my_turn = true;

var initPositions = function () {
    var i;
    var j;
    var length1 = chessboard.horizonNumber - 1;
    var length2 = chessboard.verticalNumber - 1;
    for (i = 0; i < length1; i++) {
        for (j = 0; j < length2; j++) {
            positions.push({indexX: i, indexY: j, x: (i + 1 / 2) * chessboard.spacing + chessboard.padding + chessboard.x, y: (j + 1 / 2) * chessboard.spacing + chessboard.padding + chessboard.y});
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
//随机排序
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

//擦除棋子
var erasePiece = function (x, y) {
    console.log("erasePiece");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = 'burlywood';
    ctx.strokeStyle = 'black';
    ctx.clearRect(x - chessboard.spacing / 2, y - chessboard.spacing / 2, chessboard.spacing, chessboard.spacing);
    ctx.fillRect(x - chessboard.spacing / 2, y - chessboard.spacing / 2, chessboard.spacing, chessboard.spacing);
    ctx.strokeRect(x - chessboard.spacing / 2, y - chessboard.spacing / 2, chessboard.spacing, chessboard.spacing);
};

//绘制字体
var drawCharacter = function (color, text, x, y) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.font = chessboard.padding + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
};
//初始化
var init = function () {
    drawChessboard();
    initPositions();
    randomPositions();
    randomPieces();
    drawBlankPieces();
    game_status.current = 'choose_side'
};

init();
var firstMouseDown = function (e) {
    console.log("layerX" + e.layerX + " layerY" + e.layerY);
    if (!position_in_chessboard(e.layerX, e.layerY)) {
        console.log("无效点击在棋盘之外");
        return;
    }
    var x = adjustx(e.layerX);
    var y = adjusty(e.layerY);
    console.log("x=" + x + " y" + y);
    var piece = getPieceByXY(x, y);
    if (piece == null) {
        console.log("请选择棋子");
        return;
    }
    if (game_status.current == 'choose_side' || !piece.obverse) {
        devers_piece(piece);
        switch_turn(game_status.current, piece);
    } else if (right_turn(piece.color)) {
        var secondMouseDown = function (e1) {
            if (!position_in_chessboard(e1.layerX, e1.layerY)) {
                console.log("无效点击在棋盘之外");
                return;
            }
            var target_piece = getPieceByXY(adjustx(e1.layerX), adjusty(e1.layerY));
            if (target_piece == null) {
                move_piece(piece, getPositionByXY(adjustx(e1.layerX), adjusty(e1.layerY)));
            } else {
                judge(piece, target_piece);
            }
            canvas.removeEventListener('mousedown', secondMouseDown);
            canvas.addEventListener('mousedown', firstMouseDown);
        };
        canvas.removeEventListener('mousedown', firstMouseDown);
        canvas.addEventListener('mousedown', secondMouseDown);
    }
};
canvas.addEventListener('mousedown', firstMouseDown);
//判断吃子方式或者兑子
var judge = function (source_piece, target_piece) {
    console.log("judge");
    if (valid_target_position(source_piece.position, target_piece.position) && target_piece.obverse && source_piece.color != target_piece.color && source_piece.value == target_piece.value) {
        remove_both_piece(source_piece, target_piece);
        switch_turn(game_status.current, source_piece);
    } else if (source_piece.text == '炮' && valid_across_target_position(source_piece.position, target_piece.position) && (!target_piece.obverse || source_piece.color != target_piece.color)) {
        eat_piece(source_piece, target_piece);
        switch_turn(game_status.current, source_piece);
    } else if (valid_target_position(source_piece.position, target_piece.position) && source_piece.color != target_piece.color && compare_piece(source_piece, target_piece)) {
        eat_piece(source_piece, target_piece);
        switch_turn(game_status.current, source_piece);
    }
};
//是否选则的是本方棋子
var right_turn = function (color) {
    return color == 'red' && game_status.current == 'red_turn' || color == 'black' && game_status.current == 'black_turn';
};
//吃子
var eat_piece = function (source_piece, target_piece) {
    console.log("eat_piece:" + target_piece);
    erasePiece(source_piece.position.x, source_piece.position.y);
    erasePiece(target_piece.position.x, target_piece.position.y);
    remove_from_pieces(target_piece);
    source_piece.position = target_piece.position;
    drawPiece(source_piece);
};
//比较棋子大小
var compare_piece = function (source_piece, target_piece) {
    if (Math.abs(source_piece.value - target_piece.value)!=6) {
        return source_piece.value>target_piece.value;
    }else{
        return source_piece.value<target_piece.value;
    }
};
//根据校准后xy定位坐标
var getPositionByXY = function (x, y) {
    return {
        x: x,
        y: y,
        indexX: get_indexX(x),
        indexY: get_indexY(y)
    };
};
//翻子
var devers_piece = function (piece) {
    console.log("devers_piece:" + piece);
    if (piece.obverse) {
        console.log("已经是正面，不能翻子！");
    } else {
        drawPiece(piece);
        piece.obverse = true;
    }
};
//移动棋子
var move_piece = function (piece, target_position) {
    console.log("move_piece:" + piece);
    if (valid_target_position(piece.position, target_position)) {
        erasePiece(piece.position.x, piece.position.y);
        piece.position = target_position;
        drawPiece(piece);
        switch_turn(game_status.current, piece);
    }
};
//兑子
var remove_both_piece = function (source_piece, target_piece) {
    console.log("remove_both_piece: " + source_piece + " " + target_piece);
    remove_from_pieces(source_piece);
    remove_from_pieces(target_piece);
    erasePiece(source_piece.position.x, source_piece.position.y);
    erasePiece(target_piece.position.x, target_piece.position.y);
};
//是否在棋盘内
var position_in_chessboard = function (x, y) {
    return  x > (chessboard.x + chessboard.padding) && x < (chessboard.x + innerWidth + chessboard.padding) && y > (chessboard.y + chessboard.padding) && y < (chessboard.y + innerhieght + chessboard.padding)
};
//正确的相邻位置
var valid_target_position = function (source_position, target_position) {
    return (Math.abs(source_position.indexX - target_position.indexX) + Math.abs(source_position.indexY - target_position.indexY)) == 1;
};
//间隔一枚棋子
var valid_across_target_position = function (source_position, target_position) {
    if (source_position.indexX == target_position.indexX) {
        if (source_position.indexY > target_position.indexY) {
            return  across_one(false, source_position.indexX, target_position.indexY, source_position.indexY);
        } else {
            return  across_one(false, source_position.indexX, source_position.indexY, target_position.indexY);
        }
    } else if (source_position.indexY == target_position.indexY) {
        if (source_position.indexX > target_position.indexX) {
            return  across_one(true, source_position.indexY, target_position.indexX, source_position.indexX);
        } else {
            return  across_one(true, source_position.indexY, source_position.indexX, target_position.indexX);
        }
    } else {
        return false;
    }
};
//是否间隔一枚棋子
var across_one = function (compareX, same, a1, a2) {
    var j = 0;
    var i;
    var length = pieces.length;
    for (i = 0; i < length; i++) {
        if (compareX) {
            if (pieces[i].position.indexY == same && pieces[i].position.indexX > a1 && pieces[i].position.indexX < a2) {
                j++;
            }
        } else {
            if (pieces[i].position.indexX == same && pieces[i].position.indexY > a1 && pieces[i].position.indexY < a2) {
                j++;
            }
        }
    }
    return j == 1;
};

//转换走子方
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
//根据坐标获取棋子
var getPieceByXY = function (x, y) {
    var i;
    var length = pieces.length;
    var piece = null;
    for (i = 0; i < length; i++) {
        if (pieces[i].position.x == x && pieces[i].position.y == y) {
            piece = pieces[i];
            break;
        }
    }
    return piece;
};
//是否正面
var isObverse = function (piece) {
    return piece.obverse;
};

//校准坐标（鼠标左边校准到标准坐标方格中心）
var adjustx = function (x) {
    return x + chessboard.spacing / 2 - (x - chessboard.x - chessboard.padding) % chessboard.spacing;
};
var adjusty = function (y) {
    return y + chessboard.spacing / 2 - (y - chessboard.y - chessboard.padding) % chessboard.spacing;
};
//从棋子数组中删除数据
var remove_from_pieces = function (piece) {
    var i;
    var length = pieces.length;
    for (i = 0; i < length; i++) {
        if (pieces[i].position.x == piece.position.x && pieces[i].position.y == piece.position.y) {
            pieces.splice(i, 1);
            break;
        }
    }
};









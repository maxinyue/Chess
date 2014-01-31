window.chess = function (pieces, chessboard) {
    var self = this;

    self.positions = [];
    self.canvas = document.getElementById("chess");

    self.source_piece = null;
    self.target_piece = null;

    self.game_status = {
        current: 'choose_side',
        list: ['choose_side', 'red_turn', 'black_turn']
    };

    self.innerWidth = (chessboard.horizonNumber - 1) * chessboard.spacing;
    self.innerhieght = (chessboard.verticalNumber - 1) * chessboard.spacing;
    self.outerWidth = innerWidth + chessboard.padding * 2;
    self.outerhieght = innerhieght + chessboard.padding * 2;

    self.side=null;

    self.initPositions = function () {
        var i;
        var length = pieces.length;
        for (i = 0; i < length; i++) {
            pieces[i].position.x = (pieces[i].position.indexX + 1 / 2) * chessboard.spacing + chessboard.padding + chessboard.x
            pieces[i].position.y = (pieces[i].position.indexY + 1 / 2) * chessboard.spacing + chessboard.padding + chessboard.y
        }
    };


    /**
     * 绘制棋盘
     */
    self.drawChessboard = function () {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = 'burlywood';
        ctx.strokeStyle = 'black';
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

    self.get_indexX = function (x) {
        return ((x - chessboard.x - chessboard.padding) / chessboard.spacing - 1 / 2);
    };

    self.get_indexY = function (y) {
        return ((y - chessboard.y - chessboard.padding) / chessboard.spacing - 1 / 2);
    };

    self.drawNewPiece = function (color, text, x, y) {
        drawBlankPiece(x, y);
        drawCharacter(color, text, x, y);
    };

    self.drawPiece = function (piece) {
        if (piece.obverse) {
            drawNewPiece(piece.color, piece.text, piece.position.x, piece.position.y);
        } else if (!piece.obverse) {
            drawBlankPiece(piece.position.x, piece.position.y);
        }
    };

    self.drawBlankPieces = function () {
        var i;
        var length = positions.length;
        for (i = 0; i < length; i++) {
            drawBlankPiece(positions[i].x, positions[i].y);
        }
    };

    self.drawBlankPiece = function (x, y) {
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = 'brown';
        ctx.beginPath();
        ctx.arc(x, y, chessboard.padding / 2, 0, 2 * Math.PI);
        ctx.stroke();
    };

//擦除棋子
    self.erasePiece = function (x, y) {
        console.log("erasePiece");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = 'burlywood';
        ctx.strokeStyle = 'black';
        ctx.clearRect(x - chessboard.spacing / 2, y - chessboard.spacing / 2, chessboard.spacing, chessboard.spacing);
        ctx.fillRect(x - chessboard.spacing / 2, y - chessboard.spacing / 2, chessboard.spacing, chessboard.spacing);
        ctx.strokeRect(x - chessboard.spacing / 2, y - chessboard.spacing / 2, chessboard.spacing, chessboard.spacing);
    };

//绘制字体
    self.drawCharacter = function (color, text, x, y) {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.font = chessboard.padding + 'px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
    };


    self.secondMouseDown = function (e1) {
        if (!position_in_chessboard(e1.layerX, e1.layerY)) {
            console.log("无效点击在棋盘之外");
            return;
        }
        target_piece = getPieceByXY(adjustx(e1.layerX), adjusty(e1.layerY));
        if (target_piece == null) {
            move_piece(source_piece, getPositionByXY(adjustx(e1.layerX), adjusty(e1.layerY)));
        } else {
            judge(source_piece, target_piece);
        }
        removeAllEvents(canvas, 'mousedown');
        addEvent(canvas, 'mousedown', firstMouseDown, false);
    };
    self.firstMouseDown = function (e) {
//        console.log("layerX" + e.layerX + " layerY" + e.layerY);
//        if(game_status.current != 'choose_side'&&game_status.current!=self.side){
//            console.log("不是您的回合！");
//            return;
//        }
        if (!position_in_chessboard(e.layerX, e.layerY)) {
            console.log("无效点击在棋盘之外");
            return;
        }
        var x = adjustx(e.layerX);
        var y = adjusty(e.layerY);
        console.log("x=" + x + " y" + y);
        source_piece = getPieceByXY(x, y);
        if (source_piece == null) {
            console.log("请选择棋子");
            return;
        }
        if (game_status.current == 'choose_side' || !source_piece.obverse) {
            devers_piece(source_piece);
            switch_turn(game_status.current, source_piece);
        } else if (right_turn(source_piece.color)) {
            removeAllEvents(canvas, 'mousedown');
            addEvent(canvas, 'mousedown', secondMouseDown, false);
        }
    };

    self.redrawAll = function () {
        drawChessboard();
        drawAllPieces(pieces);
    };

    self.drawAllPieces = function (pieces) {
        var i;
        var length = pieces.length;
        for (i = 0; i < length; i++) {
            drawPiece(pieces[i]);
        }
    };

    //初始化
    self.init = function () {
        initPositions();
        redrawAll();
        game_status.current = 'choose_side';
        removeAllEvents(canvas, 'mousedown');
        addEvent(canvas, 'mousedown', firstMouseDown, false);
    };

    self.init();

//判断吃子方式或者兑子
    self.judge = function (source_piece, target_piece) {
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
    self.right_turn = function (color) {
        return color == 'red' && game_status.current == 'red_turn' || color == 'black' && game_status.current == 'black_turn';
    };
//吃子
    self.eat_piece = function (source_piece, target_piece) {
        console.log("eat_piece:" + target_piece);
        erasePiece(source_piece.position.x, source_piece.position.y);
        erasePiece(target_piece.position.x, target_piece.position.y);
        remove_from_pieces(target_piece);
        source_piece.position = target_piece.position;
        drawPiece(source_piece);
    };
//比较棋子大小
    self.compare_piece = function (source_piece, target_piece) {
        if (Math.abs(source_piece.value - target_piece.value) != 6) {
            return source_piece.value > target_piece.value;
        } else {
            return source_piece.value < target_piece.value;
        }
    };
//根据校准后xy定位坐标
    self.getPositionByXY = function (x, y) {
        return {
            x: x,
            y: y,
            indexX: get_indexX(x),
            indexY: get_indexY(y)
        };
    };
//翻子
    self.devers_piece = function (piece) {
        console.log("devers_piece:" + piece);
        if (piece.obverse) {
            console.log("已经是正面，不能翻子！");
        } else {
            piece.obverse = true;
            drawPiece(piece);
        }
    };
//移动棋子
    self.move_piece = function (piece, target_position) {
        console.log("move_piece:" + piece);
        if (valid_target_position(piece.position, target_position)) {
            erasePiece(piece.position.x, piece.position.y);
            piece.position = target_position;
            drawPiece(piece);
            switch_turn(game_status.current, piece);
        }
    };
//兑子
    self.remove_both_piece = function (source_piece, target_piece) {
        console.log("remove_both_piece: " + source_piece + " " + target_piece);
        remove_from_pieces(source_piece);
        remove_from_pieces(target_piece);
        erasePiece(source_piece.position.x, source_piece.position.y);
        erasePiece(target_piece.position.x, target_piece.position.y);
    };
//是否在棋盘内
    self.position_in_chessboard = function (x, y) {
        return  x > (chessboard.x + chessboard.padding) && x < (chessboard.x + innerWidth + chessboard.padding) && y > (chessboard.y + chessboard.padding) && y < (chessboard.y + innerhieght + chessboard.padding)
    };
//正确的相邻位置
    self.valid_target_position = function (source_position, target_position) {
        return (Math.abs(source_position.indexX - target_position.indexX) + Math.abs(source_position.indexY - target_position.indexY)) == 1;
    };
//间隔一枚棋子
    self.valid_across_target_position = function (source_position, target_position) {
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
    self.across_one = function (compareX, same, a1, a2) {
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
    self.switch_turn = function (side_complete, piece) {
        if (win(piece)) {
            switch (piece.color) {
                case 'black':
                    alert("黑方胜利！");
                    break;
                case 'red':
                    alert("红方胜利！");
                    break;
            }
            init();
            return;
        }
        if (side_complete == 'red_turn') {
            game_status.current = 'black_turn';
            $("span").text("黑方");
        } else if (side_complete == 'black_turn') {
            game_status.current = 'red_turn';
            $("span").text("红方");
        } else if (side_complete == 'choose_side' && piece.color == 'black') {
            game_status.current = 'red_turn';
            self.side='black_turn';
            $("span").text("红方");
        } else if (side_complete == 'choose_side' && piece.color == 'red') {
            game_status.current = 'black_turn';
            self.side='red_turn';
            $("span").text("黑方");
        }

        websocket().sendRequest({
            sender: piece.color,
            receiver: opposite(piece.color),
            MessageType: 'TURN',
            content:game_status.current,
            pieces: pieces
        });
    };

    self.opposite = function (color) {
        if (color == 'black') {
            return 'red';
        } else {
            return 'black';
        }
    };

//根据坐标获取棋子
    self.getPieceByXY = function (x, y) {
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
    self.isObverse = function (piece) {
        return piece.obverse;
    };
    self.win = function (piece) {
        if (pieces.length > 16) {
            return false;
        }
        var i;
        var length = pieces.length;
        for (i = 0; i < length; i++) {
            if (pieces[i].color != piece.color) {
                return false;
            }
        }
        return true;
    };

//校准坐标（鼠标左边校准到标准坐标方格中心）
    self.adjustx = function (x) {
        return x + chessboard.spacing / 2 - (x - chessboard.x - chessboard.padding) % chessboard.spacing;
    };
    self.adjusty = function (y) {
        return y + chessboard.spacing / 2 - (y - chessboard.y - chessboard.padding) % chessboard.spacing;
    };
//从棋子数组中删除数据
    self.remove_from_pieces = function (piece) {
        var i;
        var length = pieces.length;
        for (i = 0; i < length; i++) {
            if (pieces[i].position.x == piece.position.x && pieces[i].position.y == piece.position.y) {
                pieces.splice(i, 1);
                break;
            }
        }
    };

    self.getCurrentPieces = function () {
        return pieces;
    };

    return self;
};












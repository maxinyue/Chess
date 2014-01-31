window.websocket=function(){

    var Service = {};
    var ws = new WebSocket("ws://localhost:8085/chess/websocket");

    ws.onopen = function () {
        console.log("Socket has been opened!");
        ws.send(JSON.stringify({
            sender: {
                user:'admin'
            },
            messageType: 'LOGIN',
            content: 'LOGIN'
        }));
    };

    ws.onmessage = function (message) {
        var msg = JSON.parse(message.data);
        console.log(msg);
        if (msg.messageType == 'TURN') {
            chess.drawAllPieces(msg);
        }
    };

    ws.onclose = function () {
        console.log("Socket has been closed!");
    };

    Service.sendRequest = function (message) {
        if (ws && (ws.readyState === 1)) {
            Service.send(message);
            ws.removeEventListener("open", function () {
                Service.send(message);
            });
        } else {
            ws.addEventListener("open", function () {
                Service.send(message);
            });
        }
    };

    Service.send = function (message) {
        var msg = JSON.stringify(message);
        console.log("sendRequest: " + msg);
        ws.send(msg);
    };

    return Service;
};
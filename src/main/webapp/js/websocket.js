angular.module('websocketModule', []).factory('messageService', ['$q', '$rootScope', function ($q, $rootScope) {

    var Service = {};

    Service.business_messages = [];

    Service.normal_messages = [];

    Service.normal_messages_history = [];

    Service.system_messages = [];

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
        var messsage = JSON.parse(message.data);
        console.log(message);
        if (messsage.messageType == 'BUSINESS') {
            Service.business_messages.push({
                id: UUID.generate(),
                message: messsage
            });
            $rootScope.$broadcast('BUSINESS_MESSAGE');
        } else if (messsage.messageType == 'NORMAL') {
            Service.normal_messages.push(messsage);
            Service.normal_messages_history.push(messsage);
            $rootScope.$broadcast('NORMAL_MESSAGE');
        } else if (messsage.messageType == 'SYSTEM') {
            Service.system_messages.push(messsage);
            $rootScope.$broadcast('SYSTEM_MESSAGE');
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
}]);
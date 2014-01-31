var chessApp = angular.module('chessApp', []);
chessApp.controller("chessController", ['$scope', '$http', function chessController($scope, $http) {
    $scope.chessboard = null;
    $scope.pieces = [];
    var baseApiUrl = (function (str) {
        var reg = /^\//;
        if (reg.test(str)) {
            return str;
        } else {
            var pathName = window.document.location.pathname;
            return pathName.substring(0, pathName.substr(1).indexOf('/') + 1) + "/" + str;
        }
    }(("resources")));
    $scope.getPieces = function () {
        var url = baseApiUrl + "/piece/chess";
        $http.get(url).success(function (data) {
            $scope.getChessboard('1');
            $scope.pieces = data;
        }).error(function (data, status, headers, config) {
                console.log("查询棋子数据出错！");
            });
    };
    $scope.getChessboard = function (id) {
        var url = baseApiUrl + "/chessboard/" + id;
        $http.get(url).success(function (data) {
            $scope.chessboard = data;
            chess($scope.pieces, $scope.chessboard).init();
        }).error(function (data, status, headers, config) {
                console.log("查询棋盘数据出错！");
            });
    };
    $scope.getPieces();

    $scope.newChess = function () {
        $scope.getPieces();
    };
}]);
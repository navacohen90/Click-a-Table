function ManagerController($scope, $http) {
    $scope.messages = {};
    $scope.orders = {};

    $scope.loadCalls = loadCalls;
    $scope.loadOrders = loadOrders;
    $scope.closeMessage  = closeMessage;
    $scope.closeOrderItem  = closeOrderItem;

    loadCalls();
    loadOrders();

    function loadCalls() {
        $http.get('/message/viewOpenUserCallMessages')
            .success(function (data) {
                $scope.messages = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    function loadOrders() {
        $http.get('/message/viewOpenOrders')
            .success(function (data) {
                $scope.orders = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    function closeMessage(items, index, tableNo, type) {
        // var isLogged = (user != null);

        var message = ({type: type, tableNo: tableNo, restaurantId: 1});
        $http.post('/message/closeMessage', message)
            .success(function (response) {
                if (response.isDone == true) {
                    loadCalls();
                    alert(response.messages);
                }
                else {
                    alert(response.messages);
                }
            })
            .error(function (error) {
                console.log('Error: ' + error);
            });
    }

    function closeOrderItem(items, index, tableNo, courseId, orderId) {
        // var isLogged = (user != null);

        var order = ({courseId: courseId, tableNo: tableNo, orderId: orderId});
        $http.post('/message/closeOrderItem', order)
            .success(function (response) {
                if (response.isDone == true) {
                    loadOrders();
                }
            })
            .error(function (error) {
                console.log('Error: ' + error);
            });
    }
}
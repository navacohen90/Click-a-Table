function ManagerController($scope, $http) {
    $scope.messages = {};

    $http.get('/message/viewOpenMessages')
        .success(function(data) {
            $scope.messages = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.closeMessage  = closeMessage;

    function closeMessage(items, index, tableNo, type) {
        // var isLogged = (user != null);

        var message = ({type: type, tableNo: tableNo, restaurantId: 1});
        $http.post('/message/closeMessage', message)
            .success(function (response) {
                if (response.isDone == true) {
                    // var items = $scope.messages;
                    // items.remove(index)
                    // $scope.messages = items;
                    //TODO remove the item from list
                }
            })
            .error(function (error) {
                console.log('Error: ' + error);
            });
    }
}
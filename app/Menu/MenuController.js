function MenuController($scope, $routeParams, $http)
{
	var id = ($routeParams.id || 0);
	//$scope.showTable = (id == 0);
    $http.post('/auth/getSessionDetails')
            .success(function (response) {
                var user = response.session.user;
                var tableNo = 0;
                var isLogged = (user != null);
                if(response.session.table != null)
                    tableNo  = response.session.table.tableNo;

                $scope.isLogged = isLogged;
                
                $scope.showTable = (tableNo > 0);
                $scope.tableNo = tableNo;

            })
            .error(function (error) {
                console.log('Error: ' + error);

            });

	
    $http.get('/menu/getMenu/' + id).success( function(response) {
        $scope.menu = response;

		angular.forEach($scope.menu, function (item) {
			item.path = (item.onClick == "" ?  (item.hasChildren ? "#/menu/" : "#/course/") + item.id : "");
			item.image = item.image || "no-image.jpg";
		});
    });
    
    $scope.saveCalls = function(type)
    {
        $http.get('/menu/saveCalls/' + type).success(function (response) {
            alert(response.messages);
        });
    }
    $scope.menuClicked = function (itemOnClick) {
        switch (itemOnClick) {
            case "showOrder":
				window.location.replace('#/order');               
                break;
				
            case "callWaiter":
                $scope.saveCalls("Waiter");
                break;

            case "callBill":
                $scope.saveCalls("Bill");
                break;
            default:
                break;
        }

    }

}
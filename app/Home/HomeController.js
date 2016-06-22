function HomeController($scope, $http) {
    var user;
    $scope.setMenuItems  = function() {
        var isLogged = (user != null);
		var isManager = (user && user.isManager) || false;
		
        $scope.items = [
            { label: "דף הבית", path: "#/HomePage", imageSrc: "", isActive: !isManager, isVisible: !isManager, onClick: "" },
            { label: "התחבר", path: "#/login", imageSrc: "", isActive: false, isVisible: !isLogged, onClick: "" },
            { label: "התנתק", path: "#", imageSrc: "", isActive: false, isVisible: isLogged, onClick: "logout" },
            { label: "מסעדה", path: "#/menu", imageSrc: "", isActive: false, isVisible: !isManager, onClick: "" },
            { label: "סל הזמנה", path: "#/order", imageSrc: "", isActive: false, isVisible: !isManager, onClick: "" },
			{ label: "מנהל", path: "#/manager", imageSrc: "", isActive: isManager, isVisible: isManager, onClick: "" }
			
        ];
    }
    $http.post('/auth/getSessionDetails')
            .success(function (response) {
                user = response.session.user;

                $scope.session = response.session;

                $scope.setMenuItems();

            })
            .error(function (error) {
                console.log('Error: ' + error);

            });


}

function CourseDetailsController($scope, $routeParams, $http)
{
    $scope.onLoad = onLoad;
    $scope.orderCourse = orderCourse;
    $scope.course = {}
    $scope.amount = 1;
    
    var courseId = ($routeParams.courseId || "");

    onLoad();

    function onLoad() {
        $http.get('/courses/details/' + courseId)
            .success(function (data) {
                $scope.course = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    function orderCourse() {
        var amount = $scope.amount || 1;
        /*if (amount < 1)
            return;*/

        var course = ({courseId: courseId, amount: amount});
        $http.post('/order/addOrderItem', course)
            .success(function (response) {
                if (response.isOrdered == true) {
                    $scope.message = response.messages;
                } else {
                    $scope.message = response.messages;
                }
            })
            .error(function (error) {
                console.log('Error: ' + error);
            });
    }
}
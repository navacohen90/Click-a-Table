function CourseDetailsController($scope, $routeParams, $http)
{
    var courseId = ($routeParams.courseId || "");
    
    $scope.orderCourse = orderCourse;
    $scope.course = {}
    
    $http.get('/api/courses/details/' + courseId)
        .success(function(data) {
            $scope.course = data[0];
            console.log(data);
        })
        .error(function(data) {
            debugger;
            console.log('Error: ' + data);
        });

    function orderCourse() {
        var course = ({courseId: courseId, amount: 1/*$scope.amount*/});
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

    }
}

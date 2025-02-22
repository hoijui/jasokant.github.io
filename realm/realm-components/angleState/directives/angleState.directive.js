'use strict';

angleStateComponentModule.directive('angleStateComponent', ['$timeout', '$http', '$q', 'RobotService', function($timeout, $http, $q, RobotService) {

    return {
        restrict: 'E',
        replace: false,
        scope: true,
        template:   '<div class="angle-state-component__container">' +
                        '<form name="angleStateForm" class="angle-state-form">'+
                            '<div class="angle-state-groups">'+
                                '<div class="angle-state-group clearfix" ng-repeat="angle in angleSet.angles">' +
                                    '<h4 class="angle-state-group__name">{{angle.name}}</h4>' +
                                    '<h4 class="angle-state-group__value">{{angle.value | number:4 }} rad</h4>' +
                                '</div>' +
                            '</div>'+
                        '</form>'+
                    '</div>',
        controller: function ControllerFunction($scope,$element,$attrs)
        {
            $scope.angleSet = {
                name: 'Untitled Set',
                angles: [{
                    name: 'Base',
                    value: 0.00
                }, {
                    name: 'Shoulder',
                    value: 0.00
                }, {
                    name: 'Arm',
                    value: 0.00
                }, {
                    name: 'Forearm',
                    value: 0.00
                }, {
                    name: 'Wrist 1',
                    value: 0.00
                }, {
                    name: 'Wrist 2',
                    value: 0.00
                }]
            };
            var getAngleState = function(){
                RobotService.getJoints($scope.component.url).then(function(angleState){
                    $scope.angleSet.value = angleState.radians;
                    
                    $scope.angleSet.angles[0].value = angleState.radians[0];
                    $scope.angleSet.angles[1].value = angleState.radians[1];
                    $scope.angleSet.angles[2].value = angleState.radians[2];
                    $scope.angleSet.angles[3].value = angleState.radians[3];
                    $scope.angleSet.angles[4].value = angleState.radians[4];
                    $scope.angleSet.angles[5].value = angleState.radians[5];

                    setTimeout(getAngleState,30);
                }, function(response){
                    console.log(response);

                    setTimeout(getAngleState,30);
                });
            };

            getAngleState();
        },
        compile: function CompilingFunction(tElement, tAttrs)
        {
            //can only manipulate DOM here (can't access scope yet)
            return function LinkingFunction(scope, element, attrs, ctrl) {
                //can access scope now

            }
        }
    }
}]);


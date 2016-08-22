function tbRoundBtn() {
    var directive = 
    {
        restrict: 'E',
        transclude: true,
        template: '<ng-transclude></ng-transclude>'        
    };

    return directive;
}

module.exports = { name: 'tbRoundBtn', drtv: tbRoundBtn };
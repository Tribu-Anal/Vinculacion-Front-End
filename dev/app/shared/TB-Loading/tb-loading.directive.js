function tbLoading() {
    var directive = 
    {
        restrict: 'E',
        templateUrl: 'templates/shared/TB-Loading/tb-loading.html' 
    };

    return directive;
}

module.exports = { name: 'tbLoading', drtv: tbLoading };
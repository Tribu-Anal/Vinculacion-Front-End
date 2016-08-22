function tbButton() {
    var directive = {
        restrict: 'E',
        scope: {
            text: '=?',
            onClick: '=?',
            round: '=?'
        },
        templateUrl: 'templates/shared/TB-Button/tb-button.html'
    };

    return directive;
}

module.exports = { name: 'tbButton', drtv: tbButton };
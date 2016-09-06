function tbEquals () {
	const directive = {
		restrict: 'A',
		require: 'ngModel',
		scope: { otherModel: '=tbEquals' },
		link: (scope, element, attrs, ngModel) => {
			ngModel.$validators.tbEquals = modelValue => {
                return scope.otherModel && modelValue === scope.otherModel;
            };
 
            scope.$watch("otherModel", () => { ngModel.$validate(); });
		}
	};

	return directive;
}

module.exports = { name: 'tbEquals', drtv: tbEquals };
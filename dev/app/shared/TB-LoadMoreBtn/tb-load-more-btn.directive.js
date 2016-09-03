function tbLoadMoreBtn () {
	const directive = {
		restrict: 'E',
		replace: true,
		scope: {
			startPage: '=',
			pageSize: '=',
			model: '=',
			get: '='
		},
		templateUrl: 'templates/shared/TB-LoadMoreBtn/tb-load-more-btn.html',
		link: scope => { 
			scope.page = scope.startPage;
			scope.loadingMore = false;

			scope.loadMore = () => {
				if (scope.loadingMore) return;

				scope.loadingMore = true;
				scope.get(scope.page, scope.pageSize, scope.model, 
					() => { scope.loadingMore = false; });
				scope.page++;
			};

		}
	};

	return directive;
}

module.exports = { name: 'tbLoadMoreBtn', drtv: tbLoadMoreBtn };
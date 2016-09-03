tbLoadMoreBtn.$inject = [ 'TbUtils' ];

function tbLoadMoreBtn (TbUtils) {
	const directive = {
		restrict: 'E',
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
				TbUtils.getAndLoad(scope.get, scope.model, () => { scope.loadingMore = false; scope.page++; }, 
					               scope.page, scope.pageSize);
			};

		}
	};

	return directive;
}

module.exports = { name: 'tbLoadMoreBtn', drtv: tbLoadMoreBtn };
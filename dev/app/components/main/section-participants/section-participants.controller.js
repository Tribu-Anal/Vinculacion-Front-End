SectionParticipantsController.$inject = ['$stateParams'];

function SectionParticipantsController ($stateParams) {
	console.log($stateParams);
	const vm = this;
}

module.exports = { name: 'SectionParticipantsController', ctrl: SectionParticipantsController };
function redirect (state, toState, role, ev) {

	switch (toState) {

		// ADMIN-ONLY STATES

		case 'main.import-students':
		case 'main.newprofessor':
		case 'main.reports':
		case 'main.newsection':
		case 'main.settlement':
			if (role !== 'admin') {
				goToDashboard(state, role);
				ev.preventDefault();
			}
			break;

		// ADMIN-TEACHER STATES
		
		case 'main.edit-hours':
		case 'main.project':
		case 'main.evaluateproject':
		case 'main.addproject':
		case 'main.editproject':
		case 'main.projects':
		case 'main.section':
		case 'main.sections':
			if (role === 'student') {
				goToDashboard(state, role);
				ev.preventDefault();
			}
			break;

		// TEACHER-ONLY STATES

		case 'main.professor-dashboard':
			if (role !== 'professor') {
				goToDefault(state, role);
				ev.preventDefault();
			}
			break;

		// STUDENT-ONLY STATES

		case 'main.student-dashboard':
			if (role !== 'student') {
				goToDefault(state, role);
				ev.preventDefault();
			}
			break;

		case 'landing':
		case 'landing.login': break;

		default:
			goToDefault(state, role);
			ev.preventDefault();
			break;

	}
	
}

function goToDefault (state, role) {
	if (role !== 'admin')
		goToDashboard(state, role);
	else
		goToProjects(state);
}

function goToDashboard (state, role) {
	state.go(`main.${role}-dashboard`);
}

function goToProjects (state) {
	state.go('main.projects');
}

module.exports = redirect;
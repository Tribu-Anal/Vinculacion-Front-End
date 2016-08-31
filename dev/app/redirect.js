function redirect (state, toState, role, ev) {

	switch (toState) {

		// ADMIN-ONLY STATES

		case 'main.import-students':
		case 'main.newprofessor':
		case 'main.reports':
		case 'main.settlement':
		case 'main.admin-dashboard':
		case 'main.newclass':
		case 'main.approve-hours':
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
		case 'main.newsection':
			if (role === 'student') {
				goToDashboard(state, role);
				ev.preventDefault();
			}
			break;

		// TEACHER-ONLY STATES

		case 'main.professor-dashboard':
			if (role !== 'professor') {
				goToDashboard(state, role);
				ev.preventDefault();
			}
			break;

		// STUDENT-ONLY STATES

		case 'main.student-dashboard':
			if (role !== 'student') {
				goToDashboard(state, role);
				ev.preventDefault();
			}
			break;

		case 'landing':
		case 'landing.login':
		case 'landing.enable-student':
		case 'main.activateprofessor': break;

		default:
			goToDashboard(state, role);
			ev.preventDefault();
			break;

	}
	
}

function goToDashboard (state, role) {
	state.go(`main.${role}-dashboard`);
}

module.exports = redirect;
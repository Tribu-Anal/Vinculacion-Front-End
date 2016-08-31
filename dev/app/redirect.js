function redirect (state, toState, role, loggedIn, ev) {
	
	switch (toState) {

		// ADMIN-ONLY STATES

		case 'main.import-students':
		case 'main.newprofessor':
		case 'main.reports':
		case 'main.settlement':
		case 'main.admin-dashboard':
		case 'main.newclass':
		case 'main.approve-hours':
			if (!loggedIn)
				goToLanding(state, ev);

			else if (role !== 'admin')
				goToDashboard(state, role, ev);
			
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
			if (!loggedIn) 
				goToLanding(state, ev);

			else if (role === 'student')
				goToDashboard(state, role, ev);

			break;

		// TEACHER-ONLY STATES

		case 'main.professor-dashboard':
			if (!loggedIn)
				goToLanding(state, ev);

			else if (role !== 'professor')
				goToDashboard(state, role, ev);

			break;

		// STUDENT-ONLY STATES

		case 'main.student-dashboard':
			if (!loggedIn)
				goToLanding(state, ev);

			else if (role !== 'student')
				goToDashboard(state, role, ev);

			break;

		case 'landing':
		case 'landing.login':
		case 'landing.enable-student':
		case 'main.activateprofessor': 
			if (loggedIn)
				goToDashboard(state, role, ev);
			break;

		default:
			ev.preventDefault();
			break;

	}
	
}

function goToDashboard (state, role, ev) {
	state.go(`main.${role}-dashboard`);
	ev.preventDefault();
}

function goToLanding (state, ev) {
	state.go(`landing.login`);
	ev.preventDefault();
}

module.exports = redirect;
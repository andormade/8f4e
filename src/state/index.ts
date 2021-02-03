import viewport from './mutators/viewport';
import loader from './mutators/loader';
import contextMenu from './mutators/contextMenu';
import moduleDragger from './mutators/modules/moduleDragger';
import moduleCreator from './mutators/modules/moduleCreator';
import connectionMaker from './mutators/connections';
import error from './mutators/error';
import history from './mutators/history';
import tests from './mutators/tests';
import compiler from './mutators/compiler';
import midi from './mutators/midi';

const init = function (events) {
	const state = { ui: {} };

	compiler(state, events);
	midi(state, events);
	loader(state, events);
	history(state, events);
	connectionMaker(state, events);
	moduleDragger(state, events);
	viewport(state, events);
	contextMenu(state, events);
	moduleCreator(state, events);
	error(state, events);
	tests(state, events);

	return state;
};

export default init;

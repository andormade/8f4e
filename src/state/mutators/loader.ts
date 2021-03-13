import { State } from '../types';

const STRUCTURE_VERSION = 4;

const defaultState: State = {
	compiler: {
		compilationTime: 0,
		isCompiling: false,
		outputAddressLookup: {},
		memoryBuffer: [],
	},
	connections: [],
	isDebugMode: process.env.NODE_ENV === 'development',
	modules: [],
	viewport: {
		width: 0,
		height: 0,
		x: 0,
		y: 0,
	},
	midi: {
		ports: [],
	},
	error: {
		display: false,
		message: '',
	},
};

const loader = function (state, events) {
	state.ui = { ...defaultState, ...(JSON.parse(localStorage.getItem('state')) || {}) };
	if (state.ui.sructureVersion !== STRUCTURE_VERSION) {
		state.ui = { sructureVersion: STRUCTURE_VERSION, ...defaultState };
	}
	state.history = [];

	// @ts-ignore
	window.state = state;

	const onSaveState = () => {
		localStorage.setItem(
			'state',
			JSON.stringify({
				connections: state.ui.connections,
				modules: state.ui.modules,
				sructureVersion: state.ui.sructureVersion,
				viewport: state.ui.viewport,
			})
		);
	};

	const onOpenFile = () => {};

	events.on('saveState', onSaveState);
	events.on('open', onOpenFile);
};

export default loader;

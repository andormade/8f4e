import compiler from './effects/compiler';
import connectionMaker from './effects/connections';
import contextMenu from './effects/menu/contextMenu';
import error from './effects/error';
import history from './effects/history';
import loader from './effects/loader';
import midi from './effects/midi';
import moduleCreator from './effects/modules/moduleCreator';
import moduleDragger from './effects/modules/moduleDragger';
import moduleMenu from './effects/menu/moduleMenu';
import save from './effects/save';
import viewport from './effects/viewport';
import { Options, Project, State } from './types';
import graphicHelper from './effects/graphicHelper';
import moduleOpener from './effects/modules/moduleOpener';
import _switch from './effects/modules/switch';
import RNBO from './effects/rnbo';
import worklet from './effects/worklet';

import { EventDispatcher } from '../events';

const defaultState: State = {
	compiler: {
		compilationTime: '0',
		cycleTime: 0,
		isCompiling: false,
		lastCompilationStart: 0,
		memoryBuffer: new Int32Array(),
		memoryRef: undefined,
		memoryAddressLookup: new Map(),
		timerAccuracy: 0,
		compiledModules: new Map(),
		buildErrors: [],
	},
	history: [],
	midi: {
		ports: [],
	},
	error: {
		display: false,
		message: '',
	},
	isConnectionBeingMade: false,
	connectionPointA: undefined,
	connectionPointB: undefined,
	contextMenu: undefined,
	connectionFromModule: undefined,
	connectionFromConnector: undefined,
	graphicHelper: { connections: [], modules: new Map() },
	selectedModule: undefined,
	project: {
		modules: [],
		connections: [],
		viewport: {
			height: 0,
			width: 0,
			x: 0,
			y: 0,
		},
		rnbo: { patchers: {} },
	},
	options: {
		isLocalStorageEnabled: true,
		isDebugMode: process.env.NODE_ENV === 'development',
		localStorageId: 'default',
	},
};

export default function init(events: EventDispatcher, project: Project, options: Partial<Options>): State {
	const state = { ...defaultState, project, options: { ...defaultState.options, ...options } };
	midi(state, events);
	loader(state, events, defaultState);
	history(state, events);
	connectionMaker(state, events);
	moduleDragger(state, events);
	moduleOpener(state, events);
	_switch(state, events);
	viewport(state, events);
	contextMenu(state, events);
	moduleMenu(state, events);
	moduleCreator(state, events);
	error(state, events);
	compiler(state, events);
	graphicHelper(state, events);
	save(state, events);
	RNBO(state, events);
	worklet(state, events);
	events.dispatch('init');
	return state;
}
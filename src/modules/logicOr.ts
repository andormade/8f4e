import { ModuleType } from '../state/types';

const logicOr: ModuleType = {
	category: 'Logic',
	connectors: [
		{ id: 'in:1', x: 5, y: 20, isInput: true },
		{ id: 'in:2', x: 5, y: 35, isInput: true },
		{ id: 'out', x: 85, y: 20, isInput: false },
	],
	engine: 'logicOr',
	height: 100,
	name: 'Logic OR',
	sliders: [],
	steppers: [],
	switches: [],
	width: 100,
};

export default logicOr;

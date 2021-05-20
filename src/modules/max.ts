import { ModuleType } from '../state/types';

const max: ModuleType = {
	category: 'Logic',
	connectors: [
		{ id: 'in:1', x: 5, y: 20, isInput: true },
		{ id: 'in:2', x: 5, y: 35, isInput: true },
		{ id: 'out', x: 85, y: 20, isInput: false },
	],
	engine: 'max',
	height: 10,
	name: 'Max',
	sliders: [],
	steppers: [],
	switches: [],
	width: 20,
};

export default max;

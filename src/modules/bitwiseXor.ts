import { ModuleType } from '../state/types';

const bitwiseXor: ModuleType = {
	category: 'Bitwise',
	connectors: [
		{ id: 'in:1', x: 5, y: 20, isInput: true },
		{ id: 'in:2', x: 5, y: 35, isInput: true },
		{ id: 'out', x: 85, y: 20, isInput: false },
	],
	engine: 'bitwiseXor',
	height: 100,
	name: 'Bitwise XOR',
	sliders: [],
	steppers: [],
	switches: [],
	width: 100,
};

export default bitwiseXor;
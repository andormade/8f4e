import { ModuleType } from '../state/types';

const sequentialSwitch: ModuleType = {
	category: 'Logic',
	engine: 'sequentialSwitch',
	height: 10,
	inputs: [
		{ id: 'in:1', x: 5, y: 20, isInput: true },
		{ id: 'in:2', x: 5, y: 35, isInput: true },
		{ id: 'in:3', x: 5, y: 50, isInput: true },
		{ id: 'in:4', x: 5, y: 65, isInput: true },
		{ id: 'in:clock', x: 5, y: 80, isInput: true },
	],
	name: 'Sequential switch',
	outputs: [{ id: 'out', x: 85, y: 20 }],
	sliders: [],
	steppers: [],
	switches: [],
	width: 20,
};

export default sequentialSwitch;

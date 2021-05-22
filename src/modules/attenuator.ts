import { ModuleType } from '../state/types';

const attenuator: ModuleType = {
	category: 'Other',
	config: {
		divisor: 1,
	},
	engine: 'attenuator',
	height: 10,
	inputs: [{ id: 'in', x: 5, y: 20 }],
	name: 'Attenuator',
	outputs: [{ id: 'out', x: 85, y: 20 }],
	sliders: [{ id: 'divisor', x: 10, y: 20, width: 10, height: 50, minValue: 1, maxValue: 100, resolution: 1 }],
	steppers: [],
	switches: [],
	width: 20,
};

export default attenuator;

import addDefaultInputPositions from './helpers/addDefaultInputPositions';
import addDefaultOutputPositions from './helpers/addDefaultOutputPositions';
import { ModuleType } from '../state/types';
import { MODULE_HEIGHT_S, MODULE_WIDTH_S } from './consts';
import generateBorderLines from './helpers/generateBorderLines';

export default function min(): ModuleType {
	const width = MODULE_WIDTH_S;
	const height = MODULE_HEIGHT_S;

	return {
		buttons: [],
		category: 'Other',
		engine: { name: 'sampleAndHold', config: {} },
		height,
		initialState: {},
		inputs: addDefaultInputPositions([{ id: 'in' }, { id: 'in:trigger', label: 'trigger' }]),
		lines: [...generateBorderLines(width, height)],
		name: 'Sample & Hold',
		outputs: addDefaultOutputPositions([{ id: 'out' }], width),
		sliders: [],
		steppers: [],
		width,
	};
}

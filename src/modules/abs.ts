import addDefaultInputPositions from './helpers/addDefaultInputPositions';
import addDefaultOutputPositions from './helpers/addDefaultOutputPositions';
import generateBorderLines from './helpers/generateBorderLines';
import { ModuleGeneratorProps, ModuleType } from '../state/types';
import { MODULE_HEIGHT_S, MODULE_WIDTH_S } from './consts';

export default function abs({ vGrid, hGrid }: ModuleGeneratorProps): ModuleType {
	const width = MODULE_WIDTH_S * vGrid;
	const height = MODULE_HEIGHT_S * hGrid;

	return {
		buttons: [],
		category: 'Math',
		engine: { name: 'abs', config: {} },
		height,
		initialState: {},
		inputs: addDefaultInputPositions([{ id: 'in' }], vGrid, hGrid),
		lines: [...generateBorderLines(vGrid, hGrid, width, height)],
		name: 'Abs',
		outputs: addDefaultOutputPositions([{ id: 'out' }], vGrid, hGrid, width),
		sliders: [],
		steppers: [],
		width,
	};
}

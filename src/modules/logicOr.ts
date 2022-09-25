import addDefaultInputPositions from './helpers/addDefaultInputPositions';
import addDefaultOutputPositions from './helpers/addDefaultOutputPositions';
import source from './engines/logicOr.asm';

import { ModuleType } from '../state/types';
import { HGRID } from '../view/drawers/consts';

export default function logicOr(): ModuleType {
	const width = 8 * HGRID;
	const height = 8 * HGRID;

	return {
		buttons: [],
		category: 'Logic',
		engine: { source },
		height,
		initialState: {},
		inputs: addDefaultInputPositions([
			{ id: 'in:1', label: 'in' },
			{ id: 'in:2', label: 'in' },
		]),
		name: 'Logic OR',
		outputs: addDefaultOutputPositions([{ id: 'out' }], width),
		width,
	};
}

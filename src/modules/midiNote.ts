import addDefaultInputPositions from '../helpers/addDefaultInputPositions';
import addDefaultOutputPositions from '../helpers/addDefaultOutputPositions';
import { ModuleType } from '../state/types';

const number: ModuleType = {
	category: 'Inspection',
	engine: 'through',
	height: 10,
	inputs: addDefaultInputPositions([{ id: 'in' }]),
	name: 'MIDI Note',
	outputs: addDefaultOutputPositions([{ id: 'out' }], 20),
	sliders: [],
	steppers: [],
	switches: [],
	width: 20,
};

export default number;

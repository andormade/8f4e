import addDefaultInputPositions from './helpers/addDefaultInputPositions';
import addDefaultOutputPositions from './helpers/addDefaultOutputPositions';
import { midiNoteToInt16 } from '../state/helpers/midi';
import { MemoryTransformer, Module, ModuleGeneratorProps, ModuleType, Switch } from '../state/types';
import { MODULE_HEIGHT_S, MODULE_WIDTH_M, MODULE_WIDTH_S, MODULE_WIDTH_XXL } from './consts';
import generateBorderLines from './helpers/generateBorderLines';
import generatePianoKeyLayout from './helpers/generatePianoKeyLayout';
import { MemoryAddressLookup } from 'compiler';
import { memoryUpdater } from 'compiler/modules/quantizer';

const transformer: MemoryTransformer = function (
	module: Module,
	memoryBuffer: Int32Array,
	memoryAddressLookup: MemoryAddressLookup
) {
	const activeNotes = Object.keys(module.state)
		.filter(key => key.startsWith('note') && module.state[key])
		.map(note => midiNoteToInt16(parseInt(note.split(':')[1], 10)))
		.slice(0, module.engine.config.allocatedNotes);

	memoryUpdater(activeNotes, memoryBuffer, memoryAddressLookup[module.id]);
};

export default function pianoQuantizer({ vGrid, hGrid }: ModuleGeneratorProps): ModuleType {
	const width = MODULE_WIDTH_M * vGrid;
	const height = MODULE_HEIGHT_S * hGrid;
	const pianoX = vGrid;
	const pianoY = hGrid * 4.5;
	const keyCount = 12;

	return {
		category: 'Quantizer',
		drawer: {
			name: 'piano',
			config: {
				keyCount,
				x: pianoX,
				y: pianoY,
			},
		},
		engine: { name: 'quantizer', config: { allocatedNotes: 32 } },
		height,
		initialState: { octave: 1 },
		inputs: addDefaultInputPositions([{ id: 'in' }], vGrid, hGrid),
		lines: [...generateBorderLines(vGrid, hGrid, width, height)],
		name: 'Quantizer 12',
		outputs: addDefaultOutputPositions([{ id: 'out' }], vGrid, hGrid, width),
		sliders: [],
		steppers: [
			{ id: 'octave', x: vGrid * 26, y: 5 * hGrid, width: vGrid * 2, height: hGrid, minValue: 1, maxValue: 8 },
		],
		switches: [
			...generatePianoKeyLayout<Switch>({ keyCount, vGrid, hGrid }, ({ index, x, y, ...rest }) => {
				return {
					id: 'note:' + index,
					onValue: true,
					offValue: false,
					x: x + pianoX,
					y: y + pianoY,
					...rest,
				};
			}),
		],
		transformer,
		width,
	};
}

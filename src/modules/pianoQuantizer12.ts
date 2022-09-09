import addDefaultInputPositions from './helpers/addDefaultInputPositions';
import addDefaultOutputPositions from './helpers/addDefaultOutputPositions';
import { ModuleType, Button } from '../state/types';
import { MODULE_HEIGHT_S, MODULE_WIDTH_M } from './consts';
import generateBorderLines from './helpers/generateBorderLines';
import generatePianoKeyLayout from './helpers/generatePianoKeyLayout';
import { Config } from '@8f4e/synth-compiler/dist/modules/quantizer.asm';
import { HGRID, VGRID } from '../view/drawers/consts';

export default function pianoQuantizer(): ModuleType<Config> {
	const width = MODULE_WIDTH_M;
	const height = MODULE_HEIGHT_S;
	const pianoX = VGRID;
	const pianoY = HGRID * 4.5;
	const keyCount = 12;

	return {
		buttons: [
			...generatePianoKeyLayout<Button>({ keyCount }, ({ index, x, y, ...rest }) => {
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
		inputs: addDefaultInputPositions([{ id: 'in' }]),
		lines: [...generateBorderLines(width, height)],
		name: 'Quantizer 12',
		outputs: addDefaultOutputPositions([{ id: 'out' }], width),
		sliders: [],
		steppers: [
			{ id: 'octave', x: VGRID * 26, y: 5 * HGRID, width: VGRID * 2, height: HGRID, minValue: 1, maxValue: 8 },
		],
		width,
	};
}

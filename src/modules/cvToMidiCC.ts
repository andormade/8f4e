import { extractState, insertState } from '@8f4e/synth-compiler/dist/modules/buffer.asm';
import { Config } from '@8f4e/synth-compiler/dist/modules/buffer.asm';

import addDefaultInputPositions from './helpers/addDefaultInputPositions';

import { ModuleType, StepperChangeHandler } from '../state/types';
import ccNames from '../midi/ccNames';
import { HGRID, VGRID } from '../view/drawers/consts';

const onChange: StepperChangeHandler = function (module, state, value, stepper) {
	const { memoryBuffer, memoryAddressLookup } = state.compiler;
	const dataAddress = memoryAddressLookup[module.id][stepper.id];

	memoryBuffer[dataAddress] = Math.min(Math.max(memoryBuffer[dataAddress] + value, stepper.minValue), stepper.maxValue);

	if (stepper.label === 'cc') {
		stepper.textValue = ccNames[memoryBuffer[dataAddress]].name;
	}
};

export default function cvToMidiCC(): ModuleType<Config> {
	const width = 16 * HGRID;
	const height = 8 * HGRID;

	return {
		buttons: [],
		category: 'MIDI',
		engine: {
			name: 'buffer',
			config: {
				numberOfPorts: 3,
				numberOfDataPlaceholders: 2,
			},
		},
		height,
		initialState: {},
		inputs: addDefaultInputPositions([{ id: 'in:1', label: 'in' }]),
		name: 'CV to MIDI CC',
		outputs: [],
		sliders: [],
		steppers: [
			{
				id: 'data:1',
				label: 'channel',
				x: VGRID * 10,
				y: HGRID * 2,
				upHitArea: {
					x: VGRID * 4,
					y: 0,
					width: 3 * VGRID,
					height: HGRID,
				},
				downHitArea: {
					x: 0,
					y: 0,
					width: 3 * VGRID,
					height: HGRID,
				},
				minValue: 1,
				maxValue: 8,
				onChange: onChange,
				width: VGRID * 7,
				height: HGRID,
			},
			{
				id: 'data:2',
				label: 'cc',
				x: VGRID * 10,
				y: HGRID * 3,
				upHitArea: {
					x: VGRID * 4,
					y: 0,
					width: 3 * VGRID,
					height: HGRID,
				},
				downHitArea: {
					x: 0,
					y: 0,
					width: 3 * VGRID,
					height: HGRID,
				},
				minValue: 1,
				maxValue: 127,
				onChange: onChange,
				width: VGRID * 7,
				height: HGRID,
			},
		],
		width,
		insertState,
		extractState,
	};
}

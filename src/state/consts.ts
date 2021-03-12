import { midiNoteToInt16 } from './helpers/midi';
import { Note } from '../midi/enums';
import { I16_SIGNED_LARGEST_NUMBER, I16_SIGNED_SMALLEST_NUMBER } from '../../packages/compiler/consts';
import { ModuleTypes } from './types';

export const moduleTypes: ModuleTypes = {
	abs: {
		width: 100,
		height: 100,
		connectors: [
			{ id: 'in', x: 5, y: 20, isInput: true },
			{ id: 'out', x: 85, y: 20 },
		],
		name: 'Abs',
		switches: [],
		sliders: [],
		steppers: [],
	},
	and: {
		width: 100,
		height: 100,
		connectors: [
			{ id: 'in1', x: 5, y: 20, isInput: true },
			{ id: 'in2', x: 5, y: 35, isInput: true },
			{ id: 'out', x: 85, y: 20, isInput: false },
		],
		name: 'And',
		sliders: [],
		switches: [],
		steppers: [],
	},
	attenuator: {
		width: 100,
		height: 100,
		connectors: [
			{ id: 'out', x: 85, y: 20, isInput: false },
			{ id: 'in', x: 5, y: 20, isInput: true },
		],
		name: 'Attenuator',
		switches: [],
		sliders: [{ id: 'divisor', x: 10, y: 20, width: 10, height: 50, minValue: 1, maxValue: 100, resolution: 1 }],
		defaultValues: {
			divisor: 1,
		},
		steppers: [],
	},
	clockGenerator: {
		width: 100,
		height: 100,
		connectors: [{ id: 'out', x: 85, y: 20 }],
		name: 'Clock generator',
		switches: [],
		sliders: [{ id: 'rate', x: 10, y: 20, width: 10, height: 50, minValue: 0, maxValue: 3000, resolution: 10 }],
		defaultValues: {
			rate: 10,
		},
		steppers: [],
	},
	constant: {
		width: 100,
		height: 100,
		connectors: [{ id: 'out', x: 85, y: 20, isInput: false }],
		name: 'Constant',
		sliders: [
			{
				id: 'out',
				x: 10,
				y: 20,
				width: 10,
				height: 50,
				minValue: I16_SIGNED_SMALLEST_NUMBER,
				maxValue: I16_SIGNED_LARGEST_NUMBER,
				resolution: 100,
			},
		],
		defaultValues: {
			out: 0,
		},
		switches: [],
		steppers: [],
	},
	cvToMidi: {
		width: 200,
		height: 100,
		connectors: [
			{ id: 'cvin', x: 5, y: 20, isInput: true, label: 'note in' },
			{ id: 'clockin', x: 5, y: 35, isInput: true, label: 'clock in' },
		],
		name: 'CV to MIDI',
		switches: [],
		sliders: [],
		steppers: [{ id: 'channel', x: 80, y: 10, width: 10, height: 20, minValue: 1, maxValue: 8 }],
		defaultValues: {
			channel: 1,
		},
	},
	invert: {
		width: 100,
		height: 100,
		connectors: [
			{ id: 'in', x: 5, y: 20, isInput: true },
			{ id: 'out', x: 85, y: 20 },
		],
		name: 'Invert',
		switches: [],
		sliders: [],
		steppers: [],
	},
	max: {
		width: 100,
		height: 100,
		connectors: [
			{ id: 'in1', x: 5, y: 20, isInput: true },
			{ id: 'in2', x: 5, y: 35, isInput: true },
			{ id: 'out', x: 85, y: 20, isInput: false },
		],
		name: 'Max',
		sliders: [],
		switches: [],
		steppers: [],
	},
	min: {
		width: 100,
		height: 100,
		connectors: [
			{ id: 'in1', x: 5, y: 20, isInput: true },
			{ id: 'in2', x: 5, y: 35, isInput: true },
			{ id: 'out', x: 85, y: 20, isInput: false },
		],
		name: 'Min',
		sliders: [],
		switches: [],
		steppers: [],
	},
	mixer: {
		width: 100,
		height: 100,
		connectors: [
			{ id: 'in1', x: 5, y: 20, isInput: true },
			{ id: 'in2', x: 5, y: 35, isInput: true },
			{ id: 'in3', x: 5, y: 50, isInput: true },
			{ id: 'in4', x: 5, y: 65, isInput: true },
			{ id: 'out', x: 85, y: 20 },
		],
		name: 'Mixer',
		switches: [],
		sliders: [],
		steppers: [],
	},
	negate: {
		width: 100,
		height: 100,
		connectors: [
			{ id: 'in', x: 5, y: 20, isInput: true },
			{ id: 'out', x: 85, y: 20, isInput: false },
		],
		name: 'Negate',
		sliders: [],
		switches: [],
		steppers: [],
	},
	offset: {
		width: 100,
		height: 100,
		connectors: [
			{ id: 'in', x: 5, y: 20, isInput: true },
			{ id: 'out', x: 85, y: 20, isInput: false },
		],
		name: 'Offset',
		sliders: [
			{
				id: 'offset',
				x: 10,
				y: 20,
				width: 10,
				height: 50,
				minValue: 0,
				maxValue: I16_SIGNED_LARGEST_NUMBER,
				resolution: 100,
			},
		],
		defaultValues: {
			offset: 0,
		},
		switches: [],
		steppers: [],
	},
	or: {
		width: 100,
		height: 100,
		connectors: [
			{ id: 'in1', x: 5, y: 20, isInput: true },
			{ id: 'in2', x: 5, y: 35, isInput: true },
			{ id: 'out', x: 85, y: 20, isInput: false },
		],
		name: 'Or',
		sliders: [],
		switches: [],
		steppers: [],
	},
	quantizer: {
		width: 200,
		height: 100,
		connectors: [
			{ id: 'in', x: 5, y: 20, isInput: true },
			{ id: 'out', x: 185, y: 20 },
		],
		switches: [
			{ id: 'note1', onValue: midiNoteToInt16(Note.C0), offValue: -2147483648, x: 40, y: 42, width: 10, height: 10 },
			{
				id: 'note2',
				onValue: midiNoteToInt16(Note.C0_SHARP),
				offValue: -2147483648,
				x: 50,
				y: 30,
				width: 10,
				height: 10,
			},
			{ id: 'note3', onValue: midiNoteToInt16(Note.D0), offValue: -2147483648, x: 60, y: 42, width: 10, height: 10 },
			{
				id: 'note4',
				onValue: midiNoteToInt16(Note.D0_SHARP),
				offValue: -2147483648,
				x: 70,
				y: 30,
				width: 10,
				height: 10,
			},
			{ id: 'note5', onValue: midiNoteToInt16(Note.E0), offValue: -2147483648, x: 80, y: 42, width: 10, height: 10 },
			{ id: 'note6', onValue: midiNoteToInt16(Note.F0), offValue: -2147483648, x: 90, y: 42, width: 10, height: 10 },
			{
				id: 'note7',
				onValue: midiNoteToInt16(Note.F0_SHARP),
				offValue: -2147483648,
				x: 100,
				y: 30,
				width: 10,
				height: 10,
			},
			{ id: 'note8', onValue: midiNoteToInt16(Note.G0), offValue: -2147483648, x: 110, y: 42, width: 10, height: 10 },
			{
				id: 'note9',
				onValue: midiNoteToInt16(Note.G0_SHARP),
				offValue: -2147483648,
				x: 120,
				y: 30,
				width: 10,
				height: 10,
			},
			{
				id: 'note10',
				onValue: midiNoteToInt16(Note.A0),
				offValue: -2147483648,
				x: 130,
				y: 42,
				width: 10,
				height: 10,
			},
			{
				id: 'note11',
				onValue: midiNoteToInt16(Note.A0_SHARP),
				offValue: -2147483648,
				x: 140,
				y: 30,
				width: 10,
				height: 10,
			},
			{
				id: 'note12',
				onValue: midiNoteToInt16(Note.B0),
				offValue: -2147483648,
				x: 150,
				y: 42,
				width: 10,
				height: 10,
			},
		],
		name: 'Quantizer',
		sliders: [],
		steppers: [],
	},
	randomGenerator: {
		width: 100,
		height: 100,
		connectors: [{ id: 'out', x: 85, y: 20, isInput: false }],
		name: 'Random',
		switches: [],
		sliders: [],
		steppers: [],
	},
	saw: {
		width: 100,
		height: 100,
		connectors: [{ id: 'out', x: 85, y: 20, isInput: false }],
		name: 'Saw',
		switches: [],
		sliders: [{ id: 'rate', x: 10, y: 20, width: 10, height: 50, minValue: 0, maxValue: 2000, resolution: 10 }],
		defaultValues: {
			rate: 1000,
		},
		steppers: [],
	},
	scope: {
		width: 100,
		height: 100,
		connectors: [
			{ id: 'in', x: 5, y: 45, isInput: true },
			{ id: 'out', x: 85, y: 45 },
		],
		name: 'Scope',
		switches: [],
		sliders: [],
		steppers: [],
	},
	sequentialSwitch: {
		width: 100,
		height: 100,
		connectors: [
			{ id: 'out', x: 85, y: 20 },
			{ id: 'in1', x: 5, y: 20, isInput: true },
			{ id: 'in2', x: 5, y: 35, isInput: true },
			{ id: 'in3', x: 5, y: 50, isInput: true },
			{ id: 'in4', x: 5, y: 65, isInput: true },
			{ id: 'clock', x: 5, y: 80, isInput: true },
		],
		name: 'Sequential switch',
		switches: [],
		sliders: [],
		steppers: [],
	},
	splitter: {
		width: 100,
		height: 100,
		connectors: [
			{ id: 'in', x: 5, y: 20, isInput: true },
			{ id: 'out1', x: 85, y: 20 },
			{ id: 'out2', x: 85, y: 35 },
			{ id: 'out3', x: 85, y: 50 },
			{ id: 'out4', x: 85, y: 65 },
		],
		name: 'Splitter',
		switches: [],
		sliders: [],
		steppers: [],
	},
	triangle: {
		width: 100,
		height: 100,
		connectors: [{ id: 'out', x: 85, y: 20, isInput: false }],
		name: 'Triangle',
		switches: [],
		sliders: [],
		steppers: [],
	},
	xor: {
		width: 100,
		height: 100,
		connectors: [
			{ id: 'in1', x: 5, y: 20, isInput: true },
			{ id: 'in2', x: 5, y: 35, isInput: true },
			{ id: 'out', x: 85, y: 20, isInput: false },
		],
		name: 'Xor',
		sliders: [],
		switches: [],
		steppers: [],
	},
};

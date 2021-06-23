import { Engine } from '2d-engine';
import { MemoryAddressLookup, MemoryBuffer } from 'compiler';
import { pianoKeyboard } from 'sprite-generator';
import { int16ToMidiNote } from '../../../state/helpers/midi';
import { Module, ModuleType } from '../../../state/types';

const whiteKeys = [0, 2, 4, 5, 7, 9, 11];
const blackKeys = [1, 3, 6, 8, 10];
const blackKeyPositions = [14, 34, 74, 94, 114];
const allKeys = [...whiteKeys, ...blackKeys];
const allNotes = new Array(128).fill(0).map((item, index) => index);
const whiteKeyWidth = 18;
const spacing = 2;
const keyboardWidth = whiteKeyWidth * whiteKeys.length + spacing * whiteKeys.length;
const octaveWidth = 140;

function getWhiteKeyIndex(note: number): number {
	return whiteKeys.indexOf(note % allKeys.length);
}

function getBlackKeyIndex(note: number): number {
	return blackKeys.indexOf(note % allKeys.length);
}

const keyPositions = allNotes.map(note => {
	const whiteKeyIndex = getWhiteKeyIndex(note);

	if (whiteKeyIndex === -1) {
		const octaveNumber = Math.floor(note / 12);
		const blackKeyIndex = getBlackKeyIndex(note);
		return blackKeyPositions[blackKeyIndex] + octaveNumber * keyboardWidth;
	} else {
		const octaveNumber = Math.floor(note / 12) * 7;
		return (whiteKeyIndex + octaveNumber) * 20;
	}
});

export default function pianoDrawer(
	engine: Engine,
	module: Module,
	moduleType: ModuleType,
	outputAddressLookup: MemoryAddressLookup,
	memoryBuffer: MemoryBuffer,
	vGrid: number,
	hGrid: number
): void {
	engine.setSpriteLookup(pianoKeyboard());

	const { config } = moduleType.drawer;
	const outAddress = outputAddressLookup[module.id + '_' + 'out'] / memoryBuffer.BYTES_PER_ELEMENT;
	const outValue = int16ToMidiNote(memoryBuffer[outAddress]);

	for (let i = 0; i < 10; i++) {
		engine.drawSprite(octaveWidth * i + config.x, config.y, undefined);
	}

	const activeNotes = Object.keys(module.state)
		.filter(key => key.startsWith('note') && module.state[key])
		.map(note => parseInt(note.split(':')[1], 10));

	engine.setSpriteLookup(pianoKeyboard(true));

	for (let i = 0; i < activeNotes.length; i++) {
		const index = getWhiteKeyIndex(activeNotes[i]);
		if (index !== -1) {
			const octaveNumber = Math.floor(activeNotes[i] / 12) * 7;
			engine.drawSprite((index + octaveNumber) * 20 + config.x, config.y, activeNotes[i]);
		} else {
			const blackIndex = getBlackKeyIndex(activeNotes[i]);
			const octave = Math.floor(activeNotes[i] / 12);
			engine.drawSprite(blackKeyPositions[blackIndex] + octave * keyboardWidth + config.x, config.y, activeNotes[i]);
		}
	}

	engine.setSpriteLookup(pianoKeyboard(false, true));

	for (let i = 0; i < 128; i++) {
		if (i === outValue) {
			engine.drawSprite(keyPositions[i] + config.x, config.y, i);
		}
	}
}

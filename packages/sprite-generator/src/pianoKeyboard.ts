import { SpriteLookup } from '@8f4e/2d-engine';

import { Command, DrawingCommand } from './types';
import icons, { Icon } from './fonts/icons';
import { drawCharacterMatrix } from './font';
import font from './fonts/font';

const enum State {
	PRESSED,
	NORMAL,
	HIGHLIGHTED,
}

const backgroundColor = 'rgba(136,126,203,255)';
const whiteKeyColor = 'rgba(255,255,255,255)';
const blackKeyColor = 'rgba(0,0,0,255)';
const highlightColor = '#6abfc6';
const pressedColor = '#50459b';

function whiteKeyLeft(state: State): DrawingCommand[] {
	return [
		state === State.PRESSED
			? [Command.FILL_COLOR, pressedColor]
			: [Command.FILL_COLOR, state === State.HIGHLIGHTED ? highlightColor : whiteKeyColor],
		...drawCharacterMatrix(icons, 8, 16, [
			[Icon.FILL, Icon.THICK_LINE_LEFT],
			[Icon.FILL, Icon.THICK_LINE_LEFT],
			state === State.NORMAL ? [Icon.FILL, Icon.FILL] : [Icon.SEMI_FILL, Icon.SEMI_FILL],
			state === State.NORMAL ? [Icon.FILL, Icon.FILL] : [Icon.SEMI_FILL, Icon.SEMI_FILL],
		]),
	];
}

function blackKey(state: State): DrawingCommand[] {
	return [
		state === State.PRESSED
			? [Command.FILL_COLOR, pressedColor]
			: [Command.FILL_COLOR, state === State.HIGHLIGHTED ? highlightColor : blackKeyColor],
		...drawCharacterMatrix(icons, 8, 16, [
			state === State.NORMAL ? [Icon.FILL, Icon.FILL] : [Icon.SEMI_FILL, Icon.SEMI_FILL],
			state === State.NORMAL ? [Icon.FILL, Icon.FILL] : [Icon.SEMI_FILL, Icon.SEMI_FILL],
			[Icon.SLIM_LINE_RIGHT, Icon.SLIM_LINE_LEFT],
			[Icon.SLIM_LINE_RIGHT, Icon.SLIM_LINE_LEFT],
		]),
	];
}

function whiteKeyMiddle(state: State): DrawingCommand[] {
	return [
		state === State.PRESSED
			? [Command.FILL_COLOR, pressedColor]
			: [Command.FILL_COLOR, state === State.HIGHLIGHTED ? highlightColor : whiteKeyColor],
		...drawCharacterMatrix(icons, 8, 16, [
			[Icon.THICK_LINE_RIGHT, Icon.THICK_LINE_LEFT],
			[Icon.THICK_LINE_RIGHT, Icon.THICK_LINE_LEFT],
			state === State.NORMAL ? [Icon.FILL, Icon.FILL] : [Icon.SEMI_FILL, Icon.SEMI_FILL],
			state === State.NORMAL ? [Icon.FILL, Icon.FILL] : [Icon.SEMI_FILL, Icon.SEMI_FILL],
		]),
	];
}

function whiteKeyRight(state: State): DrawingCommand[] {
	return [
		state === State.PRESSED
			? [Command.FILL_COLOR, pressedColor]
			: [Command.FILL_COLOR, state === State.HIGHLIGHTED ? highlightColor : whiteKeyColor],
		...drawCharacterMatrix(icons, 8, 16, [
			[Icon.THICK_LINE_RIGHT, Icon.FILL],
			[Icon.THICK_LINE_RIGHT, Icon.FILL],
			state === State.NORMAL ? [Icon.FILL, Icon.FILL] : [Icon.SEMI_FILL, Icon.SEMI_FILL],
			state === State.NORMAL ? [Icon.FILL, Icon.FILL] : [Icon.SEMI_FILL, Icon.SEMI_FILL],
		]),
	];
}

const orderedKeys = [
	whiteKeyLeft,
	blackKey,
	whiteKeyMiddle,
	blackKey,
	whiteKeyRight,
	whiteKeyLeft,
	blackKey,
	whiteKeyMiddle,
	blackKey,
	whiteKeyMiddle,
	blackKey,
	whiteKeyRight,
];

const offsetX = 0;
const offsetY = 200;

function stringToCharCodeArray(str: string): number[] {
	const arr: number[] = [];
	for (let i = 0; i < str.length; i++) {
		arr.push(str.charCodeAt(i));
	}
	return arr;
}

function drawPianoKeyboard(state: State): DrawingCommand[] {
	return [
		[Command.SAVE],
		[Command.FILL_COLOR, state === State.HIGHLIGHTED ? highlightColor : whiteKeyColor],
		...drawCharacterMatrix(font, 8, 16, [stringToCharCodeArray('C C#D D#E F F#G G#A A#B')]),
		[Command.TRANSLATE, 0, 16],
		...(orderedKeys
			.map(keyDrawerFunction => [...keyDrawerFunction(state), [Command.TRANSLATE, 16, 0]])
			.flat(1) as DrawingCommand[]),
		[Command.RESTORE],
	];
}

export default function generate(): DrawingCommand[] {
	return [
		[Command.RESET_TRANSFORM],
		[Command.TRANSLATE, offsetX, offsetY],
		[Command.FILL_COLOR, backgroundColor],
		[Command.RECTANGLE, 0, 0, orderedKeys.length * 16 * 3, 80],
		...drawPianoKeyboard(State.NORMAL),
		[Command.TRANSLATE, 16 * orderedKeys.length, 0],
		...drawPianoKeyboard(State.PRESSED),
		[Command.TRANSLATE, 16 * orderedKeys.length, 0],
		...drawPianoKeyboard(State.HIGHLIGHTED),
	];
}

export const lookup = function (isHighlighted = false, isRed = false): SpriteLookup {
	return function (key: number) {
		if (typeof key === 'undefined') {
			return {
				x: offsetX,
				y: offsetY,
				spriteWidth: orderedKeys.length * 16,
				spriteHeight: 80,
			};
		}

		if (isHighlighted) {
			return {
				x: offsetX + 16 * orderedKeys.length + key * 16,
				y: offsetY,
				spriteWidth: 16,
				spriteHeight: 80,
			};
		}

		if (isRed) {
			return {
				x: offsetX + 16 * orderedKeys.length * 2 + key * 16,
				y: offsetY,
				spriteWidth: 16,
				spriteHeight: 80,
			};
		}
	};
};

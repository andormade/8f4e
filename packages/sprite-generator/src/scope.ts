import { SpriteCoordinates } from '@8f4e/2d-engine';

import { Command, DrawingCommand } from './types';

const offsetX = 600;
const offsetY = 300;

export default function generate(characterWidth: number, characterHeight: number): DrawingCommand[] {
	const values = new Array(characterHeight * 8).fill(0).map((item, index) => index);

	return [
		[Command.RESET_TRANSFORM],
		[Command.TRANSLATE, offsetX, offsetY],
		[Command.FILL_COLOR, 'rgb(100,255,255)'],
		...values.map((value): DrawingCommand => {
			return [Command.RECTANGLE, value, characterHeight * 8 - value, 1, 1];
		}),
	];
}

export const generateLookup = function (
	characterWidth: number,
	characterHeight: number
): Record<number, SpriteCoordinates> {
	const values = new Array(characterHeight * 8).fill(0).map((item, index) => index);

	return Object.fromEntries(
		values.map(value => [
			value,
			{
				x: offsetX + value,
				y: offsetY,
				spriteWidth: 1,
				spriteHeight: characterHeight * 8,
			},
		])
	);
};

import { SpriteLookup } from '2d-engine';
import smallFont from './smallFont';

const offsetX = 0;
const offsetY = 0;

function forEachBit(byte: number, callback: (isByteSet: boolean, nthBit: number) => void): void {
	for (let i = 0; i < 5; i++) {
		const mask = 1 << (4 - i);
		callback((byte & mask) !== 0, i);
	}
}

function generateFont(ctx: OffscreenCanvasRenderingContext2D, x = 0, y = 0, font: number[]): void {
	for (let j = 0; j < 128; j++) {
		for (let i = 0; i < 10; i++) {
			forEachBit(font[j * 10 + i], function (bit, nthBit) {
				bit && ctx.fillRect(j * 5 + nthBit + x, i + y, 1, 1);
			});
		}
	}
}

export default function generateFonts(ctx: OffscreenCanvasRenderingContext2D): void {
	ctx.fillStyle = 'rgba(255,255,255,255)';
	generateFont(ctx, offsetY, offsetY, smallFont);
	ctx.fillStyle = 'rgba(0,0,0,255)';
	generateFont(ctx, offsetX, offsetY + 10, smallFont);
}

export const lookup = function (font: string): SpriteLookup {
	return function (letter: string) {
		const code = letter.charCodeAt(0);
		switch (font) {
			case 'small_white':
				return {
					x: (code - 32) * 5 + offsetX,
					y: offsetY,
					spriteHeight: 10,
					spriteWidth: 5,
				};
			case 'small_black':
				return {
					x: (code - 32) * 5 + offsetX,
					y: offsetY + 10,
					spriteHeight: 10,
					spriteWidth: 5,
				};
		}
	};
};

import { GraphicHelper, CodeBlockGraphicData, PianoKeyboard } from '../types';

export default function findPianoKeyboardAtViewportCoordinates(
	graphicHelper: GraphicHelper,
	codeBlock: CodeBlockGraphicData,
	x: number,
	y: number
): PianoKeyboard | undefined {
	return Array.from(codeBlock.pianoKeyboards.values()).find(pianoKeyboard => {
		return (
			x >= codeBlock.x + codeBlock.offsetX + pianoKeyboard.x - graphicHelper.viewport.x &&
			x <= codeBlock.x + codeBlock.offsetX + pianoKeyboard.width + pianoKeyboard.x - graphicHelper.viewport.x &&
			y >= codeBlock.y + codeBlock.offsetY + pianoKeyboard.y - graphicHelper.viewport.y &&
			y <= codeBlock.y + codeBlock.offsetY + pianoKeyboard.height + pianoKeyboard.y - graphicHelper.viewport.y
		);
	});
}

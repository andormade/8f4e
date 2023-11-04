import { GraphicHelper, CodeBlockGraphicData, Switch } from '../types';

export default function findButtonAtViewportCoordinates(
	graphicHelper: GraphicHelper,
	codeBlock: CodeBlockGraphicData,
	x: number,
	y: number
): Switch | undefined {
	return Array.from(codeBlock.buttons.values()).find(button => {
		return (
			x >= codeBlock.x + codeBlock.offsetX + button.x - graphicHelper.viewport.x &&
			x <= codeBlock.x + codeBlock.offsetX + button.width + button.x - graphicHelper.viewport.x &&
			y >= codeBlock.y + codeBlock.offsetY + button.y - graphicHelper.viewport.y &&
			y <= codeBlock.y + codeBlock.offsetY + button.height + button.y - graphicHelper.viewport.y
		);
	});
}

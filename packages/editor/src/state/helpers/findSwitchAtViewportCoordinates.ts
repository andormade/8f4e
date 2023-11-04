import { GraphicHelper, CodeBlockGraphicData, Switch } from '../types';

export default function findSwitchAtViewportCoordinates(
	graphicHelper: GraphicHelper,
	codeBlock: CodeBlockGraphicData,
	x: number,
	y: number
): Switch | undefined {
	return Array.from(codeBlock.switches.values()).find(_switch => {
		return (
			x >= codeBlock.x + codeBlock.offsetX + _switch.x - graphicHelper.viewport.x &&
			x <= codeBlock.x + codeBlock.offsetX + _switch.width + _switch.x - graphicHelper.viewport.x &&
			y >= codeBlock.y + codeBlock.offsetY + _switch.y - graphicHelper.viewport.y &&
			y <= codeBlock.y + codeBlock.offsetY + _switch.height + _switch.y - graphicHelper.viewport.y
		);
	});
}

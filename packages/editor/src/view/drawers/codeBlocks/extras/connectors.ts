import { Engine } from '@8f4e/2d-engine';
import { Icon } from '@8f4e/sprite-generator';

import { CodeBlockGraphicData, State } from '../../../../state/types';

export default function drawConnectors(engine: Engine, state: State, codeBlock: CodeBlockGraphicData): void {
	if (!state.graphicHelper.spriteLookups) {
		return;
	}

	for (const [, output] of codeBlock.extras.outputs) {
		const { x, y, memory } = output;

		const value = memory.isInteger
			? state.compiler.memoryBuffer[memory.wordAlignedAddress]
			: state.compiler.memoryBufferFloat[memory.wordAlignedAddress];

		output.calibratedMax = Math.max(1, output.calibratedMax, value);
		output.calibratedMin = Math.min(-1, output.calibratedMin, value);

		engine.setSpriteLookup(state.graphicHelper.spriteLookups.feedbackScale);
		engine.drawSprite(
			x,
			y,
			Math.round(((value - output.calibratedMin) / (output.calibratedMax + Math.abs(output.calibratedMin))) * 5),
			state.graphicHelper.globalViewport.vGrid * 3,
			state.graphicHelper.globalViewport.hGrid
		);

		engine.setSpriteLookup(state.graphicHelper.spriteLookups.fontCode);
	}

	for (const [, { x, y }] of codeBlock.extras.inputs) {
		engine.setSpriteLookup(state.graphicHelper.spriteLookups.icons);
		engine.drawSprite(x, y, Icon.INPUT);
	}
}

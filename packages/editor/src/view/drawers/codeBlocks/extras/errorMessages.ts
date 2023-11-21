import { Engine } from '@8f4e/2d-engine';

import { CodeBlockGraphicData, State } from '../../../../state/types';

export default function drawErrorMessages(engine: Engine, state: State, codeBlock: CodeBlockGraphicData): void {
	if (!state.graphicHelper.spriteLookups) {
		return;
	}

	for (const [, { x, y, message }] of codeBlock.extras.errorMessages) {
		engine.setSpriteLookup(state.graphicHelper.spriteLookups.fillColors);
		engine.drawSprite(
			x,
			y,
			'errorMessageBackground',
			codeBlock.width,
			message.length * state.graphicHelper.globalViewport.hGrid
		);

		engine.setSpriteLookup(state.graphicHelper.spriteLookups.fontCode);
		for (let i = 0; i < message.length; i++) {
			engine.drawText(x, y + i * state.graphicHelper.globalViewport.hGrid, ' ' + message[i]);
		}
	}
}

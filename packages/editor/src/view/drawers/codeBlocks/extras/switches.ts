import { Engine } from '@8f4e/2d-engine';
import { Icon } from '@8f4e/sprite-generator';

import { CodeBlockGraphicData, State } from '../../../../state/types';

export default function drawSwitches(engine: Engine, state: State, codeBlock: CodeBlockGraphicData): void {
	if (!state.graphicHelper.spriteLookups) {
		return;
	}

	for (const [, { x, y, id: debuggerId, onValue, offValue }] of codeBlock.extras.switches) {
		const memory = state.compiler.compiledModules.get(codeBlock.id)?.memoryMap.get(debuggerId);

		if (!memory) {
			continue;
		}

		const { wordAlignedAddress } = memory;
		const value = state.compiler.memoryBuffer[wordAlignedAddress] || 0;

		if (value === onValue) {
			engine.setSpriteLookup(state.graphicHelper.spriteLookups.icons);
			engine.drawSprite(x, y, Icon.SWITCH_ON);
		} else if (value === offValue) {
			engine.setSpriteLookup(state.graphicHelper.spriteLookups.icons);
			engine.drawSprite(x, y, Icon.SWITCH_OFF);
		} else {
			engine.setSpriteLookup(state.graphicHelper.spriteLookups.fontNumbers);
			engine.drawText(x, y, '[__]');
		}
	}
}

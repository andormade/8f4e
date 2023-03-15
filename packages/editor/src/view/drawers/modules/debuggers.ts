import { Engine } from '@8f4e/2d-engine';
import { font } from '@8f4e/sprite-generator';

import { Module, State } from '../../../state/types';

export default function drawConnectors(engine: Engine, state: State, module: Module): void {
	const graphicData = state.graphicHelper.modules.get(module);

	if (!graphicData) {
		return;
	}

	for (const [, { x, y, id: debuggerId }] of graphicData.debuggers) {
		const memory = state.compiler.compiledModules.get(graphicData.id)?.memoryMap.get(debuggerId);

		if (!memory) {
			continue;
		}

		const value = memory.isInteger
			? state.compiler.memoryBuffer[memory.wordAddress].toString()
			: state.compiler.memoryBufferFloat[memory.wordAddress].toFixed(4);

		engine.setSpriteLookup(font('lime'));
		engine.drawText(x, y, '[' + value + ']');
	}
}

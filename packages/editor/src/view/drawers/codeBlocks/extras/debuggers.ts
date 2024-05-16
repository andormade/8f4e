import { Engine } from '@8f4e/2d-engine';

import { CodeBlockGraphicData, State } from '../../../../state/types';

export default function drawConnectors(engine: Engine, state: State, codeBlock: CodeBlockGraphicData): void {
	if (!state.graphicHelper.spriteLookups) {
		return;
	}

	for (const [, { x, y, memory, showAddress, showEndAddress, showBinary, bufferPointer }] of codeBlock.extras
		.debuggers) {
		const value = memory.isInteger
			? state.compiler.memoryBuffer[memory.wordAlignedAddress + bufferPointer].toString(showBinary ? 2 : 10)
			: state.compiler.memoryBufferFloat[memory.wordAlignedAddress + bufferPointer].toFixed(4);

		engine.setSpriteLookup(state.graphicHelper.spriteLookups.fontCode);

		if (showAddress) {
			engine.drawText(x, y, '[' + (memory.byteAddress + bufferPointer * 4) + ']');
		} else if (showEndAddress) {
			engine.drawText(x, y, '[' + ((memory.wordAlignedSize - 1) * 4 + memory.byteAddress) + ']');
		} else {
			engine.drawText(x, y, '[' + value + ']');
		}
	}
}

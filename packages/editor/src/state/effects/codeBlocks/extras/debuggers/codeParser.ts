import { Instruction, instructionParser } from '@8f4e/compiler';

import { CodeBlockGraphicData, ExtendedInstructionSet, State } from '../../../../types';
import { gapCalculator } from '../../../../helpers/editor';
import resolveMemoryIdentifier from '../../../../helpers/resolveMemoryIdentifier';

export function parseDebuggers(code: string[]) {
	return code.reduce((acc, line, index) => {
		const [, instruction, ...args] = (line.match(instructionParser) ?? []) as [
			never,
			Instruction | ExtendedInstructionSet,
			string,
			string
		];

		if (instruction === 'debug') {
			return [...acc, { id: args[0], lineNumber: index }];
		}
		return acc;
	}, [] as Array<{ id: string; lineNumber: number }>);
}

export default function (graphicData: CodeBlockGraphicData, state: State) {
	graphicData.extras.debuggers.clear();
	parseDebuggers(graphicData.trimmedCode).forEach(_debugger => {
		const memory = resolveMemoryIdentifier(state, graphicData.id, _debugger.id);

		if (!memory) {
			return;
		}

		graphicData.extras.debuggers.set(_debugger.id, {
			width: state.graphicHelper.globalViewport.vGrid * 2,
			height: state.graphicHelper.globalViewport.hGrid,
			x:
				state.graphicHelper.globalViewport.vGrid * (3 + graphicData.padLength) +
				state.graphicHelper.globalViewport.vGrid * graphicData.trimmedCode[_debugger.lineNumber].length,
			y: gapCalculator(_debugger.lineNumber, graphicData.gaps) * state.graphicHelper.globalViewport.hGrid,
			id: _debugger.id,
			memory: memory.memory,
			showAddress: memory.showAddress,
			showEndAddress: memory.showEndAddress,
			showBinary: memory.showBinary,
			bufferPointer: memory.bufferPointer,
		});
	});
}

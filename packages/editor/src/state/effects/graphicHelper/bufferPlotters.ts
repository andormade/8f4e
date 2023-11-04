import { Instruction, instructionParser } from '@8f4e/compiler';

import { ExtendedInstructionSet, CodeBlockGraphicData, State } from '../../types';
import { gapCalculator } from '../../helpers/editor';
import resolveMemoryIdentifier from '../../helpers/resolveMemoryIdentifier';

export function parseBufferPlotters(code: string[]) {
	return code.reduce(
		(acc, line, index) => {
			const [, instruction, ...args] = (line.match(instructionParser) ?? []) as [
				never,
				Instruction | ExtendedInstructionSet,
				string,
				string,
				string,
				string | undefined
			];

			if (instruction === 'plot') {
				return [
					...acc,
					{
						bufferMemoryId: args[0],
						lineNumber: index,
						minValue: parseInt(args[1], 10) || -8,
						maxValue: parseInt(args[2], 10) || 8,
						bufferLengthMemoryId: args[3] || undefined,
					},
				];
			}

			return acc;
		},
		[] as Array<{
			bufferMemoryId: string;
			lineNumber: number;
			minValue: number;
			maxValue: number;
			bufferLengthMemoryId: string | undefined;
		}>
	);
}

export default function bufferPlotters(graphicData: CodeBlockGraphicData, state: State) {
	graphicData.bufferPlotters.clear();
	parseBufferPlotters(graphicData.trimmedCode).forEach(plotter => {
		const buffer = resolveMemoryIdentifier(state, graphicData.id, plotter.bufferMemoryId);
		const bufferLength = resolveMemoryIdentifier(state, graphicData.id, plotter.bufferLengthMemoryId);

		if (!buffer) {
			return;
		}

		graphicData.bufferPlotters.set(plotter.bufferMemoryId, {
			width: state.graphicHelper.viewport.vGrid * 2,
			height: state.graphicHelper.viewport.hGrid,
			x: 0,
			y: (gapCalculator(plotter.lineNumber, graphicData.gaps) + 1) * state.graphicHelper.viewport.hGrid,
			buffer,
			minValue: plotter.minValue,
			maxValue: plotter.maxValue,
			bufferLength,
		});
	});
}

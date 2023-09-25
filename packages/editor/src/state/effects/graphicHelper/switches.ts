import { Instruction, instructionParser } from '@8f4e/compiler';

import { ExtendedInstructionSet, ModuleGraphicData, State } from '../../types';
import { gapCalculator } from '../../helpers/editor';

export function parseSwitches(code: string[]) {
	return code.reduce((acc, line, index) => {
		const [, instruction, ...args] = (line.match(instructionParser) ?? []) as [
			never,
			Instruction | ExtendedInstructionSet,
			string,
			string,
			string
		];

		if (instruction === 'switch') {
			return [
				...acc,
				{ id: args[0], lineNumber: index, onValue: parseInt(args[2], 10) || 1, offValue: parseInt(args[1], 10) || 0 },
			];
		}
		return acc;
	}, [] as Array<{ id: string; lineNumber: number; onValue: number; offValue: number }>);
}

export default function (graphicData: ModuleGraphicData, state: State) {
	graphicData.switches.clear();
	parseSwitches(graphicData.trimmedCode).forEach(_switch => {
		graphicData.switches.set(_switch.id, {
			width: state.graphicHelper.viewport.vGrid * 4,
			height: state.graphicHelper.viewport.hGrid,
			x: graphicData.width - 4 * state.graphicHelper.viewport.vGrid,
			y: gapCalculator(_switch.lineNumber, graphicData.gaps) * state.graphicHelper.viewport.hGrid,
			id: _switch.id,
			offValue: _switch.offValue,
			onValue: _switch.onValue,
		});
	});
}
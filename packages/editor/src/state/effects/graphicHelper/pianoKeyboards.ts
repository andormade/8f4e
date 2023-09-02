import { Instruction, instructionParser } from '@8f4e/compiler';

import resolveMemoryIdentifier from '../../helpers/resolveMemoryIdentifier';
import { ExtendedInstructionSet, ModuleGraphicData, State } from '../../types';
import { parseCode } from '../../helpers/multiLineCodeParser';
import { gapCalculator } from '../../helpers/editor';

export function parsePressedKeys(code: string[], pressedKeysListMemoryId: string, startingNumber: number) {
	const pressedKeys = new Set<number>();

	const pattern = [`init ${pressedKeysListMemoryId}[:index] :key`];

	parseCode(code, pattern).forEach(({ key }) => {
		pressedKeys.add(parseInt(key, 10) - startingNumber);
	});

	return pressedKeys;
}

export function parsePianoKeyboards(code: string[]) {
	return code.reduce(
		(acc, line, index) => {
			const [, instruction, ...args] = (line.match(instructionParser) ?? []) as [
				never,
				Instruction | ExtendedInstructionSet,
				string,
				string,
				string
			];

			if (instruction === 'piano') {
				const startingNumber = parseInt(args[2] || '0', 10);
				const pressedKeys = parsePressedKeys(code, args[0], startingNumber);

				return [
					...acc,
					{
						id: args[0],
						lineNumber: index,
						pressedNumberOfKeysMemoryId: args[1],
						pressedKeysListMemoryId: args[0],
						startingNumber,
						pressedKeys,
					},
				];
			}
			return acc;
		},
		[] as Array<{
			id: string;
			lineNumber: number;
			pressedNumberOfKeysMemoryId: string;
			pressedKeysListMemoryId: string;
			pressedKeys: Set<number>;
			startingNumber: number;
		}>
	);
}

export default function pianoKeyboards(graphicData: ModuleGraphicData, state: State) {
	graphicData.pianoKeyboards.clear();
	parsePianoKeyboards(graphicData.trimmedCode).forEach(pianoKeyboard => {
		const memoryIdentifierKeysList = resolveMemoryIdentifier(
			state,
			graphicData.id,
			pianoKeyboard.pressedKeysListMemoryId
		);
		const memoryIdentifierNumberOfKeys = resolveMemoryIdentifier(
			state,
			graphicData.id,
			pianoKeyboard.pressedNumberOfKeysMemoryId
		);

		if (!memoryIdentifierKeysList || !memoryIdentifierNumberOfKeys) {
			return;
		}

		graphicData.minGridWidth = 48;

		graphicData.pianoKeyboards.set(pianoKeyboard.lineNumber, {
			x: 0,
			y: (gapCalculator(pianoKeyboard.lineNumber, graphicData.gaps) + 1) * state.graphicHelper.viewport.hGrid,
			width: 24 * (state.graphicHelper.viewport.vGrid * 2),
			height: state.graphicHelper.viewport.hGrid * 5,
			keyWidth: state.graphicHelper.viewport.vGrid * 2,
			pressedKeys: pianoKeyboard.pressedKeys,
			pressedKeysListMemory: memoryIdentifierKeysList.memory,
			pressedNumberOfKeysMemory: memoryIdentifierNumberOfKeys.memory,
			startingNumber: pianoKeyboard.startingNumber,
		});
	});
}

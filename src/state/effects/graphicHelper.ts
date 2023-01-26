import { font } from '@8f4e/sprite-generator';

import { HGRID, VGRID } from '../../view/drawers/consts';
import { EventDispatcher } from '../../events';
import { State } from '../types';

const keywords =
	/output|inputPointer|local|private|push|div|if|else|end|store|and|greaterThan|branch|greaterOrEqual|add|sub|lessThan|public|xor|shiftRight/;

export default function graphicHelper(state: State, events: EventDispatcher) {
	const onCompilationDone = function () {
		state.modules.forEach(module => {
			const padLength = module.code.length.toString().length;

			const code = module.code.map(
				(line, index) =>
					(line.includes('inputPointer') || index === 0
						? ''.padStart(padLength, ' ')
						: `${index + 1}`.padStart(padLength, '0')) +
					' ' +
					line
			);

			const codeColors = code.map(line => {
				const keywordIndex = line.search(keywords);

				if (line.includes('#')) {
					return [font('grey'), font('grey'), font('grey'), font('green')];
				}

				return line.split('').map((char, index) => {
					if (index === 0) {
						return font('grey');
					}
					if (index === padLength) {
						return font('white');
					}
					if (index === keywordIndex) {
						return font('purple');
					}
					if (char === ' ') {
						return font('white');
					}
					return undefined;
				});
			});

			state.graphicHelper.set(module.id, {
				width: 32 * VGRID,
				height: module.code.length * HGRID,
				code,
				codeColors,
				inputs: new Map(),
				outputs: new Map(),
			});

			for (let i = 0; i < state.compiler.compiledModules.get(module.id).outputs.length; i++) {
				const output = state.compiler.compiledModules.get(module.id).outputs[i];

				state.graphicHelper.get(module.id).outputs.set(output.id, {
					width: VGRID * 2,
					height: HGRID,
					x: VGRID * 3 + VGRID * code[output.lineNumber - 1].length,
					y: HGRID * (output.lineNumber - 1),
					id: output.id,
				});
			}

			for (let i = 0; i < state.compiler.compiledModules.get(module.id).inputs.length; i++) {
				const input = state.compiler.compiledModules.get(module.id).inputs[i];

				state.graphicHelper.get(module.id).inputs.set(input.id, {
					width: VGRID * 2,
					height: HGRID,
					x: VGRID,
					y: HGRID * (input.lineNumber - 1),
					id: input.id,
				});
			}
		});
	};

	events.on('compilationDone', onCompilationDone);
}

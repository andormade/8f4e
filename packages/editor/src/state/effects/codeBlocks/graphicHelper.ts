import { instructions } from '@8f4e/compiler';

import bufferPlotters from './extras/bufferPlotters/codeParser';
import buttons from './extras/buttons/codeParser';
import debuggers from './extras/debuggers/codeParser';
import errorMessages from './extras/errorMessages/errorMessages';
import gaps from './gaps';
import inputs from './extras/inputs/codeParser';
import outputs from './extras/outputs/codeParser';
import pianoKeyboards from './extras/pianoKeyboard/codeParser';
import positionOffsetters from './positionOffsetters';
import switches from './extras/switches/codeParser';
import { CodeBlockClickEvent } from './codeBlockDragger';
import { CodeBlockAddedEvent } from './codeBlockCreator';

import { EventDispatcher } from '../../../events';
import { CodeBlockGraphicData, State } from '../../types';
import {
	backSpace,
	enter,
	gapCalculator,
	generateCodeColorMap,
	moveCaret,
	reverseGapCalculator,
	type,
} from '../../helpers/editor';
import { getLastMemoryInstructionLine, getLongestLineLength, getModuleId } from '../../helpers/codeParsers';
import { InternalKeyboardEvent } from '../../../events/humanInterface';

export default function graphicHelper(state: State, events: EventDispatcher) {
	const onCodeBlockClick = function ({ relativeX = 0, relativeY = 0, codeBlock }: CodeBlockClickEvent) {
		const [row, col] = moveCaret(
			codeBlock.code,
			reverseGapCalculator(Math.floor(relativeY / state.graphicHelper.globalViewport.hGrid), codeBlock.gaps),
			Math.floor(relativeX / state.graphicHelper.globalViewport.vGrid) - (codeBlock.padLength + 2),
			'Jump'
		);
		codeBlock.cursor.row = row;
		codeBlock.cursor.col = col;
	};

	const updateGraphicsAll = function () {
		for (const graphicData of state.graphicHelper.activeViewport.codeBlocks) {
			updateGraphics(graphicData);
		}
	};

	const updateGraphics = function (graphicData: CodeBlockGraphicData) {
		if (!state.graphicHelper.spriteLookups) {
			return;
		}

		graphicData.padLength = graphicData.code.length.toString().length;
		const length = graphicData.isOpen ? graphicData.code.length : getLastMemoryInstructionLine(graphicData.code);

		graphicData.x = graphicData.gridX * state.graphicHelper.globalViewport.vGrid;
		graphicData.y = graphicData.gridY * state.graphicHelper.globalViewport.hGrid;

		graphicData.trimmedCode = [...graphicData.code.slice(0, length + 1)];

		const codeWithLineNumbers = graphicData.trimmedCode.map(
			(line, index) => `${index}`.padStart(graphicData.padLength, '0') + ' ' + line
		);

		graphicData.codeToRender = codeWithLineNumbers.map(line => line.split('').map(char => char.charCodeAt(0)));

		graphicData.codeColors = generateCodeColorMap(codeWithLineNumbers, state.graphicHelper.spriteLookups, [
			...Object.keys(instructions),
			...state.compiler.compilerOptions.environmentExtensions.ignoredKeywords,
		]);

		gaps(graphicData, state);
		pianoKeyboards(graphicData, state);

		graphicData.width =
			Math.max(graphicData.minGridWidth, getLongestLineLength(codeWithLineNumbers) + 4) *
			state.graphicHelper.globalViewport.vGrid;

		errorMessages(graphicData, state);
		bufferPlotters(graphicData, state);
		outputs(graphicData, state);
		inputs(graphicData, state);
		debuggers(graphicData, state);
		switches(graphicData, state);
		buttons(graphicData, state);
		positionOffsetters(graphicData, state);

		graphicData.height = graphicData.codeToRender.length * state.graphicHelper.globalViewport.hGrid;
		graphicData.cursor.x =
			(graphicData.cursor.col + (graphicData.padLength + 2)) * state.graphicHelper.globalViewport.vGrid;
		graphicData.cursor.y =
			gapCalculator(graphicData.cursor.row, graphicData.gaps) * state.graphicHelper.globalViewport.hGrid;
		graphicData.id = getModuleId(graphicData.code) || '';
	};

	const onKeydown = function (event: InternalKeyboardEvent) {
		if (!state.graphicHelper.selectedCodeBlock) {
			return;
		}

		const codeBlock = state.graphicHelper.selectedCodeBlock;

		let newPosition: [number, number] = [codeBlock.cursor.row, codeBlock.cursor.col];

		switch (event.key) {
			case undefined:
				break;
			case 'ArrowLeft':
			case 'ArrowUp':
			case 'ArrowRight':
			case 'ArrowDown':
				newPosition = moveCaret(codeBlock.code, codeBlock.cursor.row, codeBlock.cursor.col, event.key);
				codeBlock.cursor.row = newPosition[0];
				codeBlock.cursor.col = newPosition[1];
				break;
			case 'Backspace':
				// eslint-disable-next-line no-case-declarations
				const bp = backSpace(codeBlock.code, codeBlock.cursor.row, codeBlock.cursor.col);
				codeBlock.cursor.row = bp.row;
				codeBlock.cursor.col = bp.col;

				codeBlock.code = bp.code;

				events.dispatch('saveState');
				events.dispatch('codeChange');
				break;
			case 'Enter':
				// eslint-disable-next-line no-case-declarations
				const ent = enter(codeBlock.code, codeBlock.cursor.row, codeBlock.cursor.col);
				codeBlock.cursor.row = ent.row;
				codeBlock.cursor.col = ent.col;

				codeBlock.code = ent.code;

				events.dispatch('saveState');
				events.dispatch('codeChange');
				break;
			default:
				if (event?.key.length === 1) {
					// eslint-disable-next-line no-case-declarations
					const bp = type(codeBlock.code, codeBlock.cursor.row, codeBlock.cursor.col, event.key);
					codeBlock.cursor.row = bp.row;
					codeBlock.cursor.col = bp.col;

					codeBlock.code = bp.code;

					events.dispatch('saveState');
					events.dispatch('codeChange');
				}
		}

		updateGraphics(codeBlock);
	};

	events.on('buildError', updateGraphicsAll);
	events.on<CodeBlockClickEvent>('codeBlockClick', onCodeBlockClick);
	events.on<CodeBlockClickEvent>('codeBlockClick', ({ codeBlock }) => updateGraphics(codeBlock));
	events.on('runtimeInitialized', updateGraphicsAll);
	events.on<CodeBlockAddedEvent>('codeBlockAdded', ({ codeBlock }) => updateGraphics(codeBlock));
	events.on('init', updateGraphicsAll);
	events.on('spriteSheetRerendered', updateGraphicsAll);
	events.on<InternalKeyboardEvent>('keydown', onKeydown);
}

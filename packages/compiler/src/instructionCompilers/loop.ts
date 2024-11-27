import { ErrorCode, getError } from '../errors';
import { BLOCK_TYPE, InstructionCompiler } from '../types';
import Type from '../wasmUtils/type';
import WASMInstruction from '../wasmUtils/wasmInstruction';
import { isInstructionIsInsideAModule } from '../utils';
import { compileSegment } from '../compiler';

const loop: InstructionCompiler = function (line, context) {
	if (!isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	const memory = context.addresses.get(context.moduleName) || new Map();

	context.blockStack.push({
		expectedResultIsInteger: false,
		hasExpectedResult: false,
		blockType: BLOCK_TYPE.LOOP,
	});

	const infiniteLoopProtectionCounterName = '__infiniteLoopProtectionCounter' + line.lineNumber;
	const loopErrorSignalerName = '__loopErrorSignaler';

	return compileSegment(
		[
			`local int ${infiniteLoopProtectionCounterName}`,
			memory.has(loopErrorSignalerName) ? '' : `int ${loopErrorSignalerName} -1`,

			'push 0',
			`localSet ${infiniteLoopProtectionCounterName}`,

			`wasm ${WASMInstruction.BLOCK}`,
			`wasm ${Type.VOID}`,

			`wasm ${WASMInstruction.LOOP}`,
			`wasm ${Type.VOID}`,

			`localGet ${infiniteLoopProtectionCounterName}`,
			'push 1000',
			'greaterOrEqual',
			'if void',
			` push &${loopErrorSignalerName}`,
			` push ${line.lineNumber}`,
			' store',
			` branch 2`,
			'ifEnd',
			`localGet ${infiniteLoopProtectionCounterName}`,
			'push 1',
			'add',
			`localSet ${infiniteLoopProtectionCounterName}`,
		],
		context
	);
};

export default loop;

import { ErrorCode, getError } from '../errors';
import { InstructionCompiler } from '../types';
import WASMInstruction from '../wasmUtils/wasmInstruction';
import { isInstructionIsInsideAModule, saveByteCode } from '../utils';

const clearStack: InstructionCompiler = function (line, context) {
	if (!isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	const length = context.stack.length;
	context.stack = [];

	return saveByteCode(context, new Array(length).fill(WASMInstruction.DROP));
};

export default clearStack;

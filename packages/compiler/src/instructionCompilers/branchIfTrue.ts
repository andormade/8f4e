import { ArgumentType, InstructionCompiler } from '../types';
import { ErrorCode, getError } from '../errors';
import { br_if } from '../wasmUtils/instructionHelpers';
import { isInstructionIsInsideAModule, saveByteCode } from '../utils';

const branchIfTrue: InstructionCompiler = function (line, context) {
	if (!isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	if (!line.arguments[0]) {
		throw getError(ErrorCode.MISSING_ARGUMENT, line, context);
	}

	if (line.arguments[0].type === ArgumentType.IDENTIFIER) {
		throw getError(ErrorCode.EXPECTED_VALUE, line, context);
	}

	const operand = context.stack.pop();

	if (!operand) {
		throw getError(ErrorCode.INSUFFICIENT_OPERANDS, line, context);
	}

	if (!operand.isInteger) {
		throw getError(ErrorCode.EXPECTED_INTEGER_OPERAND, line, context);
	}

	return saveByteCode(context, br_if(line.arguments[0].value));
};

export default branchIfTrue;

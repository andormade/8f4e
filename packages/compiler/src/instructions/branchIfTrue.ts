import { br_if } from '../wasmUtils/instructionHelpers';
import { ArgumentType, InstructionHandler } from '../types';
import { ErrorCode, getError } from '../errors';

const branchIfTrue: InstructionHandler = function (line, context) {
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

	return { byteCode: br_if(line.arguments[0].value), context };
};

export default branchIfTrue;

import WASMInstruction from '../wasmUtils/wasmInstruction';
import { InstructionHandler } from '../types';
import { ErrorCode, getError } from '../errors';

const _else: InstructionHandler = function (line, context) {
	const block = context.blockStack.pop();

	if (!block) {
		throw getError(ErrorCode.MISSING_BLOCK_START_INSTRUCTION, line, context);
	}

	if (block.hasExpectedResult) {
		const operand = context.stack.pop();

		if (!operand) {
			throw getError(ErrorCode.INSUFFICIENT_OPERANDS, line, context);
		}

		if (block.expectedResultIsInteger && !operand.isInteger) {
			throw getError(ErrorCode.EXPECTED_INTEGER_OPERAND, line, context);
		}
	}

	context.blockStack.push(block);

	return { byteCode: [WASMInstruction.ELSE], context };
};

export default _else;

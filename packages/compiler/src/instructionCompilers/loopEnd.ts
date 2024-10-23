import { ErrorCode, getError } from '../errors';
import { BLOCK_TYPE, InstructionHandler } from '../types';
import WASMInstruction from '../wasmUtils/wasmInstruction';
import { br } from '../wasmUtils/instructionHelpers';
import { isInstructionIsInsideAModule } from '../utils';

const loopEnd: InstructionHandler = function (line, context) {
	if (!isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	const block = context.blockStack.pop();

	if (!block || block.blockType !== BLOCK_TYPE.LOOP) {
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

		context.stack.push(operand);
	}

	return { byteCode: [...br(0), WASMInstruction.END, WASMInstruction.END], context };
};

export default loopEnd;

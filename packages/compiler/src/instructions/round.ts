import WASMInstruction from '../wasmUtils/wasmInstruction';
import { InstructionHandler } from '../types';
import { areAllOperandsIntegers, isInstructionIsInsideAModule } from '../utils';
import { ErrorCode, getError } from '../errors';

const round: InstructionHandler = function (line, context) {
	if (isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	const operand = context.stack.pop();

	if (!operand) {
		throw getError(ErrorCode.INSUFFICIENT_OPERANDS, line, context);
	}

	if (areAllOperandsIntegers(operand)) {
		throw getError(ErrorCode.EXPECTED_FLOAT_OPERAND, line, context);
	}

	context.stack.push({ isInteger: false });
	return {
		byteCode: [WASMInstruction.F32_NEAREST],
		context,
	};
};

export default round;

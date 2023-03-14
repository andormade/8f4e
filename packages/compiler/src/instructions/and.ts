import WASMInstruction from '../wasmUtils/wasmInstruction';
import { InstructionHandler } from '../types';
import { areAllOperandsIntegers } from '../utils';
import { ErrorCode, getError } from '../errors';

const and: InstructionHandler = function (line, namespace, stack) {
	const operand1 = stack.pop();
	const operand2 = stack.pop();

	if (!operand1 || !operand2) {
		throw getError(ErrorCode.INSUFFICIENT_OPERANDS, line);
	}

	if (areAllOperandsIntegers(operand1, operand2)) {
		stack.push({ isInteger: true });
		return { byteCode: [WASMInstruction.I32_AND], namespace, stack };
	} else {
		throw getError(ErrorCode.ONLY_INTEGERS, line);
	}
};

export default and;

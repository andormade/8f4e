import WASMInstruction from '../wasmUtils/wasmInstruction';
import { InstructionHandler } from '../types';
import { ErrorCode, getError } from '../errors';
import { areAllOperandsFloats, areAllOperandsIntegers } from '../utils';

const greaterOrEqual: InstructionHandler = function (line, namespace, stack) {
	const operand1 = stack.pop();
	const operand2 = stack.pop();

	if (!operand1 || !operand2) {
		throw getError(ErrorCode.INSUFFICIENT_OPERANDS, line);
	}

	if (areAllOperandsIntegers(operand1, operand2)) {
		stack.push({ isInteger: true });
		return { byteCode: [WASMInstruction.I32_GE_S], namespace, stack };
	} else if (areAllOperandsFloats(operand1, operand2)) {
		stack.push({ isInteger: true });
		return { byteCode: [WASMInstruction.F32_GE], namespace, stack };
	} else {
		throw getError(ErrorCode.UNMATCHING_OPERANDS, line);
	}
};

export default greaterOrEqual;

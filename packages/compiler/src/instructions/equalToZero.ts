import { ErrorCode, getError } from '../errors';
import { InstructionHandler } from '../types';
import WASMInstruction from '../wasmUtils/wasmInstruction';
import { isInstructionIsInsideAModule } from '../utils';

const equalToZero: InstructionHandler = function (line, context) {
	if (isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	return { byteCode: [WASMInstruction.I32_EQZ], context };
};

export default equalToZero;

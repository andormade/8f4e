import { InstructionCompiler } from '../types';
import { ErrorCode, getError } from '../errors';
import { isInstructionIsInsideAModule } from '../utils';

const _const: InstructionCompiler = function (line, context) {
	if (!isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	return context;
};

export default _const;

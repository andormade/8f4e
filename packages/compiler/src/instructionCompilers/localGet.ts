import { ArgumentType, InstructionCompiler } from '../types';
import { ErrorCode, getError } from '../errors';
import { isInstructionIsInsideAModule, saveByteCode } from '../utils';
import { localGet } from '../wasmUtils/instructionHelpers';

const _localGet: InstructionCompiler = function (line, context) {
	if (!isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	if (!line.arguments[0]) {
		throw getError(ErrorCode.MISSING_ARGUMENT, line, context);
	}

	if (line.arguments[0].type === ArgumentType.IDENTIFIER) {
		const local = context.locals.get(line.arguments[0].value);

		if (!local) {
			throw getError(ErrorCode.UNDECLARED_IDENTIFIER, line, context);
		}

		context.stack.push({ isInteger: local.isInteger, isNonZero: false });

		return saveByteCode(context, localGet(local.index));
	} else {
		throw getError(ErrorCode.EXPECTED_IDENTIFIER, line, context);
	}
};

export default _localGet;

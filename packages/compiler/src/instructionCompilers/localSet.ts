import { ArgumentType, InstructionCompiler } from '../types';
import { ErrorCode, getError } from '../errors';
import { isInstructionIsInsideAModule, saveByteCode } from '../utils';
import { localSet } from '../wasmUtils/instructionHelpers';

const _localSet: InstructionCompiler = function (line, context) {
	if (!isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	const operand = context.stack.pop();

	if (!operand) {
		throw getError(ErrorCode.INSUFFICIENT_OPERANDS, line, context);
	}

	if (!line.arguments[0]) {
		throw getError(ErrorCode.MISSING_ARGUMENT, line, context);
	}

	if (line.arguments[0].type === ArgumentType.IDENTIFIER) {
		const local = context.namespace.locals.get(line.arguments[0].value);

		if (!local) {
			throw getError(ErrorCode.UNDECLARED_IDENTIFIER, line, context);
		}

		if (local.isInteger && !operand.isInteger) {
			throw getError(ErrorCode.EXPECTED_INTEGER_OPERAND, line, context);
		}

		if (!local.isInteger && operand.isInteger) {
			throw getError(ErrorCode.EXPECTED_FLOAT_OPERAND, line, context);
		}

		return saveByteCode(context, localSet(local.index));
	} else {
		throw getError(ErrorCode.EXPECTED_IDENTIFIER, line, context);
	}
};

export default _localSet;

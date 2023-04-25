import { ErrorCode, getError } from '../errors';
import { ArgumentType, InstructionHandler } from '../types';
import { isInstructionIsInsideAModule } from '../utils';

const _const: InstructionHandler = function (line, context) {
	if (isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	if (!line.arguments[0] || !line.arguments[1]) {
		throw getError(ErrorCode.MISSING_ARGUMENT, line, context);
	}

	if (line.arguments[0].type === ArgumentType.LITERAL) {
		throw getError(ErrorCode.EXPECTED_IDENTIFIER, line, context);
	}

	let value = { value: 0, isInteger: true };

	if (line.arguments[1].type === ArgumentType.IDENTIFIER) {
		if (typeof context.namespace.consts[line.arguments[1].value] !== 'undefined') {
			value = context.namespace.consts[line.arguments[1].value];
		} else {
			throw getError(ErrorCode.UNDECLARED_IDENTIFIER, line, context);
		}
	} else {
		value = line.arguments[1];
	}

	return {
		byteCode: [],
		context: {
			...context,
			namespace: { ...context.namespace, consts: { ...context.namespace.consts, [line.arguments[0].value]: value } },
		},
	};
};

export default _const;

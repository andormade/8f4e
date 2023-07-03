import { ErrorCode, getError } from '../errors';
import { ArgumentType, InstructionHandler } from '../types';
import { isInstructionIsInsideAModule } from '../utils';

const memory: InstructionHandler = function (line, context) {
	if (isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	const memory = new Map(context.namespace.memory);

	let defaultValue = 0;

	if (!line.arguments[0] || !line.arguments[1]) {
		throw getError(ErrorCode.MISSING_ARGUMENT, line, context);
	}

	if (line.arguments[0].type !== ArgumentType.IDENTIFIER) {
		throw getError(ErrorCode.EXPECTED_IDENTIFIER, line, context);
	}

	if (line.arguments[1].type === ArgumentType.LITERAL) {
		defaultValue = line.arguments[1].value;
	} else if (line.arguments[1].type === ArgumentType.IDENTIFIER && line.arguments[1].value[0] === '&') {
		const memoryItem = memory.get(line.arguments[1].value.substring(1));

		if (!memoryItem) {
			throw getError(ErrorCode.UNDECLARED_IDENTIFIER, line, context);
		}

		defaultValue = memoryItem.byteAddress;
	} else if (line.arguments[1].type === ArgumentType.IDENTIFIER && /(\S+)\.(\S+)/.test(line.arguments[1].value)) {
		// Do nothing
		// Intermodular references are resolved later
	} else if (line.arguments[1].type === ArgumentType.IDENTIFIER) {
		const constant = context.namespace.consts[line.arguments[1].value];

		if (!constant) {
			throw getError(ErrorCode.UNDECLARED_IDENTIFIER, line, context);
		}

		defaultValue = constant.value;
	}

	const memoryItem = memory.get(line.arguments[0].value);

	if (memoryItem) {
		memoryItem.default = defaultValue;
	}

	return { byteCode: [], context: { ...context, namespace: { ...context.namespace, memory } } };
};

export default memory;
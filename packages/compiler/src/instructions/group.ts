import { ErrorCode, getError } from '../errors';
import { ArgumentType, InstructionHandler } from '../types';

const group: InstructionHandler = function (line, context) {
	if (!line.arguments[0]) {
		throw getError(ErrorCode.MISSING_ARGUMENT, line, context);
	}

	if (line.arguments[0].type === ArgumentType.LITERAL) {
		throw getError(ErrorCode.EXPECTED_IDENTIFIER, line, context);
	}

	context.blockStack.push({
		hasExpectedResult: false,
		expectedResultIsInteger: false,
		isModuleBlock: false,
		isGroupBlock: true,
	});

	return {
		byteCode: [],
		context,
	};
};

export default group;

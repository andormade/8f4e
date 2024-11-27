import { ArgumentType, InstructionCompiler } from '../types';
import { ErrorCode, getError } from '../errors';

const use: InstructionCompiler = function (line, context) {
	if (line.arguments[0].type !== ArgumentType.IDENTIFIER) {
		throw getError(ErrorCode.EXPECTED_IDENTIFIER, line, context);
	}

	const constsToUse = context.consts.get(line.arguments[0].value);
	const consts = context.consts.get(context.moduleName) || new Map();

	if (!constsToUse) {
		throw getError(ErrorCode.UNDECLARED_IDENTIFIER, line, context);
	}

	constsToUse.forEach((value, key) => {
		consts.set(value, key);	
	});

	return context;
};

export default use;

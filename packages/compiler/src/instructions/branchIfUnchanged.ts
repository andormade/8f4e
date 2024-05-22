import { ArgumentType, InstructionHandler } from '../types';
import { ErrorCode, getError } from '../errors';
import { isInstructionIsInsideAModule } from '../utils';
import { parseSegment } from '../compiler';

const branchIfUnchanged: InstructionHandler = function (line, context) {
	if (!isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	const operand = context.stack.pop();

	if (!operand) {
		throw getError(ErrorCode.INSUFFICIENT_OPERANDS, line, context);
	}

	context.stack.push(operand);

	if (!line.arguments[0]) {
		throw getError(ErrorCode.MISSING_ARGUMENT, line, context);
	}

	if (line.arguments[0].type !== ArgumentType.LITERAL) {
		throw getError(ErrorCode.EXPECTED_VALUE, line, context);
	}

	const depth = line.arguments[0].value;
	const type = operand.isInteger ? 'int' : 'float';
	const previousValueMemoryName = '__branchIfUnchanged_previousValue' + line.lineNumber;
	const currentValueMemoryName = '__branchIfUnchanged_currentValue' + line.lineNumber;

	return parseSegment(
		[
			`${type} ${previousValueMemoryName} 0`,
			`local ${type} ${currentValueMemoryName}`,

			`localSet ${currentValueMemoryName} `,

			`push ${previousValueMemoryName}`,
			`localGet ${currentValueMemoryName}`,
			'equal',
			`branchIfTrue ${depth}`,

			`push &${previousValueMemoryName}`,
			`localGet ${currentValueMemoryName}`,
			'store',
		],
		context
	);
};

export default branchIfUnchanged;

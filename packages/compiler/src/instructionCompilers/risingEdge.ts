import { ErrorCode, getError } from '../errors';
import { InstructionCompiler } from '../types';
import { isInstructionIsInsideAModule } from '../utils';
import { compileSegment } from '../compiler';

const risingEdge: InstructionCompiler = function (line, context) {
	if (!isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	const operand = context.stack.pop();

	if (!operand) {
		throw getError(ErrorCode.INSUFFICIENT_OPERANDS, line, context);
	}

	context.stack.push({ isInteger: true, isNonZero: false });

	const currentValueName = '__risingEdgeDetector_currentValue' + line.lineNumber;
	const previousValueName = '__risingEdgeDetector_previousValue' + line.lineNumber;

	return compileSegment(
		[
			`int ${previousValueName} 0`,
			`local int ${currentValueName}`,
			`localSet ${currentValueName}`,
			`localGet ${currentValueName}`,
			`push &${previousValueName}`,
			'load',
			'greaterThan',
			'if int',
			'push 1',
			'else',
			'push 0',
			'ifEnd',
			`push &${previousValueName}`,
			`localGet ${currentValueName}`,
			'store',
		],
		context
	);
};

export default risingEdge;

import { ErrorCode, getError } from '../errors';
import { InstructionHandler } from '../types';
import WASMInstruction from '../wasmUtils/wasmInstruction';
import { isInstructionIsInsideAModule } from '../utils';
import { parseSegment } from '../compiler';

const cycle: InstructionHandler = function (line, context) {
	if (!isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	const operand = context.stack.pop();

	if (!operand) {
		throw getError(ErrorCode.INSUFFICIENT_OPERANDS, line, context);
	}

	if (operand.isInteger) {
		// For some reason there is still no abs instruction for integers in Web Assembly.
		context.stack.push({ isInteger: true, isNonZero: operand.isNonZero });
		const valueName = '__absify_value' + line.lineNumber;

		return parseSegment(
			[
				`local int ${valueName}`,
				`localSet ${valueName}`,
				`localGet ${valueName}`,
				'push 0',
				'lessThan',
				'if',
				' push 0',
				` localGet ${valueName}`,
				' sub',
				'else',
				` localGet ${valueName}`,
				'ifEnd',
			],
			context
		);
	} else {
		context.stack.push({ isInteger: false, isNonZero: operand.isNonZero });
		return {
			byteCode: [WASMInstruction.F32_ABS],
			context,
		};
	}
};

export default cycle;

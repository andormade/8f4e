import { ErrorCode, getError } from '../errors';
import { areAllOperandsIntegers, isInstructionIsInsideAModule, saveByteCode } from '../utils';
import { InstructionCompiler } from '../types';
import { i32load, i32load8s, i32load8u, i32load16s, i32load16u } from '../wasmUtils/instructionHelpers';
import { compileSegment } from '../compiler';

const instructionToByteCodeMap = {
	load: i32load(),
	load8s: i32load8s(),
	load8u: i32load8u(),
	load16s: i32load16s(),
	load16u: i32load16u(),
};

const load: InstructionCompiler = function (line, context) {
	if (!isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	const operand = context.stack.pop();

	if (!operand) {
		throw getError(ErrorCode.INSUFFICIENT_OPERANDS, line, context);
	}

	if (areAllOperandsIntegers(operand)) {
		if (operand.isSafeMemoryAddress) {
			context.stack.push({ isInteger: true, isNonZero: false });
			return saveByteCode(context, instructionToByteCodeMap[line.instruction]);
		} else {
			context.stack.push({ isInteger: true, isNonZero: false });
			const tempVariableName = '__loadAddress_temp_' + line.lineNumber;
			// Memory overflow protection.
			return compileSegment(
				[
					`local int ${tempVariableName}`,
					`localSet ${tempVariableName}`,
					`localGet ${tempVariableName}`,
					`push ${context.memoryByteSize - 1}`,
					'greaterThan',
					'if int',
					`push 0`,
					'else',
					`localGet ${tempVariableName}`,
					'ifEnd',
					...instructionToByteCodeMap[line.instruction].map(wasmInstruction => {
						return `wasm ${wasmInstruction}`;
					}),
				],
				context
			);
		}
	} else {
		throw getError(ErrorCode.ONLY_INTEGERS, line, context);
	}
};

export default load;

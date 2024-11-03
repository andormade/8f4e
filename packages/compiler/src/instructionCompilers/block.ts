import { ArgumentType, BLOCK_TYPE, InstructionCompiler } from '../types';
import { ErrorCode, getError } from '../errors';
import Type from '../wasmUtils/type';
import WASMInstruction from '../wasmUtils/wasmInstruction';
import { isInstructionIsInsideAModule, saveByteCode } from '../utils';

const block: InstructionCompiler = function (line, context) {
	if (!isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	if (!line.arguments[0] || line.arguments[0].type !== ArgumentType.IDENTIFIER) {
		throw getError(ErrorCode.MISSING_ARGUMENT, line, context);
	}

	if (line.arguments[0].value === 'float') {
		context.blockStack.push({
			expectedResultIsInteger: false,
			hasExpectedResult: true,
			blockType: BLOCK_TYPE.BLOCK,
		});
		return saveByteCode(context, [WASMInstruction.BLOCK, Type.F32]);
	}

	if (line.arguments[0].value === 'int') {
		context.blockStack.push({
			expectedResultIsInteger: true,
			hasExpectedResult: true,
			blockType: BLOCK_TYPE.BLOCK,
		});
		return saveByteCode(context, [WASMInstruction.BLOCK, Type.I32]);
	}

	context.blockStack.push({
		expectedResultIsInteger: false,
		hasExpectedResult: false,
		blockType: BLOCK_TYPE.BLOCK,
	});

	return saveByteCode(context, [WASMInstruction.BLOCK, Type.VOID]);
};

export default block;

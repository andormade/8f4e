import WASMInstruction from '../wasmUtils/wasmInstruction';
import { ArgumentType, InstructionHandler, MemoryTypes } from '../types';
import { calculateMemoryWordSize } from '../utils';
import { WORD_LENGTH } from '../consts';
import { i32const, i32load, i32store } from '../wasmUtils/instructionHelpers';
import Type from '../wasmUtils/type';
import { ErrorCode, getError } from '../errors';

const skip: InstructionHandler = function (line, context) {
	if (!line.arguments[0]) {
		return { byteCode: [WASMInstruction.RETURN], context };
	}

	if (line.arguments[0].type !== ArgumentType.LITERAL) {
		throw getError(ErrorCode.EXPECTED_VALUE, line, context);
	}

	const memory = context.namespace.memory;
	const wordAddress = calculateMemoryWordSize(memory);
	const byteAddress = context.startingByteAddress + wordAddress * WORD_LENGTH;

	memory.set('__sleeper' + wordAddress, {
		relativeWordAddress: wordAddress,
		wordAddress: context.startingByteAddress / WORD_LENGTH + wordAddress,
		wordSize: 1,
		byteAddress,
		lineNumber: line.lineNumber,
		id: '__sleeper' + wordAddress,
		default: 0,
		type: MemoryTypes.int,
		isPointer: false,
		isPointingToInteger: false,
		isInteger: true,
	});

	return {
		byteCode: [
			// Increment counter
			...i32const(byteAddress),
			...i32const(byteAddress),
			...i32load(),
			...i32const(1),
			WASMInstruction.I32_ADD,
			...i32store(),
			// Return if the value of the counter is smaller than
			// the number specified in the argument
			...i32const(byteAddress),
			...i32load(),
			...i32const(line.arguments[0].value),
			WASMInstruction.I32_LT_S,
			WASMInstruction.IF,
			Type.VOID,
			WASMInstruction.RETURN,
			WASMInstruction.ELSE,
			...i32const(byteAddress),
			...i32const(0),
			...i32store(),
			WASMInstruction.END,
		],
		context,
	};
};

export default skip;

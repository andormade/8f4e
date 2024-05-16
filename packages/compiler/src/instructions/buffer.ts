import { ArgumentType, InstructionHandler, MemoryTypes } from '../types';
import { ErrorCode, getError } from '../errors';
import { calculateWordAlignedSizeOfMemory, isInstructionIsInsideAModule } from '../utils';
import { GLOBAL_ALIGNMENT_BOUNDARY } from '../consts';

const buffer: InstructionHandler = function (line, context) {
	if (isInstructionIsInsideAModule(context.blockStack)) {
		throw getError(ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK, line, context);
	}

	if (!line.arguments[0] || !line.arguments[1]) {
		throw getError(ErrorCode.MISSING_ARGUMENT, line, context);
	}

	if (line.arguments[0].type === ArgumentType.LITERAL) {
		throw getError(ErrorCode.EXPECTED_IDENTIFIER, line, context);
	}

	const memory = new Map(context.namespace.memory);
	const wordAlignedAddress = calculateWordAlignedSizeOfMemory(memory);

	let numberOfElements = 1;
	const elementWordSize = line.instruction.includes('8') ? 1 : line.instruction.includes('16') ? 2 : 4;

	if (line.arguments[1].type === ArgumentType.LITERAL) {
		numberOfElements = line.arguments[1].value;
	} else {
		const constant = context.namespace.consts[line.arguments[1].value];

		if (!constant) {
			throw getError(ErrorCode.UNDECLARED_IDENTIFIER, line, context);
		}

		numberOfElements = constant.value;
	}

	memory.set(line.arguments[0].value, {
		numberOfElements,
		elementWordSize,
		wordAlignedSize: Math.ceil(numberOfElements * elementWordSize) / GLOBAL_ALIGNMENT_BOUNDARY,
		wordAlignedAddress: context.startingByteAddress / GLOBAL_ALIGNMENT_BOUNDARY + wordAlignedAddress,
		id: line.arguments[0].value,
		byteAddress: context.startingByteAddress + wordAlignedAddress * GLOBAL_ALIGNMENT_BOUNDARY,
		default: new Map<number, number>(),
		isInteger: line.instruction.startsWith('int') || line.instruction.includes('*'),
		isPointer: line.instruction.includes('*'),
		isPointingToInteger: line.instruction.startsWith('int') && line.instruction.includes('*'),
		isPointingToPointer: line.instruction.includes('**'),
		type: line.instruction.slice(0, -2) as unknown as MemoryTypes,
	});

	return { byteCode: [], context: { ...context, namespace: { ...context.namespace, memory } } };
};

export default buffer;

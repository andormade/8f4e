import { WORD_LENGTH } from '../consts';
import { InstructionHandler, MemoryTypes } from '../types';
import { calculateMemoryWordSize } from '../utils';

const array: InstructionHandler = function (line, namespace, startingByteAddress) {
	if (!line.arguments[0] || !line.arguments[1] || !line.arguments[2]) {
		throw '1002: Missing argument';
	}

	const memory = new Map(namespace.memory);
	const wordAddress = calculateMemoryWordSize(memory);
	const wordSize = line.arguments[1].value as number;

	memory.set(line.arguments[0].value.toString(), {
		type: MemoryTypes.DYNAMIC_ARRAY,
		relativeWordAddress: wordAddress,
		wordSize: wordSize,
		byteAddress: startingByteAddress + wordAddress * WORD_LENGTH,
		default: new Array(wordSize).fill(line.arguments[2].value),
	});

	return { byteCode: [], namespace: { ...namespace, memory } };
};
export default array;

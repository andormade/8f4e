import { createFunctionBody } from '@8f4e/bytecode-utils';
import { ModuleGenerator, ModuleStateInserter, ModuleStateExtractor, MemoryTypes } from '../types';

export enum Memory {
	OUTPUT,
}

interface ConstantState {
	out: number;
}

export const insertState: ModuleStateInserter<ConstantState> = function (state, memoryBuffer, moduleAddress) {
	memoryBuffer[moduleAddress + Memory.OUTPUT] = state.out;
};

export const extractState: ModuleStateExtractor<ConstantState> = function (memoryBuffer, moduleAddress) {
	return { out: memoryBuffer[moduleAddress + Memory.OUTPUT] };
};

const constant: ModuleGenerator<{ out?: number }> = function (moduleId, offset, { out = 0 } = {}) {
	const functionBody = createFunctionBody([], []);

	return {
		moduleId,
		functionBody,
		byteAddress: offset.byte(0),
		wordAddress: offset.word(0),
		memoryMap: [{ type: MemoryTypes.OUTPUT, address: Memory.OUTPUT, id: 'out', default: out }],
	};
};

export default constant;

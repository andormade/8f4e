import { createFunctionBody } from 'bytecode-utils';
import { ModuleGenerator, ModuleStateInserter, ModuleStateExtractor } from '../types';

export enum Memory {
	OUTPUT,
}

interface ConstantState {
	out: number;
}

export const insertState: ModuleStateInserter<ConstantState> = function (state, memoryBuffer, moduleAddress) {
	memoryBuffer[moduleAddress / memoryBuffer.BYTES_PER_ELEMENT + Memory.OUTPUT] = state.out;
};

export const extractState: ModuleStateExtractor<ConstantState> = function (memoryBuffer, moduleAddress) {
	return { out: memoryBuffer[moduleAddress / memoryBuffer.BYTES_PER_ELEMENT + Memory.OUTPUT] };
};

const constant: ModuleGenerator<{ out?: number }> = function (moduleId, offset, { out = 0 } = {}) {
	const functionBody = createFunctionBody([], []);

	return {
		moduleId,
		functionBody,
		offset: offset(0),
		initialMemory: [out],
		memoryAddresses: [{ address: offset(Memory.OUTPUT), id: 'out' }],
	};
};

export default constant;

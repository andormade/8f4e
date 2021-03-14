import { createFunctionBody } from '../wasm/sections';
import { ModuleGenerator } from '../types';

export const enum Memory {
	OUTPUT,
}

const constant: ModuleGenerator = function (moduleId, offset, initialConfig) {
	const functionBody = createFunctionBody([], []);

	return {
		moduleId,
		functionBody,
		offset: offset(0),
		initialMemory: [initialConfig.out || 0],
		memoryAddresses: [{ address: offset(Memory.OUTPUT), id: 'out' }],
	};
};

export default constant;

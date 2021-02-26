import { i32storeLocal, i32load, i32loadLocal, localGet, localSet } from '../wasm/instructions';
import { createFunctionBody, createLocalDeclaration } from '../wasm/sections';
import { Type } from 'wasm-bytecode-utils';
import { ModuleGenerator } from './types';

const enum Memory {
	ZERO = 0x00,
	INPUT_POINTER = 0x04,
	OUTPUT_1 = 0x08,
	OUTPUT_2 = 0x0c,
	OUTPUT_3 = 0x10,
	OUTPUT_4 = 0x14,
}

const enum Locals {
	INPUT,
	__LENGTH,
}

/**
 *
 * @param memoryStartAddress
 */
const splitter: ModuleGenerator = function (moduleId, offset) {
	const functionBody = createFunctionBody(
		[createLocalDeclaration(Type.I32, Locals.__LENGTH)],
		[
			...i32load(Memory.INPUT_POINTER + offset),
			...i32loadLocal(Locals.INPUT),
			...i32storeLocal(Locals.INPUT, Memory.OUTPUT_1 + offset),
			...i32storeLocal(Locals.INPUT, Memory.OUTPUT_2 + offset),
			...i32storeLocal(Locals.INPUT, Memory.OUTPUT_3 + offset),
			...i32storeLocal(Locals.INPUT, Memory.OUTPUT_4 + offset),
		]
	);

	return {
		moduleId,
		functionBody,
		offset,
		initialMemory: [0, Memory.ZERO + offset, 0, 0, 0, 0],
		memoryAddresses: [
			{ address: Memory.OUTPUT_1 + offset, id: 'out1' },
			{ address: Memory.OUTPUT_2 + offset, id: 'out2' },
			{ address: Memory.OUTPUT_3 + offset, id: 'out3' },
			{ address: Memory.OUTPUT_4 + offset, id: 'out4' },
			{ address: Memory.INPUT_POINTER + offset, id: 'in', isInputPointer: true },
		],
	};
};

export default splitter;
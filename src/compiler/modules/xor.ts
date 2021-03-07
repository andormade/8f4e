import { i32load, i32const, i32store, ifelse, br_if, block, br } from '../wasm/instructions';
import { createFunctionBody } from '../wasm/sections';
import { Instruction, Type } from 'wasm-bytecode-utils';
import { ModuleGenerator } from '../types';

const enum Memory {
	ZERO = 0x00,
	INPUT_1_POINTER = 0x04,
	INPUT_2_POINTER = 0x08,
	OUTPUT = 0x0c,
}

const xor: ModuleGenerator = function (moduleId, offset) {
	const functionBody = createFunctionBody(
		[],
		[
			...block(Type.VOID, [
				...i32const(Memory.INPUT_1_POINTER + offset),
				...i32load(),
				...i32load(),
				...i32const(0),
				Instruction.I32_GT_S,
				...ifelse(
					Type.VOID,
					[
						// If input1 == 1
						...i32const(Memory.INPUT_2_POINTER + offset),
						...i32load(),
						...i32load(),
						...i32const(0),
						Instruction.I32_GT_S,
						...br_if(1), // If input2 == input1 then break
					],
					[
						// If input1 == 0
						...i32const(Memory.INPUT_2_POINTER + offset),
						...i32load(),
						...i32load(),
						...i32const(0),
						Instruction.I32_LE_S,
						...br_if(1), // If input2 == input1 then break
					]
				),

				...i32const(Memory.OUTPUT + offset),
				...i32const(32000),
				...i32store(),
				...br(1),
			]),

			...i32const(Memory.OUTPUT + offset),
			...i32const(0),
			...i32store(),
		]
	);

	return {
		moduleId,
		functionBody,
		offset,
		initialMemory: [0, Memory.ZERO + offset, Memory.ZERO + offset, 0],
		memoryAddresses: [
			{ address: Memory.OUTPUT + offset, id: 'out' },
			{ address: Memory.INPUT_1_POINTER + offset, id: 'in1', default: Memory.ZERO + offset, isInputPointer: true },
			{ address: Memory.INPUT_2_POINTER + offset, id: 'in2', default: Memory.ZERO + offset, isInputPointer: true },
		],
	};
};

export default xor;

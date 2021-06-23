import {
	Instruction,
	Type,
	block,
	br_if,
	createFunctionBody,
	createLocalDeclaration,
	i32const,
	i32load,
	i32store,
	ifelse,
	localGet,
	localSet,
	loop,
} from 'bytecode-utils';
import { ModuleGenerator } from '../types';
import { I16_SIGNED_LARGEST_NUMBER } from '../consts';

export enum Memory {
	INPUT_POINTER,
	OUTPUT,
	NUMBER_OF_NOTES,
	FIRST_NOTE,
}

enum Locals {
	BEST_MACTHING_VALUE,
	DIFFERENCE,
	INPUT,
	NOTE_MEMORY_POINTER,
	NOTE_VALUE,
	SMALLEST_DIFFERENCE,
	NOTES_END_ADDRESS_POINTER,
	__LENGTH,
}

const abs = registerIndex => [
	...localGet(registerIndex),
	...i32const(0),
	Instruction.I32_LT_S,
	...ifelse(Type.I32, [...i32const(0), ...localGet(registerIndex), Instruction.I32_SUB], [...localGet(registerIndex)]),
	...localSet(registerIndex),
];

interface QuantizerConfig {
	allocatedNotes?: number;
}

const quantizer: ModuleGenerator = function (moduleId, offset, config: QuantizerConfig = {}) {
	const { allocatedNotes = 12 } = config;

	const functionBody = createFunctionBody(
		[createLocalDeclaration(Type.I32, Locals.__LENGTH)],
		[
			// Load the input value from the memory and put it into a register.
			...i32const(offset(Memory.INPUT_POINTER)),
			...i32load(),
			...i32load(),
			...localSet(Locals.INPUT),

			// Calculate the address of the last note.
			...i32const(offset(Memory.NUMBER_OF_NOTES)),
			...i32load(),
			...i32const(1),
			Instruction.I32_SUB,
			...i32const(Int32Array.BYTES_PER_ELEMENT),
			Instruction.I32_MUL,
			...i32const(offset(Memory.FIRST_NOTE)),
			Instruction.I32_ADD,
			...localSet(Locals.NOTES_END_ADDRESS_POINTER),

			// Set the smallest difference to the largest 16bit signed number.
			...i32const(I16_SIGNED_LARGEST_NUMBER),
			...localSet(Locals.SMALLEST_DIFFERENCE),

			// Set the note memory pointer to the start address
			...i32const(offset(Memory.FIRST_NOTE)),
			...localSet(Locals.NOTE_MEMORY_POINTER),

			...block(
				Type.VOID,
				loop(Type.VOID, [
					// Break if the memory pointer would overflow.
					...localGet(Locals.NOTE_MEMORY_POINTER),
					...localGet(Locals.NOTES_END_ADDRESS_POINTER),
					Instruction.I32_GT_U,
					...br_if(1),

					// Load a note value from the memory.
					...localGet(Locals.NOTE_MEMORY_POINTER),
					...i32load(),
					...localSet(Locals.NOTE_VALUE),

					// Calculate difference between input and the note.
					...localGet(Locals.NOTE_VALUE),
					...localGet(Locals.INPUT),
					Instruction.I32_SUB,
					...localSet(Locals.DIFFERENCE),

					// Abs
					...abs(Locals.DIFFERENCE),

					// Compare with the smallest difference.
					...localGet(Locals.DIFFERENCE),
					...localGet(Locals.SMALLEST_DIFFERENCE),
					Instruction.I32_LE_S,
					...ifelse(Type.VOID, [
						// If it's actually smaller than the previusly recorded
						// smallest difference, then overwirte it and save the
						// current note value.
						...localGet(Locals.DIFFERENCE),
						...localSet(Locals.SMALLEST_DIFFERENCE),
						...localGet(Locals.NOTE_VALUE),
						...localSet(Locals.BEST_MACTHING_VALUE),
					]),

					// Increment the note memory pointer by 4 (i32 is 4 bytes)
					...localGet(Locals.NOTE_MEMORY_POINTER),
					...i32const(Int32Array.BYTES_PER_ELEMENT),
					Instruction.I32_ADD,
					...localSet(Locals.NOTE_MEMORY_POINTER),
				])
			),

			// Prepare memory address for storing the output value.
			...i32const(offset(Memory.OUTPUT)),
			...localGet(Locals.BEST_MACTHING_VALUE),
			...i32store(),
		]
	);

	return {
		moduleId,
		functionBody,
		offset: offset(0),
		initialMemory: [0, 0, 0, ...new Array(allocatedNotes).fill(0)],
		memoryAddresses: [
			{ address: offset(Memory.FIRST_NOTE), id: 'notes' },
			{ address: offset(Memory.INPUT_POINTER), id: 'in' },
			{ address: offset(Memory.NUMBER_OF_NOTES), id: 'numberOfNotes' },
			{ address: offset(Memory.OUTPUT), id: 'out' },
		],
	};
};

export default quantizer;

import {
	createFunctionSection,
	createTypeSection,
	createFunctionType,
	createExportSection,
	createFunctionExport,
	createCodeSection,
	createImportSection,
	createMemoryImport,
} from '../utils/sections';
import { Type } from '../enums';
import { modulo } from '../standardLibrary';

const HEADER = [0x00, 0x61, 0x73, 0x6d];
const VERSION = [0x01, 0x00, 0x00, 0x00];

const createSingleFunctionWASMProgramWithStandardLibrary = function (functionBody: number[]): Uint8Array {
	return Uint8Array.from([
		...HEADER,
		...VERSION,
		...createTypeSection([createFunctionType([Type.I32, Type.I32], [Type.I32]), createFunctionType([], [])]),
		...createImportSection([createMemoryImport('js', 'memory')]),
		...createFunctionSection([0x00, 0x01]),
		...createExportSection([createFunctionExport('test', 0x01)]),
		...createCodeSection([modulo(), functionBody]),
	]);
};

export const createTestModule = async function (functionBody): Promise<{ memory: Uint32Array; test: any }> {
	const program = createSingleFunctionWASMProgramWithStandardLibrary(functionBody);

	const memory = new WebAssembly.Memory({ initial: 1 });
	const {
		instance: {
			exports: { test },
		},
	} = await WebAssembly.instantiate(program, {
		js: {
			memory,
		},
	});

	return { memory: new Uint32Array(memory.buffer), test };
};

export const setInitialMemory = function (memory: any, initialMemory: any) {
	for (let i = 0; i < initialMemory.length; i++) {
		memory[i] = initialMemory[i];
	}
};

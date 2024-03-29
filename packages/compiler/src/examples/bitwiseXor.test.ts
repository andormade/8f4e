import bitwiseXor from './bitwiseXor.asm';
import { I16_SIGNED_LARGEST_NUMBER } from './consts';

import { createTestModule } from '../testUtils';
import { TestModule } from '../types';

let testModule: TestModule;

const fixtures: [input1: number, input2: number, output: number][] = [
	[10, 10, 10 ^ 10],
	[69, 420, 69 ^ 420],
	[-69, 420, -69 ^ 420],
	[I16_SIGNED_LARGEST_NUMBER, I16_SIGNED_LARGEST_NUMBER, I16_SIGNED_LARGEST_NUMBER ^ I16_SIGNED_LARGEST_NUMBER],
];

describe('bitwiseXor', () => {
	beforeAll(async () => {
		testModule = await createTestModule(bitwiseXor);
	});

	beforeEach(() => {
		testModule.reset();
	});

	test('if the generated ast matches with the snapshot', () => {
		expect(testModule.ast).toMatchSnapshot();
	});

	test('if the wat code matches with the snapshot', () => {
		expect(testModule.wat).toMatchSnapshot();
	});

	test('if the generated memory map matches with the snapshot', () => {
		expect(testModule.memoryMap).toMatchSnapshot();
	});

	test.each(fixtures)('given %p and %p, the output is %p', (input1, input2, output) => {
		const { memory, test } = testModule;

		const in1Address = memory.allocMemoryForPointer('in:1');
		const in2Address = memory.allocMemoryForPointer('in:2');
		memory.set(in1Address, input1);
		memory.set(in2Address, input2);
		test();
		expect(memory.get('out')).toBe(output);
	});
});

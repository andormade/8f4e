import { createTestModule, TestModule } from '@8f4e/compiler';

import logicOr from '../../examples/logicOr.asm';
import { I16_SIGNED_LARGEST_NUMBER } from '../../examples/consts';

let testModule: TestModule;

const fixtures: [input1: number, input2: number, output: number][] = [
	[10, 10, I16_SIGNED_LARGEST_NUMBER],
	[0, 10, I16_SIGNED_LARGEST_NUMBER],
	[10, 0, I16_SIGNED_LARGEST_NUMBER],
	[0, 0, 0],
	[-10, 0, 0],
];

describe('logicOr', () => {
	beforeAll(async () => {
		testModule = await createTestModule(logicOr);
	});

	beforeEach(() => {
		testModule.reset();
	});

	test('if the wat code matches with the snapshot', () => {
		expect(testModule.wat).toMatchSnapshot();
	});

	test('if the generated memory map matches with the snapshot', () => {
		expect(testModule.memoryMap).toMatchSnapshot();
	});

	test.each(fixtures)('given inputs %p and %p, the expected output is %p', (input1, input2, output) => {
		const { memory, test } = testModule;

		const in1 = memory.allocMemoryForPointer('in:1');
		const in2 = memory.allocMemoryForPointer('in:2');
		memory.set(in1, input1);
		memory.set(in2, input2);
		test();
		expect(memory.get('out')).toBe(output);
	});
});
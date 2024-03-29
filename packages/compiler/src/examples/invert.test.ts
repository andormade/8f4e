import invert from './invert.asm';

import { createTestModule } from '../testUtils';
import { TestModule } from '../types';

let testModule: TestModule;

const fixtures: [input: number, output: number][] = [
	[1, -1],
	[69, -69],
	[0, 0],
	[-420, 420],
];

describe('invert', () => {
	beforeAll(async () => {
		testModule = await createTestModule(invert);
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

	test.each(fixtures)('given input %p, the expected output is %p', (input, output) => {
		const { memory, test } = testModule;

		const inAddress = memory.allocMemoryForPointer('in');
		memory.set(inAddress, input);
		test();
		expect(memory.get('out')).toBe(output);
	});
});

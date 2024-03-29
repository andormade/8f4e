import splitter from './splitter.asm';

import { createTestModule } from '../testUtils';
import { TestModule } from '../types';

let testModule: TestModule;

const fixtures = [
	[1, 1],
	[69, 69],
	[420, 420],
];

describe('functional tests', () => {
	beforeAll(async () => {
		testModule = await createTestModule(splitter);
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

	test.each(fixtures)('given %p as input, all the outputs should be %p', (input, output) => {
		const { memory, test } = testModule;

		const inputAddress = memory.allocMemoryForPointer('in');

		memory.set(inputAddress, input);
		test();
		expect(memory.get('out:1')).toBe(output);
		expect(memory.get('out:2')).toBe(output);
		expect(memory.get('out:3')).toBe(output);
		expect(memory.get('out:4')).toBe(output);
	});
});

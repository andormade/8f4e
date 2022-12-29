import { createTestModule, TestModule } from '@8f4e/compiler';

import buffer from '../../../modules/engines/buffer.asm';

let testModule: TestModule;

const fixtures = [
	[69, 420, -69, -420],
	[69, 420, 69, 420],
];

describe('buffer', () => {
	describe('snapshots', () => {
		beforeAll(async () => {
			testModule = await createTestModule(buffer({ numberOfDataPlaceholders: 4, numberOfPorts: 4 }));
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
	});

	test.each(fixtures)('given %p as input, the output should be the same', async (...data) => {
		testModule = await createTestModule(buffer({ numberOfDataPlaceholders: 0, numberOfPorts: data.length }));

		const { memory, test } = testModule;

		const inputAddresses = data.map((value, index) => {
			return memory.allocMemoryForPointer('in:' + (index + 1));
		});

		data.forEach((value, index) => {
			memory.set(inputAddresses[index], value);
		});

		test();

		data.forEach((value, index) => {
			expect(memory.get('out:' + (index + 1))).toBe(value);
		});
	});

	test.each(fixtures)('given %p as data placeholder, the value in the memory should stay the same', async (...data) => {
		testModule = await createTestModule(buffer({ numberOfDataPlaceholders: data.length, numberOfPorts: 0 }));

		const { memory, test } = testModule;

		data.forEach((value, index) => {
			memory.set('data:' + (index + 1), value);
		});

		test();

		data.forEach((value, index) => {
			expect(memory.get('data:' + (index + 1))).toBe(value);
		});
	});
});
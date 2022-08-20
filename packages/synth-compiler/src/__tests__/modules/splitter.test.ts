import { createTestModule } from '../../testUtils';
import splitter from '../../modules/splitter.asm';
import { compile } from '@8f4e/module-compiler';

let testModule;

test('if compiled module matches with snapshot', () => {
	expect(compile(splitter, 'id', 0)).toMatchSnapshot();
});

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

	test.each(fixtures)('given %p as input, all the outputs should be %p', (input, output) => {
		const { memory, test } = testModule;

		memory[1] = 10 * memory.BYTES_PER_ELEMENT;

		memory[10] = input;
		test();
		expect(memory[2]).toBe(output);
		expect(memory[3]).toBe(output);
		expect(memory[4]).toBe(output);
		expect(memory[5]).toBe(output);
	});
});

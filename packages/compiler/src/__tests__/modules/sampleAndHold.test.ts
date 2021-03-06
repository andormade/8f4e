import { createTestModule } from '../../testUtils';
import sampleAndHold, { Memory } from '../../modules/sampleAndHold';

let testModule;

test('if compiled module matches with snapshot', () => {
	expect(sampleAndHold('id', { byte: () => 0, word: () => 0 })).toMatchSnapshot();
});

describe('functional tests', () => {
	beforeAll(async () => {
		testModule = await createTestModule(sampleAndHold);
	});

	beforeEach(() => {
		testModule.reset();
	});

	test('min module', () => {
		const { memory, test } = testModule;

		memory[Memory.TRIGGER_INPUT_POINTER] = 10 * memory.BYTES_PER_ELEMENT;
		memory[Memory.INPUT_POINTER] = 11 * memory.BYTES_PER_ELEMENT;

		memory[10] = 0;
		memory[11] = 8;
		test();
		memory[10] = 1000;
		memory[11] = 10;
		test();
		memory[10] = 0;
		memory[11] = 12;
		test();
		expect(memory[Memory.OUTPUT]).toBe(10);

		memory[10] = 0;
		memory[11] = 8;
		test();
		memory[10] = 1000;
		memory[11] = 10;
		test();
		memory[10] = 100;
		memory[11] = 12;
		test();
		memory[10] = 2000;
		memory[11] = 14;
		test();
		memory[10] = 0;
		memory[11] = 16;
		test();
		expect(memory[Memory.OUTPUT]).toBe(14);
	});
});

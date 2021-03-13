import { createTestModule } from '../utils';
import and, { Memory } from '../../src/modules/and';
import { I16_SIGNED_LARGEST_NUMBER } from '../../src/consts';

let testModule;

beforeAll(async () => {
	testModule = await createTestModule(and);
});

beforeEach(() => {
	testModule.reset();
});

test('and module', () => {
	const { memory, test } = testModule;

	memory[10] = 10;
	memory[11] = 10;
	memory[Memory.INPUT_1_POINTER] = 10 * memory.BYTES_PER_ELEMENT;
	memory[Memory.INPUT_2_POINTER] = 11 * memory.BYTES_PER_ELEMENT;
	test();
	expect(memory[Memory.OUTPUT]).toBe(I16_SIGNED_LARGEST_NUMBER);

	memory[10] = 0;
	memory[11] = 10;
	memory[Memory.INPUT_1_POINTER] = 10 * memory.BYTES_PER_ELEMENT;
	memory[Memory.INPUT_2_POINTER] = 11 * memory.BYTES_PER_ELEMENT;
	test();
	expect(memory[Memory.OUTPUT]).toBe(0);

	memory[10] = 10;
	memory[11] = 0;
	memory[Memory.INPUT_1_POINTER] = 10 * memory.BYTES_PER_ELEMENT;
	memory[Memory.INPUT_2_POINTER] = 11 * memory.BYTES_PER_ELEMENT;
	test();
	expect(memory[Memory.OUTPUT]).toBe(0);

	memory[10] = 0;
	memory[11] = 0;
	memory[Memory.INPUT_1_POINTER] = 10 * memory.BYTES_PER_ELEMENT;
	memory[Memory.INPUT_2_POINTER] = 11 * memory.BYTES_PER_ELEMENT;
	test();
	expect(memory[Memory.OUTPUT]).toBe(0);

	memory[10] = -10;
	memory[11] = 0;
	memory[Memory.INPUT_1_POINTER] = 10 * memory.BYTES_PER_ELEMENT;
	memory[Memory.INPUT_2_POINTER] = 11 * memory.BYTES_PER_ELEMENT;
	test();
	expect(memory[Memory.OUTPUT]).toBe(0);
});
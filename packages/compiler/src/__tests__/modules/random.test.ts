import { createTestModule } from '../../testUtils';
import random, { Memory } from '../../modules/random';

let testModule;

test('if compiled module matches with snapshot', () => {
	expect(random('id', { byte: () => 0, word: () => 0 })).toMatchSnapshot();
});

describe('functional tests', () => {
	beforeAll(async () => {
		testModule = await createTestModule(random);
	});

	beforeEach(() => {
		testModule.reset();
	});

	test('random module', () => {
		const { memory, test } = testModule;

		memory[Memory.OUTPUT] = 69420;

		test();
		expect(memory[Memory.OUTPUT]).toBe(-30826);

		test();
		expect(memory[Memory.OUTPUT]).toBe(-15413);

		test();
		expect(memory[Memory.OUTPUT]).toBe(25062);

		test();
		expect(memory[Memory.OUTPUT]).toBe(12531);

		test();
		expect(memory[Memory.OUTPUT]).toBe(6265);

		test();
		expect(memory[Memory.OUTPUT]).toBe(-29637);
	});
});

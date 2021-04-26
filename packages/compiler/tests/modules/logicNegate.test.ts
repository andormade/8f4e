import { createTestModule } from '../utils';
import negate, { Memory } from '../../src/modules/logicNegate';
import { I16_SIGNED_LARGEST_NUMBER } from '../../src/consts';

let testModule;

beforeAll(async () => {
	testModule = await createTestModule(negate);
});

beforeEach(() => {
	testModule.reset();
});

test('negate module', () => {
	const { memory, test } = testModule;

	memory[Memory.DEFAULT_VALUE] = 1;
	test();
	expect(memory[Memory.OUTPUT]).toBe(0);

	memory[Memory.DEFAULT_VALUE] = -69;
	test();
	expect(memory[Memory.OUTPUT]).toBe(I16_SIGNED_LARGEST_NUMBER);

	memory[Memory.DEFAULT_VALUE] = 0;
	test();
	expect(memory[Memory.OUTPUT]).toBe(I16_SIGNED_LARGEST_NUMBER);
});
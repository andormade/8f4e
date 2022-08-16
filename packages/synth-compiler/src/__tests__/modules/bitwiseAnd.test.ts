import { createTestModule } from '../../testUtils';
import bitwiseAnd from '../../modules/bitwiseAnd.asm';
import { I16_SIGNED_LARGEST_NUMBER } from '../../consts';
import { compile } from '@8f4e/module-compiler';

let testModule;

test('if compiled module matches with snapshot', () => {
	expect(compile(bitwiseAnd, 'id', 0)).toMatchSnapshot();
});

const fixtures: [input1: number, input2: number, output: number][] = [
	[10, 10, 10 & 10],
	[69, 420, 69 & 420],
	[-69, 420, -69 & 420],
	[I16_SIGNED_LARGEST_NUMBER, I16_SIGNED_LARGEST_NUMBER, I16_SIGNED_LARGEST_NUMBER & I16_SIGNED_LARGEST_NUMBER],
];

describe('functional tests', () => {
	beforeAll(async () => {
		testModule = await createTestModule(bitwiseAnd);
	});

	beforeEach(() => {
		testModule.reset();
	});

	test.each(fixtures)('given %p and %p, the output is %p', (input1, input2, output) => {
		const { memory, test } = testModule;
		memory[0] = input1;
		memory[1] = input2;
		test();
		expect(memory[4]).toBe(output);
	});
});
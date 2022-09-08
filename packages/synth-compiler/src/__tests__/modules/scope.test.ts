import { createTestModule } from '../../testUtils';
import scope from '../../modules/scope.asm';

let testModule;

describe('functional tests', () => {
	beforeAll(async () => {
		testModule = await createTestModule(scope);
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
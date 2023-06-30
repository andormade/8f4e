import modules from './__fixtures__/modules';

import { compileModules, generateMemoryInitiatorFunction } from '.';

describe('compiler', () => {
	test('generateMemoryInitiatorFunction', () => {
		const compiledModules = compileModules(modules, {
			startingMemoryWordAddress: 0,
			environmentExtensions: { constants: {}, ignoredKeywords: [] },
		});
		expect(generateMemoryInitiatorFunction(compiledModules)).toMatchSnapshot();
	});
});

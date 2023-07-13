import modules from './__fixtures__/modules';
import { compileToAST } from './compiler';

import { compileModules } from '.';

describe('compiler', () => {
	test('compileModules', () => {
		const astModules = modules.map(({ code }) => compileToAST(code));
		expect(
			compileModules(astModules, {
				startingMemoryWordAddress: 0,
				environmentExtensions: { constants: {}, ignoredKeywords: [] },
			})
		).toMatchSnapshot();
	});
});

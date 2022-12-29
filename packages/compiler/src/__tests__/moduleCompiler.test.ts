import { compile, compileToAST } from '../compiler';

const fixture = `
# abs module

# memory
private DEFAULT_VALUE -1
inputPointer in:1 DEFAULT_VALUE
output out 0
array arr 32 -1

# registers
local input

# code
const out
const in:1
load
load
localSet input
localGet input
const 0
lessThan
if 
    const 0
    localGet input
    sub
else
    localGet input
end
store`;

describe('moduleCompiler', () => {
	test('ast', () => {
		expect(compileToAST(fixture)).toMatchSnapshot();
	});

	test('compiled code', () => {
		expect(compile(fixture, 'a', 0).functionBody).toMatchSnapshot();
	});
});
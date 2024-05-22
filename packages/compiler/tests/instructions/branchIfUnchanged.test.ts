import { createMockASTLeaf, createMockContext } from './testUtils';

import istructions from '../../src/instructions/index';
import { AST, ArgumentType, CompilationContext } from '../../src/types';
import { ErrorCode } from '../../src/errors';

describe('branchIfUnchanged', () => {
	let context: CompilationContext;
	let ast: AST[number];

	beforeEach(() => {
		context = createMockContext();
		ast = createMockASTLeaf('branchIfUnchanged');
	});

	it('', () => {
		ast.arguments.push({ type: ArgumentType.LITERAL, value: 1, isInteger: true });
		context.stack.push({ isInteger: true });

		const { byteCode } = istructions.branchIfUnchanged(ast, context);

		expect(byteCode).toMatchSnapshot();
		expect(context.stack).toHaveLength(0);
	});

	it('', () => {
		ast.arguments.push({ type: ArgumentType.LITERAL, value: 1, isInteger: true });
		context.stack.push({ isInteger: false });

		const { byteCode } = istructions.branchIfUnchanged(ast, context);

		expect(byteCode).toMatchSnapshot();
		expect(context.stack).toHaveLength(0);
	});

	it('', () => {
		ast.arguments.push({ type: ArgumentType.IDENTIFIER, value: 'foo' });
		context.stack.push({ isInteger: true });

		expect(() => istructions.branchIfUnchanged(ast, context)).toThrow(`${ErrorCode.EXPECTED_VALUE}`);
	});

	it('', () => {
		context.stack.push({ isInteger: true });

		expect(() => istructions.branchIfUnchanged(ast, context)).toThrow(`${ErrorCode.MISSING_ARGUMENT}`);
	});

	it('', () => {
		ast.arguments.push({ type: ArgumentType.LITERAL, value: 1, isInteger: true });

		expect(() => istructions.branchIfUnchanged(ast, context)).toThrow(`${ErrorCode.INSUFFICIENT_OPERANDS}`);
	});
});

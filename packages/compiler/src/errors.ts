import { AST, CompilationContext, Error } from './types';

export enum ErrorCode {
	INSUFFICIENT_OPERANDS,
	UNMATCHING_OPERANDS,
	ONLY_INTEGERS,
	ONLY_FLOATS,
	MISSING_ARGUMENT,
	UNDECLARED_IDENTIFIER,
	EXPECTED_IDENTIFIER,
	EXPECTED_INTEGER_OPERAND,
	UNRECOGNISED_INSTRUCTION,
	EXPECTED_VALUE,
	MISSING_MODULE_ID,
	EXPECTED_FLOAT_OPERAND,
	UNKNOWN_ERROR,
	STACK_EXPECTED_ZERO_ELEMENTS,
	MISSING_BLOCK_START_INSTRUCTION,
	INSTRUCTION_INVALID_OUTSIDE_BLOCK,
	DIVISION_BY_ZERO,
}

export function getError(code: ErrorCode, line: AST[number], context?: CompilationContext): Error {
	switch (code) {
		case ErrorCode.INSTRUCTION_INVALID_OUTSIDE_BLOCK:
			return {
				code,
				message: 'This instruction can only be used within a block or a module. (' + code + ')',
				line,
				context,
			};
		case ErrorCode.INSUFFICIENT_OPERANDS:
			return {
				code,
				message: 'Insufficient number of elements in the stack for the operation to proceed. (' + code + ')',
				line,
				context,
			};
		case ErrorCode.UNMATCHING_OPERANDS:
			return {
				code,
				message: 'This instruction can only operate on operands of the same type. (' + code + ')',
				line,
				context,
			};
		case ErrorCode.ONLY_INTEGERS:
			return {
				code,
				message: 'The operation only accepts integer values as operands. (' + code + ')',
				line,
				context,
			};
		case ErrorCode.ONLY_FLOATS:
			return {
				code,
				message: 'The operation only accepts float values as operands. (' + code + ')',
				line,
				context,
			};
		case ErrorCode.MISSING_ARGUMENT:
			return {
				code,
				message: 'Missing argument. (' + code + ')',
				line,
				context,
			};
		case ErrorCode.UNDECLARED_IDENTIFIER:
			return {
				code,
				message: 'Undeclared identifier. (' + code + ')',
				line,
				context,
			};
		case ErrorCode.EXPECTED_IDENTIFIER:
			return {
				code,
				message: 'Expected identifier, got a value. (' + code + ')',
				line,
				context,
			};
		case ErrorCode.EXPECTED_INTEGER_OPERAND:
			return {
				code,
				message: 'Expected one of the operands to be an integer value. (' + code + ')',
				line,
				context,
			};
		case ErrorCode.UNRECOGNISED_INSTRUCTION:
			return {
				code,
				message: 'Unrecognised instruction. (' + code + ')',
				line,
				context,
			};
		case ErrorCode.EXPECTED_VALUE:
			return {
				code,
				message: 'Expected value, got an identifier. (' + code + ')',
				line,
				context,
			};
		case ErrorCode.MISSING_MODULE_ID:
			return {
				code,
				message: 'Missing module ID. (' + code + ')',
				line,
				context,
			};
		case ErrorCode.EXPECTED_FLOAT_OPERAND:
			return {
				code,
				message: 'Expected one of the operands to be a floating point value. (' + code + ')',
				line,
				context,
			};
		case ErrorCode.STACK_EXPECTED_ZERO_ELEMENTS:
			return {
				code,
				message:
					line.lineNumber +
					': Expected 0 elements on the stack, found ' +
					context?.stack.length +
					' [' +
					context?.stack.map(({ isInteger }) => (isInteger ? 'int' : 'float')).join(', ') +
					'] (' +
					code +
					')',
				line,
				context,
			};
		case ErrorCode.MISSING_BLOCK_START_INSTRUCTION:
			return {
				code,
				message: 'Missing block start instruction. (' + code + ')',
				line,
				context,
			};
		case ErrorCode.DIVISION_BY_ZERO:
			return {
				code,
				message: 'Possible division by zero. (' + code + ')',
				line,
				context,
			};
		case ErrorCode.UNKNOWN_ERROR:
		default:
			return {
				message: 'Unknown error (' + code + ')',
				code,
				line,
				context,
			};
	}
}

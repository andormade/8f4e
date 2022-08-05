import { i32const } from 'bytecode-utils';
import { AST } from '../types';
import { WORD_LENGTH } from '../consts';

export default function (line: AST[number], locals = [], memory: string[]) {
	if (line.arguments[0].type === 'identifier') {
		return i32const(memory.indexOf(line.arguments[0].value) * WORD_LENGTH);
	} else {
		return i32const(line.arguments[0].value);
	}
}
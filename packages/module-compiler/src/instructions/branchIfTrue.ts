import { br_if } from '@8f4e/bytecode-utils';
import { ArgumentType, AST } from '../types';

export default function branch(line: AST[number]) {
	if (!line.arguments[0]) {
		throw '1002: Missing argument';
	}

	if (line.arguments[0].type === ArgumentType.IDENTIFIER) {
		throw `'1004: Expected value, got an identifier: '${line.arguments[0].value}''`;
	} else {
		return br_if(line.arguments[0].value);
	}
}
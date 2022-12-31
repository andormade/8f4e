import { i32const, i32load, localGet } from '@8f4e/bytecode-utils';

import { ArgumentType, InstructionHandler } from '../types';
import {
	getMemoryItemByteAddress,
	isInputPointer,
	isLocalIdentifier,
	isMemoryIdentifier,
	isMemoryReferenceIdentifier,
} from '../utils';

const push: InstructionHandler = function (line, locals, memory, consts) {
	if (!line.arguments[0]) {
		throw '1002: Missing argument';
	}

	const argument = line.arguments[0];

	if (argument.type === ArgumentType.IDENTIFIER) {
		if (isMemoryIdentifier(memory, argument.value)) {
			return [
				...i32const(getMemoryItemByteAddress(memory, argument.value)),
				...(isInputPointer(memory, argument.value) ? i32load() : []),
				...i32load(),
			];
		} else if (isMemoryReferenceIdentifier(memory, argument.value)) {
			return i32const(getMemoryItemByteAddress(memory, argument.value.substring(1)));
		} else if (typeof consts[argument.value] !== 'undefined') {
			return i32const(consts[argument.value]);
		} else if (isLocalIdentifier(locals, argument.value)) {
			return localGet(locals.indexOf(argument.value));
		}
	}

	if (argument.type === ArgumentType.LITERAL) {
		return i32const(argument.value);
	}
};

export default push;

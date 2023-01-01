import { i32const } from '../wasmUtils/instructionHelpers';
import { ArgumentType, InstructionHandler } from '../types';
import { getMemoryStringEndAddress, isMemoryIdentifier } from '../utils';

const endAddress: InstructionHandler = function (line, { memory }) {
	if (!line.arguments[0]) {
		throw '1002: Missing argument';
	}

	const argument = line.arguments[0];

	if (argument.type !== ArgumentType.IDENTIFIER || !isMemoryIdentifier(memory, argument.value)) {
		throw '1006: Expected memory item, got something else';
	}

	return [...i32const(getMemoryStringEndAddress(memory, argument.value))];
};

export default endAddress;

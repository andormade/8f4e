import { getModuleName } from './compiler';
import { GLOBAL_ALIGNMENT_BOUNDARY } from './consts';
import { ErrorCode, getError } from './errors';
import { ArgumentType, AST, CompileOptions, MemoryMap, MemoryMapPerModule, MemoryTypes } from './types';

function resolveInterModularConnections(ast: AST[], memoryMapMap: MemoryMapPerModule) {
	ast.forEach(module => {
		const moduleName = getModuleName(module);
		module.forEach(line => {
			const { instruction, arguments: _arguments } = line;
			if (
				['int*', 'int**', 'float*', 'float**', 'init', 'int'].includes(instruction) &&
				_arguments[0] &&
				_arguments[1] &&
				_arguments[0].type === ArgumentType.IDENTIFIER &&
				_arguments[1].type === ArgumentType.IDENTIFIER &&
				/&(\S+)\.(\S+)/.test(_arguments[1].value)
			) {
				// Remove &
				const [targetModuleId, targetMemoryId] = _arguments[1].value.substring(1).split('.');

				const targetModuleMemoryMap = memoryMapMap.get(targetModuleId);

				if (!targetModuleMemoryMap) {
					throw getError(ErrorCode.UNDECLARED_IDENTIFIER, line);
				}

				const targetMemory = targetModuleMemoryMap.get(targetMemoryId);

				if (!targetMemory) {
					throw getError(ErrorCode.UNDECLARED_IDENTIFIER, line);
				}

				const memory = memoryMapMap.get(moduleName)?.get(_arguments[0].value);

				if (memory) {
					memory.default = targetMemory.byteAddress;
				}
			}
		});
	});
}

export default function allocateMemoryAddresses(modules: AST[], consts, options: CompileOptions): MemoryMapPerModule {
	let memoryAddress = options.startingMemoryWordAddress;

	const memoryMapPerModule = new Map<string, MemoryMap>();

	modules.forEach(ast => {
		const moduleName = getModuleName(ast);
		const memoryMap: MemoryMap = new Map();

		ast.forEach(line => {
			if (['int*', 'int**', 'float*', 'float**', 'int', 'float'].includes(line.instruction)) {
				let defaultValue = 0;

				if (!line.arguments[1]) {
					defaultValue = 0;
				} else if (line.arguments[1].type === ArgumentType.LITERAL) {
					defaultValue = line.arguments[1].value;
				} else if (
					line.arguments[1].type === ArgumentType.IDENTIFIER &&
					/&(\S+)\.(\S+)/.test(line.arguments[1].value)
				) {
					// Do nothing
					// Intermodular references are resolved later once all memory addresses are allocated
				} else if (line.arguments[1].type === ArgumentType.IDENTIFIER && line.arguments[1].value[0] === '&') {
					const memoryItem = memoryMap.get(line.arguments[1].value.substring(1));

					if (!memoryItem) {
						throw getError(ErrorCode.UNDECLARED_IDENTIFIER, line);
					}

					defaultValue = memoryItem.byteAddress;
				} else if (line.arguments[1].type === ArgumentType.IDENTIFIER && line.arguments[1].value[0] === '$') {
					const memoryItem = memoryMap.get(line.arguments[1].value.substring(1));

					if (!memoryItem) {
						throw getError(ErrorCode.UNDECLARED_IDENTIFIER, line);
					}

					defaultValue = memoryItem.wordAlignedSize;
				} else if (line.arguments[1].type === ArgumentType.IDENTIFIER) {
					const constant = consts[line.arguments[1].value];

					if (!constant) {
						throw getError(ErrorCode.UNDECLARED_IDENTIFIER, line);
					}

					defaultValue = constant.value;
				}

				const identifier = line.arguments[0].value.toString(); // TODO: handle error when number
				memoryMap.set(identifier, {
					numberOfElements: 1,
					elementWordSize: 4,
					wordAlignedAddress: memoryAddress,
					wordAlignedSize: 1,
					byteAddress: memoryAddress * GLOBAL_ALIGNMENT_BOUNDARY,
					id: identifier,
					default: defaultValue,
					type: line.instruction as unknown as MemoryTypes,
					isPointer:
						line.instruction === 'int*' ||
						line.instruction === 'float*' ||
						line.instruction === 'int**' ||
						line.instruction === 'float**',
					isPointingToInteger: line.instruction === 'int*' || line.instruction === 'int**',
					isPointingToPointer: line.instruction === 'int**' || line.instruction === 'float**',
					isInteger:
						line.instruction === 'int' ||
						line.instruction === 'int*' ||
						line.instruction === 'float*' ||
						line.instruction === 'int**' ||
						line.instruction === 'float**',
				});

				memoryAddress += 1;
			}

			if (
				['int*[]', 'int**[]', 'float*[]', 'float**[]', 'int8[]', 'int16[]', 'int32[]', 'int[]', 'float[]'].includes(
					line.instruction
				)
			) {
				const identifier = line.arguments[0].value.toString(); // TODO: handle error when number

				if (!line.arguments[0] || !line.arguments[1]) {
					throw getError(ErrorCode.MISSING_ARGUMENT, line);
				}

				if (line.arguments[0].type === ArgumentType.LITERAL) {
					throw getError(ErrorCode.EXPECTED_IDENTIFIER, line);
				}

				let numberOfElements = 1;
				const elementWordSize = line.instruction.includes('8') ? 1 : line.instruction.includes('16') ? 2 : 4;

				if (line.arguments[1].type === ArgumentType.LITERAL) {
					numberOfElements = line.arguments[1].value;
				} else {
					const constant = consts[line.arguments[1].value];

					if (!constant) {
						throw getError(ErrorCode.UNDECLARED_IDENTIFIER, line);
					}

					numberOfElements = constant.value;
				}

				memoryMap.set(identifier, {
					numberOfElements,
					elementWordSize,
					wordAlignedSize: Math.ceil(numberOfElements * elementWordSize) / GLOBAL_ALIGNMENT_BOUNDARY,
					wordAlignedAddress: memoryAddress,
					id: line.arguments[0].value,
					byteAddress: memoryAddress * GLOBAL_ALIGNMENT_BOUNDARY,
					default: new Map<number, number>(),
					isInteger: line.instruction.startsWith('int') || line.instruction.includes('*'),
					isPointer: line.instruction.includes('*'),
					isPointingToInteger: line.instruction.startsWith('int') && line.instruction.includes('*'),
					isPointingToPointer: line.instruction.includes('**'),
					type: line.instruction.slice(0, -2) as unknown as MemoryTypes,
				});

				memoryAddress += Math.ceil(numberOfElements * elementWordSize) / GLOBAL_ALIGNMENT_BOUNDARY;
			}

			memoryMapPerModule.set(moduleName, memoryMap);
		});
	});

	resolveInterModularConnections(modules, memoryMapPerModule);

	return memoryMapPerModule;
}

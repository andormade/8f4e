import { getModuleName } from './compiler';
import { GLOBAL_ALIGNMENT_BOUNDARY } from './consts';
import { ErrorCode, getError } from './errors';
import {
	ArgumentType,
	AST,
	BLOCK_TYPE,
	BlockStack,
	CompilationContext,
	Const,
	Consts,
	ConstsPerModule,
	MemoryMap,
	StackItem,
} from './types';

export function isMemoryIdentifier(memoryMap: MemoryMap, name: string): boolean {
	return memoryMap.has(name);
}

export function isMemoryReferenceIdentifier(memoryMap: MemoryMap, name: string): boolean {
	return (
		(name.startsWith('&') && memoryMap.has(name.substring(1))) ||
		(name.endsWith('&') && memoryMap.has(name.slice(0, -1)))
	);
}

export function isMemoryPointerIdentifier(memoryMap: MemoryMap, name: string): boolean {
	return name.startsWith('*') && memoryMap.has(name.substring(1));
}

export function isElementCountIdentifier(memoryMap: MemoryMap, name: string): boolean {
	return name.startsWith('$') && memoryMap.has(name.substring(1));
}

export function isElementWordSizeIdentifier(memoryMap: MemoryMap, name: string): boolean {
	return name.startsWith('%') && memoryMap.has(name.substring(1));
}

export function getDataStructure(memoryMap: MemoryMap, id: string) {
	return memoryMap.get(id);
}

export function getDataStructureByteAddress(memoryMap: MemoryMap, id: string): number {
	const memoryItem = getDataStructure(memoryMap, id);
	return memoryItem ? memoryItem.byteAddress : 0;
}

export function getMemoryStringLastByteAddress(memoryMap: MemoryMap, id: string): number {
	const memoryItem = getDataStructure(memoryMap, id);
	return memoryItem ? memoryItem.byteAddress + (memoryItem.wordAlignedSize - 1) * GLOBAL_ALIGNMENT_BOUNDARY : 0;
}

export function getElementCount(memoryMap: MemoryMap, id: string): number {
	const memoryItem = getDataStructure(memoryMap, id);
	return memoryItem ? memoryItem.numberOfElements : 0;
}

export function getElementWordSize(memoryMap: MemoryMap, id: string): number {
	const memoryItem = getDataStructure(memoryMap, id);
	return memoryItem ? memoryItem.elementWordSize : 0;
}

export function isInstructionIsInsideAModule(blockStack: BlockStack) {
	for (let i = blockStack.length - 1; i >= 0; i--) {
		if (blockStack[i].blockType === BLOCK_TYPE.MODULE) {
			return true;
		}
	}
	return false;
}

export function isInstructionIsInsideBlock(blockStack: BlockStack, blockType: BLOCK_TYPE) {
	for (let i = blockStack.length - 1; i >= 0; i--) {
		if (blockStack[i].blockType === blockType) {
			return true;
		}
	}
	return false;
}

export function calculateWordAlignedSizeOfMemory(memory: MemoryMap): number {
	return Array.from(memory.values()).reduce((accumulator, current) => {
		return accumulator + current.wordAlignedSize;
	}, 0);
}

export function areAllOperandsIntegers(...operands: StackItem[]): boolean {
	return !operands.some(operand => !operand.isInteger);
}

export function areAllOperandsFloats(...operands: StackItem[]): boolean {
	return !operands.some(operand => operand.isInteger);
}

export function saveByteCode(context: CompilationContext, byteCode: number[]): CompilationContext {
	if (isInstructionIsInsideBlock(context.blockStack, BLOCK_TYPE.INIT)) {
		context.initSegmentByteCode.push(...byteCode);
	} else {
		context.loopSegmentByteCode.push(...byteCode);
	}
	return context;
}

export function collectConstants(ast: AST[], globalConsts: Consts): ConstsPerModule {
	return new Map<string, Consts>(
		ast.map(module => {
			return [
				getModuleName(module),
				new Map<string, Const>(
					module
						.filter(({ instruction }) => instruction === 'const')
						.map(line => {
							if (!line.arguments[0] || !line.arguments[1]) {
								throw getError(ErrorCode.MISSING_ARGUMENT, line);
							}

							if (line.arguments[0].type === ArgumentType.LITERAL) {
								throw getError(ErrorCode.EXPECTED_IDENTIFIER, line);
							}

							let value: Const = { value: 0, isInteger: true };

							if (line.arguments[1].type === ArgumentType.IDENTIFIER) {
								const globalConst = globalConsts.get(line.arguments[1].value);
								if (globalConst) {
									value = globalConst;
								} else {
									throw getError(ErrorCode.UNDECLARED_IDENTIFIER, line);
								}
							} else {
								value = line.arguments[1];
							}

							return [line.arguments[0].value, value];
						})
				),
			];
		})
	);
}

import { Instruction } from './instructionCompilers';
import Type from './wasmUtils/type';
import WASMInstruction from './wasmUtils/wasmInstruction';

export enum MemoryTypes {
	'int',
	'int*',
	'int**',
	'float',
	'float*',
	'float**',
}

export interface DataStructure {
	numberOfElements: number;
	elementWordSize: number;
	type: MemoryTypes;
	byteAddress: number;
	wordAlignedSize: number;
	wordAlignedAddress: number;
	default: number | Map<number, number>;
	// lineNumber: number;
	isInteger: boolean;
	id: string;
	isPointer: boolean;
	isPointingToInteger: boolean;
	isPointingToPointer: boolean;
}

export type MemoryMap = Map<string, DataStructure>;

export interface CompiledModule {
	index: number;
	initFunctionBody: number[];
	loopFunction: number[];
	id: string;
	byteAddress: number;
	wordAlignedAddress: number;
	memoryMap: MemoryMap;
	wordAlignedSize: number;
	ast: AST;
}

export type CompiledModuleLookup = Map<string, CompiledModule>;

export type MemoryBuffer = Int32Array;

export interface Connection {
	fromModuleId: string;
	fromConnectorId: string;
	toModuleId: string;
	toConnectorId: string;
}

export interface Module {
	code: string[];
}

export const enum ArgumentType {
	LITERAL = 'literal',
	IDENTIFIER = 'identifier',
}

export type ArgumentLiteral = { type: ArgumentType.LITERAL; value: number; isInteger: boolean };
export type ArgumentIdentifier = { type: ArgumentType.IDENTIFIER; value: string };

export type Argument = ArgumentLiteral | ArgumentIdentifier;

export type AST = Array<{ lineNumber: number; instruction: Instruction; arguments: Array<Argument> }>;

export interface TestModule {
	memory: MemoryBuffer & {
		get: (address: number | string) => number;
		byteAddress: (address: number | string) => number;
		set: (address: number | string, value: number | number[]) => void;
		allocMemoryForPointer: (address: number | string) => number;
	};
	test: CallableFunction;
	reset: () => void;
	wat: string;
	program: Uint8Array;
	memoryMap: MemoryMap;
	ast: AST;
}

export type Const = { value: number; isInteger: boolean };

export type Consts = Record<string, Const>;
export interface Namespace {
	locals: Map<string, { isInteger: boolean; index: number }>;
	memory: MemoryMap;
	consts: Consts;
	moduleName: string | undefined;
	namespaces: Namespaces;
}

export type Namespaces = Map<string, { consts: Consts }>;
export interface CompilationContext {
	namespace: Namespace;
	stack: Stack;
	blockStack: BlockStack;
	startingByteAddress: number;
	memoryByteSize: number;
	initSegmentByteCode: Array<WASMInstruction | Type | number>;
	loopSegmentByteCode: Array<WASMInstruction | Type | number>;
}

export interface StackItem {
	isInteger: boolean;
	/** A flag for the div operation to check if the divisor is zero. */
	isNonZero?: boolean;
	/** A flag for the memory opraions to check if the memory address is within the memory bounds. */
	isSafeMemoryAddress?: boolean;
}

export type Stack = StackItem[];

export enum BLOCK_TYPE {
	MODULE,
	LOOP,
	CONDITION,
	FUNCTION,
	BLOCK,
	INIT,
}

export type BlockStack = Array<{
	expectedResultIsInteger: boolean;
	hasExpectedResult: boolean;
	blockType: BLOCK_TYPE;
}>;

export type InstructionCompiler = (line: AST[number], context: CompilationContext) => CompilationContext;

export interface Error {
	message: string;
	line: Parameters<InstructionCompiler>[0];
	context?: CompilationContext;
	code: number;
}

export interface CompileOptions {
	startingMemoryWordAddress: number;
	environmentExtensions: {
		constants: Namespace['consts'];
		ignoredKeywords: string[];
	};
	/** Initial number of memory pages, with a page being 64KiB (65,536 bytes). */
	initialMemorySize: number;
	/** Maximum number of memory pages, with a page being 64KiB (65,536 bytes). */
	maxMemorySize: number;
	globalDataStructures?: DataStructure[];
}

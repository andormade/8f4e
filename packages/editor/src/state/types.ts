import { SpriteLookup } from '@8f4e/2d-engine';
import { CompiledModuleLookup, CompileOptions, MemoryAddressLookup, MemoryBuffer } from '@8f4e/compiler';
import { IPatcher } from '@rnbo/js';

export interface Module {
	code: string[];
	isOpen: boolean;
	x: number;
	y: number;
}

export interface Connector extends Position, Size {
	id: string;
	label?: string;
	isInput?: boolean;
}

export interface Size {
	width: number;
	height: number;
}

export interface Position {
	x: number;
	y: number;
}

export interface Viewport extends Position, Size {}

export interface ContextMenuItem {
	action: string;
	close?: boolean;
	payload?: Record<string, unknown>;
	title: string;
}

export interface ContextMenu extends Position {
	highlightedItem: number;
	itemHeight: number;
	itemWidth: number;
	items: ContextMenuItem[];
	open: boolean;
}

export type MidiPort = {
	id: string;
	name: string;
	manufacturer: string;
};

export interface BuildError {
	lineNumber: number;
	code: number;
	message: string;
	moduleId: string;
}

export interface Compiler {
	compilationTime: string;
	cycleTime: number;
	isCompiling: boolean;
	lastCompilationStart: number;
	memoryBuffer: MemoryBuffer;
	memoryBufferFloat: Float32Array;
	memoryRef: WebAssembly.Memory | undefined;
	memoryAddressLookup: MemoryAddressLookup;
	timerAccuracy: number;
	compiledModules: CompiledModuleLookup;
	buildErrors: BuildError[];
	sampleRate: number | undefined;
	compilerOptions: CompileOptions;
}

export interface Error {
	display: boolean;
	message: string;
}

export interface Midi {
	ports: MidiPort[];
}

export interface Scope {
	width: number;
	height: number;
	x: number;
	y: number;
	id: string;
	minValue: number;
	maxValue: number;
}
export interface Switch {
	width: number;
	height: number;
	x: number;
	y: number;
	id: string;
	offValue: number;
	onValue: number;
}

export interface Debugger {
	width: number;
	height: number;
	x: number;
	y: number;
	id: string;
}

export interface Output {
	module: ModuleGraphicData;
	width: number;
	height: number;
	x: number;
	y: number;
	id: string;
	calibratedMax: number;
	calibratedMin: number;
}

export interface Input {
	module: ModuleGraphicData;
	width: number;
	height: number;
	x: number;
	y: number;
	id: string;
	wordAddress: number;
}

export interface ModuleGraphicData {
	width: number;
	height: number;
	inputs: Map<string, Input>;
	outputs: Map<string, Output>;
	code: string[];
	codeWithLineNumbers: string[];
	codeColors: Array<Array<SpriteLookup | undefined>>;
	gaps: Map<number, { size: number }>;
	cursor: { col: number; row: number; x: number; y: number };
	id: string;
	debuggers: Map<string, Debugger>;
	scopes: Map<string, Scope>;
	switches: Map<string, Switch>;
	x: number;
	y: number;
	isOpen: boolean;
	errorMessages: Map<
		number,
		{
			message: string[];
			x: number;
			y: number;
		}
	>;
	isGroup: boolean;
}

export type GraphicHelper = {
	connections: Array<{ fromModule: Module; toModule: Module; fromConnectorId: string; toConnectorId: string }>;
	outputsByWordAddress: Map<number, Output>;
	modules: Set<ModuleGraphicData>;
};

export interface Group {
	code: string[];
	modules: Module[];
	groups: Group[];
}

export interface Project {
	modules: Module[];
	groups: Group[];
	viewport: Viewport;
	rnbo: { patchers: Record<string, IPatcher> };
}

export interface Options {
	isLocalStorageEnabled: boolean;
	isDebugMode: boolean;
	localStorageId: string;
}

export interface State {
	compiler: Compiler;
	connectionFromConnector: string | undefined;
	connectionFromModule: Module | undefined;
	connectionPointA: [number, number] | undefined;
	connectionPointB: [number, number] | undefined;
	contextMenu: ContextMenu | undefined;
	error: Error;
	isConnectionBeingMade: boolean;
	midi: Midi;
	selectedModule: ModuleGraphicData | undefined;
	graphicHelper: GraphicHelper;
	project: Project;
	options: Options;
}

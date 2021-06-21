export interface CompiledModule {
	functionBody: number[];
	initialMemory: number[];
	memoryAddresses: { address: number; id: string; default?: number }[];
	moduleId: string;
	offset: number;
}

export type MemoryBuffer = Int32Array;

export interface Connection {
	fromModuleId: string;
	fromConnectorId: string;
	toModuleId: string;
	toConnectorId: string;
}

export type RelativeAddressCalculator = (nthWord: number) => number;

export type ModuleGenerator = (
	moduleId: string,
	offset: RelativeAddressCalculator,
	initialConfig?: Record<string, number | string>
) => CompiledModule;

export interface Engine {
	name: string;
	config?: Record<string, unknown>;
}

export type ModuleState = Record<string, number>;

export interface Module {
	id: string;
	engine: Engine;
	state: ModuleState;
}

export type MemoryAddressLookup = Record<string, number>;

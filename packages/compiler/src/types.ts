export type Module = {
	functionBody: number[];
	initialMemory: number[];
	memoryAddresses: { address: number; id: string; isInputPointer?: boolean }[];
	moduleId: string;
	offset: number;
};

export type ModuleGenerator = (
	moduleId: string,
	relative: (nthWord: number) => number,
	initialConfig?: { [key: string]: any }
) => Module;

import { ModuleStateInserter, ModuleStateExtractor } from '../types';

interface AttenuatorState {
	divisor: number;
}

export const insertState: ModuleStateInserter<AttenuatorState> = function (state, memoryBuffer, moduleAddress) {
	memoryBuffer[moduleAddress + 2] = state.divisor;
};

export const extractState: ModuleStateExtractor<AttenuatorState> = function (memoryBuffer, moduleAddress) {
	return { divisor: memoryBuffer[moduleAddress + 2] };
};

export default `
	private zero 0
	inputPointer in zero
	public divisor 1
	output out 0
	const out
	load in
	load
	load divisor
	div
	store
`;
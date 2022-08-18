import { I16_SIGNED_LARGEST_NUMBER } from '../consts';
import { ModuleStateExtractor, ModuleStateInserter } from '../types';

interface ClockGeneratorState {
	rate: number;
}

export const insertState: ModuleStateInserter<ClockGeneratorState> = function (state, memoryBuffer, moduleAddress) {
	memoryBuffer[moduleAddress + 1] = state.rate;
};

export const extractState: ModuleStateExtractor<ClockGeneratorState> = function (memoryBuffer, moduleAddress) {
	return { rate: memoryBuffer[moduleAddress + 1] };
};

export default `
	private counter 0
	public rate 0
	output out 0

	local _counter
	local _output
	local _rate

	push out
	localSet _output

	push counter
	localSet _counter

	push rate
	localSet _rate

	push 12000
	push _counter
	greaterOrEqual
	if 
		push ${I16_SIGNED_LARGEST_NUMBER}
	else
		push 0
	end
	localSet _output

	push _counter
	push ${I16_SIGNED_LARGEST_NUMBER}
	greaterOrEqual
	if 
		push 0
	else
		push _counter
		push _rate
		add
	end
	localSet _counter

	pushRef out
	push _output
	store

	pushRef counter
	push _counter
	store
`;

import { CompiledModule, MemoryAddressLookup, MemoryBuffer } from '../../compiler/src';
import { MidiCCModuleAddresses } from './types';

export default function findMidiNoteModules(
	compiledModules: CompiledModule[],
	memoryBuffer: MemoryBuffer,
	memoryAddressLookup: MemoryAddressLookup
): MidiCCModuleAddresses[] {
	return compiledModules
		.filter(({ moduleId }) => moduleId.startsWith('cvToMidiCC'))
		.map(module => {
			return {
				moduleId: module.moduleId,
				valueAddress: memoryAddressLookup[module.moduleId + '_out:1'] / memoryBuffer.BYTES_PER_ELEMENT,
				channelAddress: memoryAddressLookup[module.moduleId + '_data:1'] / memoryBuffer.BYTES_PER_ELEMENT,
				selectedCCAddress: memoryAddressLookup[module.moduleId + '_data:2'] / memoryBuffer.BYTES_PER_ELEMENT,
			};
		});
}

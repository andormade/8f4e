import { CompiledModuleLookup, MemoryBuffer } from '@8f4e/compiler';

import { MidiCCModuleAddresses } from './types';

export default function findMidCCInputModules(
	compiledModules: CompiledModuleLookup,
	memoryBuffer: MemoryBuffer
): Map<string, MidiCCModuleAddresses> {
	return new Map(
		Array.from(compiledModules)
			.map(([, compiledModule]) => compiledModule)
			.filter(
				({ id, memoryMap }) =>
					id.startsWith('midiccin') && memoryMap.has('channel') && memoryMap.has('cc') && memoryMap.has('channel')
			)
			.map(module => {
				const notes = module.memoryMap.get('notes');
				const gates = module.memoryMap.get('gates');
				const velocities = module.memoryMap.get('velocities');
				const channel = module.memoryMap.get('cc');

				return [
					memoryBuffer[channel?.wordAddress || 0] + '' + memoryBuffer[cc?.wordAddress || 0],
					{
						moduleId: module.id,
						valueWordAddress: value?.wordAddress,
						channelWordAddress: channel?.wordAddress,
						selectedCCWordAddress: cc?.wordAddress,
					},
				];
			})
	);
}

import { State } from '../types';
import { compilationDone, recompile } from '../mutators/compiler';
import { EventDispatcher } from '../../events';

export default async function compiler(state: State, events: EventDispatcher): void {
	const worker = new Worker(new URL('../../../packages/worker/src/index.ts', import.meta.url), { type: 'module' });
	const memoryRef = new WebAssembly.Memory({ initial: 1, maximum: 1, shared: true });

	async function onRecompile() {
		worker.postMessage({
			memoryRef,
			modules: state.modules,
			connections: state.connections,
		});
		recompile(state);
	}

	async function onWorkerMessage({ data }) {
		switch (data.type) {
			case 'midiMessage':
				events.dispatch('sendMidiMessage', data.payload);
				break;
			case 'RNBOMessage':
				events.dispatch('RNBOMessage', data.payload);
				break;
			case 'compilationDone':
				compilationDone(state, data, memoryRef);
				events.dispatch('compilationDone');
				break;
		}
	}

	worker.addEventListener('message', onWorkerMessage);
	events.on('createConnection', onRecompile);
	events.on('deleteConnection', onRecompile);
	events.on('addModule', onRecompile);
	events.on('deleteModule', onRecompile);
	events.on('init', onRecompile);
}

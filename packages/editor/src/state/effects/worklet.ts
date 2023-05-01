import workletBlobUrl from 'worklet:../../../../audio-worklet/dist/index.js';
import compile from '@8f4e/compiler';

import { State } from '../types';
import { EventDispatcher } from '../../events';

export default async function worklet(state: State, events: EventDispatcher) {
	let audioContext: AudioContext;
	let audioWorklet: AudioWorkletNode;

	function onRecompile() {
		if (!audioWorklet) {
			return;
		}

		const audioModule = state.compiler.compiledModules.get('audioout');

		const addresses = {
			audioBufferWordAddress: audioModule?.memoryMap.get('buffer')?.wordAddress || 0,
			outputWordAddress: audioModule?.memoryMap.get('output')?.wordAddress || 0,
			channelWordAddress: audioModule?.memoryMap.get('channel')?.wordAddress || 0,
		};

		audioWorklet.port.postMessage({
			memoryRef: state.compiler.memoryRef,
			codeBuffer: state.compiler.codeBuffer,
			addresses,
		});
	}

	async function initAudioContext() {
		if (audioContext) {
			return;
		}

		audioContext = new AudioContext({ sampleRate: state.project.sampleRate, latencyHint: 'playback' });
		await audioContext.audioWorklet.addModule(workletBlobUrl);
		audioWorklet = new AudioWorkletNode(audioContext, 'worklet');
		audioWorklet.port.onmessage = function ({ data }) {
			switch (data.type) {
				case 'compilationDone':
					events.dispatch('compilationDone', data.payload);
					break;
				case 'audioWorkletReady':
					onRecompile();
					events.dispatch('audioWorkletReady', data.payload);
			}
		};
		audioWorklet.connect(audioContext.destination);
	}

	events.on('buildOk', onRecompile);
	events.on('mousedown', initAudioContext);
}

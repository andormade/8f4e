import { CompiledModule } from '@8f4e/compiler';

import resetMidi from './resetMidi';
import findMidiNoteOutModules from './findMidiNoteOutModules';
import broadcastMidiMessages from './broadcastMidiMessages';
import findMidiCCOutputModules from './findMidiCCOutputModules';
import broadcastMidiCCMessages from './broadcastMidiCCMessages';
import findRNBOModules from './findRNBOModules';
import broadcastRNBOMessages from './broadcastRNBOMessages';
import findMidiCCInputModules from './findMidiCCInputModules';
import { MidiCCModuleAddresses } from './types';
import createModule from './createModule';

let interval: NodeJS.Timeout;
let statsInterval: NodeJS.Timeout;
let memoryBuffer: Int32Array;
let midiCCInputModules: Map<string, MidiCCModuleAddresses> = new Map();
let timeToExecute: number;
let lastIntervalTime: number;
let drift = 0;

async function init(
	memoryRef: WebAssembly.Memory,
	sampleRate: number,
	codeBuffer: Uint8Array,
	compiledModules: Map<string, CompiledModule>
) {
	try {
		clearInterval(interval);
		clearInterval(statsInterval);

		const { memoryBuffer, cycle, init } = await createModule(memoryRef, codeBuffer);
		init();

		const midiNoteModules = findMidiNoteOutModules(compiledModules, memoryBuffer);
		const RNBOModules = findRNBOModules(compiledModules);
		const midiCCOutputModules = findMidiCCOutputModules(compiledModules, memoryBuffer);
		midiCCInputModules = findMidiCCInputModules(compiledModules, memoryBuffer);

		resetMidi();

		const intervalTime = Math.floor(1000 / sampleRate);

		interval = setInterval(() => {
			const startTime = performance.now();
			drift += intervalTime - (startTime - lastIntervalTime);
			lastIntervalTime = startTime;
			cycle();
			const endTime = performance.now();
			timeToExecute = endTime - startTime;
			broadcastMidiCCMessages(midiCCOutputModules, memoryBuffer);
			broadcastMidiMessages(midiNoteModules, memoryBuffer);
			broadcastRNBOMessages(RNBOModules, memoryBuffer);
		}, intervalTime);

		statsInterval = setInterval(() => {
			self.postMessage({
				type: 'stats',
				payload: {
					drift,
					timeToExecute,
				},
			});
		}, 10000);

		self.postMessage({
			type: 'initialized',
			payload: {},
		});
	} catch (error) {
		console.log('buildError', error);
		self.postMessage({
			type: 'buildError',
			payload: error,
		});
	}
}

function onMidiMessage(message: Uint8Array) {
	if (!memoryBuffer || midiCCInputModules.size < 1) {
		return;
	}

	if (message[0] >= 176 && message[0] <= 191) {
		const valueWordAddress = midiCCInputModules.get(message[0] - 175 + '' + message[1])?.valueWordAddress;

		if (valueWordAddress) {
			memoryBuffer[valueWordAddress] = message[2];
		}
	}
}

self.onmessage = function (event) {
	switch (event.data.type) {
		case 'midimessage':
			onMidiMessage(event.data.payload);
			break;
		case 'init':
			console.log('init', event.data);
			init(
				event.data.payload.memoryRef,
				event.data.payload.sampleRate,
				event.data.payload.codeBuffer,
				event.data.payload.compiledModules
			);
			break;
	}
};

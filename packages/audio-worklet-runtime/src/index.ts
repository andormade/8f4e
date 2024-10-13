import createModule from './createModule';
class Main extends AudioWorkletProcessor {
	constructor(...args) {
		// @ts-ignore
		super(...args);

		this.port.onmessage = async event => {
			if (event.data.type === 'init') {
				this.init(event.data.memoryRef, event.data.codeBuffer, event.data.audioOutputBuffers);
			}
		};
	}

	async init(
		memoryRef: WebAssembly.Memory,
		codeBuffer: Uint8Array,
		audioOutputBuffers: { channel: number; output: number; audioBufferWordAddress: number }[]
	) {
		const { memoryBuffer, buffer } = await createModule(memoryRef, codeBuffer);

		this.audioOutputBuffers = audioOutputBuffers;

		this.buffer = buffer;
		this.memoryBuffer = memoryBuffer;

		this.port.postMessage({
			type: 'initialized',
			payload: {
				sampleRate,
			},
		});
	}

	buffer: CallableFunction = () => {
		return;
	};

	memoryBuffer = new Float32Array(128).fill(0);
	audioOutputBuffers = [] as { channel: number; output: number; audioBufferWordAddress: number }[];

	static get parameterDescriptors() {
		return [{ name: 'amplitude', defaultValue: 0.25, minValue: 0, maxValue: 1 }];
	}

	process(inputs, outputs, parameters) {
		this.buffer();

		for (let i = 0; i < this.audioOutputBuffers.length; i++) {
			const output = outputs[this.audioOutputBuffers[i].output];

			if (!output) {
				continue;
			}

			const channel = output[this.audioOutputBuffers[i].channel];

			if (!channel) {
				continue;
			}

			for (let j = 0; j < channel.length; j++) {
				channel[j] = this.memoryBuffer[j + this.audioOutputBuffers[i].audioBufferWordAddress];
			}
		}

		return true;
	}
}

registerProcessor('worklet', Main);

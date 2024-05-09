import { Project } from '../../../packages/editor/src/state/types';

const project: Project = {
	title: 'Audio Buffer',
	author: 'Andor Polgar',
	description: '',
	codeBlocks: [
		{
			code: [
				'module saw',
				'',
				'debug out',
				'',
				'float out',
				'',
				'; Increment the value by 1',
				'push &out',
				'push out',
				'push 0.02032',
				'add',
				'store',
				'',
				'; Reset the value to -100',
				'; when it reaches 100',
				'push out',
				'push 1.0',
				'greaterThan',
				'if void',
				' push &out',
				' push -1.0',
				' store',
				'ifEnd',
				'moduleEnd',
			],
			x: 2,
			y: 1,
			isOpen: true,
		},
		{
			code: [
				'module audioout',
				'',
				'float* in &saw.out',
				'int channel LEFT_CHANNEL',
				'',
				'; Audio buffer',
				'float[] buffer AUDIO_BUFFER_SIZE',
				'int pointer &buffer',
				'',
				'plot buffer -2 2',
				'',
				'; Store the input value',
				'; in the buffer',
				'push pointer',
				'push *in',
				'store',
				'',
				'; Increment the buffer ',
				'; pointer by the word size',
				'; which is 4 bytes',
				'push &pointer',
				'push pointer',
				'push WORD_SIZE',
				'add',
				'store',
				'',
				'; Reset the buffer pointer',
				'; when it reaches the end',
				'; of the buffer',
				'push pointer',
				'push buffer&',
				'greaterThan',
				'if void',
				' push &pointer',
				' push &buffer',
				' store',
				'ifEnd',
				'',
				'moduleEnd',
			],
			x: 37,
			y: 1,
			isOpen: true,
		},
	],
	viewport: { x: 0, y: 0 },
	sampleRate: 44100,
};

export default project;

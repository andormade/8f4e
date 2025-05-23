import { Project } from '../../../packages/editor/src/state/types';

const midiArpeggiator: Project = {
	title: 'MIDI Arpeggiator',
	author: 'Andor Polgar',
	description: '',
	codeBlocks: [
		{
			code: [
				'module chord1',
				'float[] notes 12',
				'int length 6',
				'piano notes length 48',
				'init notes[0] 48.0',
				'init notes[1] 52.0',
				'init notes[2] 55.0',
				'init notes[3] 64.0',
				'init notes[4] 67.0',
				'init notes[5] 60.0',
				'moduleEnd',
			],
			x: -43,
			y: -1,
			isOpen: true,
		},
		{
			code: [
				'module chord2',
				'float[] notes 12',
				'int length 6',
				'piano notes length 48',
				'init notes[0] 50.0',
				'init notes[1] 53.0',
				'init notes[2] 57.0',
				'init notes[3] 60.0',
				'init notes[4] 64.0',
				'init notes[5] 67.0',
				'moduleEnd',
			],
			x: 7,
			y: -1,
			isOpen: true,
		},
		{
			code: [
				'module clock',
				'',
				'const HIGH 1',
				'const LOW 0',
				'',
				'int out',
				'',
				'push &out',
				'push out',
				'push HIGH',
				'equal',
				'if int',
				' push LOW',
				'else',
				' push HIGH',
				'ifEnd',
				'store',
				'',
				'moduleEnd',
			],
			x: 150,
			y: -38,
			isOpen: true,
		},
		{
			code: [
				'module clockDivider',
				'',
				'int default 4',
				'int* divider &default',
				'int* trigger &clock.out',
				'int out',
				'int counter',
				'',
				'debug out',
				'',
				'; Avoid remainder by zero',
				'push *divider',
				'push 0',
				'equal',
				'branchIfTrue 0',
				'',
				'push *trigger',
				'risingEdge',
				'if void',
				' push &counter',
				' push counter',
				' push 1',
				' add',
				' store ',
				'ifEnd',
				'',
				'push counter',
				'push *divider',
				'remainder',
				'push 0',
				'equal',
				'if void',
				' push &out',
				' push *trigger',
				' store',
				'else',
				' push &out',
				' push 0',
				' store',
				'ifEnd',
				'',
				'moduleEnd',
			],
			x: 184,
			y: -38,
			isOpen: true,
		},
		{
			code: [
				'module controls',
				'',
				'int changeChord',
				'button changeChord',
				'int velocity 100',
				'int channel 1',
				'float minNote 48.0',
				'float maxNote 92.0',
				'',
				'moduleEnd',
			],
			x: -4,
			y: -12,
			isOpen: true,
		},
		{
			code: [
				'module lengthMux',
				'',
				'int* in0 &chord1.length',
				'int* in1 &chord2.length',
				'int* in2',
				'int* in3',
				'int* in4',
				'int* in5',
				'int* in6',
				'int* in7',
				'',
				'int _length 2; default',
				'int* trigger &controls.changeChord',
				'int* length &_length',
				'',
				'int out',
				'',
				'int counter',
				'debug counter',
				'',
				'push *trigger',
				'risingEdge',
				'if void ',
				' ; Increment counter',
				' push &counter',
				'  push counter',
				'  push 1',
				'  add',
				' store',
				'ifEnd',
				'',
				'; Guard',
				'push counter',
				'push *length',
				'greaterOrEqual',
				'if void',
				' push &counter',
				'  push 0',
				' store',
				'ifEnd',
				'',
				'push &out',
				' ; Calculate input address',
				' push &in0',
				' push counter',
				' push WORD_SIZE',
				' mul',
				' add',
				'',
				' ; Load value',
				' load',
				'store',
				'',
				'moduleEnd',
			],
			x: 102,
			y: 6,
			isOpen: true,
		},
		{
			code: [
				'module mapToRange2',
				'',
				'const IN_RANGE_MIN -1.0',
				'const IN_RANGE_MAX 1.0',
				'',
				'float* in &triangle.out',
				'float* outRangeMin &controls.minNote',
				'float* outRangeMax &controls.maxNote',
				'float out',
				'',
				'debug out',
				'',
				'push &out',
				'push *in',
				'push IN_RANGE_MIN',
				'sub',
				'push IN_RANGE_MAX',
				'push IN_RANGE_MIN',
				'sub',
				'div',
				'push *outRangeMax',
				'push *outRangeMin',
				'sub',
				'mul',
				'push *outRangeMin',
				'add',
				'store',
				'',
				'moduleEnd',
			],
			x: 99,
			y: -26,
			isOpen: true,
		},
		{
			code: [
				'module midinoteout',
				'',
				'float* noteIn &quantizer.out',
				'int* channel &controls.channel',
				'int* gate &clockDivider.out',
				'int* velocity &controls.velocity',
				'int note ',
				'',
				'push &note',
				'push *noteIn',
				'castToInt',
				'store',
				'',
				'moduleEnd',
			],
			x: 226,
			y: 6,
			isOpen: true,
		},
		{
			code: [
				'module notesMux',
				'',
				'int* in0 &chord1.notes',
				'int* in1 &chord2.notes',
				'int* in2',
				'int* in3',
				'int* in4',
				'int* in5',
				'int* in6',
				'int* in7',
				'',
				'int _length 2; default',
				'int* trigger &controls.changeChord',
				'int* length &_length',
				'',
				'int out',
				'',
				'int counter',
				'',
				'push *trigger',
				'risingEdge',
				'if void ',
				' ; Increment counter',
				' push &counter',
				'  push counter',
				'  push 1',
				'  add',
				' store',
				'ifEnd',
				'',
				'; Guard',
				'push counter',
				'push *length',
				'greaterOrEqual',
				'if void',
				' push &counter',
				'  push 0',
				' store',
				'ifEnd',
				'',
				'push &out',
				' ; Calculate input address',
				' push &in0',
				' push counter',
				' push WORD_SIZE',
				' mul',
				' add',
				'',
				' ; Load value',
				' load',
				'store',
				'',
				'moduleEnd',
			],
			x: 59,
			y: 6,
			isOpen: true,
		},
		{
			code: [
				'module quantizer',
				'',
				'float* in &mapToRange2.out',
				'float* buffer &replicator.buffer',
				'int* length &replicator.length',
				'float out',
				'',
				'debug out',
				'',
				'float* _levelPointer',
				'float _difference',
				'float _smallestDiff 1000',
				'',
				'debug &_smallestDiff',
				'',
				'push &_smallestDiff',
				'push 1000.0',
				'store',
				'',
				'push &_levelPointer',
				'push buffer',
				'store',
				'',
				'loop',
				' ; Calculate difference ',
				' ; between the input and',
				' ; the current level.',
				' push &_difference',
				' push *_levelPointer',
				' push *in',
				' sub',
				' abs',
				' store',
				'',
				' push _difference',
				' push _smallestDiff',
				' lessOrEqual',
				' if void',
				"  ; If it's actually smaller",
				'  ; than the smallest difference,',
				'  ; then update the smallest ',
				'  ; difference.',
				'  push &_smallestDiff',
				'  push _difference',
				'  store',
				'  ; Save the current level value.',
				'  push &out',
				'  push *_levelPointer',
				'  store',
				' ifEnd',
				'',
				' ; Guard',
				' push _levelPointer',
				' push buffer',
				' push *length',
				' push 1',
				' sub',
				' push WORD_SIZE',
				' mul',
				' add',
				' greaterOrEqual',
				' branchIfTrue 1 ',
				'',
				' ; Increment level pointer',
				' push &_levelPointer',
				' push _levelPointer',
				' push WORD_SIZE',
				' add',
				' store',
				'loopEnd',
				'',
				'moduleEnd',
			],
			x: 184,
			y: 6,
			isOpen: true,
		},
		{
			code: [
				'module replicator',
				'',
				'const TIMES 3',
				'const OFFSET 24.0',
				'',
				'float** bufferIn &notesMux.out',
				'int** lengthIn &lengthMux.out',
				'float[] buffer 64 ; max size',
				'int length',
				'int _pointer',
				' ',
				'debug &buffer',
				'',
				'debug buffer[0]',
				'debug buffer[1]',
				'debug buffer[2]',
				'debug buffer[3]',
				'debug buffer[4]',
				'debug length',
				'',
				'plot buffer 0 127 length',
				'',
				'push &length',
				'push *lengthIn',
				'push TIMES',
				'mul',
				'store',
				'',
				'push &_pointer',
				'push 0',
				'store',
				'',
				'; To avoid remainder by zero',
				'push length',
				'push 0',
				'equal',
				'branchIfTrue 0',
				'',
				'loop ',
				' ; Calculate destination',
				' ; address',
				' push &buffer',
				' push _pointer',
				' push WORD_SIZE',
				' mul',
				' add',
				'',
				' ; Calculate source',
				' ; address',
				' push bufferIn',
				' load',
				' push _pointer',
				' push *lengthIn',
				' remainder',
				' push WORD_SIZE',
				' mul',
				' add',
				'  ',
				' loadFloat',
				'',
				' push _pointer',
				' push *lengthIn',
				' div',
				' castToFloat',
				' push OFFSET',
				' mul',
				' add',
				'',
				' store ; value to dst',
				'',
				' ; Guard',
				' push _pointer',
				' push length',
				' push 1',
				' sub',
				' greaterOrEqual',
				' branchIfTrue 1',
				' ',
				' ; Increment buffer pointer',
				' push &_pointer',
				' push _pointer',
				' push 1',
				' add',
				' store',
				'loopEnd',
				'',
				'moduleEnd',
			],
			x: 145,
			y: 6,
			isOpen: true,
		},
		{
			code: [
				'module triangle',
				'',
				'float default 0.5 ;Hz ',
				'float* frequency &default',
				'float out',
				'float direction 1 ',
				'',
				'push &out',
				'push out',
				'push *frequency',
				'push 2.0',
				'mul',
				'push SAMPLE_RATE',
				'castToFloat',
				'div',
				'push direction',
				'mul',
				'add',
				'store',
				'',
				'push out',
				'push 1.0',
				'greaterThan',
				'if void',
				' push &direction',
				' push -1.0',
				' store',
				'ifEnd',
				'',
				'push out',
				'push -1.0',
				'lessThan',
				'if void',
				' push &direction',
				' push 1.0',
				' store',
				'ifEnd',
				'',
				'moduleEnd',
			],
			x: 64,
			y: -36,
			isOpen: true,
		},
	],
	viewport: { x: -47, y: -25 },
	selectedRuntime: 0,
	runtimeSettings: [
		{
			sampleRate: 50,
			runtime: 'WebWorkerMIDIRuntime',
		},
	],
};

export default midiArpeggiator;

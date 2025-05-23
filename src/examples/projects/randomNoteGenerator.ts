import { Project } from '../../../packages/editor/src/state/types';

const project: Project = {
	title: 'Random Note Generator',
	author: 'Andor Polgar',
	description: '',
	codeBlocks: [
		{
			code: [
				'module chord',
				'float[] notes 12',
				'int notesCount 6',
				'piano notes notesCount 36',
				'init notes[0] 36.0',
				'init notes[1] 40.0',
				'init notes[2] 43.0',
				'init notes[3] 48.0',
				'init notes[4] 55.0',
				'init notes[5] 52.0',
				'moduleEnd',
			],
			x: -12,
			y: -6,
			isOpen: true,
		},
		{
			code: [
				'module chord2',
				'float[] notes 12',
				'int notesCount 6',
				'piano notes notesCount 36',
				'init notes[0] 45.0',
				'init notes[1] 57.0',
				'init notes[2] 38.0',
				'init notes[3] 41.0',
				'init notes[4] 50.0',
				'init notes[5] 53.0',
				'moduleEnd',
			],
			x: 38,
			y: -6,
			isOpen: true,
		},
		{
			code: [
				'module chord3',
				'float[] notes 12',
				'int notesCount 5',
				'piano notes notesCount 36',
				'init notes[0] 50.0',
				'init notes[1] 47.0',
				'init notes[2] 43.0',
				'init notes[3] 38.0',
				'init notes[4] 55.0',
				'moduleEnd',
			],
			x: -12,
			y: 11,
			isOpen: true,
		},
		{
			code: [
				'module chord4',
				'float[] notes 12',
				'int notesCount 2',
				'piano notes notesCount 36',
				'init notes[0] 41.0',
				'init notes[1] 38.0',
				'moduleEnd',
			],
			x: 38,
			y: 11,
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
			x: 31,
			y: 40,
			isOpen: true,
		},
		{
			code: [
				'module clockDiv',
				'',
				'int default 128',
				'int* divider &default',
				'int* trigger &clock.out',
				'int out',
				'int counter',
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
			x: 67,
			y: 40,
			isOpen: true,
		},
		{
			code: [
				'module clockDiv2',
				'',
				'int default 4',
				'int* divider &default',
				'int* trigger &clock.out',
				'int out',
				'int counter',
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
				'push *divider',
				'push 0',
				'equal',
				'branchIfTrue 0',
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
			x: 31,
			y: 61,
			isOpen: true,
		},
		{
			code: [
				'module float2Int',
				'',
				'float* in &seqMuxF.out',
				'int out',
				'',
				'debug out',
				'',
				'push &out',
				'push *in',
				'castToInt',
				'store',
				'',
				'moduleEnd',
			],
			x: 69,
			y: 77,
			isOpen: true,
		},
		{
			code: [
				'module lcg',
				'; Linear congruential ',
				'; generator',
				'',
				'const multiplier 1664525',
				'const increment 1013904223 ',
				'const modulus 65536 ; 2^16',
				'int seed 69420',
				'',
				'float out',
				'',
				'push &seed',
				' push multiplier',
				' push seed',
				' mul',
				' push increment',
				' add',
				' push modulus',
				' remainder',
				'store',
				'',
				'push &out',
				' push seed',
				' castToFloat',
				' push modulus',
				' castToFloat',
				' div ',
				'store',
				'',
				'moduleEnd',
			],
			x: 119,
			y: -53,
			isOpen: true,
		},
		{
			code: [
				'module midinoteout',
				'',
				'int* note &float2Int.out',
				'int channel 1',
				'int* gate &clockDiv2.out',
				'int velocity 127',
				'',
				'moduleEnd',
			],
			x: 91,
			y: 19,
			isOpen: true,
		},
		{
			code: [
				'module quantizer',
				'',
				'float* in &signal.out',
				'float* buffer &replicator.buffer',
				'int* length &replicator.length',
				'float out ',
				'',
				'float* _levelPointer',
				'float _difference',
				'float _smallestDiff 1000',
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
			x: 181,
			y: 6,
			isOpen: true,
		},
		{
			code: [
				'module quantizer2',
				'',
				'float* in &signal.out',
				'float* buffer &replicator2.buffer',
				'int* length &replicator2.length',
				'float out',
				'',
				'float* _levelPointer',
				'float _difference',
				'float _smallestDiff 1000',
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
			x: 263,
			y: 6,
			isOpen: true,
		},
		{
			code: [
				'module quantizer3',
				'',
				'float* in &signal.out',
				'float* buffer &replicator3.buffer',
				'int* length &replicator3.length',
				'float out',
				'',
				'float* _levelPointer',
				'float _difference',
				'float _smallestDiff 1000',
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
			x: 346,
			y: 6,
			isOpen: true,
		},
		{
			code: [
				'module quantizer4',
				'',
				'float* in &signal.out',
				'float* buffer &replicator4.buffer',
				'int* length &replicator4.length',
				'float out',
				'',
				'float* _levelPointer',
				'float _difference',
				'float _smallestDiff 1000',
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
			x: 429,
			y: 6,
			isOpen: true,
		},
		{
			code: [
				'module replicator',
				'',
				'const TIMES 2',
				'const OFFSET 24.0',
				'',
				'float* bufferIn &chord.notes',
				'int* lengthIn &chord.notesCount',
				'float[] buffer 64 ; max size',
				'int length',
				'int _pointer',
				'',
				'debug length',
				'',
				'debug buffer[10]',
				'',
				'plot buffer 0 200 length',
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
				'loop',
				' ; Guard',
				' push _pointer',
				' push length',
				' greaterOrEqual',
				' branchIfTrue 1 ',
				' ',
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
				' push _pointer',
				' push *lengthIn',
				' remainder',
				' push WORD_SIZE',
				' mul',
				' add',
				' ',
				' loadFloat ; value from src',
				' ',
				' push _pointer',
				' push *lengthIn',
				' div',
				' castToFloat',
				' push OFFSET',
				' mul',
				' add',
				'',
				' store ; value to dst',
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
			x: 141,
			y: 6,
			isOpen: true,
		},
		{
			code: [
				'module replicator2',
				'',
				'const TIMES 2',
				'const OFFSET 24.0',
				'',
				'float* bufferIn &chord2.notes',
				'int* lengthIn &chord2.notesCount',
				'float[] buffer 64 ; max size',
				'int length',
				'int _pointer',
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
				'loop',
				' ; Guard',
				' push _pointer',
				' push length',
				' greaterOrEqual',
				' branchIfTrue 1 ',
				' ',
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
				' push _pointer',
				' push *lengthIn',
				' remainder',
				' push WORD_SIZE',
				' mul',
				' add',
				' ',
				' loadFloat ; value from src',
				' ',
				' push _pointer',
				' push *lengthIn',
				' div',
				' castToFloat',
				' push OFFSET',
				' mul',
				' add',
				'',
				' store ; value to dst',
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
			x: 223,
			y: 6,
			isOpen: true,
		},
		{
			code: [
				'module replicator3',
				'',
				'const TIMES 2',
				'const OFFSET 24.0',
				'',
				'float* bufferIn &chord3.notes',
				'int* lengthIn &chord3.notesCount',
				'float[] buffer 64 ; max size',
				'int length',
				'int _pointer',
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
				'loop',
				' ; Guard',
				' push _pointer',
				' push length',
				' greaterOrEqual',
				' branchIfTrue 1 ',
				' ',
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
				' push _pointer',
				' push *lengthIn',
				' remainder',
				' push WORD_SIZE',
				' mul',
				' add',
				' ',
				' loadFloat ; value from src',
				' ',
				' push _pointer',
				' push *lengthIn',
				' div',
				' castToFloat',
				' push OFFSET',
				' mul',
				' add',
				'',
				' store ; value to dst',
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
			x: 305,
			y: 6,
			isOpen: true,
		},
		{
			code: [
				'module replicator4',
				'',
				'const TIMES 4',
				'const OFFSET 24.0',
				'',
				'float* bufferIn &chord4.notes',
				'int* lengthIn &chord4.notesCount',
				'float[] buffer 64 ; max size',
				'int length',
				'int _pointer',
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
				'loop',
				' ; Guard',
				' push _pointer',
				' push length',
				' greaterOrEqual',
				' branchIfTrue 1 ',
				' ',
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
				' push _pointer',
				' push *lengthIn',
				' remainder',
				' push WORD_SIZE',
				' mul',
				' add',
				' ',
				' loadFloat ; value from src',
				' ',
				' push _pointer',
				' push *lengthIn',
				' div',
				' castToFloat',
				' push OFFSET',
				' mul',
				' add',
				'',
				' store ; value to dst',
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
			x: 388,
			y: 6,
			isOpen: true,
		},
		{
			code: [
				'module sawSignedFloat',
				'',
				'float default 0.7 ;Hz ',
				'float* frequency &default',
				'float out',
				'',
				'push &out',
				'push out',
				'push *frequency',
				'push SAMPLE_RATE',
				'castToFloat',
				'div',
				'add',
				'store',
				'',
				'push out',
				'push 1.0',
				'greaterThan',
				'if void',
				' push &out',
				' push 0',
				' store',
				'ifEnd',
				'',
				'moduleEnd',
			],
			x: 85,
			y: -53,
			isOpen: true,
		},
		{
			code: [
				'module seqMuxF',
				'',
				'float* in0 &quantizer.out',
				'float* in1 &quantizer2.out',
				'float* in2 &quantizer3.out',
				'float* in3 &quantizer4.out',
				'float* in4',
				'float* in5',
				'float* in6',
				'float* in7',
				'',
				'int _length 3 ; default',
				'int* trigger &clockDiv.out',
				'int* length &_length',
				'',
				'float out',
				'',
				'int counter',
				'',
				'debug counter',
				'debug out',
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
				' load',
				'store',
				'',
				'moduleEnd',
			],
			x: 104,
			y: 40,
			isOpen: true,
		},
		{
			code: [
				'module seqMuxF2',
				'',
				'float* in0 &lcg.out',
				'float* in1 &lcg.out',
				'float* in2 &triangleSignedFloat.out',
				'float* in3 &lcg.out',
				'float* in4 &lcg.out',
				'float* in5 &lcg.out',
				'float* in6 &triangleSignedFloat.out',
				'float* in7',
				'',
				'int _length 7 ; default',
				'int* trigger &clockDiv.out',
				'int* length &_length',
				'',
				'float out',
				'',
				'int counter',
				'',
				'debug counter',
				'debug out',
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
				' load',
				'store',
				'',
				'moduleEnd',
			],
			x: 157,
			y: -54,
			isOpen: true,
		},
		{
			code: [
				'module signal',
				'',
				'float* in &seqMuxF2.out',
				'float out',
				'',
				'debug out',
				'',
				'push &out',
				'push *in',
				'push 1.0',
				'add',
				'push 2.0',
				'div',
				'push 54.0',
				'mul',
				'',
				'push 24.0',
				'add',
				'',
				'store',
				'',
				'moduleEnd',
			],
			x: 201,
			y: -41,
			isOpen: true,
		},
		{
			code: [
				'module triangleSignedFloat',
				'',
				'float default 1 ;Hz ',
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
			x: 49,
			y: -53,
			isOpen: true,
		},
	],
	viewport: { x: -17, y: -11 },
	selectedRuntime: 0,
	runtimeSettings: [
		{
			runtime: 'WebWorkerMIDIRuntime',
			sampleRate: 50,
		},
	],
};

export default project;

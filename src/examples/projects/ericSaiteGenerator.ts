import { Project } from '../../../packages/editor/src/state/types';

const ericSaiteGenerator: Project = {
	title: 'Eric Saite Generator',
	author: 'Andor Polgar & Eric Saite',
	description: '',
	modules: [
		{
			code: [
				'module bufferToOut',
				'',
				'float* bufferIn &notesMux2.out.notes',
				'float out1',
				'float out2',
				'float out3',
				'float out4',
				'',
				'push &out1',
				'push bufferIn',
				'load',
				'loadFloat',
				'store',
				'',
				'push &out2',
				'push bufferIn',
				'load',
				'push WORD_SIZE',
				'add',
				'loadFloat',
				'store',
				'',
				'push &out3',
				'push bufferIn',
				'load',
				'push WORD_SIZE',
				'push 2',
				'mul',
				'add',
				'loadFloat',
				'store',
				'',
				'push &out4',
				'push bufferIn',
				'load',
				'push WORD_SIZE',
				'push 3',
				'mul',
				'add',
				'loadFloat',
				'store',
				'',
				'end',
			],
			x: -96,
			y: -2,
			isOpen: true,
		},
		{
			code: [
				'module chord2',
				'float[] notes 12',
				'int length 3',
				'piano notes length 48',
				'init notes[0] 59.0',
				'init notes[1] 62.0',
				'init notes[2] 66.0',
			],
			x: -187,
			y: -2,
			isOpen: true,
		},
		{
			code: [
				'module chord3',
				'float[] notes 12',
				'int length 3',
				'piano notes length 48',
				'init notes[0] 66.0',
				'init notes[1] 57.0',
				'init notes[2] 61.0',
			],
			x: -187,
			y: 13,
			isOpen: true,
		},
		{
			code: [
				'module chord4',
				'float[] notes 12',
				'int length 1',
				'piano notes length 36',
				'init notes[1] -1.0',
				'init notes[2] -1.0',
				'init notes[0] 43.0',
			],
			x: -238,
			y: -2,
			isOpen: true,
		},
		{
			code: [
				'module chord5',
				'float[] notes 12',
				'int length 2',
				'piano notes length 36',
				'init notes[0] 38.0',
				'init notes[1] -1.0',
				'init notes[2] -1.0',
			],
			x: -238,
			y: 13,
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
				'end',
				'store',
				'',
				'end',
			],
			x: -175,
			y: -23,
			isOpen: true,
		},
		{
			code: [
				'module clockDivider',
				'',
				'int default 48',
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
				'end',
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
				'end',
				'',
				'end',
			],
			x: -140,
			y: -46,
			isOpen: true,
		},
		{
			code: [
				'module clockDivider2',
				'',
				'int default 24',
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
				'end',
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
				'end',
				'',
				'end',
			],
			x: -105,
			y: -46,
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
				'end',
			],
			x: -187,
			y: 53,
			isOpen: true,
		},
		{
			code: [
				'module mapToRange2',
				'',
				'const IN_RANGE_MIN -1.0',
				'const IN_RANGE_MAX 1.0',
				'',
				'float* in &lcg.out',
				'float outRangeMin 69.0',
				'float outRangeMax 81.0',
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
				'push outRangeMax',
				'push outRangeMin',
				'sub',
				'mul',
				'push outRangeMin',
				'add',
				'store',
				'',
				'end',
			],
			x: -150,
			y: 53,
			isOpen: true,
		},
		{
			code: [
				'module midinoteout',
				'',
				'float* noteIn &quantizer.out',
				'int channel 1',
				'int* gate &clockDivider2.out',
				'int velocity 100',
				'int note ',
				'',
				'push &note',
				'push *noteIn',
				'castToInt',
				'store',
				'',
				'end',
			],
			x: -50,
			y: 38,
			isOpen: true,
		},
		{
			code: [
				'module midinoteout2',
				'',
				'float* noteIn &bufferToOut.out1',
				'int channel 1',
				'int* gate &clockDivider.out',
				'int velocity 127',
				'int note ',
				'',
				'push &note',
				'push *noteIn',
				'castToInt',
				'store',
				'',
				'end',
			],
			x: -50,
			y: -10,
			isOpen: true,
		},
		{
			code: [
				'module midinoteout3',
				'',
				'float* noteIn &bufferToOut.out2',
				'int channel 1',
				'int* gate &clockDivider.out',
				'int velocity 127',
				'int note ',
				'',
				'push &note',
				'push *noteIn',
				'castToInt',
				'store',
				'',
				'end',
			],
			x: -50,
			y: 6,
			isOpen: true,
		},
		{
			code: [
				'module midinoteout4',
				'',
				'float* noteIn &bufferToOut.out3',
				'int channel 1',
				'int* gate &clockDivider.out',
				'int velocity 127',
				'int note ',
				'',
				'push &note',
				'push *noteIn',
				'castToInt',
				'store',
				'',
				'end',
			],
			x: -50,
			y: 22,
			isOpen: true,
		},
		{
			code: [
				'module notesMux2',
				'',
				'int* in0 &chord4.notes',
				'int* in1 &chord2.notes',
				'int* in2 &chord5.notes',
				'int* in3 &chord3.notes',
				'int* in4',
				'int* in5',
				'int* in6',
				'int* in7',
				'',
				'int _length 4; default',
				'int* trigger &clockDivider.out',
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
				'end',
				'',
				'; Guard',
				'push counter',
				'push *length',
				'greaterOrEqual',
				'if void',
				' push &counter',
				'  push 0',
				' store',
				'end',
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
				'end',
			],
			x: -136,
			y: -2,
			isOpen: true,
		},
		{
			code: [
				'module quantizer',
				'',
				'float* in &mapToRange2.out',
				'float* buffer &scale1.notes',
				'int* length &scale1.length',
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
				' end',
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
				'end',
				'',
				'end',
			],
			x: -115,
			y: 53,
			isOpen: true,
		},
		{
			code: [
				'module scale1',
				'float[] notes 12',
				'int length 7',
				'piano notes length 60',
				'init notes[0] 78.0',
				'init notes[1] 79.0',
				'init notes[2] 73.0',
				'init notes[3] 74.0',
				'init notes[4] 71.0',
				'init notes[5] 69.0',
				'init notes[6] 81.0',
			],
			x: -187,
			y: 28,
			isOpen: true,
		},
	],
	groups: [],
	viewport: { x: -241, y: -15 },
	rnbo: { patchers: {} },
	sampleRate: 50,
};

export default ericSaiteGenerator;

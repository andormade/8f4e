import { Project } from '../../../packages/editor/src/state/types';

const project: Project = {
	title: 'Bistable Multivibrators',
	author: 'Andor Polgar',
	description: '',
	modules: [
		{
			code: [
				'module norGate2',
				'',
				'         ;   .---.',
				"int* in1 ; --+    '   ",
				'int out  ;   ) NOR |O--- ',
				'int* in2 ; --+    .',
				"         ;   '---'",
				'',
				'debug out',
				'',
				'init in1 &norGate.out',
				'init in2 &setButton.out',
				'push &out',
				'push *in1',
				'push *in2',
				'add',
				'push 0',
				'equal',
				'if ',
				' push 1 ',
				'else',
				' push 0',
				'end',
				'store',
				'',
				'end',
			],
			x: 95,
			y: 8,
			isOpen: true,
		},
		{
			code: [
				'module comment',
				'',
				'; Of course there is an easier',
				'; way to implement latching',
				'; logic in 8F4E, this is just',
				'; a fun project to demonstrate',
				'; feedback between modules.',
				'',
				'',
				'end',
			],
			x: 131,
			y: 14,
			isOpen: true,
		},
		{
			code: [
				'module orGate',
				'',
				'         ;   .---.',
				"int* in1 ; --+    '   ",
				'int out  ;   ) OR  |---',
				'int* in2 ; --+    .',
				"         ;   '---'",
				'',
				'init in1 &andGate.out',
				'init in2 &buttons.set',
				'push &out',
				'push *in1',
				'push *in2',
				'add',
				'push 1',
				'greaterOrEqual',
				'if ',
				' push 1',
				'else',
				' push 0',
				'end',
				'store',
				'',
				'end',
			],
			x: 243,
			y: 6,
			isOpen: true,
		},
		{
			code: [
				'module andGate',
				'',
				'         ;   .---.',
				"int* in1 ; --+    '   ",
				'int out  ;   | AND |---',
				'int* in2 ; --+    .',
				"         ;   '---'",
				'',
				'init in1 &orGate.out',
				'init in2 &negate.out',
				'push &out',
				'push *in1',
				'push *in2',
				'mul',
				'push 1',
				'greaterOrEqual',
				'if ',
				' push 1',
				'else',
				' push 0',
				'end',
				'store',
				'',
				'end',
			],
			x: 243,
			y: 31,
			isOpen: true,
		},
		{
			code: [
				'module negate',
				'',
				'int* in &buttons.reset',
				'int out',
				'',
				'push &out',
				'push *in',
				'push 0',
				'equal',
				'if ',
				' push 1',
				'else',
				' push 0',
				'end',
				'store',
				'',
				'end',
			],
			x: 207,
			y: 33,
			isOpen: true,
		},
		{
			code: [
				'module norGate',
				'',
				'         ;   .---.',
				"int* in1 ; --+    '",
				'int out  ;   ) NOR |O--- ',
				'int* in2 ; --+    .',
				"         ;   '---'",
				'debug out',
				'',
				'init in1 &norGate2.out',
				'init in2 &resetButton.out',
				'',
				'push &out',
				' push *in1',
				' push *in2',
				' add',
				' push 0',
				' equal',
				' if ',
				'  push 1',
				' else',
				'  push 0',
				' end',
				'store',
				'',
				'end',
			],
			x: 95,
			y: 35,
			isOpen: true,
		},
		{
			code: [
				'module setButton',
				'',
				'int out',
				'               ; Push this button',
				'               ; to set the state',
				'button out 0 1 ; of the SR latch -->  ',
				'',
				'end',
			],
			x: 47,
			y: 17,
			isOpen: true,
		},
		{
			code: [
				'module resetButton',
				'',
				'int out',
				'               ; Push this button',
				'               ; to reset the state',
				'button out 0 1 ; of the SR latch -->  ',
				'',
				'end',
			],
			x: 47,
			y: 27,
			isOpen: true,
		},
		{
			code: [
				'module scope',
				'',
				'int* in &norGate.out',
				'int[] buffer 64',
				'int bufferPointer &buffer',
				'',
				'plot buffer -1 2',
				'',
				'push &bufferPointer',
				'push bufferPointer',
				'push WORD_SIZE',
				'add',
				'store',
				'',
				'push bufferPointer',
				'push buffer&',
				'greaterThan',
				'if void',
				' push &bufferPointer',
				' push &buffer',
				' store',
				'end',
				'',
				'push bufferPointer',
				'push *in',
				'store',
				'',
				'end',
			],
			x: 131,
			y: 26,
			isOpen: true,
		},
		{
			code: [
				'module buttons',
				'',
				'; Buttons for the SR AND-OR latch',
				'',
				'int set',
				'int reset',
				'               ; Push this button',
				'               ; to set the state',
				'button set 0 1 ; of the latch  -->  ',
				'',
				'                 ; Push this button',
				'button reset 0 1 ; to reset   --->',
				'',
				'end',
			],
			x: 196,
			y: 16,
			isOpen: true,
		},
		{
			code: [
				'module scope2',
				'',
				'int* in &andGate.out',
				'int[] buffer 64',
				'int bufferPointer &buffer',
				'',
				'plot buffer -1 2',
				'',
				'push &bufferPointer',
				'push bufferPointer',
				'push WORD_SIZE',
				'add',
				'store',
				'',
				'push bufferPointer',
				'push buffer&',
				'greaterThan',
				'if void',
				' push &bufferPointer',
				' push &buffer',
				' store',
				'end',
				'',
				'push bufferPointer',
				'push *in',
				'store',
				'',
				'end',
			],
			x: 279,
			y: 19,
			isOpen: true,
		},
	],
	groups: [],
	viewport: { x: 144, y: -3 },
	rnbo: { patchers: {} },
	sampleRate: 50,
};

export default project;

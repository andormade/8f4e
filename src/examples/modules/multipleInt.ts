import { ExampleModule } from '../../../packages/editor/src/state/types';

const mulInt: ExampleModule = {
	title: 'Multiple (8x Int)',
	author: 'Andor Polgar',
	category: 'Utilities',
	code: `module mulInt

int* in
int out0
int out1
int out2
int out3
int out4
int out5
int out6
int out7

int* _pointer &out0

push &_pointer
push &out0
store

loop
 push _pointer
 push *in
 store 

 ; Exit point
 push _pointer
 push &out7; Last output
 equal
 branchIfTrue 1

 ; Increment pointer
 push &_pointer
 push _pointer
 push WORD_SIZE
 add
 store
loopEnd`,
	tests: [],
};

export default mulInt;

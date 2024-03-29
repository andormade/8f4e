import { ExampleModule } from '../../../packages/editor/src/state/types';

const sequentialMuxInt: ExampleModule = {
	title: 'Sequential Multiplexer (8 input, Int)',
	author: 'Andor Polgar',
	category: 'Sequencers',
	code: `module seqMux

int* in0
int* in1 
int* in2
int* in3
int* in4
int* in5
int* in6
int* in7

int _length 8; default
int* trigger
int* length &_length

int out

int counter

push *trigger
risingEdge
if void 
 ; Increment counter
 push &counter
  push counter
  push 1
  add
 store
ifEnd

; Guard
push counter
push *length
greaterOrEqual
if void
 push &counter
  push 0
 store
ifEnd

push &out
 ; Calculate input address
 push &in0
 push counter
 push WORD_SIZE
 mul
 add

 ; Load value
 load
 load
store

moduleEnd`,
	tests: [],
};

export default sequentialMuxInt;

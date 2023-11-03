import { ExampleModule } from '../../../packages/editor/src/state/types';

const quantizer: ExampleModule = {
	title: 'Quantizer',
	author: 'Andor Polgar',
	category: 'Quantizers',
	code: `module quantizer

float* in
float* buffer
int* length
float out

float* _levelPointer
float _difference
float _smallestDiff 1000

push &_smallestDiff
push 1000.0
store

push &_levelPointer
push buffer
store

loop
 ; Calculate difference 
 ; between the input and
 ; the current level.
 push &_difference
 push *_levelPointer
 push *in
 sub
 abs
 store

 push _difference
 push _smallestDiff
 lessOrEqual
 if void
  ; If it's actually smaller
  ; than the smallest difference,
  ; then update the smallest 
  ; difference.
  push &_smallestDiff
  push _difference
  store
  ; Save the current level value.
  push &out
  push *_levelPointer
  store
 ifEnd

 ; Guard
 push _levelPointer
 push buffer
 push *length
 push 1
 sub
 push WORD_SIZE
 mul
 add
 greaterOrEqual
 branchIfTrue 1 

 ; Increment level pointer
 push &_levelPointer
 push _levelPointer
 push WORD_SIZE
 add
 store
loopEnd

moduleEnd`,
	tests: [],
};

export default quantizer;

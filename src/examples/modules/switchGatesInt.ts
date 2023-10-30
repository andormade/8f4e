import { ExampleModule } from '../../../packages/editor/src/state/types';

const switchGatesInt: ExampleModule = {
	title: 'Switchable Gates (8x Int)',
	author: 'Andor Polgar',
	category: 'Controllers',
	code: `module switchGates

int* in0
int out0
int* in1
int out1
int* in2
int out2
int* in3
int out3
int* in4
int out4
int* in5
int out5
int* in6
int out6
int* in7
int out7

int gate0
switch gate0
int gate1
switch gate1
int gate2
switch gate2
int gate3
switch gate3
int gate4
switch gate4
int gate5
switch gate5
int gate6
switch gate6
int gate7
switch gate7

int pointer 0

loop
 ; Exit point
 push pointer
 push 7
 greaterThan
 branchIfTrue 1 

 ; Read switch
 push &gate0
 push pointer
 push WORD_SIZE
 mul
 add
 load
 push 1
 equal
 if void
  ; Prepare out address
  push &out0
  push pointer
  push WORD_SIZE
  mul
  add

  ; Read input
  push &in0
  push pointer
  push WORD_SIZE
  mul
  add
  load
  load
  store

 else
  ; Prepare out address
  push &out0
  push pointer
  push WORD_SIZE
  mul
  add
  
  ; Set out to 0
  push 0
  store
 end ; if
loopEnd

end`,
	tests: [],
};

export default switchGatesInt;

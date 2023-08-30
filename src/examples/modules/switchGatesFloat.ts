import { ExampleModule } from '../../../packages/editor/src/state/types';

const switchGatesFloat: ExampleModule = {
	title: 'Switchable Gates (8x Float)',
	author: 'Andor Polgar',
	category: 'Controllers',
	code: `module switchGates

float* in0
float out0
float* in1
float out1
float* in2
float out2
float* in3
float out3
float* in4
float out4
float* in5
float out5
float* in6
float out6
float* in7
float out7

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
end ; loop

end`,
	tests: [],
};

export default switchGatesFloat;

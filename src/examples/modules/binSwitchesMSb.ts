import { ExampleModule } from '../../../packages/editor/src/state/types';

const binSwitchesMSb: ExampleModule = {
	title: 'Binary Switches (MSb first)',
	author: 'Andor Polgar',
	category: 'Controllers',
	code: `module binSwitchesMSb

int bit0
int bit1
int bit2
int bit3
int bit4
int bit5
int bit6
int bit7

switch bit0 0 1
switch bit1 0 1
switch bit2 0 1
switch bit3 0 1
switch bit4 0 1
switch bit5 0 1
switch bit6 0 1
switch bit7 0 1

int bitPointer
int out

push &bitPointer
push 0
store

debug 0bout
debug out

; Clear bits
push &out
push 0
store

loop
 ; Exit loop if bitPointer
 ; is greater than 7
 push bitPointer
 push 7
 greaterThan
 branchIfTrue 1
 
 ; Load switch state
 push &bit0
 push bitPointer
 push WORD_SIZE
 mul
 add
 load

 push 1
 greaterOrEqual
 if void
  push &out 
  push out
  push 0b10000000
  push bitPointer
  shiftRight
  or
  store

 end
 
 ; Increment bitPointer
 push &bitPointer
 push bitPointer
 push 1
 add
 store
 
loopEnd

end`,
	tests: [],
};

export default binSwitchesMSb;

import { ExampleModule } from '../../../packages/editor/src/state/types';

const decToBin8bitMSb: ExampleModule = {
	title: 'Decimal to Binary Converter (8bit, MSb)',
	author: 'Andor Polgar',
	category: 'Bitwise',
	code: `module decToBin

int* in

int bit0
int bit1
int bit2 
int bit3
int bit4 
int bit5
int bit6
int bit7

int bitPointer 0

const HIGH 1
const LOW 0

push &bitPointer
push 0
store

loop
 ; Exit loop if bitPointer
 ; is greater than 7
 push bitPointer
 push 7
 greaterThan
 branchIfTrue 1
 
 ; Calculate output address
 push &bit0
 push bitPointer
 push WORD_SIZE
 mul
 add

 push *in
 push 0b10000000
 push bitPointer
 shiftRight
 and
 if int
  push HIGH
 else
  push LOW
 end 

 store

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

export default decToBin8bitMSb;

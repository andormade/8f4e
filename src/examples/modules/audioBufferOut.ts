import { ExampleModule } from '../../../packages/editor/src/state/types';

const audioBufferOut: ExampleModule = {
	title: 'Audio Buffer Out',
	author: 'Andor Polgar',
	category: 'Audio Buffer',
	code: `module audioOut

float* in

float[] buffer 128
int pointer &buffer

plot buffer -2 2

; Store the input value
; in the buffer
push pointer
push *in
store

; Increment the buffer 
; pointer by the word size
push &pointer
push pointer
push %buffer
add
store

; Reset the buffer pointer
; when it reaches the end
; of the buffer
push pointer
push buffer&
greaterThan
if void
 push &pointer
 push &buffer
 store
ifEnd

moduleEnd`,
	tests: [],
};

export default audioBufferOut;

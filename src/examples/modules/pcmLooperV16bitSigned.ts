import { ExampleModule } from '../../../packages/editor/src/state/types';

const pcmLooperV16bitSigned: ExampleModule = {
	title: 'Variable Speed PCM Looper (16bit signed)',
	author: 'Andor Polgar',
	category: 'PCM',
	code: `module pcmLooper
; Variable speed PCM Looper

int16[] buffer 128890
float playhead 0
float out 1.0
float defSpeed 1
int defLength $buffer
int* length &defLength
float* speed &defSpeed

; Playhead increments
push &playhead
 push playhead 
 push *speed
 add
store

; Resets when it reaches end
push playhead
castToInt
push *length
greaterThan
if void
 push &playhead
 push 0
 store
ifEnd

; Load value from buffer
; and save it to the output
push &out
 push playhead
 castToInt
 push %buffer
 mul
 push &buffer
 add
 load16s
 ; Normalize value
 castToFloat
 push 32767.0 ; Max value
 div
store

moduleEnd`,
	tests: [],
};

export default pcmLooperV16bitSigned;

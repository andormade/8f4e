import { ExampleModule } from '../../../packages/editor/src/state/types';

const pcmLooperVRP16bitSigned: ExampleModule = {
	title: 'Retriggerable PCM Looper with Variable Speed and Start Position (16bit signed)',
	author: 'Andor Polgar',
	category: 'PCM',
	code: `module pcmLooper
; Retriggerable PCM Looper
; with Vairable Speed
; and Start Position

int16[] buffer 914066
float playhead 0
float out 1.0
float defSpeed 1
int defLength $buffer
int defStartPos 0
int* reset
int* length &defLength
float* speed &defSpeed
int* startPos &defStartPos.out

; Reset playhead
push *reset
risingEdge
if void
 push &playhead
 push *startPos
 castToFloat
 store
ifEnd

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

export default pcmLooperVRP16bitSigned;

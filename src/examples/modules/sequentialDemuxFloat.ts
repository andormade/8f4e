import { ExampleModule } from '../../../packages/editor/src/state/types';

const sequentialDemuxFloat: ExampleModule = {
	title: 'Sequential Demultiplexer (8 output, Float)',
	author: 'Andor Polgar',
	category: 'Sequencers',
	code: `module seqDemux

int _length 8

float* in
int* trigger
int* length &_length

int counter

float out0
float out1
float out2
float out3
float out4
float out5
float out6
float out7

push *trigger
risingEdge
if void
 ; Clear previous output
 push &out0
 push counter
 push WORD_SIZE
 mul
 add
 push 0
 store
 
 ; Increment counter
 push &counter
 push counter
 push 1
 add
 store
end

; Guard
push counter
push *length
greaterOrEqual
if void
 push &counter
 push 0
 store
end
 
; Calculate output address
push &out0
push counter
push WORD_SIZE
mul
add
push *in
store

end`,
	tests: [],
};

export default sequentialDemuxFloat;

import { ExampleModule } from '../../../packages/editor/src/state/types';

const strumFloat: ExampleModule = {
	title: 'Strum (Float)',
	author: 'Andor Polgar',
	category: 'Sequencers',
	code: `module strum

float* bufferIn
int* lengthIn
int* trigger
int* clock
float out
int trigOut
int counter 10000

; Reset counter on trig
push *trigger
risingEdge
if void
 push &counter
 push 0
 store
end

push *clock
risingEdge
if void
 push counter
 push *lengthIn
 lessThan
 if void
  push &out
  
  ; Calculate address
  push bufferIn
  push counter
  push WORD_SIZE
  mul
  add
  
  loadFloat
  store

  ; Increment counter
  push &counter
  push counter
  push 1 
  add
  store
  
  push &trigOut
  push 1
  store
 end
else
 push &trigOut
 push 0
 store
end

end`,
	tests: [],
};

export default strumFloat;

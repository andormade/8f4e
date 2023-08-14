import { ExampleModule } from '../../../packages/editor/src/state/types';

const reverseBufferFloat: ExampleModule = {
	title: 'Buffer Reverser (Float)',
	author: 'Andor Polgar',
	category: 'Buffer',
	code: `module reverseBuffer

float* bufferIn
int* lengthIn
float[] buffer 16 ; max size
int length
int pointer

push &length
push *lengthIn
store

push &pointer
push 0
store

loop
 ; Guard
 push pointer
 push length
 greaterOrEqual
 branchIfTrue 1 
 
 ; Calculate destination
 ; address
 push &buffer
 push length
 push 1
 sub
 push pointer
 sub
 push WORD_SIZE
 mul
 add

 ; Calculate source
 ; address
 push bufferIn
 push pointer
 push WORD_SIZE
 mul
 add
 
 load ; value from src
 store ; value to dst
 
 ; Increment buffer pointer
 push &pointer
 push pointer
 push 1
 add
 store
end

end`,
	tests: [],
};

export default reverseBufferFloat;

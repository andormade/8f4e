import { ExampleModule } from '../../../packages/editor/src/state/types';

const bufferCopierInt: ExampleModule = {
	title: 'Buffer Copier (Int)',
	author: 'Andor Polgar',
	category: 'Buffer',
	code: `module copyBuffer

int* bufferIn
int* lengthIn
int[] buffer 16 ; max size
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
 push pointer
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
 
 ; =-=-=-=-=-=-=-=-=-=-=
 ; You can add code here
 ; that manipulates
 ; the values
 ; =-=-=-=-=-=-=-=-=-=-=

 store ; value to dst
 
 ; Increment buffer pointer
 push &pointer
 push pointer
 push 1
 add
 store
loopEnd

moduleEnd`,
	tests: [],
};

export default bufferCopierInt;

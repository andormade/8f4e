import { ExampleModule } from '../../../packages/editor/src/state/types';

const scope: ExampleModule = {
	title: 'Scope (Unsigned, Int, 0-255)',
	author: 'Andor Polgar',
	category: 'Debug Tools',
	code: `module scope

int* in
int[] buffer 64
int bufferPointer &buffer

plot buffer 0 255

push &bufferPointer
push bufferPointer
push WORD_SIZE
add
store

push bufferPointer
push buffer&
greaterThan
if void
 push &bufferPointer
 push &buffer
 store
end

push bufferPointer
push *in
store

moduleEnd`,
	tests: [],
};

export default scope;

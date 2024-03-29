import { ExampleModule } from '../../../packages/editor/src/state/types';

const clockDivider: ExampleModule = {
	title: 'Clock Divider',
	author: 'Andor Polgar',
	category: 'Clock',
	code: `module clockDiv

int default 16
int* divider &default
int* trigger
int out
int counter

push *trigger
risingEdge
if void
 push &counter
 push counter
 push 1
 add
 store 
ifEnd

push counter
push *divider
remainder
push 0
equal
if void
 push &out
 push *trigger
 store
else
 push &out
 push 0
 store
ifEnd

moduleEnd`,
	tests: [],
};

export default clockDivider;

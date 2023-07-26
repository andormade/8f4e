import { ExampleModule } from '../../../packages/editor/src/state/types';

const clockDivider: ExampleModule = {
	title: 'Clock Divider',
	author: 'Andor Polgar',
	category: 'Clock',
	code: `module clockDivider

int default 16
int* divider &default
int* trigger &pulse.out
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
end

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
end

end`,
	tests: [],
};

export default clockDivider;

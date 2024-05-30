import { moduleTester } from './testUtils';

moduleTester(
	'sub (int)',
	`module sub

int input1
int input2 
int output
    
push &output
push input1
push input2
sub
store
    
moduleEnd
`,
	[
		[{ input1: 2, input2: 2 }, { output: 0 }],
		[{ input1: -1, input2: 1 }, { output: -2 }],
		[{ input1: -69, input2: 0 }, { output: -69 }],
		[{ input1: 420, input2: 0 }, { output: 420 }],
	]
);

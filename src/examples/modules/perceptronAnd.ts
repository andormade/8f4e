import { ExampleModule } from '../../../packages/editor/src/state/types';

const perceptronAnd: ExampleModule = {
	author: 'Andor Polgar',
	category: 'Machine Learning',
	code: `module and
const weight1 0.369
const weight2 0.175
const bias -0.513

int* in1
int* in2

debug out

int out

push &out
push bias
push *in1
castToFloat
push weight1
mul
push *in2
castToFloat
push weight2
mul
add
add
push 0.0
greaterThan
if int
 push 1
else
 push 0
end
store

end`,
	tests: [],
	title: 'Perceptron (with AND gate training)',
};

export default perceptronAnd;

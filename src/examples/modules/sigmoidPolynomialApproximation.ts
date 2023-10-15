import { ExampleModule } from '../../../packages/editor/src/state/types';

const sigmoidPolynomialApproximation: ExampleModule = {
	author: 'Andor Polgar',
	category: 'Machine Learning',
	code: `module sigmoid
; Polynomial sigmoid 
; funtion approximation

float* in
float out

push &out
push *in
push *in
abs
push 1.0
add
div
store

end`,
	tests: [],
	title: 'Sigmoid Function (Polynomial Approximation)',
};

export default sigmoidPolynomialApproximation;

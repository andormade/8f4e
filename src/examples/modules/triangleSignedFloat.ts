import { ExampleModule } from '../../../packages/editor/src/state/types';

const triangleSignedFloat: ExampleModule = {
	title: 'Triangle (Signed, Float)',
	author: 'Andor Polgar',
	category: 'Oscillators',
	code: `module triangle

float default 1 ;Hz 
float* frequency &default
float out
float direction 1 

push &out
push out
push *frequency
push 2.0
mul
push SAMPLE_RATE
castToFloat
div
push direction
mul
add
store

push out
push 1.0
greaterThan
if void
 push &direction
 push -1.0
 store
ifEnd

push out
push -1.0
lessThan
if void
 push &direction
 push 1.0
 store
ifEnd

moduleEnd`,
	tests: [],
};

export default triangleSignedFloat;

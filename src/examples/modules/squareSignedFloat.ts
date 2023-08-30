import { ExampleModule } from '../../../packages/editor/src/state/types';

const squareSignedFloat: ExampleModule = {
	title: 'Square (Signed, Float)',
	author: 'Andor Polgar',
	category: 'Oscillators',
	code: `module square

float default 1 ;Hz 
float* frequency &default
float out
float counter
float direction 1 

push &counter 
push counter
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

push counter
push 1.0
greaterThan
if void
 push &direction
 push -1.0
 store
end

push counter
push -1.0
lessThan
if void
 push &direction
 push 1.0
 store
end

push counter
push 0.0
greaterThan
if void
 push &out
 push 1.0
 store
else
 push &out
 push -1.0
 store
end

end`,
	tests: [],
};

export default squareSignedFloat;

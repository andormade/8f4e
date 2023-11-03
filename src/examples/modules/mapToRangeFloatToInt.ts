import { ExampleModule } from '../../../packages/editor/src/state/types';

const mapToRangeFloatToInt: ExampleModule = {
	title: 'Map Signal to Range (Float to Int)',
	author: 'Andor Polgar',
	category: 'Utils',
	code: `module mapToRange

const IN_RANGE_MIN -1.0
const IN_RANGE_MAX 1.0
const OUT_RANGE_MIN 0.0
const OUT_RANGE_MAX 127.0

float* in
int out

push &out
push *in
push IN_RANGE_MIN
sub
push IN_RANGE_MAX
push IN_RANGE_MIN
sub
div
push OUT_RANGE_MAX
push OUT_RANGE_MIN
sub
mul
push OUT_RANGE_MIN
add
round
castToInt
store

moduleEnd`,
	tests: [],
};

export default mapToRangeFloatToInt;

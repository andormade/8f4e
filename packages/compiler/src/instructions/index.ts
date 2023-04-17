import _const from './const';
import load from './load';
import localGet from './localGet';
import localSet from './localSet';
import _else from './else';
import end from './end';
import store from './store';
import sub from './sub';
import _if from './if';
import lessThan from './lessThan';
import div from './div';
import and from './and';
import or from './or';
import xor from './xor';
import local from './local';
import greaterOrEqual from './greaterOrEqual';
import add from './add';
import greaterThan from './greaterThan';
import branch from './branch';
import branchIfTrue from './branchIfTrue';
import push from './push';
import block from './block';
import lessOrEqual from './lessOrEqual';
import mul from './mul';
import loop from './loop';
import loopEnd from './loopEnd';
import greaterOrEqualUnsigned from './greaterOrEqualUnsigned';
import equalToZero from './equalToZero';
import shiftRightUnsigned from './shiftRightUnsigned';
import shiftRight from './shiftRight';
import remainder from './remainder';
import _module from './module';
import global from './global';
import memory from './memory';
import castToInt from './castToInt';
import castToFloat from './castToFloat';
import skip from './skip';
import buffer from './buffer';
import drop from './drop';
import clearStack from './clearStack';
import risingEdge from './risingEdge';
import fallingEdge from './fallingEdge';

const instructions = {
	and,
	or,
	const: _const,
	load,
	localGet,
	localSet,
	else: _else,
	if: _if,
	lessThan,
	end,
	store,
	sub,
	div,
	xor,
	local,
	greaterOrEqual,
	add,
	greaterThan,
	branch,
	branchIfTrue,
	push,
	block,
	lessOrEqual,
	mul,
	loop,
	loopEnd,
	greaterOrEqualUnsigned,
	equalToZero,
	shiftRight,
	shiftRightUnsigned,
	remainder,
	module: _module,
	global,
	int: memory,
	float: memory,
	'int*': memory,
	'float*': memory,
	'float[]': buffer,
	'int[]': buffer,
	'float*[]': buffer,
	'int*[]': buffer,
	castToInt,
	castToFloat,
	skip,
	drop,
	clearStack,
	risingEdge,
	fallingEdge,
} as const;

export default instructions;

export type Instruction = keyof typeof instructions;

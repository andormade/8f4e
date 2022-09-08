import { I16_SIGNED_LARGEST_NUMBER, I16_SIGNED_SMALLEST_NUMBER } from '../consts';

const BUFFER_LENGTH = 49;

export default `
	private defaultValue 0
	inputPointer in defaultValue
	output out 0

	private counter 0
	private rate 0
	public bufferPointer buffer
	array buffer ${BUFFER_LENGTH} 0

	local _bufferPointer
	local _counter
	local _input

	push in
	localSet _input

	pushRef out
	push _input
	store

	push counter
	localSet _counter

	push _counter
	push rate
	greaterOrEqual
	if void
		pushRef counter
		push 0
		store
	else
		push _counter
		push 1
		add
		localSet _counter
		
		pushRef counter
		push _counter
		store
		branch 1
	end

	push bufferPointer
	localSet _bufferPointer

	push _bufferPointer
	push _input
	store

	# Increment the value of the the buffer pointer.
	push _bufferPointer
	push ${Int32Array.BYTES_PER_ELEMENT}
	add
	localSet _bufferPointer

	# Prevent the buffer pointer access out of bounds memory.
	push _bufferPointer
		pushRef buffer
			push ${BUFFER_LENGTH * Int32Array.BYTES_PER_ELEMENT}
		add
	greaterOrEqualUnsigned
	if void
		pushRef buffer
		localSet _bufferPointer
	end

	pushRef bufferPointer
	push _bufferPointer
	store
`;
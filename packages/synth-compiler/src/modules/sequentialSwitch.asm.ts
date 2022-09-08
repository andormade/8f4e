export default `
	private defaultValue 0
	output out 0
	inputPointer in:clock defaultValue
	private previousClock 0
	private counter 0
	inputPointer in:1 defaultValue
	inputPointer in:2 defaultValue
	inputPointer in:3 defaultValue
	inputPointer in:4 defaultValue

	local clock
	local _counter

	push counter
	localSet _counter

	push in:clock
	localSet clock

	push previousClock
	push clock
	greaterThan
	if void
		push _counter
		push 4
		add
		push 16
		remainder
		localSet _counter
	end

	pushRef previousClock
	push clock
	store

	pushRef out
	pushRef in:1
	push _counter
	add
	load
	load
	store

	pushRef counter
	push _counter
	store
`;
export default `
	# abs module

	# memory
	private DEFAULT_VALUE 0
	inputPointer in DEFAULT_VALUE
	output out 0

	# locals
	local input

	# code
	pushRef out
	push in
	localSet input
	push input
	push 0
	lessThan
	if 
		push 0
		push input
		sub
	else
		push input
	end
	store
`;

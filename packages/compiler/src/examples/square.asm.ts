export default `module square

int counter 0
int rate 0
int out 0

local int _counter
local int _output
local int _rate

push out
localSet _output

push counter
localSet _counter

push rate
localSet _rate

push _counter
push _rate
greaterOrEqual
if
 push _output
 equalToZero
 
 if
  push I16_SIGNED_LARGEST_NUMBER
 else
  push 0
 ifEnd
 localSet _output

 push 0

else
 push _counter
 push 1
 add
ifEnd

localSet _counter

push &out
push _output
store

push &counter
push _counter
store

moduleEnd`;

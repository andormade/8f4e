export default `module sampleAndHold

int defaultValue 0
int* in &defaultValue
int* in:trigger &defaultValue
int triggerPreviousValue 0
int out 0

local int triggerInput

push *in:trigger
localSet triggerInput

push triggerInput
push triggerPreviousValue
sub
push 1000
greaterOrEqual
if void
 push &out
 push *in
 store
ifEnd

push &triggerPreviousValue
push triggerInput
store

moduleEnd`;

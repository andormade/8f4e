export default `module bitwiseAnd
         ;  \\\\----.
int* in1 ; --+     '
int out  ;   )) xor |---
int* in2 ; --+     .
         ;  //----'

push &out
push *in1
push *in2
xor
store

end`;

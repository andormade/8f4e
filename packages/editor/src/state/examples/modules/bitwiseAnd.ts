export default `module bitwiseAnd
         ;   .----.
int* in1 ; --+     '
int out  ;   | and  |---
int* in2 ; --+     .
         ;   '----'

push &out
push *in1
push *in2
and
store

end`;

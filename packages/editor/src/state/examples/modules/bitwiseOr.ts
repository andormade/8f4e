export default `module bitwiseAnd
         ;   -----.
int* in1 ; --+     '
int out  ;   )  or  |---
int* in2 ; --+     .
         ;   -----'

push &out
push *in1
push *in2
or
store

end`;

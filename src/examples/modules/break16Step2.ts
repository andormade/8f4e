import { ExampleModule } from '../../../packages/editor/src/state/types';

const break16Step2: ExampleModule = {
	title: '16 Step Break 2',
	author: 'Andor Polgar',
	category: 'Break Beats',
	code: `module break

; MSb 0 kick
; 1 snare
; 2 closed hh
; 3 open hh

int step1  0b10100000
int step2  0b00000000
int step3  0b00100000
int tesp4  0b00000000
int step5  0b01100000
int step6  0b00000000
int step7  0b00100000
int step8  0b10100000
int step9  0b10100000
int step10 0b00000000
int step11 0b00010000
int step12 0b00000000
int step13 0b01100000
int step14 0b00000000
int step15 0b10100000
int last   0b00000000
`,
	tests: [],
};

export default break16Step2;

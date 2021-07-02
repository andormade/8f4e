export default [
	{ name: 'bank select' },
	{ name: 'modulation wheel' },
	{ name: 'breath controller' },
	{ name: 'undefined ' },
	{ name: 'foot controller' },
	{ name: 'portamento time' },
	{ name: 'data entry slider' },
	{ name: 'main volume' },
	{ name: 'balance' },
	{ name: 'undefined ' },
	{ name: 'pan position' },
	{ name: 'expression' },
	{ name: 'effect control 1' },
	{ name: 'effect control 2' },
	{ name: 'undefined ' },
	{ name: 'undefined ' },
	{ name: 'general purpose' },
	{ name: 'general purpose' },
	{ name: 'general purpose' },
	{ name: 'general purpose' },
	...new Array(12).fill({ name: 'undefined ' }),
	...new Array(32).fill(0).map((item, index) => ({ name: 'controller' + index })),
	{ name: 'hold pedal' },
	{ name: 'portamento' },
	{ name: 'sostenuto pedal' },
	{ name: 'soft pedal' },
	{ name: 'legato pedal' },
	{ name: 'hold 2 pedal' },
	{ name: 'sound variation' },
	{ name: 'resonance' },
	{ name: 'sound release time' },
	{ name: 'sound attack time' },
	{ name: 'frequency cutoff' },
	...new Array(5).fill(0).map((item, index) => ({ name: 'sound control' + index + 6 })),
	{ name: 'decay' },
	{ name: 'hi pass filter cutoff' },
	{ name: 'general purpose button 3' },
	{ name: 'general purpose button 4' },
	{ name: 'portamento amount' },
	...new Array(6).fill({ name: 'undefined ' }),
	{ name: 'reverb level' },
	{ name: 'tremolo level' },
	{ name: 'chorus level' },
	{ name: 'detune level' },
	{ name: 'phaser level' },
	{ name: 'data button increment' },
	{ name: 'data button decrement' },
	{ name: 'non-registered parameter' },
	{ name: 'non-registered parameter' },
	{ name: 'registered parameter' },
	{ name: 'registered parameter' },
	...new Array(18).fill({ name: 'undefined ' }),
	{ name: 'all sound off' },
	{ name: 'all controllers off' },
	{ name: 'local keyboard (on/off)' },
	{ name: 'all notes off' },
	{ name: 'omni mode off' },
	{ name: 'omni mode on' },
	{ name: 'mono operation' },
	{ name: 'poly mode' },
];

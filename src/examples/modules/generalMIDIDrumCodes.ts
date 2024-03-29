import { ExampleModule } from '../../../packages/editor/src/state/types';

const generalMIDIDrumCodes: ExampleModule = {
	title: 'General MIDI Drum Codes',
	author: 'Andor Polgar',
	category: 'MIDI',
	code: `module MIDIDrumCodes

const LASER 27
const WHIP 28
const SCRATCH_PUSH 29
const SCRATCH_PULL 30
const STICK_CLICK 31
const METRONOME_CLICK 32
const METRONOME_BELL 34
const BASS_DRUM 35
const KICK_DRUM 36
const SNARE_CROSS_STICK 37
const SNARE_DRUM 38
const HAND_CLAP 39
const ELECTRIC_SNARE_DRUM 40
const FLOOR_TOM_2 41
const HI_HAT_CLOSED 42
const FLOOR_TOM_1 43
const HI_HAT_FOOT 44
const LOW_TOM 45
const HI_HAT_OPEN 46
const LOW_MID_TOM 47
const HIGH_MID_TOM 48
const CRASH_CYMBAL 49
const HIGH_TOM 50
const RIDE_CYMBAL 51
const CHINA_CYMBAL 52
const RIDE_BELL 53
const TAMBOURINE 54
const SPLASH_CYMBAL 55
const COWBELL 56
const CRASH_CYMBAL_2 57
const VIBRASLAP 58
const RIDE_CYMBAL_2 59
const HIGH_BONGO 60
const LOW_BONGO 61
const CONGA_DEAD_STROKE 62
const CONGA 63
const TUMBA 64
const HIGH_TIMBALE 65
const LOW_TIMBALE 66
const HIGH_AGOGO 67
const LOW_AGOGO 68
const CABASA 69
const MARACAS 70
const WHISTLE_SHORT 71
const WHISTLE_LONG 72
const GUIRO_SHORT 73
const GUIRO_LONG 74
const CLAVES 75
const HIGH_WOODBLOCK 76
const LOW_WOODBLOCK 77
const CUICA_HIGH 78
const CUICA_LOW 79
const TRIANGLE_MUTE 80
const TRIANGLE_OPEN 81
const SHAKER 82
const SLEIGH_BELL 83
const BELL_TREE 84
const CASTANETS 85
const SURDU_DEAD_STROKE 86
const SURDU 87
const SNARE_DRUM_ROD 91
const OCEAN_DRUM 92
const SNARE_DRUM_BRUSH 93

moduleEnd`,
	tests: [],
};

export default generalMIDIDrumCodes;

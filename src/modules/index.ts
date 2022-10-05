import abs from './abs';
import adc16bit from './adc16bit';
import adc8bit from './adc8bit';
import attenuator from './attenuator';
import bitwiseAnd from './bitwiseAnd';
import bitwiseOr from './bitwiseOr';
import bitwiseXor from './bitwiseXor';
import square from './square';
import constant from './constant';
import cvToMidiCC from './cvToMidiCC';
import cvToMidiNote from './cvToMidiNote';
import invert from './invert';
import logicAnd from './logicAnd';
import logicNegate from './logicNegate';
import logicOr from './logicOr';
import logicXor from './logicXor';
import max from './max';
import midiNote from './midiNote';
import min from './min';
import mixer from './mixer';
import number from './number';
import offset from './offset';
import pianoQuantizer from './pianoQuantizer120';
import pianoQuantizer12 from './pianoQuantizer12';
import randomGenerator from './randomGenerator';
import sampleAndHold from './sampleAndHold';
import saw from './saw';
import scope from './scope';
import sequentialSwitch from './sequentialSwitch';
import splitter from './splitter';
import triggerGenerator from './triggerGenerator.asm';

import { ModuleTypeLookup } from '../state/types';

export default function generateModuleTypes(): ModuleTypeLookup {
	return {
		abs: abs(),
		adc16bit: adc16bit(),
		adc8bit: adc8bit(),
		attenuator: attenuator(),
		bitwiseAnd: bitwiseAnd(),
		bitwiseOr: bitwiseOr(),
		bitwiseXor: bitwiseXor(),
		square: square(),
		triggerGenerator: triggerGenerator(),
		constant: constant(),
		cvToMidiCC: cvToMidiCC(),
		cvToMidiNote: cvToMidiNote(),
		invert: invert(),
		logicAnd: logicAnd(),
		logicNegate: logicNegate(),
		logicOr: logicOr(),
		logicXor: logicXor(),
		max: max(),
		midiNote: midiNote(),
		min: min(),
		mixer: mixer(),
		number: number(),
		offset: offset(),
		pianoQuantizer: pianoQuantizer(),
		pianoQuantizer12: pianoQuantizer12(),
		randomGenerator: randomGenerator(),
		sampleAndHold: sampleAndHold(),
		saw: saw(),
		scope: scope(),
		sequentialSwitch: sequentialSwitch(),
		splitter: splitter(),
	};
}

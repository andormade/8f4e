import audioBufferOut from './audioBufferOut';
import midiCodes from './midiCodes';
import quantizer from './quantizer';
import binaryGateSequencer from './binaryGateSequencer';
import midiNoteOut from './midiNoteOut';
import midiCCOut from './midiCCOut';
import generalMIDIDrumCodes from './generalMIDIDrumCodes';
import bitwiseAnd from './bitwiseAnd';
import bitwiseOr from './bitwiseOr';
import bitwiseXor from './bitwiseXor';
import break16Step1 from './break16Step1';
import break16Step2 from './break16Step2';
import decToBin8bitMSb from './decToBin8bitMSb';
import amenBreak64Step from './amenBreak64Step';
import clockDivider from './clockDivider';
import sineLookupTable from './sineLookupTable';
import sawSignedFloat from './sawSignedFloat';
import sawUnsignedFloat from './sawUnsigned8bitInt';
import squareSignedFloat from './squareSignedFloat';
import triangleSignedFloat from './triangleSignedFloat';
import scopeUnsignedInt from './scopeUnsignedInt';
import scopeSignedFloat from './scopeSignedFloat';
import binSwitchesLSb from './binSwitchesLSb';
import binSwitchesMSb from './binSwitchesMSb';
import switchGatesInt from './switchGatesInt';
import switchGatesFloat from './switchGatesFloat';
import mulFloat from './multipleFloat';
import mulInt from './multipleInt';
import sequentialDemuxFloat from './sequentialDemuxFloat';
import sequentialDemuxInt from './sequentialDemuxInt';
import sequentialMuxFloat from './sequentialMuxFloat';
import sequentialMuxInt from './sequentialMuxInt';
import sequencerFloat from './sequencerFloat';
import sequencerInt from './sequencerInt';
import shiftRegisterInt from './shiftRegisterInt';
import shiftRegisterFloat from './shiftRegisterFloat';
import binaryShiftRegister from './binaryShiftRegister';
import linearCongruentialGenerator from './linearCongruentialGenerator';
import peakHolderNegativeFloat from './peakHolderNegativeFloat';
import XORShift from './XORShift';
import midiPianoKeyboardC3 from './midiPianoKeyboardC3';
import bufferCombinerFloat from './bufferCombinerIntFloat';
import bufferCombinerInt from './bufferCombinerInt';
import bufferCopierFloat from './bufferCopierFloat';
import bufferCopierInt from './bufferCopierInt';
import bufferReverserFloat from './bufferReverserFloat';
import bufferReverserInt from './bufferReverserInt';
import bufferReplicatorWithOffsetInt from './bufferReplicatorWithOffsetInt';
import bufferReplicatorWithOffsetFloat from './bufferReplicatorWithOffsetIntFloat';
import bufferIntToFloat from './bufferIntToFloat';
import bufferFloatToInt from './bufferFloatToInt';
import sampleAndHoldFloat from './sampleAndHoldFloat';
import sampleAndHoldInt from './sampleAndHoldInt';
import masterClock from './masterClock';
import changeDetectorInt from './changeDetectorInt';
import midiFrequenciesLookupTable from './midiFrequenciesLookupTable';
import mapToRangeInt from './mapToRangeInt';
import mapToRangeFloat from './mapToRangeFloat';
import mapToRangeFloatToInt from './mapToRangeFloatToInt';
import mapToVariableRangeFloat from './mapToVariableRangeFloat';
import strumFloat from './strumFloat';
import perceptronAnd from './perceptronAnd';
import perceptronOr from './perceptronOr';
import expLookupTable from './expLookupTable';
import sigmoidPolynomialApproximation from './sigmoidPolynomialApproximation';
import perceptron from './perceptron';
import pcmLooper from './pcmLooper';
import lowPassFilter from './lowPassFilter';
import pcmLooperV16bitSigned from './pcmLooperV16bitSigned';
import pcmLooperVR16bitSigned from './pcmLooperVR16bitSigned';
import pcmLooperVRP16bitSigned from './pcmLooperVRP16bitSigned';
import bpmClock from './bpmClock';
import reverb from './reverb';
import delay from './delay';

const modules = {
	audioBufferOut,
	midiCodes,
	quantizer,
	binaryGateSequencer,
	midiNoteOut,
	midiCCOut,
	generalMIDIDrumCodes,
	bitwiseAnd,
	bitwiseOr,
	bitwiseXor,
	break16Step1,
	break16Step2,
	decToBin8bitMSb,
	amenBreak64Step,
	clockDivider,
	sineLookupTable,
	sawSignedFloat,
	sawUnsignedFloat,
	squareSignedFloat,
	triangleSignedFloat,
	scopeUnsignedInt,
	scopeSignedFloat,
	binSwitchesLSb,
	binSwitchesMSb,
	switchGatesInt,
	switchGatesFloat,
	mulFloat,
	mulInt,
	sequentialDemuxFloat,
	sequentialDemuxInt,
	sequentialMuxFloat,
	sequentialMuxInt,
	sequencerFloat,
	sequencerInt,
	shiftRegisterInt,
	shiftRegisterFloat,
	binaryShiftRegister,
	linearCongruentialGenerator,
	peakHolderNegativeFloat,
	XORShift,
	midiPianoKeyboardC3,
	bufferCombinerFloat,
	bufferCombinerInt,
	bufferCopierFloat,
	bufferCopierInt,
	bufferReverserFloat,
	bufferReverserInt,
	bufferReplicatorWithOffsetInt,
	bufferReplicatorWithOffsetFloat,
	bufferIntToFloat,
	bufferFloatToInt,
	sampleAndHoldFloat,
	sampleAndHoldInt,
	masterClock,
	changeDetectorInt,
	midiFrequenciesLookupTable,
	mapToRangeFloat,
	mapToRangeInt,
	mapToRangeFloatToInt,
	mapToVariableRangeFloat,
	strumFloat,
	perceptronAnd,
	perceptronOr,
	expLookupTable,
	sigmoidPolynomialApproximation,
	perceptron,
	pcmLooper,
	lowPassFilter,
	pcmLooperV16bitSigned,
	pcmLooperVR16bitSigned,
	pcmLooperVRP16bitSigned,
	bpmClock,
	reverb,
	delay,
} as const;

export default modules;

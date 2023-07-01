import { Instruction, instructionParser } from '@8f4e/compiler';

import { ExtendedInstructionSet } from '../types';

const commentParser = /^\s*;(.+)$/;
const scopeParser = /^\s*scope\s*(\S*)\s*(\S*)\s*(\S*)\s*$/;

export function parseInputs(code: string[]): Array<{ id: string; lineNumber: number }> {
	return code.reduce((acc, line, index) => {
		const [, instruction, ...args] = (line.match(instructionParser) ?? []) as [never, Instruction, string, string];

		if (instruction === 'int*' || instruction === 'float*') {
			return [...acc, { id: args[0], lineNumber: index }];
		}
		return acc;
	}, []);
}

export function parseOutputs(code: string[]): Array<{ id: string; lineNumber: number }> {
	return code.reduce((acc, line, index) => {
		const [, instruction, ...args] = (line.match(instructionParser) ?? []) as [never, Instruction, string, string];

		if (instruction === 'int' || instruction === 'float') {
			return [...acc, { id: args[0], lineNumber: index }];
		}
		return acc;
	}, []);
}

export function parseSwitches(
	code: string[]
): Array<{ id: string; lineNumber: number; onValue: number; offValue: number }> {
	return code.reduce((acc, line, index) => {
		const [, instruction, ...args] = (line.match(instructionParser) ?? []) as [
			never,
			Instruction | ExtendedInstructionSet,
			string,
			string,
			string
		];

		if (instruction === 'switch') {
			return [
				...acc,
				{ id: args[0], lineNumber: index, onValue: parseInt(args[2], 10) || 1, offValue: parseInt(args[1], 10) || 0 },
			];
		}
		return acc;
	}, []);
}

export function parseDebuggers(code: string[]): Array<{ id: string; lineNumber: number }> {
	return code.reduce((acc, line, index) => {
		const [, instruction, ...args] = (line.match(instructionParser) ?? []) as [
			never,
			Instruction | ExtendedInstructionSet,
			string,
			string
		];

		if (instruction === 'debug') {
			return [...acc, { id: args[0], lineNumber: index }];
		}
		return acc;
	}, []);
}

export function parseButtons(
	code: string[]
): Array<{ id: string; lineNumber: number; onValue: number; offValue: number }> {
	return code.reduce((acc, line, index) => {
		const [, instruction, ...args] = (line.match(instructionParser) ?? []) as [
			never,
			Instruction | ExtendedInstructionSet,
			string,
			string,
			string
		];

		if (instruction === 'button') {
			return [
				...acc,
				{ id: args[0], lineNumber: index, onValue: parseInt(args[2], 10) || 1, offValue: parseInt(args[1], 10) || 0 },
			];
		}
		return acc;
	}, []);
}

export function parseScopes(
	code: string[]
): Array<{ id: string; lineNumber: number; minValue: number; maxValue: number }> {
	return code.reduce((acc, line, index) => {
		const [, comment] = (line.match(commentParser) ?? []) as [never, string];

		if (comment && comment.includes('scope')) {
			const [, memoryToDebug, minValue, maxValue] = (comment.match(scopeParser) ?? []) as [
				never,
				string,
				string,
				string
			];
			return [
				...acc,
				{
					id: memoryToDebug,
					lineNumber: index,
					minValue: parseInt(minValue) || 0,
					maxValue: parseInt(maxValue) || 100,
				},
			];
		}
		return acc;
	}, []);
}

export function getLastMemoryInstructionLine(code: string[]): number {
	// @ts-ignore
	return code.findLastIndex(line => {
		return /^\s*memory/.test(line);
	});
}

export function getLongestLineLength(code: string[]): number {
	return code.reduce((longestLength, line) => (line.length > longestLength ? line.length : longestLength), 0);
}

export function getModuleId(code: string[]): string {
	for (let i = 0; i < code.length; i++) {
		const [, instruction, ...args] = code[i].match(/\s*(\S+)\s*(\S*)\s*(\S*)\s*(\S*)/) || [];
		if (instruction === 'module') {
			return args[0] || '';
		}
	}
	return '';
}

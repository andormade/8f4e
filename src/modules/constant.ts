import { I16_SIGNED_LARGEST_NUMBER, I16_SIGNED_SMALLEST_NUMBER } from '@8f4e/compiler';

import singleSliderModule from './templates/singleSliderModule';
import source, { extractState, insertState } from './engines/constant.asm';

import { ModuleType, SliderChangeHandler } from '../state/types';

const onChange: SliderChangeHandler = function (module, memoryBuffer, memoryAddressLookup, movement, slider) {
	let { out } = extractState(memoryBuffer, memoryAddressLookup.get(module.id + '__startAddress'));
	out = Math.min(Math.max(slider.minValue, out + movement * -1 * slider.resolution), slider.maxValue);
	insertState({ out }, memoryBuffer, memoryAddressLookup.get(module.id + '__startAddress'));
};

export default function constant(): ModuleType {
	return {
		...singleSliderModule({
			id: 'out',
			minValue: I16_SIGNED_SMALLEST_NUMBER,
			maxValue: I16_SIGNED_LARGEST_NUMBER,
			resolution: 100,
			onChange,
		}),
		buttons: [],
		category: 'Other',
		engine: { source },
		initialState: { out: 0 },
		inputs: [],
		name: 'Constant',
		insertState,
		extractState,
	};
}

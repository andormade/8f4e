import { ModuleGeneratorProps, ModuleType, SliderChangeHandler } from '../state/types';
import singleSliderModule from './templates/singleSliderModule';
import { extractState, insertState } from 'compiler/modules/attenuator';

const onChange: SliderChangeHandler = function (module, memoryBuffer, memoryAddressLookup, movement, slider) {
	let { divisor } = extractState(memoryBuffer, memoryAddressLookup[module.id].__startAddress);
	divisor = Math.min(Math.max(slider.minValue, divisor + movement * -1 * slider.resolution), slider.maxValue);
	insertState({ divisor }, memoryBuffer, memoryAddressLookup[module.id].__startAddress);
};

export default function attenuator(props: ModuleGeneratorProps): ModuleType {
	return {
		...singleSliderModule(props, { id: 'divisor', minValue: 1, maxValue: 100, resolution: 1, onChange }),
		category: 'Other',
		engine: { name: 'attenuator', config: {} },
		initialState: {
			divisor: 1,
		},
		insertState,
		name: 'Attenuator',
		extractState,
	};
}

import findModuleControllerAtViewportCoordinates from '../../helpers/findModuleControllerAtViewportCoordinates';
import { State } from '../../types';

export default function moduleSwitches(state: State, events): void {
	function onModuleClick({ x, y, module }) {
		const stepper = findModuleControllerAtViewportCoordinates(
			state.viewport,
			module,
			state.moduleTypes,
			'steppers',
			x,
			y
		);

		if (stepper) {
			let newValue = module.config[stepper.id];

			if (stepper.y + module.y + state.viewport.y + 10 < y) {
				newValue--;
			} else {
				newValue++;
			}

			module.config[stepper.id] = Math.min(Math.max(newValue, stepper.minValue), stepper.maxValue);

			const address =
				state.compiler.outputAddressLookup[module.id + '_' + stepper.id] /
				state.compiler.memoryBuffer.BYTES_PER_ELEMENT;
			state.compiler.memoryBuffer[address] = module.config[stepper.id];
		}
	}

	events.on('moduleClick', onModuleClick);
}

import { EventDispatcher } from '../../../events';
import findSwitchAtViewportCoordinates from '../../helpers/findSwitchAtViewportCoordinates';
import { State } from '../../types';

export default function _switch(state: State, events: EventDispatcher): () => void {
	const onModuleClick = function ({ x, y, module }) {
		// const relativeX = Math.abs(module.x - (x - state.viewport.x));
		// const relativeY = Math.abs(module.y - (y - state.viewport.y));

		const _switch = findSwitchAtViewportCoordinates(state.graphicHelper, module, x, y);

		if (!_switch) {
			return;
		}

		const memory = state.compiler.compiledModules.get(module.id)?.memoryMap.get(_switch.id);

		if (!memory) {
			return;
		}
		const value = state.compiler.memoryBuffer[memory.wordAddress];

		if (value === _switch.offValue) {
			state.compiler.memoryBuffer[memory.wordAddress] = _switch.onValue;
		} else if (value === _switch.onValue) {
			state.compiler.memoryBuffer[memory.wordAddress] = _switch.offValue;
		} else {
			state.compiler.memoryBuffer[memory.wordAddress] = _switch.offValue;
		}
	};

	events.on('moduleClick', onModuleClick);

	return () => {
		events.off('moduleClick', onModuleClick);
	};
}

import { State } from '../../types';

export default function moduleCreator(state: State, events): void {
	function onAddModule({ x, y, type }) {
		x = x - state.viewport.x - Math.floor(state.moduleTypes[type].width / 2);
		y = y - state.viewport.y - Math.floor(state.moduleTypes[type].height / 2);

		state.modules.push({
			engine: { name: state.moduleTypes[type].engine.name, config: { ...state.moduleTypes[type].engine.config } },
			id: type + state.modules.length,
			state: { ...state.moduleTypes[type].initialState },
			type,
			x,
			y,
		});
	}

	function onDeleteModule({ moduleId }) {
		events.dispatch('deleteConnection', { moduleId, replaceHistory: true });
		state.modules.splice(
			state.modules.findIndex(({ id }) => id === moduleId),
			1
		);
	}

	events.on('addModule', onAddModule);
	events.on('deleteModule', onDeleteModule);
}

const trackedEvents = ['deleteConnection', 'createConnection', 'deleteModule', 'addModule'];

const history = function (state, events) {
	const onHistoricEvent = event => {
		if (event.replaceHistory) {
			return;
		}

		state.history.push({
			modules: [...state.ui.modules],
			connections: [...state.ui.connections],
		});
	};

	const onUndo = () => {
		const prevState = state.history.pop();

		if (!prevState) {
			return;
		}

		const { modules, connections } = prevState;
		state.ui.modules = modules;
		state.ui.connections = connections;
	};

	trackedEvents.forEach(event => {
		events.on(event, onHistoricEvent);
	});

	events.on('undo', onUndo);
};

export default history;
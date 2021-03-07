const contextMenu = function (state, events) {
	const onModuleMenu = event => {
		const { y } = event;

		state.ui.contextMenu.highlightedItem = 0;
		state.ui.contextMenu.y = y;
		state.ui.contextMenu.open = true;

		state.ui.contextMenu.items = [
			{ title: 'Abs', action: 'addModule', payload: { type: 'abs' }, close: true },
			{ title: 'And', action: 'addModule', payload: { type: 'and' }, close: true },
			{ title: 'Attenuator', action: 'addModule', payload: { type: 'attenuator' }, close: true },
			{ title: 'CV2Midi', action: 'addModule', payload: { type: 'cvToMidi' }, close: true },
			{ title: 'Clock generator', action: 'addModule', payload: { type: 'clockGenerator' }, close: true },
			{ title: 'Constant', action: 'addModule', payload: { type: 'constant' }, close: true },
			{ title: 'Invert', action: 'addModule', payload: { type: 'invert' }, close: true },
			{ title: 'Mixer', action: 'addModule', payload: { type: 'mixer' }, close: true },
			{ title: 'Negate', action: 'addModule', payload: { type: 'negate' }, close: true },
			{ title: 'Offset', action: 'addModule', payload: { type: 'offset' }, close: true },
			{ title: 'Or', action: 'addModule', payload: { type: 'or' }, close: true },
			{ title: 'Quantizer', action: 'addModule', payload: { type: 'quantizer' }, close: true },
			{ title: 'Random generator', action: 'addModule', payload: { type: 'randomGenerator' }, close: true },
			{ title: 'Saw', action: 'addModule', payload: { type: 'saw' }, close: true },
			{ title: 'Scope', action: 'addModule', payload: { type: 'scope' }, close: true },
			{ title: 'Sequential switch', action: 'addModule', payload: { type: 'sequentialSwitch' }, close: true },
			{ title: 'Splitter', action: 'addModule', payload: { type: 'splitter' }, close: true },
			{ title: 'Swtich', action: 'addModule', payload: { type: 'switch' }, close: true },
			{ title: 'Triangle', action: 'addModule', payload: { type: 'triangle' }, close: true },
			{ title: 'Xor', action: 'addModule', payload: { type: 'xor' }, close: true },
		];
	};

	events.on('openModuleMenu', onModuleMenu);

	return () => {
		events.off('openModuleMenu', onModuleMenu);
	};
};

export default contextMenu;

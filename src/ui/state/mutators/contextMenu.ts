const getHighlightedMenuItem = function (x, y, itemHeight, width) {
	if (x < 0 || x > width || y < 0) {
		return Infinity;
	}
	return Math.floor(y / itemHeight);
};

const contextMenu = function (state, events) {
	state.ui.contextMenu = {
		open: false,
		items: [],
		itemHeight: 20,
		itemWidth: 200,
		highlightedItem: 0,
	};

	const onMouseMove = event => {
		const { itemHeight, itemWidth, x, y } = state.ui.contextMenu;
		state.ui.contextMenu.highlightedItem = getHighlightedMenuItem(event.x - x, event.y - y, itemHeight, itemWidth);
	};

	const onMouseDown = event => {
		const { highlightedItem, items } = state.ui.contextMenu;

		if (items[highlightedItem]) {
			events.dispatch(items[highlightedItem].action, {
				...items[highlightedItem].payload,
				x: event.x,
				y: event.y,
			});
		}

		state.ui.contextMenu.open = false;

		events.off('mousedown', onMouseDown);
		events.off('mousemove', onMouseMove);
	};

	const onContextMenu = event => {
		const { x, y } = event;

		state.ui.contextMenu.open = true;
		state.ui.contextMenu.x = x;
		state.ui.contextMenu.y = y;

		const module = state.ui.modules.find(module => {
			const { width, height } = state.ui.moduleTypes[module.type];
			return (
				x >= module.x + state.ui.viewport.x &&
				x <= module.x + width + state.ui.viewport.x &&
				y >= module.y + state.ui.viewport.y &&
				y <= module.y + height + state.ui.viewport.y
			);
		});

		if (module) {
			state.ui.contextMenu.items = [
				{ title: 'Delete module', action: 'deleteModule', payload: { moduleId: module.id } },
				{ title: 'Close', action: 'closeContextMenu' },
			];
		} else {
			state.ui.contextMenu.items = [
				{ title: 'Add module', action: 'addModule', payload: { type: 'splitter' } },
				{ title: 'Close', action: 'closeContextMenu' },
			];
		}

		events.on('mousedown', onMouseDown);
		events.on('mousemove', onMouseMove);
	};

	events.on('contextmenu', onContextMenu);

	return () => {
		events.off('contextmenu', onContextMenu);
	};
};

export default contextMenu;

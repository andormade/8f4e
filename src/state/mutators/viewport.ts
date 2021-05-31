export default function viewport(state, events) {
	const onMouseMove = event => {
		if (event.buttons === 1) {
			state.ui.viewport.x += event.movementX;
			state.ui.viewport.y += event.movementY;
		}
	};

	const onResize = () => {
		state.ui.viewport.width = window.innerWidth;
		state.ui.viewport.height = window.innerHeight;
	};

	onResize();

	events.on('mousemove', onMouseMove);
	events.on('resize', onResize);

	return () => {
		events.off('mousemove', onMouseMove);
		events.off('resize', onResize);
	};
}

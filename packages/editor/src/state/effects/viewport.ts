import { State } from '../types';
import { move, resize, snapToGrid } from '../mutators/viewport';
import { EventDispatcher } from '../../events';

export default function viewport(state: State, events: EventDispatcher): () => void {
	function onMouseMove(event) {
		if (event.buttons === 1) {
			move(state, event.movementX, event.movementY);
		}
	}

	function onResize(event) {
		resize(state, event.canvasWidth, event.canvasHeight);
	}

	function onMouseUp() {
		snapToGrid(state);
	}

	events.on('mousemove', onMouseMove);
	events.on('resize', onResize);
	events.on('mouseup', onMouseUp);

	return () => {
		events.off('mousemove', onMouseMove);
		events.off('resize', onResize);
		events.off('mouseup', onMouseUp);
	};
}

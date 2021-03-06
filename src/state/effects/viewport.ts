import { State } from '../types';
import { resize, move } from '../mutators/viewport';
import { EventDispatcher } from '../../events';

export default function viewport(state: State, events: EventDispatcher): () => void {
	function onMouseMove(event) {
		if (event.buttons === 1) {
			move(state, event.movementX, event.movementY);
		}
	}

	function onResize() {
		resize(state, window.innerWidth, window.innerHeight);
	}

	onResize();

	events.on('mousemove', onMouseMove);
	events.on('resize', onResize);

	return () => {
		events.off('mousemove', onMouseMove);
		events.off('resize', onResize);
	};
}

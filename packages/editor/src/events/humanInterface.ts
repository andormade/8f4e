import { EventDispatcher } from '.';

export interface InternalMouseEvent {
	x: number;
	y: number;
	movementX: number;
	movementY: number;
	buttons: number;
	stopPropagation: boolean;
	canvasWidth: number;
	canvasHeight: number;
}

export interface InternalKeyboardEvent {
	key: string;
}

export default function humanInterface(element: HTMLElement, events: EventDispatcher) {
	function onKeyboardEvents(event: KeyboardEvent) {
		const { key, type } = event;

		event.preventDefault();

		events.dispatch<InternalKeyboardEvent>(type, {
			key,
		});
	}

	let prevEvent = {
		offsetX: 0,
		offsetY: 0,
	};

	function onMouseEvents(event: MouseEvent) {
		const movementX = event.offsetX - prevEvent.offsetX;
		const movementY = event.offsetY - prevEvent.offsetY;
		prevEvent = event;

		const { offsetX, offsetY, type, buttons } = event;

		event.preventDefault();

		const eventObject = {
			x: offsetX,
			y: offsetY,
			movementX,
			movementY,
			buttons,
			stopPropagation: false,
			canvasWidth: element.clientWidth,
			canvasHeight: element.clientHeight,
		};

		events.dispatch<InternalMouseEvent>(type, eventObject);
	}

	window.addEventListener('keyup', onKeyboardEvents);
	window.addEventListener('keydown', onKeyboardEvents);
	element.addEventListener('mouseup', onMouseEvents);
	element.addEventListener('mousedown', onMouseEvents);
	element.addEventListener('mousemove', onMouseEvents);
	element.addEventListener('contextmenu', onMouseEvents);
}

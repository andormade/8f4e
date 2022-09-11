import { EventDispatcher } from '../../events';
import { State } from '../types';

export default async function midi(state: State, events: EventDispatcher): Promise<void> {
	let selectedPort;
	let midiAccess;

	function onMidiAccess(access) {
		midiAccess = access;

		access.outputs.forEach(port => {
			state.midi.ports.push({ id: port.id, name: port.name, manufacturer: port.manufacturer });
			selectedPort = port;
			events.dispatch('midiPortConnected');
		});
	}

	function onSelectMidiOutput({ id }) {
		selectedPort = midiAccess.outputs.forEach(function (port) {
			if (port.id === id) {
				selectedPort = port;
			}
		});
	}

	function onSendMidiMessage({ message, delay }) {
		if (selectedPort) {
			selectedPort.send(message, delay);
		}
	}

	// @ts-ignore
	navigator.requestMIDIAccess().then(onMidiAccess);
	events.on('selectMidiOutput', onSelectMidiOutput);
	events.on('sendMidiMessage', onSendMidiMessage);
}

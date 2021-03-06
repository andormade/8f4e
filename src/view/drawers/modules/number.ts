import { Engine } from '2d-engine';
import { font } from 'sprite-generator';
import { State } from '../../../state/types';

export default function drawer(engine: Engine, state: State, id: string): void {
	const address = state.compiler.memoryAddressLookup[id]['out:1'] / state.compiler.memoryBuffer.BYTES_PER_ELEMENT;

	if (!address) {
		return;
	}

	const value = state.compiler.memoryBuffer[address];

	engine.setSpriteLookup(font('small_white'));
	engine.drawText(state.viewport.vGrid, state.viewport.hGrid * 3, `${value}`);
}

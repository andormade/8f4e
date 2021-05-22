import { modules, feedbackScale, font, fillColor } from '../../../../packages/sprite-generator/src';
import scope from './scope';
import number from './number';
import midiNote from './midiNote';
import pianoQuantizer from './pianoQuantizer';
import * as moduleTypes from '../../../modules';

const drawModules = function (engine, state) {
	const { vGrid, hGrid, x: offsetX, y: offsetY, viewPortWidth, viewPortHeight } = state.ui.viewport;

	engine.startGroup(offsetX, offsetY);

	for (let i = 0; i < state.ui.modules.length; i++) {
		const { x, y, type, id, config, row, col } = state.ui.modules[i];
		const { width, height, name, inputs, outputs, switches, sliders, steppers } = moduleTypes[type];

		if (
			x + offsetX > -1 * width * vGrid &&
			y + offsetY > -1 * height * hGrid &&
			x + offsetX < state.ui.viewport.width &&
			y + offsetY < state.ui.viewport.height
		) {
			engine.startGroup(col * vGrid, row * hGrid);
			engine.setSpriteLookup(modules);
			engine.drawSprite(0, 0, type, width * vGrid, height * hGrid);

			if (type === 'scope') {
				scope(engine, state, id);
			}

			engine.setSpriteLookup(font('small_white'));
			engine.drawText(5, 5, name);

			for (let i = 0; i < inputs.length; i++) {
				const connector = inputs[i];

				if (typeof state.ui.compiler.outputAddressLookup[id + '_' + connector.id] !== 'undefined') {
					const connectorAddress = state.ui.compiler.outputAddressLookup[id + '_' + connector.id];
					const value =
						state.ui.compiler.memoryBuffer[connectorAddress / state.ui.compiler.memoryBuffer.BYTES_PER_ELEMENT];

					engine.setSpriteLookup(fillColor);
					engine.drawRectangle(connector.x, connector.y, 10, 10, 'rgb(153,153,153)');

					engine.setSpriteLookup(font('small_white'));
					//const offset = connector.isInput ? 15 : (connector.label || connector.id).length * -7;
					engine.drawText(1 * vGrid, (i + 1) * hGrid, connector.label || connector.id);
				}
			}

			for (let i = 0; i < outputs.length; i++) {
				const connector = outputs[i];

				if (typeof state.ui.compiler.outputAddressLookup[id + '_' + connector.id] !== 'undefined') {
					const connectorAddress = state.ui.compiler.outputAddressLookup[id + '_' + connector.id];
					const value =
						state.ui.compiler.memoryBuffer[connectorAddress / state.ui.compiler.memoryBuffer.BYTES_PER_ELEMENT];

					engine.setSpriteLookup(feedbackScale);
					engine.drawSprite(connector.x, connector.y, value, 10, 10);

					engine.setSpriteLookup(font('small_white'));
					//const offset = connector.isInput ? 15 : (connector.label || connector.id).length * -7;
					engine.drawText(1 * vGrid, (i + 1) * hGrid, connector.label || connector.id);
				}
			}

			for (let i = 0; i < sliders.length; i++) {
				const slider = sliders[i];
				engine.setSpriteLookup(fillColor);
				engine.drawRectangle(slider.x, slider.y, slider.width, slider.height, 'rgb(255,255,255)');

				const address =
					state.ui.compiler.outputAddressLookup[id + '_' + slider.id] /
					state.ui.compiler.memoryBuffer.BYTES_PER_ELEMENT;
				const value = state.ui.compiler.memoryBuffer[address];
				const offset = (value / slider.maxValue) * slider.height;
				engine.drawSprite(slider.x, slider.y + (slider.height - offset), 'rgb(255,255,255)', slider.width, offset);
				engine.setSpriteLookup(font('small_white'));
				engine.drawText(slider.x, slider.y, '' + value / slider.resolution);
			}

			for (let i = 0; i < steppers.length; i++) {
				const stepper = steppers[i];
				engine.setSpriteLookup(fillColor);
				engine.drawRectangle(stepper.x, stepper.y, stepper.width, stepper.height / 2, 'rgb(255,255,255)');
				engine.drawRectangle(
					stepper.x,
					stepper.y + stepper.height / 2,
					stepper.width,
					stepper.height / 2,
					'rgb(255,255,255)'
				);

				const address =
					state.ui.compiler.outputAddressLookup[id + '_' + stepper.id] /
					state.ui.compiler.memoryBuffer.BYTES_PER_ELEMENT;
				const value = state.ui.compiler.memoryBuffer[address];

				//console.log(state.ui.compiler.outputAddressLookup[id + '_' + stepper.id]);

				engine.setSpriteLookup(font('small_white'));
				engine.drawText(stepper.x + 12, stepper.y, '' + value);
			}

			if (type === 'number') {
				number(engine, state, id);
			}

			if (type === 'midiNote') {
				midiNote(engine, state, id);
			}

			if (type === 'pianoQuantizer' || type == 'arpeggiator') {
				pianoQuantizer(engine, config);
			}

			// for (let i = 0; i < switches.length; i++) {
			// 	const _switch = switches[i];
			// 	engine.setSpriteLookup(fillColor);
			// 	if (config[_switch.id] === _switch.onValue) {
			// 		engine.drawRectangle(_switch.x, _switch.y, _switch.width, _switch.height, 'rgb(255,0,0)');
			// 	} else {
			// 		engine.drawRectangle(_switch.x, _switch.y, _switch.width, _switch.height, 'rgb(153,0,0)');
			// 	}
			// }

			engine.endGroup();
		}
	}

	engine.endGroup();
};

export default drawModules;

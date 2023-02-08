import { Engine } from '@8f4e/2d-engine';
import { fillColor } from '@8f4e/sprite-generator';

import { HGRID, VGRID } from './consts';

import { State } from '../../state/types';

export default function drawConnections(engine: Engine, state: State): void {
	const connections = state.graphicHelper.connections;
	const modules = state.modules;

	engine.setSpriteLookup(fillColor);

	// for (let i = 0; i < connections.length; i++) {
	// 	const fromModule = modules.find(({ id }) => id === connections[i].fromModuleId);
	// 	const toModule = modules.find(({ id }) => id === connections[i].toModuleId);

	// 	const { x: fromX, y: fromY } = state.moduleTypes[fromModule.type].outputs.find(
	// 		({ id }) => id === connections[i].fromConnectorId
	// 	);
	// 	const { x: toX, y: toY } = state.moduleTypes[toModule.type].inputs.find(
	// 		({ id }) => id === connections[i].toConnectorId
	// 	);

	// 	engine.startGroup(state.viewport.x, state.viewport.y);
	// 	engine.drawLine(
	// 		fromX + fromModule.x + VGRID,
	// 		fromY + fromModule.y + HGRID / 2,
	// 		toX + toModule.x + VGRID,
	// 		toY + toModule.y + HGRID / 2,
	// 		'rgb(153,153,153)',
	// 		1
	// 	);
	// 	engine.endGroup();
	// }

	for (const { fromModule, toModule, toConnectorId, fromConnectorId } of connections) {
		const fromModuleGraphicData = state.graphicHelper.modules.get(fromModule)?.outputs.get(fromConnectorId);
		const toModuleGraphicData = state.graphicHelper.modules.get(toModule)?.inputs.get(toConnectorId);

		if (!fromModuleGraphicData || !toModuleGraphicData) {
			return;
		}

		const { x: fromX, y: fromY } = fromModuleGraphicData;
		const { x: toX, y: toY } = toModuleGraphicData;

		const xDistance = Math.floor(fromX + fromModule.x - (toX + toModule.x)) / 2;
		engine.startGroup(state.viewport.x, state.viewport.y);
		engine.drawLine(
			fromX + fromModule.x + VGRID,
			fromY + fromModule.y + HGRID / 2,
			toX + toModule.x + VGRID + xDistance,
			fromY + fromModule.y + HGRID / 2,
			'rgb(153,153,153)',
			1
		);
		engine.drawLine(
			fromX + fromModule.x + VGRID - xDistance,
			toY + toModule.y + HGRID / 2,
			toX + toModule.x + VGRID,
			toY + toModule.y + HGRID / 2,
			'rgb(153,153,153)',
			1
		);
		engine.drawLine(
			fromX + VGRID + fromModule.x - xDistance,
			fromY + fromModule.y + VGRID,
			toX + VGRID + toModule.x + xDistance,
			toY + toModule.y + VGRID,
			'rgb(153,153,153)',
			1
		);
		engine.endGroup();
	}

	if (state.isConnectionBeingMade && state.connectionPointA && state.connectionPointB) {
		engine.drawLine(...state.connectionPointA, ...state.connectionPointB, 'rgb(255,255,255)', 1);
	}
}

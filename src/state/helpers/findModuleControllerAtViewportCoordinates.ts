import { Module, Viewport } from '../types';
import * as moduleTypes from '../../modules';

export default function findModuleControllerAtViewportCoordinates(
	viewport: Viewport,
	module: Module,
	controllerType: string,
	x: number,
	y: number
) {
	const controllers = moduleTypes[module.type][controllerType];
	return controllers.find(controller => {
		const { width, height } = controller;
		return (
			x >= controller.x + module.x + viewport.x &&
			x <= controller.x + module.x + width + viewport.x &&
			y >= controller.y + module.y + viewport.y &&
			y <= controller.y + module.y + height + viewport.y
		);
	});
}

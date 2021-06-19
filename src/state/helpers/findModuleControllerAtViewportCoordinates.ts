import { Module, ModuleController, ModuleTypeLookup, Viewport } from '../types';

export default function findModuleControllerAtViewportCoordinates(
	viewport: Viewport,
	module: Module,
	moduleTypes: ModuleTypeLookup,
	controllerType: string,
	x: number,
	y: number
): ModuleController {
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

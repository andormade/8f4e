export enum Command {
	FILL_COLOR,
	RECTANGLE,
	TRANSLATE,
	SAVE,
	RESTORE,
	RESET_TRANSFORM,
	PIXEL,
}

export type DrawingCommand =
	| [command: Command.FILL_COLOR, fillColor: string]
	| [command: Command.RECTANGLE, x: number, y: number, width: number, height: number]
	| [command: Command.TRANSLATE, x: number, y: number]
	| [command: Command.PIXEL, x: number, y: number]
	| [command: Command.SAVE]
	| [command: Command.RESTORE]
	| [command: Command.RESET_TRANSFORM];

export interface ColorScheme {
	text: {
		lineNumber: string;
		instruction: string;
		codeComment: string;
		code: string;
		numbers: string;
		menuItemText: string;
		menuItemTextHighlighted: string;
	};
	fill: {
		menuItemBackground: string;
		menuItemBackgroundHighlighted: string;
		background: string;
		backgroundDots: string;
		moduleBackground: string;
		moduleBackgroundDragged: string;
		wire: string;
		errorMessageBackground: string;
	};
	icons: {
		inputConnector: string;
		outputConnector: string;
		inputConnectorBackground: string;
		outputConnectorBackground: string;
		feedbackScale: string[];
	};
}

export interface Config {
	colorScheme: ColorScheme;
}

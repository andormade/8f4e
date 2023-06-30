import { ColorScheme } from '@8f4e/sprite-generator';

const colorSchemes: Record<string, ColorScheme> = {
	default: {
		text: {
			lineNumber: 'rgba(51,51,51,255)',
			instruction: 'rgba(136,126,203,255)',
			codeComment: 'rgba(102,102,102,255)',
			code: 'rgba(255,255,255,255)',
			numbers: 'rgba(201,212,135,255)',
			menuItemText: 'rgba(255,255,255,255)',
			menuItemTextHighlighted: 'rgba(0,0,0,255)',
		},
		fill: {
			menuItemBackground: 'rgba(0,0,0,255)',
			menuItemBackgroundHighlighted: 'rgba(255,255,255,255)',
			background: '#000000',
			backgroundDots: '#444444',
			moduleBackground: '#000000',
			wire: '#ffffff',
			errorMessageBackground: '#cc0000',
		},
		icons: {
			outputConnectorBackground: '#003300',
			inputConnectorBackground: '#003300',
			inputConnector: '#ffffff',
			outputConnector: '#ffffff',
			feedbackScale: ['#ff0000', '#cc0033', '#990066', '#660099', '#3300cc', '#0000ff'],
		},
	},
	hackerman: {
		text: {
			lineNumber: '#006600',
			instruction: '#99ff99',
			codeComment: '#006600',
			code: '#00cc00',
			numbers: '#00ff00',
			menuItemText: '#00ff00',
			menuItemTextHighlighted: '#000000',
		},
		fill: {
			menuItemBackground: '#000000',
			menuItemBackgroundHighlighted: '#99ff99',
			background: '#000000',
			backgroundDots: '#006600',
			moduleBackground: '#000000',
			wire: '#ccffcc',
			errorMessageBackground: '#cc0000',
		},
		icons: {
			outputConnectorBackground: '#002200',
			inputConnectorBackground: '#002200',
			inputConnector: '#00ff00',
			outputConnector: '#00ff00',
			feedbackScale: ['#ff0000', '#cc0033', '#990066', '#660099', '#3300cc', '#0000ff'],
		},
	},
	redalert: {
		text: {
			lineNumber: '#660000',
			instruction: '#ff9999',
			codeComment: '#660000',
			code: '#cc0000',
			numbers: '#ff0000',
			menuItemText: '#ff0000',
			menuItemTextHighlighted: '#000000',
		},
		fill: {
			menuItemBackground: '#000000',
			menuItemBackgroundHighlighted: '#ff9999',
			background: '#220000',
			backgroundDots: '#660000',
			moduleBackground: '#220000',
			wire: '#ffcccc',
			errorMessageBackground: '#cc0000',
		},
		icons: {
			outputConnectorBackground: '#220000',
			inputConnectorBackground: '#220000',
			inputConnector: '#ff0000',
			outputConnector: '#ff0000',
			feedbackScale: ['#ff0000', '#cc0033', '#990066', '#660099', '#3300cc', '#0000ff'],
		},
	},
};

export default colorSchemes;
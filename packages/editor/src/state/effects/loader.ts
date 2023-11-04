import { EventDispatcher } from '../../events';
import { getModuleId } from '../helpers/codeParsers';
import { EditorSettings, Project, State } from '../types';

export default function loader(state: State, events: EventDispatcher, defaultState: State): void {
	const localProject = JSON.parse(localStorage.getItem('project_' + state.options.localStorageId) ?? '{}') as Project;
	const editorSettings = JSON.parse(
		localStorage.getItem('editorSettings_' + state.options.localStorageId) ?? '{}'
	) as EditorSettings;
	const input = document.createElement('input');
	input.type = 'file';

	state.editorSettings = editorSettings;

	function loadProject({ project: newProject }: { project: Project }) {
		state['project'] = {
			title: '',
			author: '',
			description: '',
			codeBlocks: [],
			viewport: {
				x: 0,
				y: 0,
			},
			rnbo: { patchers: {} },
			sampleRate: 44100,
		};

		Object.keys(newProject).forEach(key => {
			state['project'][key] = newProject[key] || defaultState.project[key];
		});

		state.graphicHelper.codeBlocks.clear();
		state.graphicHelper.viewport.x = state.project.viewport.x * state.graphicHelper.viewport.vGrid;
		state.graphicHelper.viewport.y = state.project.viewport.y * state.graphicHelper.viewport.hGrid;
		state.project.codeBlocks.forEach(codeBlock => {
			state.graphicHelper.codeBlocks.add({
				width: 0,
				minGridWidth: 32,
				height: 0,
				code: codeBlock.code,
				trimmedCode: codeBlock.code,
				codeColors: [],
				codeToRender: [],
				inputs: new Map(),
				outputs: new Map(),
				debuggers: new Map(),
				switches: new Map(),
				buttons: new Map(),
				pianoKeyboards: new Map(),
				bufferPlotters: new Map(),
				cursor: { col: 0, row: 0, x: 0, y: 0 },
				id: getModuleId(codeBlock.code) || '',
				gaps: new Map(),
				errorMessages: new Map(),
				x: codeBlock.x * state.graphicHelper.viewport.vGrid,
				y: codeBlock.y * state.graphicHelper.viewport.hGrid,
				offsetX: 0,
				offsetY: 0,
				gridX: codeBlock.x,
				gridY: codeBlock.y,
				isOpen: codeBlock.isOpen,
				isGroup: false,
				padLength: 1,
			});
		});

		events.dispatch('setSampleRate', { sampleRate: state.project.sampleRate });
		events.dispatch('init');
		events.dispatch('saveState');
	}

	state.options.isLocalStorageEnabled
		? loadProject({ project: localProject })
		: loadProject({ project: state.project });

	function onSaveState() {
		if (!state.options.isLocalStorageEnabled) {
			return;
		}

		state.project.codeBlocks = Array.from(state.graphicHelper.codeBlocks)
			.sort((codeBlockA, codeBlockB) => {
				if (codeBlockA.id > codeBlockB.id) {
					return 1;
				} else if (codeBlockA.id < codeBlockB.id) {
					return -1;
				}
				return 0;
			})
			.map(graphicData => {
				return {
					code: graphicData.code,
					x: graphicData.gridX,
					y: graphicData.gridY,
					isOpen: graphicData.isOpen,
				};
			});

		state.project.viewport.x = Math.round(state.graphicHelper.viewport.x / state.graphicHelper.viewport.vGrid);
		state.project.viewport.y = Math.round(state.graphicHelper.viewport.y / state.graphicHelper.viewport.hGrid);

		localStorage.setItem('project_' + state.options.localStorageId, JSON.stringify(state.project));
		localStorage.setItem('editorSettings_' + state.options.localStorageId, JSON.stringify(state.editorSettings));
	}

	function onOpen() {
		input.click();
	}

	input.addEventListener('change', event => {
		// @ts-ignore
		const file = event.target.files[0];

		// setting up the reader
		const reader = new FileReader();
		reader.readAsText(file, 'UTF-8');

		reader.addEventListener('load', readerEvent => {
			const content = readerEvent.target?.result?.toString();
			if (content) {
				loadProject({ project: JSON.parse(content) });
				events.dispatch('saveState');
			}
		});
	});

	events.on('saveState', onSaveState);
	events.on('open', onOpen);
	events.on('loadProject', loadProject);
}

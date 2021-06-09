import getConnectorDefaultPosition from './getConnectorDefaultPosition';
import { Connector } from '../state/types';

export default function addDefaultOutputPositions(connectors, width: number): Connector[] {
	return connectors.map(function (connector, index: number) {
		return {
			...connector,
			...getConnectorDefaultPosition(index, false, width),
		};
	});
}

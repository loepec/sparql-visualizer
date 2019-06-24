import { createGraphElement } from '../visualizations/graphical/GraphicalSerializer';
import { VisualisationIdentifier } from '../visualizations/index.types';
import { createDataTable } from '../visualizations/tables/TableCreator';
import { WikidataEndpoint } from '../wikidata-endpoint';

export async function getVisualization(
    data: HTMLElement,
    endpoint: WikidataEndpoint,
    visId: VisualisationIdentifier
): Promise<HTMLElement> {
    if (visId === 'Table') {
        return createDataTable(endpoint, data.innerText);
    } else {
        return createGraphElement(data.innerText, visId, endpoint);
    }
}

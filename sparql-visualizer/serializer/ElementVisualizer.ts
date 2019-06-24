import { VisualisationIdentifier } from '../visualizations/index.types';
import { WikidataEndpoint } from '../wikidata-endpoint';
import { getVisualization } from './Serializer';

const IFRAME_CLASS_NAME: string = 'visualization-iframe';

export async function visualizeElement(
    element: HTMLElement,
    endpoint: WikidataEndpoint,
    visualizationId: VisualisationIdentifier
): Promise<void> {
    const visElement: HTMLElement = await getVisualization(
        element.childNodes[0] as HTMLElement,
        endpoint,
        visualizationId
    );

    if (visualizationId !== 'Table') {
        visElement.setAttribute('class', IFRAME_CLASS_NAME);
    }

    if (element.childNodes.length > 1) {
        element.replaceChild(visElement, element.childNodes[1]);
    } else {
        element.appendChild(visElement);
    }
}

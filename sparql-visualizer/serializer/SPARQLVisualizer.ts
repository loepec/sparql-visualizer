import { VisualisationIdentifier } from '../visualizations/index.types';
import { WikidataEndpoint } from '../wikidata-endpoint';
import { visualizeElement } from './ElementVisualizer';

export const DATA_ATTRIBUTE_NAME: string = 'data-visualization';

export const DEFAULT_ENDPOINT: WikidataEndpoint = new WikidataEndpoint();
export const DEFAULT_VISUALIZATION: VisualisationIdentifier = 'BubbleChart';

export class SPARQLVisualizer {
    private endpoint: WikidataEndpoint = DEFAULT_ENDPOINT;
    private visId: VisualisationIdentifier = DEFAULT_VISUALIZATION;
    private dataList: NodeList = document.querySelectorAll(`[${DATA_ATTRIBUTE_NAME}]`);

    public withEndpoint(endpoint: WikidataEndpoint): SPARQLVisualizer {
        this.endpoint = endpoint;
        return this;
    }

    public withVisId(visId: VisualisationIdentifier): SPARQLVisualizer {
        this.visId = visId;
        return this;
    }

    public async build(): Promise<void> {
        for (let i = 0; i < this.dataList.length; ++i) {
            await visualizeElement(this.dataList.item(i) as HTMLElement, this.endpoint, this.visId);
        }
    }
}

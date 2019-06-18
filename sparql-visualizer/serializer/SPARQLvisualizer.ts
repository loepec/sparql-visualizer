import { VisualisationIdentifier } from '../visualizations/index.types';
import { WikidataEndpoint } from '../wikidata-endpoint';
import { getVisualization } from './Serializer';

export class SPARQLvisualizer {
    public readonly iframeClass: string;
    private endpoint: WikidataEndpoint;
    private visId: VisualisationIdentifier;
    private dataList: NodeList;

    constructor(dataAttributeName: string, iframeClass: string) {
        this.dataList = document.querySelectorAll('[data-' + dataAttributeName + ']');
        this.iframeClass = iframeClass;
    }

    public setEndpoint(endpoint: WikidataEndpoint): SPARQLvisualizer {
        this.endpoint = endpoint;
        return this;
    }

    public setVisId(visId: VisualisationIdentifier): SPARQLvisualizer {
        this.visId = visId;
        return this;
    }

    public build(): void {
        this.dataList.forEach((data: Node) => {
            const visElement: HTMLElement = getVisualization(
                data as HTMLElement,
                this.endpoint,
                this.visId
            );
            if (this.visId !== 'Table') {
                visElement.setAttribute('class', this.iframeClass);
            }

            if (data.childNodes.length > 1) {
                data.replaceChild(visElement, data.childNodes[1]);
            } else {
                data.appendChild(visElement);
            }
        });
    }
}

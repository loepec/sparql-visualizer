import { SinonStubbedInstance } from 'sinon';
import sinon from 'sinon';
import { WikidataEndpoint } from '../..';
import { VisualisationIdentifier } from '../index.types';
import { composeIFrame, createGraphElement } from './GraphicalSerializer';

const ENDPOINT_GRAPH_URL: string = 'https://query.wikidata.org/embed.html#';

describe('Graphical Serializer', () => {
    it('should return of type HTMLElement', () => {
        expect(composeIFrame(ENDPOINT_GRAPH_URL)).toBeInstanceOf(HTMLElement);
    });
    it('should return of type IFrameElement', () => {
        expect(composeIFrame(ENDPOINT_GRAPH_URL)).toBeInstanceOf(HTMLIFrameElement);
    });
    it('should return a HTMLIFrameElement', () => {
        const endpoint: SinonStubbedInstance<WikidataEndpoint> = sinon.createStubInstance(
            WikidataEndpoint
        );
        endpoint.getSPARQLVisualisationURL.returns(ENDPOINT_GRAPH_URL);

        const visualisationType: VisualisationIdentifier = 'BubbleChart';
        const stringExample: string = `hello`;

        expect(
            // tslint:disable-next-line: no-any
            createGraphElement(stringExample, visualisationType, endpoint as any)
        ).toBeInstanceOf(HTMLIFrameElement);
    });
});

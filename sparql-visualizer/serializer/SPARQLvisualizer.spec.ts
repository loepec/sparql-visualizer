import sinon, { SinonSpy, SinonStubbedInstance } from 'sinon';
import { WikidataEndpoint } from '../wikidata-endpoint';
import * as ElementVisualizer from './ElementVisualizer';
import {
    DATA_ATTRIBUTE_NAME,
    DEFAULT_ENDPOINT,
    DEFAULT_VISUALIZATION,
    SPARQLVisualizer
} from './SPARQLVisualizer';

describe('SPARQLVisualizer', () => {
    let endpoint: SinonStubbedInstance<WikidataEndpoint>;
    let visualizer: SPARQLVisualizer;
    let visualizeElementStub: SinonSpy;
    let element: HTMLElement;

    beforeEach(() => {
        endpoint = sinon.createStubInstance(WikidataEndpoint);
        visualizer = new SPARQLVisualizer();

        visualizeElementStub = sinon.stub(ElementVisualizer, 'visualizeElement');

        element = createElement(`<div ${DATA_ATTRIBUTE_NAME}="Test"></div>`);

        document.body.appendChild(element);
    });

    afterEach(() => {
        document.body.removeChild(element);

        sinon.restore();
    });

    it('should use the default endpoint if nothing was changed', async () => {
        await visualizer.build();

        ElementVisualizer.visualizeElement(element, endpoint as any, 'BarChart');

        expect(visualizeElementStub.callCount).toEqual(1);
        expect(visualizeElementStub.firstCall.args[1]).toEqual(DEFAULT_ENDPOINT);
    });

    it('should use the default visualization type if nothing was changed', async () => {
        await visualizer.build();

        expect(visualizeElementStub.firstCall.args[2]).toEqual(DEFAULT_VISUALIZATION);
    });

    it('should be able to change the endpoint', async () => {
        await visualizer.withEndpoint(endpoint as any).build();

        expect(visualizeElementStub.firstCall.args[1]).toEqual(endpoint);
    });

    it('should be able to change the visualization ID', async () => {
        await visualizer.withVisId('BarChart').build();

        expect(visualizeElementStub.firstCall.args[2]).toEqual('BarChart');
    });

    function createElement(markup: string): HTMLElement {
        const wrapper: HTMLElement = document.createElement('div');
        wrapper.innerHTML = markup.trim();
        return wrapper.firstElementChild as HTMLElement;
    }
});

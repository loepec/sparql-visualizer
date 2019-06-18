import { VisualisationIdentifier } from '../visualizations/index.types';
import { WikidataEndpoint } from '../wikidata-endpoint';
import { SPARQLvisualizer } from './SPARQLvisualizer';

describe('SPARQLvisualizer', () => {
    let wikidataEndpoint: WikidataEndpoint;
    let visId: VisualisationIdentifier;
    let SPARQLvisualizer: SPARQLvisualizer;

    beforeEach(() => {
        wikidataEndpoint = new WikidataEndpoint();
        SPARQLvisualizer = new SPARQLvisualizer();
        visId = 'Table';
    });

    it('set new endpoint', () => {
        expect(SPARQLvisualizer.setEndpoint(wikidataEndpoint)).toEqual(wikidataEndpoint);
    });

    it('set new visId', () => {
        expect(SPARQLvisualizer.setVisId(visId)).toEqual(visId);
    });
});

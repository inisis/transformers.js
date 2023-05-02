

import { env, AutoTokenizer } from '../src/transformers.js';
import { getFile } from '../src/utils/hub.js';

env.allowRemoteModels = false;

// Load test data generated by the python tests
// TODO do this dynamically?
let testsData = await (await getFile('./tests/data/tokenizer_tests.json')).json()

describe('Tokenizers', () => {

    for (let [tokenizerName, tests] of Object.entries(testsData)) {

        it(tokenizerName, async () => {
            let tokenizer = await AutoTokenizer.from_pretrained(tokenizerName);

            for (let test of tests) {
                let encoded = await tokenizer(test.input, {
                    return_tensor: false
                });
                expect(encoded).toEqual(test.target);
            }
        });
    }
});

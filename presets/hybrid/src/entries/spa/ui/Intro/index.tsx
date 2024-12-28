import {Counter} from '../Counter';

export const Intro = () => (
    <main>
        <h1>Intro</h1>
        <p>This entry point goes as a single-page application (SPA) with client-side rendering (CSR) and React.</p>
        <Counter/>
        <p>Standalone installation:<br/><code>npx appscape-init app --react-spa</code></p>
    </main>
);

export default Intro;

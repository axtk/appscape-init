import {Counter} from '../Counter';

export const Intro = () => (
    <main>
        <h1>Intro</h1>
        <p>This entry point goes with server-side rendering (SSR) and React.</p>
        <Counter/>
        <p>Standalone installation:<br/><code>npx appscape-init app --react-ssr</code></p>
    </main>
);

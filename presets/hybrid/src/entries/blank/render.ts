import type {Controller} from 'appscape';

export const render: Controller = () => {
    return (req, res) => {
        let nonce = req.ctx?.nonce;

        res.send(
            '<!DOCTYPE html>' +
            '<html><head><meta charset="utf-8"/>' +
            '<meta name="viewport" content="width=device-width"/>' +
            '<link type="image/x-icon" rel="icon" href="/favicon.svg"/>' +
            '<title>Intro</title>' +
            `<style${nonce ? ` nonce="${nonce}"` : ''}>` +
            '.layout { max-width: 36em; margin: 0 auto; }</style>' +
            '</head><body><div class="layout">' +
            '<nav><p><a href="/">Start</a></p></nav>' +
            '<main><h1>Intro</h1>' +
            '<p>This entry point renders content from a string ' +
            '(blank setup).</p>' +
            '<p>Standalone installation:<br>' +
            '<code>npx appscape-init app --blank</code></p>' +
            '</main><footer><hr><p><em>appscape</em></p></footer>' +
            '</div></body></html>\n',
        );
    };
};

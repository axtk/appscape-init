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
            '<main><h1>Intro</h1>' +
            '<p>This is demo content. Lorem ipsum dolor, ' +
            'quam velit, tincidunt vitae suscipit nullam.</p>' +
            '</main><footer><hr><p><em>appscape</em></p></footer>' +
            '</div></body></html>\n',
        );
    };
};

import type {Controller} from 'appscape';

export const render: Controller = () => {
    return (req, res) => {
        let nonce = req.ctx?.nonce;

        res.send(
            '<!DOCTYPE html>' +
            '<html><head><meta charset="utf-8"/>' +
            '<meta name="viewport" content="width=device-width"/>' +
            '<link type="image/x-icon" rel="icon" href="/favicon.svg"/>' +
            '<title>✔️ Well met!</title>' +
            `<style${nonce ? ` nonce="${nonce}"` : ''}>body{text-align:center;}</style>` +
            '</head><body><h1>✔️ Well met!</h1><hr/>' +
            '<p><em>appscape</em></p></body></html>\n',
        );
    };
};

import type {Controller} from 'appscape';

export const render: Controller = () => {
    return (_req, res) => {
        res.send(
            '<!DOCTYPE html>' +
            '<html><head><meta charset="utf-8"/>' +
            '<meta name="viewport" content="width=device-width"/>' +
            '<link type="image/x-icon" rel="icon" href="/favicon.svg"/>' +
            '<title>Well met!</title></head>' +
            '<body><main style="text-align: center;">' +
            '<h1>Well met!</h1><hr/>' +
            '<p><em>appscape</em></p>' +
            '</main></body></html>\n',
        );
    };
};

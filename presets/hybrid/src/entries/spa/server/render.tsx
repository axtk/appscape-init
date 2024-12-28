import {renderToPipeableStream} from 'react-dom/server';
import {isbot} from 'isbot';
import {Controller, serializeState, servePipeableStream} from 'appscape';
import type {AppState} from '../types/AppState';
import {App} from '../ui/App';

export const render: Controller = () => {
    return async (req, res) => {
        let appState: AppState = {
            counter: 100 + Math.floor(100*Math.random()),
        };

        let bot = isbot(req.get('user-agent'));
        let serve = servePipeableStream(req, res);
        let renderingError: unknown;

        let stream = renderToPipeableStream(<App location={req.originalUrl} state={appState}/>, {
            onShellReady() {
                if (!bot) serve(stream, renderingError);
            },
            onShellError(error) {
                renderingError = error;
                serve(stream, renderingError);
            },
            onAllReady() {
                if (bot) serve(stream, renderingError);
            },
            onError(error) {
                renderingError = error;
            },
            bootstrapModules: ['/-/spa/index.js'],
            bootstrapScriptContent: `window._mainState=${serializeState(appState)};`,
            nonce: req.ctx?.nonce,
        });
    };
};

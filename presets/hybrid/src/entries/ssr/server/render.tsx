import {renderToPipeableStream} from 'react-dom/server';
import {isbot} from 'isbot';
import {Controller, servePipeableStream} from 'appscape';
import type {AppState} from '../types/AppState';
import {App} from '../ui/App';

const allowedSections = new Set([undefined, 'about']);

const titleMap: Record<string, string> = {
    'intro': 'Intro',
    'about': 'About',
};

export const render: Controller = () => {
    return async (req, res) => {
        if (!allowedSections.has(req.params.section)) {
            res.status(404).send(
                await req.app.renderStatus?.(req, res, 'unknown_section'),
            );
            return;
        }

        let appState: AppState = {
            title: titleMap[req.params.section ?? 'intro'] ?? 'App',
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
        });
    };
};

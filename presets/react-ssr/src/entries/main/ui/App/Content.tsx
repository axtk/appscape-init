import {useContext} from 'react';
import {useStore} from 'groundstate';
import {useRoute} from 'routescape';
import {AppContext} from '../AppContext';
import {Intro} from '../Intro/lazy';
import {About} from '../About/lazy';
import {Nav} from '../Nav';
import './index.css';

export const Content = () => {
    let [state] = useStore(useContext(AppContext));
    let [, withRoute] = useRoute();

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width"/>
                <title>{state.title}</title>
                <link rel="stylesheet" href="/-/main.css"/>
                <link type="image/x-icon" rel="icon" href="/favicon.svg"/>
            </head>
            <body>
                <Nav/>
                {withRoute('/', <Intro/>)}
                {withRoute('/about', <About/>)}
                <script src="/main/counter.js"/>
            </body>
        </html>
    );
};

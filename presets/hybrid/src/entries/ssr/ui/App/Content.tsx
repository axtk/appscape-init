import {useContext} from 'react';
import {useStore} from 'groundstate';
import {useRoute} from 'routescape';
import {AppContext} from '../AppContext';
import {Intro} from '../Intro';
import {About} from '../About';
import {Nav} from '../Nav';
import {Footer} from '../Footer';
import './index.css';

export const Content = () => {
    let [state] = useStore(useContext(AppContext));
    let {withRoute} = useRoute();

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width"/>
                <title>{state.title}</title>
                <link rel="stylesheet" href="/-/ssr/index.css"/>
                <link type="image/x-icon" rel="icon" href="/favicon.svg"/>
            </head>
            <body>
                <div className="layout">
                    <Nav/>
                    {withRoute('/ssr', <Intro/>)}
                    {withRoute('/ssr/about', <About/>)}
                    <Footer/>
                </div>
                <script src="/ssr/-/counter.js"/>
            </body>
        </html>
    );
};

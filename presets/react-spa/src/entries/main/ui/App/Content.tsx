import {Suspense} from 'react';
import {useNavigationComplete, useRoute} from 'routescape';
import {Intro} from '../Intro/lazy';
import {About} from '../About/lazy';
import {Nav} from '../Nav';
import {Footer} from '../Footer';
import './index.css';

function setTitle(href: string) {
    if (href === '/')
        document.title = 'Intro';
    else if (href === '/about')
        document.title = 'About';
}

export const Content = () => {
    let {withRoute} = useRoute();
    let suspenseFallback = <main><p>Loading...</p></main>;

    useNavigationComplete(setTitle);

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width"/>
                <title>App</title>
                <link rel="stylesheet" href="/-/main/index.css"/>
                <link type="image/x-icon" rel="icon" href="/favicon.svg"/>
            </head>
            <body>
                <div className="layout">
                    <Nav/>
                    {withRoute('/', (
                        <Suspense fallback={suspenseFallback}>
                            <Intro/>
                        </Suspense>
                    ))}
                    {withRoute('/about', (
                        <Suspense fallback={suspenseFallback}>
                            <About/>
                        </Suspense>
                    ))}
                    <Footer/>
                </div>
            </body>
        </html>
    );
};

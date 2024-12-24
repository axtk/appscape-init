import {Suspense, useEffect} from 'react';
import {useRoute} from 'routescape';
import {Intro} from '../Intro/lazy';
import {About} from '../About/lazy';
import {Nav} from '../Nav';
import {Footer} from '../Footer';
import './index.css';

export const Content = () => {
    let [route, withRoute] = useRoute();
    let suspenseFallback = <main><p>Loading...</p></main>;

    useEffect(() => {
        let setTitle = () => {
            if (route.matches('/spa'))
                document.title = 'Intro';
            else if (route.matches('/spa/about'))
                document.title = 'About';
        };

        setTitle();

        return route.subscribe(setTitle);
    }, [route]);

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width"/>
                <title>App</title>
                <link rel="stylesheet" href="/-/spa.css"/>
                <link type="image/x-icon" rel="icon" href="/favicon.svg"/>
            </head>
            <body>
                <div className="layout">
                    <Nav/>
                    {withRoute('/spa', (
                        <Suspense fallback={suspenseFallback}>
                            <Intro/>
                        </Suspense>
                    ))}
                    {withRoute('/spa/about', (
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

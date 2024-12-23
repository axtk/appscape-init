import {Suspense, useEffect} from 'react';
import {useRoute} from 'routescape';
import {Intro} from '../Intro/lazy';
import {About} from '../About/lazy';
import {Nav} from '../Nav';
import './index.css';

export const Content = () => {
    let [route, withRoute] = useRoute();
    let suspenseFallback = <main><p>Loading...</p></main>;

    useEffect(() => {
        let setTitle = () => {
            if (route.matches('/'))
                document.title = 'Intro';
            else if (route.matches('/about'))
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
                <link rel="stylesheet" href="/-/main.css"/>
                <link type="image/x-icon" rel="icon" href="/favicon.svg"/>
            </head>
            <body>
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
            </body>
        </html>
    );
};

import {A, useRoute} from 'routescape';

export const Nav = () => {
    let [, withRoute] = useRoute();

    return (
        <nav>
            <p>
                <a href="/">Start</a>
                {' | '}
                {withRoute('/spa',
                    <span>Intro</span>,
                    <A href="/spa">Intro</A>
                )}
                {' | '}
                {withRoute('/spa/about',
                    <span>About</span>,
                    <A href="/spa/about">About</A>
                )}
            </p>
        </nav>
    );
};
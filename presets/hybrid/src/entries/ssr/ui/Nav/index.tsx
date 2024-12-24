import {useRoute} from 'routescape';

export const Nav = () => {
    let [, withRoute] = useRoute();

    return (
        <nav>
            <p>
                <a href="/">Start</a>
                {' | '}
                {withRoute('/ssr',
                    <span>Intro</span>,
                    <a href="/ssr">Intro</a>
                )}
                {' | '}
                {withRoute('/ssr/about',
                    <span>About</span>,
                    <a href="/ssr/about">About</a>
                )}
            </p>
        </nav>
    );
};
import {useRoute} from 'routescape';

export const Nav = () => {
    let [, withRoute] = useRoute();

    return (
        <nav>
            <p>
                {withRoute('/',
                    <span>Intro</span>,
                    <a href="/">Intro</a>
                )}
                {' | '}
                {withRoute('/about',
                    <span>About</span>,
                    <a href="/about">About</a>
                )}
            </p>
        </nav>
    );
};
import {A, useRoute} from 'routescape';

export const Nav = () => {
    let [, withRoute] = useRoute();

    return (
        <nav>
            <p>
                {withRoute('/',
                    <strong>Intro</strong>,
                    <A href="/">Intro</A>
                )}
                {' | '}
                {withRoute('/about',
                    <strong>About</strong>,
                    <A href="/about">About</A>
                )}
            </p>
        </nav>
    );
};
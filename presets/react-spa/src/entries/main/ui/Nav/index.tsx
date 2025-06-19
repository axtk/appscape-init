import {A, useRoute} from 'routescape';

export const Nav = () => {
    let {withRoute} = useRoute();

    return (
        <nav>
            <p>
                {withRoute('/',
                    <span>Intro</span>,
                    <A href="/">Intro</A>
                )}
                {' | '}
                {withRoute('/about',
                    <span>About</span>,
                    <A href="/about">About</A>
                )}
            </p>
        </nav>
    );
};
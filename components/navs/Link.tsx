import NavLink from 'next/link';
import {edit} from '../../lib/icons';
import {PropsWithChildren} from 'react';

export type Props = {
    href: string,
    icon?: JSX.Element,
}

export default function Link({href, icon, children}: PropsWithChildren<Props>) {
    return (
        <NavLink href={href} passHref={true}>
            <a className="d-flex">
                {icon}
                <span className="ms-2">{children}</span>
            </a>
        </NavLink>
    );
}
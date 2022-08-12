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
            <a className="d-flex align-items-center">
                {icon}
                <span className="ms-2 position-relative" style={{top: '2px'}} >{children}</span>
            </a>
        </NavLink>
    );
}
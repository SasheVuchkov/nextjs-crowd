import React from 'react';
import NavLink from 'next/link';
import {PropsWithChildren} from 'react';

export type Props = {
    href: string,
    icon?: JSX.Element,
    className?: string,
}

export default function Link({href, icon, className, children}: PropsWithChildren<Props>) {
    return (
        <NavLink href={href} passHref={true}>
            <a className={`d-flex align-items-center ${className}`}>
                {icon}
                <span className="ms-2 position-relative" style={{top: '2px'}} >{children}</span>
            </a>
        </NavLink>
    );
}
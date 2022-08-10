import {PropsWithChildren} from 'react';

export type Props = {
    prefix?: string,
    suffix?: string,
    className?: string,
}
export default function Title({prefix, suffix, className, children}: PropsWithChildren<Props>) {
    return (
        <h2 className={`h4 text-uppercase position-relative ${className}`} >
            {prefix && <span className="focus-color">{prefix}</span>}
            {' '}{children}{' '}
            {suffix && <span className="focus-color">{suffix}</span>}
        </h2>
    );
}
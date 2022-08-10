import React, {CSSProperties, PropsWithChildren} from 'react';

export type Props = {
    title: string;
    description: string;
    className?: string
    style: CSSProperties
}

export default function Snippet({children, title, description, className, style}: PropsWithChildren<Props>) {

    return (
        <div className="standard-snippet mb-4 d-flex align-items-center justify-content-center" style={style}>
            <div className={`d-flex flex-column justify-content-center align-items-center ${className}`} >
                <div className="data-point display-3 text-white m-0">
                    {children}
                </div>
                <div className="content text-center">
                    <span className="d-block text-white h6 m-0">{title}</span>
                </div>
            </div>
        </div>
    )
}
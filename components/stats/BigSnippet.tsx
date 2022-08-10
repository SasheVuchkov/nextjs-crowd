import React, {PropsWithChildren} from "react";

export type Props = {
    title: string;
    className?: string;
}

export default function BigSnippet({title, children, className}: PropsWithChildren<Props>) {
    return (<div className={`big-snippet my-4 p-3 ${className}`}>
        <h1 className="display-4 text-white m-0">
            {children}
        </h1>
        <span className="d-block text-white text-center h4 text-capitalize">{title}</span>
    </div>)
}
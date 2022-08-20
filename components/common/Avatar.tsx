import {useEffect, useRef, useState} from 'react';

export type Props = {
    width: number,
    height: number,
    alt: string,
    src?: string,
}

export default function Avatar({width, height, alt, src}: Props) {
    const [properSrc, setProperSrc] = useState(src);


    return (
        <img
            src={properSrc}
            width={width}
            height={height}
            alt={alt}
            onError={() => {
                setProperSrc('/images/no-avatar.png');
            }}
            className={`${properSrc?.includes('no-avatar.png') ? 'no-avatar' : ''}`} />
    );
}
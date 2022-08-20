import {useEffect, useRef} from 'react';

export type Props = {
    width: number,
    height: number,
    alt: string,
    src?: string,
}

export default function Avatar({width, height, alt, src}: Props) {
    const imgRef = useRef<HTMLImageElement|null>(null);

    useEffect(() => {
        if (imgRef?.current && imgRef.current.naturalWidth < 1) {
            imgRef.current.src = "/images/no-avatar.png";
            imgRef.current.className = `${imgRef.current.className} no-avatar`;
        }
    }, [imgRef])


    return (
        <img ref={imgRef} src={src} width={width} height={height} alt={alt} />
    );
}
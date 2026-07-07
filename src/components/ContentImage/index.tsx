import React from 'react';
import type { ImageData } from '../../data/content';

export type ContentImageData = ImageData;

interface ContentImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    image: ContentImageData;
    alt: string;
    imgClassName?: string;
    objectFit?: React.CSSProperties['objectFit'];
    objectPosition?: React.CSSProperties['objectPosition'];
}

export function ContentImage({
    image,
    alt,
    className,
    imgClassName,
    objectFit,
    objectPosition,
    loading,
    style,
}: ContentImageProps): React.ReactElement | null {
    const src = image?.images?.fallback?.src;
    if (!src) return null;
    const hasDimensions = image.width > 1 && image.height > 1;

    return (
        <div
            className={['content-image-wrapper', className].filter(Boolean).join(' ')}
            style={{
                maxWidth: !className && image.width > 1 ? `${image.width}px` : undefined,
                aspectRatio: !className && hasDimensions ? `${image.width} / ${image.height}` : undefined,
                ...style,
            }}
        >
            <img
                src={src}
                alt={alt}
                className={imgClassName}
                loading={loading}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit,
                    objectPosition,
                }}
            />
        </div>
    );
}

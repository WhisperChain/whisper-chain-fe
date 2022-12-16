import Image from 'next/image';
import React from 'react';
import ImageLoader from './ImageLoader';

export default function WhisperImage({
  imgSrcUrl,
  height,
  width,
  alt,
  priority = false,
  classes
}) {
  const [isImageLoading, setIsImageloading] = React.useState(false);

  return (
    <>
      {
        isImageLoading || !imgSrcUrl ? (
          <div
            className={`w-fit backdrop-blur-[60px] rounded-[8px]`}
            style={{ background: "rgba(255, 255, 255, 0.4)" }}
          >
            <ImageLoader height={height} width={width} />
          </div >
        ) : (<Image
          src={imgSrcUrl}
          priority={priority}
          width={height}
          height={width}
          className={classes}
          alt={alt}
          onLoadingComplete={() => setIsImageloading(false)}
        />)
      }
    </>
  )
}
import Image from 'next/image';
import React from 'react';
import SpinningLoader from '../SpinningLoader';

export default function WhisperImage({
  imgSrcUrl,
  height,
  width,
  alt,
  priority = false,
  classes
}) {
  return (
    imgSrcUrl ? (<Image
      src={imgSrcUrl}
      priority={priority}
      width={height}
      height={width}
      className={classes}
      alt={alt}
    />) : (
      <div
        className={`w-fit backdrop-blur-[60px] rounded-[8px]`}
        style={{ background: "rgba(255, 255, 255, 0.4)" }}
      >
        <SpinningLoader height={`${height}px`} width={`${width}px`} />
      </div >
    )
  )
}
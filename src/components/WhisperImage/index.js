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
      <SpinningLoader height={`${height}px`} width={`${width}px`} />
    )
  )
}
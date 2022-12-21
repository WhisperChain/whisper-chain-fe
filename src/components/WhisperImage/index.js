import Image from 'next/image';
import React from 'react';
import ImageLoader from './ImageLoader';

export default function WhisperImage({
  imgSrcUrl,
  height,
  width,
  alt,
  priority = false,
  classes,
  onLoadingCompleteHandler
}) {
  // const shimmer = (w, h) => `
  //   <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  //     <defs>
  //       <linearGradient id="g">
  //         <stop stopColor="#ead9d966" offset="10%"/>
  //         <stop stopColor="#ead9d966" offset="50%"/>
  //         <stop stopColor="#ead9d966" offset="70%"/>
  //       </linearGradient>
  //     </defs>
  //     <rect width="${w}" height="${h}" fill="#ead9d966"/>
  //     <rect id="r" width="${w}" height="${h}" fill="url(#g)"/>
  //   </svg>
  // `;

  // const toBase64 = (str) =>
  //   typeof window === 'undefined'
  //     ? Buffer.from(str).toString('base64')
  //     : window.btoa(str)

  return (
    <>
      {
        !imgSrcUrl ? (
          <div
            className={`w-fit backdrop-blur-[60px] rounded-[8px]`}
            style={{ background: "rgba(255, 255, 255, 0.4)" }}
          >
            <ImageLoader height={height} width={width} />
          </div >
        ) : (<Image
          src={imgSrcUrl}
          priority={priority}
          className={`${classes} object-contain`}
          alt={alt}
          fill
          // placeholder="blur"
          // blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
          onLoadingComplete={onLoadingCompleteHandler}
        />)
      }
    </>
  )
}
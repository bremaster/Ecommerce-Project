import { isWebpSupported } from 'utilities/WebpSupport'
import React from 'react'

export type Props = {
  src: string
  className?: string
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

/*
 * srcの拡張子が ".webp" かつWebP非対応の場合、パス名から".webp"を削除する
 * なお、srcに ".webp" を採用する際は、WebP非対応時の場合の代替ファイルを置いていることを前提とする
 */
export const Image: React.FC<Props> = ({ src, className, ...props }) => {
  const endIdx = -'.webp'.length

  if (!isWebpSupported() && src.match(/.webp$/g)) {
    src = src.slice(0, endIdx)
  }

  return <img className={className} src={src} {...props} />
}

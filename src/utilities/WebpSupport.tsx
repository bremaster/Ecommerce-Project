/*
 * ブラウザがWebPをサポートしているかチェック
 * @see https://stackoverflow.com/questions/5573096/detecting-webp-support
 */
export const isWebpSupported = (): boolean => {
  const elem = document.createElement('canvas')

  if (!elem.getContext?.('2d')) {
    return false
  }

  return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
}

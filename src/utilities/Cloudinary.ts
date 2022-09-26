/**
 * image optimization
 * see https://app.clickup.com/t/au1hvy
 */
const optimize = function (url: string): string {
  const setting = 'q_auto,f_auto,w_auto,c_fill/'
  const insertAfter = '/upload/'
  const insertPosition = url.indexOf(insertAfter) + insertAfter.length

  return url.slice(0, insertPosition) + setting + url.slice(insertPosition)
}

export { optimize }

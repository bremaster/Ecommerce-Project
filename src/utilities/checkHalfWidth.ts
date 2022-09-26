import eaw from 'eastasianwidth'

function isHalfWidth(c: string) {
  return eaw.length(c) == 1
}

export function checkHalfWidth(str?: string) {
  if (!str) return false
  for (let i = str.length - 1; i >= 0; i--) {
    if (!isHalfWidth(str[i])) return false
  }

  return true
}

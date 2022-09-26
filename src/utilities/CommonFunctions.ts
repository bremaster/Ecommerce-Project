// format print
// ex. printf('{0} {1} {2}', 'aaa', 'bbb', 'ccc');
// FYI https://qiita.com/jrsyo/items/237d0b88660b14ff97ca
function printf(...args: string[]): string {
  const num = args.length
  let oStr = args[0]
  for (let i = 1; i < num; i++) {
    const pattern = '\\{' + (i - 1) + '\\}'
    const re = new RegExp(pattern, 'g')
    oStr = oStr.replace(re, args[i])
  }
  return oStr
}

// https://www.yoheim.net/blog.php?q=20191101
const zenkaku2Hankaku = function (str: string): string {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s: string) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0)
  })
}

/**
 * 郵便番号を半角にしxxx-xxxxの形式にする
 */
function normalizePostalCode(code: string): [string, boolean] {
  // いったん半角数字だけにする
  let normalized = code.replace(/-/g, '')
  normalized = normalized.replace(/ー/g, '')
  normalized = zenkaku2Hankaku(normalized)
  if (normalized.length !== 7) {
    return ['', false]
  }
  // ハイフンでくぎる
  return [normalized.slice(0, 3) + '-' + normalized.slice(3, 7), true]
}

/**
 * 郵便番号から住所を検索するAPIを利用
 * https://madefor.github.io/postal-code-api
 */
const fetchAddressAPI = async function (
  postalCode: string,
  callback: (todohuken: string, shikuchoson: string, choiki: string) => void
): Promise<void> {
  // make input
  const head = postalCode.split('-')[0]
  const tail = postalCode.split('-')[1]

  // fetch
  const res = await fetch(
    `https://madefor.github.io/postal-code-api/api/v1/${head}/${tail}.json`
  )
  const json = await res.json()
  const { prefecture: ken, address1: shikuchoson, address2: choiki } = json.data[0].ja

  // execute callback
  callback(ken, shikuchoson, choiki)
}

/**
 * 任意の桁で切り上げする関数
 * @param {number} value 切り上げする数値
 * @param {number} base どの桁で切り上げするか（10→10の位、0.1→小数第１位）
 * @return {number} 切り上げした値
 */
function orgCeil(value: number, base: number): number {
  return Math.ceil(value / base) * base
}

/**
 * 任意の桁で切り捨てする関数
 * @param {number} value 切り捨てする数値
 * @param {number} base どの桁で切り捨てするか（10→10の位、0.1→小数第１位）
 * @return {number} 切り捨てした値
 */
function orgFloor(value: number, base: number): number {
  return Math.floor(value / base) * base
}

// Sequence generator function (commonly referred to as "range", e.g. Clojure, PHP etc)
// Generate numbers range 1..10 with step of 2
// range(1, 10, 2);
// [1, 3, 5, 7, 9]
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

export {
  printf,
  zenkaku2Hankaku,
  normalizePostalCode,
  fetchAddressAPI,
  orgCeil,
  orgFloor,
  range,
}

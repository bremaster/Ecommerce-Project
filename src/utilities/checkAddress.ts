export function checkAddress(orgAddress: string): boolean {
  let address = orgAddress

  address = address.replace(/\(.*?\)/g, '')
  address = address.replace(/（.*?）/g, '')
  address = address.replace(/[0-9０-９]+[階|F].*?/g, '')

  const allNumber = `([0-9０-９]+|[一二三四五六七八九十百千]+)`
  const ary = address.match(
    new RegExp(
      `${allNumber}+(${allNumber}|(番町|丁目|丁|番地|番|号|-|‐|–|ー|−|－|の))*(${allNumber}|(丁目|丁|番地|番|号))`,
      'g'
    )
  )

  if (ary !== null) {
    let addressLike = ''
    const len = ary.length
    for (let i = 0; i < len; i++) {
      const address = ary[i]
      if (address.length >= addressLike.length) {
        addressLike = address
      }
    }
    const index = address.lastIndexOf(addressLike)
    address = address.substring(0, index + addressLike.length)
  }

  return !!ary
}

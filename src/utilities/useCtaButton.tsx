import { useSearchParams } from 'react-router-dom'

type Button = {
  innerText: string
  linkTo: string
}

// Chane CTA based on Google Ads
export const useCtaButton = (): Button => {
  const [params] = useSearchParams()
  // Advertisement type is shown in `utm_adgroup` parameter.
  const adGroup = params.get('utm_adgroup')

  if (adGroup === null) {
    return DEFAULT_CTA
  }

  if (adGroup in CTA_PATTERNS) {
    return CTA_PATTERNS[adGroup]
  }

  return DEFAULT_CTA
}

const DEFAULT_CTA = {
  innerText: 'ギフトを見てみる',
  linkTo: 'subeteNoGift',
}

const CTA_PATTERNS: {
  [key: string]: Button
} = {
  catalog: {
    innerText: 'カタログギフトをつくる',
    linkTo: 'subeteNoGift',
  },
  wedding: {
    innerText: '結婚祝いギフトを見てみる',
    linkTo: 'kekkonIwai',
  },
  baby: {
    innerText: '出産祝いギフトを見てみる',
    linkTo: 'syussannIwai',
  },
}

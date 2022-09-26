import { useSearchParams } from 'react-router-dom'

// Chane CTA inner text based on Google Ads
export const useCtaInnerText = (): string => {
  const [params] = useSearchParams()
  // Advertisement type is shown in `utm_adgroup` parameter.
  const adGroup = params.get('utm_adgroup')

  if (adGroup === null) {
    return DEFAULT_CTA_TEXT
  }

  if (adGroup in CTA_TEXT_PATTERNS) {
    return CTA_TEXT_PATTERNS[adGroup].innerText
  }

  return DEFAULT_CTA_TEXT
}

const DEFAULT_CTA_TEXT = 'ギフトを見てみる'

const CTA_TEXT_PATTERNS: {
  [key: string]: {
    innerText: string
  }
} = {
  catalog: {
    innerText: 'カタログギフトをつくる',
  },
  wedding: {
    innerText: '結婚祝いギフトを見てみる',
  },
  baby: {
    innerText: '出産祝いギフトを見てみる',
  },
}

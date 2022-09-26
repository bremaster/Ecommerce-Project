import { Product } from 'constants/index'

//utility
export function makeBrand(item: Product) {
  return {
    name: item.brand.brandName,
    image: item.brand.brandImageCloudinary[0].secure_url,
    descriptions: [...item.brandDescriptionCollection.items],
  }
}

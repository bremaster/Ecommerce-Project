import React from 'react'

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'

// show draft data when in stating
const isPreview = process.env.REACT_APP_ENV === 'staging' ? true : false

const client = new ApolloClient({
  uri: process.env.REACT_APP_CONTENTFUL_URI,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache(),
})

const GraphqlProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <div>{children}</div>
    </ApolloProvider>
  )
}

const QUERY_GET_SURVEYS = gql`
  query getSurveysNewSchema($id: String!) {
    quiz(preview: ${isPreview}, id: $id) {
      title
      sys {
        id
      }
      visualization
      answersCollection {
        total
        items {
          imageUrl
          title
          description
          sys {
            id
          }
          nextQuiz {
            sys {
              id
            }
          }
        }
      }
      tip
    }
  }
`

const PRODUCT_DETAIL_FRAGMENT = gql`
  fragment productDetailFragment on ProductDetail {
    sys {
      id
    }
    title: productTitle
    tagsCollection(limit: 3) {
      items {
        name
      }
    }
    productDescriptionSectionsCollection {
      items {
        header
        image
        imageCaption
        body
      }
    }
    keyMessage
    price
    tax
    productPrice
    shippingFee {
      minFee
      maxFee
      hokkaidoFee
      okinawaFee
      undeliverable
    }
    noshi
    productIntroduction
    productImageCloudinary
    brand {
      ... on BrandDetail {
        brandName
        brandImageCloudinary
      }
    }
    brandDescriptionCollection {
      items {
        ... on BrandDescription {
          title: title1
          body: description
        }
      }
    }
    tableCollection {
      items {
        ... on ProductDescriptionTable {
          column1
          column2
        }
      }
    }
    variantsCollection {
      items {
        title
        patternsCollection {
          items {
            title
            imageCloudinary
          }
        }
      }
    }
  }
`

const QUERY_GET_PRODUCT_BY_ID = gql`
  ${PRODUCT_DETAIL_FRAGMENT}
  query getProductById($id: String!) {
    productDetail(id: $id, preview: ${isPreview}) {
      ...productDetailFragment
    }
  }
`

const QUERY_GET_PRODUCTS_BY_IDS = gql`
  ${PRODUCT_DETAIL_FRAGMENT}
  query getProductsByIds($ids: [String], $limit: Int) {
    productDetailCollection(
      preview: ${isPreview}
      limit: $limit
      where: { sys: { id_in: $ids } }
    ) {
      items {
        ...productDetailFragment
      }
    }
  }
`

const QUERY_GET_PRODUCTS_WITH_FILTER = gql`
  ${PRODUCT_DETAIL_FRAGMENT}
  query getProductsWithFilter(
    $limit: Int
    $skip: Int
    $keywords: [String]
    $scene: String
    $minPrice: Int
    $maxPrice: Int
    $sortKeys: [ProductDetailOrder]
  ) {
    productDetailCollection(
      preview: ${isPreview}
      limit: $limit
      skip: $skip
      where: {
        productPrice_gte: $minPrice
        productPrice_lte: $maxPrice
        scenes_contains_some: [$scene]
        keywords_contains_some: $keywords
      }
      order: $sortKeys
    ) {
      total
      items {
        ...productDetailFragment
      }
    }
  }
`

const QUERY_GET_PRICE_AND_KEYWORDS = gql`
  query GetKeywordsAndPrice( $scene: String) {
    giftSceneCollection(preview: ${isPreview}, where: { scene: $scene }, limit: 1) {
      items {
        keywords
        minPrice
        maxPrice
      }
    }
  }
`

export {
  GraphqlProvider,
  QUERY_GET_SURVEYS,
  QUERY_GET_PRODUCT_BY_ID,
  QUERY_GET_PRODUCTS_BY_IDS,
  QUERY_GET_PRODUCTS_WITH_FILTER,
  QUERY_GET_PRICE_AND_KEYWORDS,
}

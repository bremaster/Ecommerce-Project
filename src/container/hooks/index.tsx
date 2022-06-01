import React from 'react'

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'

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
  query getSurveysNewSchema($preview: Boolean, $id: String!) {
    quiz(preview: $preview, id: $id) {
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

const QUERY_GET_PRODUCTS_BY_IDS = gql`
  query getProductsByIds($ids: [String], $limit: Int, $preview: Boolean) {
    productDetailCollection(
      preview: $preview
      limit: $limit
      where: { sys: { id_in: $ids } }
    ) {
      items {
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
      }
    }
  }
`

const QUERY_GET_PRODUCTS_WITH_FILTER = gql`
  query getProductsWithFilter(
    $isPreview: Boolean
    $limit: Int
    $skip: Int
    $keywords: [String]
    $scene: String
    $minPrice: Int
    $maxPrice: Int
  ) {
    productDetailCollection(
      preview: $isPreview
      limit: $limit
      skip: $skip
      where: {
        productPrice_gte: $minPrice
        productPrice_lte: $maxPrice
        scenes_contains_some: [$scene]
        keywords_contains_some: $keywords
      }
    ) {
      total
      items {
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
      }
    }
  }
`

const QUERY_GET_PRICE_AND_KEYWORDS = gql`
  query GetPriceAndKeywords(
    $scene: String
    $skip: Int
    $limit: Int
    $isPreview: Boolean
  ) {
    productDetailCollection(
      skip: $skip
      limit: $limit
      preview: $isPreview
      where: {
        scenes_contains_some: [$scene]
        productPrice_exists: true
        keywords_exists: true
      }
    ) {
      total
      items {
        price: productPrice
        keywords
      }
    }
  }
`

export {
  GraphqlProvider,
  QUERY_GET_SURVEYS,
  QUERY_GET_PRODUCTS_BY_IDS,
  QUERY_GET_PRODUCTS_WITH_FILTER,
  QUERY_GET_PRICE_AND_KEYWORDS,
}

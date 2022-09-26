import React, { useState, useEffect } from 'react'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useLazyQuery,
} from '@apollo/client'

import { Product } from 'constants/index'

const client = new ApolloClient({
  uri: process.env.REACT_APP_CONTENTFUL_URI,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache(),
})

const GraphqlProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <div>{children}</div>
    </ApolloProvider>
  )
}

export const ProductCheck: React.FC = () => {
  return (
    <GraphqlProvider>
      <AllProductCard />
    </GraphqlProvider>
  )
}

const AllProductCard = () => {
  const ITEMS_PER_PAGE = 10
  const [fetch, { loading, data }] = useLazyQuery<{
    productDetailCollection: { items: Array<Product> }
  }>(QUERY_GET_ALL_PRODUCTS)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch({
      variables: { limit: ITEMS_PER_PAGE, skip: (page - 1) * ITEMS_PER_PAGE },
    })
    console.log(data)
  }, [page])

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'baseline',
          padding: '1rem',
          background: '#111111',
          color: '#f4f4f4',
        }}
      >
        <button
          onClick={() => {
            setPage((prev) => prev - 1)
          }}
        >
          down
        </button>
        <h4>page: {page}</h4>
        <p>{`(${ITEMS_PER_PAGE} items per page)`}</p>
        <button
          onClick={() => {
            setPage((prev) => prev + 1)
          }}
        >
          up
        </button>
      </div>
      {loading ? <div>now loading</div> : <h2>See /product/choose</h2>}
    </>
  )
}

const QUERY_GET_ALL_PRODUCTS = gql`
  query getProductsByIds($limit: Int, $skip: Int) {
    productDetailCollection(
      preview: true
      limit: $limit
      skip: $skip
      where: { productTitle_exists: true }
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

import { gql } from '@apollo/client'

export const GET_ANIME_PAGE = gql`
  query GetAnimePage($page: Int!, $perPage: Int!, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
        lastPage
        perPage
        total
      }
      media(sort: POPULARITY_DESC, search: $search, type: ANIME) {
        id
        title {
          english
          romaji
        }
        description
        coverImage {
          large
        }
        bannerImage
        averageScore
        episodes
        duration
        genres
        startDate {
          month
          year
        }
        endDate {
          month
          year
        }
        status
      }
    }
  }
`

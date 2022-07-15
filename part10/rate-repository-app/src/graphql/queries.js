import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Node {
    repositories {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          ratingAverage
          reviewCount
        }
      }
    }
  }
`;

// import { useQuery } from '@apollo/client';

// import { GET_REPOSITORIES } from '../graphql/queries';

// const Component = () => {
//   const { data, error, loading } = useQuery(GET_REPOSITORIES);
//   // ...
// };

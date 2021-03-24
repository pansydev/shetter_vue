import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";
import { relayStylePagination } from "@apollo/client/utilities";

const httpLink = createHttpLink({ uri: "./graphql" });

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: relayStylePagination(),
      },
    },
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

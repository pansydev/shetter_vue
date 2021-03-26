import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NextLink,
  Observer,
  Operation,
} from "@apollo/client/core";
import { Observable, relayStylePagination } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { tokenManager } from "@shetter/utils/tokenManager";
import { refreshManager } from "@shetter/utils/refreshManager";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({ uri: "./graphql" });

const authLink = setContext(async (request, { headers }) => {
  if (!tokenManager.authenticated()) {
    return;
  }

  if (request.operationName === "Refresh") {
    return;
  }

  await refreshManager.ensureRefreshed();

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${tokenManager.accessToken}`,
    },
  };
});

async function retry(operation: Operation, forward: NextLink, observer: Observer<unknown>) {
  const [success] = await refreshManager.refresh();

  if (success) {
    forward(operation).subscribe(observer);
  }
}

const errorLink = onError(({ operation, graphQLErrors, forward }) => {
  if (operation.operationName === "Refresh") {
    return;
  }

  const hasAuthError = graphQLErrors?.some(x => x.extensions?.code === "AUTH_NOT_AUTHENTICATED");

  if (hasAuthError) {
    return new Observable(observer => void retry(operation, forward, observer));
  }
});

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
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache,
});

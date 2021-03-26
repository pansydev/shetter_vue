import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NextLink,
  Observer,
  Operation,
  split,
} from "@apollo/client/core";
import { getMainDefinition, Observable, relayStylePagination } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { tokenManager } from "@shetter/utils/tokenManager";
import { refreshManager } from "@shetter/utils/refreshManager";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";

const httpLink = createHttpLink({ uri: "./graphql" });

function createWebSocketUri(path: string) {
  let result = window.location.protocol === "https:" ? "wss:" : "ws:";
  result += `//${window.location.host}${window.location.pathname}${path}`;
  return result;
}

const wsLink = new WebSocketLink({
  uri: createWebSocketUri("graphql"),
  options: {
    reconnect: true,
  },
});

const transportLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

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
  link: ApolloLink.from([errorLink, authLink, transportLink]),
  cache,
});

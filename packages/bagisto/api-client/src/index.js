import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { registerApolloMock } from '~/plugins/apollo-mock';

const onSetup = (settings = {}) => {
  const httpLink = createHttpLink({
    uri: settings.api?.url || process.env.BAGISTO_API_URL
  });

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache'
      }
    }
  });

  // If in development mode, register mock handlers
  if (process.env.NODE_ENV !== 'production') {
    registerApolloMock(apolloClient);
  }

  return {
    config: settings,
    client: apolloClient
  };
};

export const createApiClient = ({ factoryParams, ...other }) => {
  return {
    factoryParams,
    ...other,
    onSetup
  };
};
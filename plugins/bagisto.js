
import { integrationPlugin } from '@vue-storefront/core';
import { createApiClient } from '@/packages/bagisto/api-client/src';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';

const bagistoPlugin = integrationPlugin(({ integration }) => {
  const settings = {
    api: {
      url: process.env.BAGISTO_API_URL || 'http://localhost:8000/graphql'
    }
  };

  const httpLink = createHttpLink({
    uri: settings.api.url
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

  integration.configure('bagisto', {
    ...settings,
    client: apolloClient
  });
});


export default bagistoPlugin;
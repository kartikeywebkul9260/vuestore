import { ref, computed } from '@nuxtjs/composition-api';
import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client/core';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://your-bagisto-api/graphql' }), // Replace with your actual GraphQL endpoint
  cache: new InMemoryCache(),
});

export const useProduct = () => {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const getProducts = async () => {
    loading.value = true;

    const query = gql`
      query allProducts {
        allProducts(input: [{ key: "limit", value: "12" }]) { 
          paginatorInfo {
            count
            currentPage
            lastPage
            total
          } 
          data {
            id
            name
            price
            shortDescription
          }
        }
      }
    `;

    try {
      const response = await client.query({ query });
      products.value = response.data.allProducts.data;
      error.value = null;
      return response;
    } catch (err) {
      error.value = err;
      products.value = [];
      console.error('Error fetching products:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    products: computed(() => products.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    getProducts
  };
};

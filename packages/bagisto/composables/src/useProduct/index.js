import { ref, computed } from '@nuxtjs/composition-api';
import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client/core';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:8000/graphql' }), // Replace with actual API
  cache: new InMemoryCache(),
});

export const useProduct = () => {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const getProducts = async () => {
    console.log('ok');
    
    loading.value = true;
    console.log('Fetching products...');

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
    
    const response = await client.query({ query });
    try {
      products.value = response.data.allProducts.data;
      console.log('Fetched products:', products.value);

      error.value = null;
    } catch (err) {
      console.error('Error fetching products:', err);

      error.value = err;
      products.value = [];
      console.error('Error fetching products:', err);
    } finally {
      loading.value = false;
      console.log('Loading finished:', loading.value);
    }
  };

  return {
    products: computed(() => products.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    getProducts
  };
};

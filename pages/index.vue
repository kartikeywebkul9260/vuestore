<template>
    <div>
        <pre>{{ productsList }}</pre>
      <h1>Bagisto Products</h1>
      <div v-if="isLoading">Loading products...</div>
      <div v-else-if="hasError">Error: {{ errorMessage }}</div>
      <div>
        <p>Total products: {{ productCount }}</p>
        <div v-if="productCount === 0">No products found</div>
        <div class="products-grid">
          <div v-for="product in productsList" :key="product.id" class="product-card">
            <h2>{{ product.name }}</h2>
            <p v-if="product.price">Price: ${{ product.price }}</p>
            <p v-else>Price: Not available</p>
            <p>{{ product.shortDescription }}</p>
          </div>
        </div>
      </div>
      <button @click="loadProducts">Load Products</button>
    </div>
  </template>
    
  <script>
        import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client/core';

        const client = new ApolloClient({
            link: new HttpLink({ uri: 'http://localhost:8000/graphql' }), // Adjust API URL
            cache: new InMemoryCache(),
        });

        // Avoid the Composition API completely
        export default {
            name: 'HomePage',
            data() {
            return {
                productsList: [],
                isLoading: false,
                hasError: false,
                errorMessage: '',
                productCount: 0
            };
            },
            
            created: function() {
                this.loadProducts();
            },

            watch: {
                productsList: {
                    handler(newVal) {
                        console.log('productsList updated:', newVal);
                    },
                    deep: true, // Ensures it watches nested changes
                    immediate: true // Runs immediately when the component is created
                }
            },

            methods: {
                loadProducts() {
                    
                    this.isLoading = true;
                    this.hasError = false;
                    this.errorMessage = '';
                
                    console.log('Fetching products...');
                
                    // Create client on demand
                    
                    // Define query
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
                
                    // Execute query
                    client.query({ query })
                    .then(response => {
                        // Process response
                        if (response.data && response.data.allProducts && Array.isArray(response.data.allProducts.data)) {
                            
                            this.productsList = [...response.data.allProducts.data];
                            this.$nextTick(() => {
                                this.$forceUpdate();
                                console.log('Forced UI update');
                            }); 
                        this.productCount = response.data.allProducts.data.length;

                        } else {
                        console.error('Unexpected API response structure:', response);
                        this.hasError = true;
                        this.errorMessage = 'Invalid API response structure';
                        }
                    })
                    .catch(err => {
                        console.error('Error fetching products:', err);
                        this.hasError = true;
                        this.errorMessage = err.message || 'Unknown error';
                        this.productsList = [];
                    })
                    .finally(() => {
                        Object.assign(this.isLoading, false);
                    });
                }
            }
        };
  </script>
    
  <style>
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  .product-card {
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 5px;
  }
  </style>

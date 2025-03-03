<template>
  <div>
    <h1>Bagisto Products</h1>
    <div v-if="loading">Loading products...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <h2>{{ product.name }}</h2>
        <p>{{ product.price }}</p>
        <p>{{ product.shortDescription }}</p>
      </div>
    </div>
    <button @click="getProducts">Load Products</button>
  </div>
</template>

<script>
import { defineComponent, onMounted } from '@nuxtjs/composition-api';
import { useProduct } from '@/packages/bagisto/composables/src/useProduct/index.js';

export default defineComponent({
name: 'HomePage',

setup(props, { root }) {  
  console.log('Setup is running');

  // Ensure the app instance is available
  if (!root) {
    console.warn("Vue instance not available");
    return {};
  }

  const { products, loading, error, getProducts } = useProduct();

  onMounted(() => {
      getProducts();
  });
  
  return { products, loading, error, getProducts };
},
});
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

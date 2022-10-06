<template>
  <ul class="catalog__list">
    <ProductItem  v-for="(product, index) in products" :product="product" :key="index" />
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: ['products'],
  components: { ProductItem },
};
</script>

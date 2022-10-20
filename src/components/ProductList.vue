<template>
  <div>
    <ul class="catalog__list">
      <ProductItem v-for="product in products" :product="product" :key="product.id" />
    </ul>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  props: ['products'],
  components: { ProductItem },
};
</script>

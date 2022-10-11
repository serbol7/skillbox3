<template>
  <div>
    <ul class="catalog__list" v-if="products.length > 0">
      <ProductItem v-for="product in products" :product="product" :key="product.id" />
    </ul>
    <h2 style="text-align: center;" v-else>Таких товаров нет!</h2>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  props: ['products'],
  components: { ProductItem },
};
</script>

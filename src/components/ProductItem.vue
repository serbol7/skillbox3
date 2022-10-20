<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }"
    href="#" @click.prevent="gotoPage('product', { id: product.id })">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{ name: 'product', params: { id: product.id } }"
      href="#" @click.prevent="gotoPage('product', { id: product.id })">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="icolor in product.colors"
      :key="colorKey(product.id, icolor.id)">
        <label class="colors__label" :for="colorKey(product.id, icolor.id)">
          <input class="colors__radio sr-only" type="radio" name="color"
          :id="colorKey(product.id, icolor.id)" :value="colorKey(product.id, icolor.id)">
          <span class="colors__value" :style="{ 'background-color': icolor.code }"
          style="border: 1px solid black;">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  data() {
    return {

    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    colorKey() {
      return (productId, colorId) => (productId * 100 + colorId);
    },
  },
  methods: {
    gotoPage,
  },
  created() {

  },
};
</script>

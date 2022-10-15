<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#" @click.prevent="gotoPage('product', {id: product.id})">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
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
          <span class="colors__value" :style="{ 'background-color': colorCode(icolor.id) }"
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
import colors from '@/data/colors';

export default {
  data() {
    return {
      // color: '#73B6EA',
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    colors() {
      return colors;
    },
    colorKey() {
      return (productId, colorId) => (productId * 100 + colorId);
    },
    colorCode() {
      return (colorId) => colors.find((color) => color.id === colorId).code;
    },
  },
  methods: {
    gotoPage,
  },
  props: ['product'],
};
</script>

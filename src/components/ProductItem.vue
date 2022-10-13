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
      <li class="colors__item" v-for="color in product.colors" :key="product.id * 100 + color.id">
        <label class="colors__label" :for="product.id * 100 + color.id">
          <input class="colors__radio sr-only" type="radio" name="color"
          :id="product.id * 100 + color.id" :value="product.id * 100 + color.id">
          <span class="colors__value" :style="{ 'background-color': color.code }"
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
    colorKey(productId, colorId) {
      return productId * 100 + colorId;
    },
  },
  methods: {
    gotoPage,
  },
  props: ['product'],
};
</script>

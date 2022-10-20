<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ countProducts }} товара(ов)
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId" :color-id.sync="filterColorId" />
      <section class="catalog">

        <div v-if="productsLoadingFailed">
          <h2 style="text-align: center;">Произошла ошибка при загрузке товаров :(
            <button @click.prevent="loadProducts">Попробовать еще раз</button>
          </h2>
        </div>

        <div v-else-if="productsLoading">
          <h2 style="text-align: center;">Загрузка товаров...</h2>
          <br><br><br><br><br>
          <div class="windows8">
            <div class="wBall" id="wBall_1">
              <div class="wInnerBall"></div>
            </div>
            <div class="wBall" id="wBall_2">
              <div class="wInnerBall"></div>
            </div>
            <div class="wBall" id="wBall_3">
              <div class="wInnerBall"></div>
            </div>
            <div class="wBall" id="wBall_4">
              <div class="wInnerBall"></div>
            </div>
            <div class="wBall" id="wBall_5">
              <div class="wInnerBall"></div>
            </div>
          </div>
        </div>

        <div v-else-if="products.length === 0">
          <h2 style="text-align: center;">Таких товаров нет!</h2>
        </div>

        <ProductList v-else :products="products" />
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
// import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      page: 1,
      productsPerPage: 3,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      let prods = [];
      if (this.productsData) {
        prods = this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }));
      } else {
        prods = [];
      }
      return prods;
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(API_BASE_URL.concat('/api/products'), {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              colorId: this.filterColorId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            },
          })
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 5000);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    productsPerPage() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style>
.windows8 {
  position: relative;
  width: 78px;
  height: 78px;
  margin: auto;
}

.windows8 .wBall {
  position: absolute;
  width: 74px;
  height: 74px;
  opacity: 0;
  transform: rotate(225deg);
  -o-transform: rotate(225deg);
  -ms-transform: rotate(225deg);
  -webkit-transform: rotate(225deg);
  -moz-transform: rotate(225deg);
  animation: orbit 6.96s infinite;
  -o-animation: orbit 6.96s infinite;
  -ms-animation: orbit 6.96s infinite;
  -webkit-animation: orbit 6.96s infinite;
  -moz-animation: orbit 6.96s infinite;
}

.windows8 .wBall .wInnerBall {
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgb(0, 0, 0);
  left: 0px;
  top: 0px;
  border-radius: 10px;
}

.windows8 #wBall_1 {
  animation-delay: 1.52s;
  -o-animation-delay: 1.52s;
  -ms-animation-delay: 1.52s;
  -webkit-animation-delay: 1.52s;
  -moz-animation-delay: 1.52s;
}

.windows8 #wBall_2 {
  animation-delay: 0.3s;
  -o-animation-delay: 0.3s;
  -ms-animation-delay: 0.3s;
  -webkit-animation-delay: 0.3s;
  -moz-animation-delay: 0.3s;
}

.windows8 #wBall_3 {
  animation-delay: 0.61s;
  -o-animation-delay: 0.61s;
  -ms-animation-delay: 0.61s;
  -webkit-animation-delay: 0.61s;
  -moz-animation-delay: 0.61s;
}

.windows8 #wBall_4 {
  animation-delay: 0.91s;
  -o-animation-delay: 0.91s;
  -ms-animation-delay: 0.91s;
  -webkit-animation-delay: 0.91s;
  -moz-animation-delay: 0.91s;
}

.windows8 #wBall_5 {
  animation-delay: 1.22s;
  -o-animation-delay: 1.22s;
  -ms-animation-delay: 1.22s;
  -webkit-animation-delay: 1.22s;
  -moz-animation-delay: 1.22s;
}

@keyframes orbit {
  0% {
    opacity: 1;
    z-index: 99;
    transform: rotate(180deg);
    animation-timing-function: ease-out;
  }

  7% {
    opacity: 1;
    transform: rotate(300deg);
    animation-timing-function: linear;
    origin: 0%;
  }

  30% {
    opacity: 1;
    transform: rotate(410deg);
    animation-timing-function: ease-in-out;
    origin: 7%;
  }

  39% {
    opacity: 1;
    transform: rotate(645deg);
    animation-timing-function: linear;
    origin: 30%;
  }

  70% {
    opacity: 1;
    transform: rotate(770deg);
    animation-timing-function: ease-out;
    origin: 39%;
  }

  75% {
    opacity: 1;
    transform: rotate(900deg);
    animation-timing-function: ease-out;
    origin: 70%;
  }

  76% {
    opacity: 0;
    transform: rotate(900deg);
  }

  100% {
    opacity: 0;
    transform: rotate(900deg);
  }
}

@-o-keyframes orbit {
  0% {
    opacity: 1;
    z-index: 99;
    -o-transform: rotate(180deg);
    -o-animation-timing-function: ease-out;
  }

  7% {
    opacity: 1;
    -o-transform: rotate(300deg);
    -o-animation-timing-function: linear;
    -o-origin: 0%;
  }

  30% {
    opacity: 1;
    -o-transform: rotate(410deg);
    -o-animation-timing-function: ease-in-out;
    -o-origin: 7%;
  }

  39% {
    opacity: 1;
    -o-transform: rotate(645deg);
    -o-animation-timing-function: linear;
    -o-origin: 30%;
  }

  70% {
    opacity: 1;
    -o-transform: rotate(770deg);
    -o-animation-timing-function: ease-out;
    -o-origin: 39%;
  }

  75% {
    opacity: 1;
    -o-transform: rotate(900deg);
    -o-animation-timing-function: ease-out;
    -o-origin: 70%;
  }

  76% {
    opacity: 0;
    -o-transform: rotate(900deg);
  }

  100% {
    opacity: 0;
    -o-transform: rotate(900deg);
  }
}

@-ms-keyframes orbit {
  0% {
    opacity: 1;
    z-index: 99;
    -ms-transform: rotate(180deg);
    -ms-animation-timing-function: ease-out;
  }

  7% {
    opacity: 1;
    -ms-transform: rotate(300deg);
    -ms-animation-timing-function: linear;
    -ms-origin: 0%;
  }

  30% {
    opacity: 1;
    -ms-transform: rotate(410deg);
    -ms-animation-timing-function: ease-in-out;
    -ms-origin: 7%;
  }

  39% {
    opacity: 1;
    -ms-transform: rotate(645deg);
    -ms-animation-timing-function: linear;
    -ms-origin: 30%;
  }

  70% {
    opacity: 1;
    -ms-transform: rotate(770deg);
    -ms-animation-timing-function: ease-out;
    -ms-origin: 39%;
  }

  75% {
    opacity: 1;
    -ms-transform: rotate(900deg);
    -ms-animation-timing-function: ease-out;
    -ms-origin: 70%;
  }

  76% {
    opacity: 0;
    -ms-transform: rotate(900deg);
  }

  100% {
    opacity: 0;
    -ms-transform: rotate(900deg);
  }
}

@-webkit-keyframes orbit {
  0% {
    opacity: 1;
    z-index: 99;
    -webkit-transform: rotate(180deg);
    -webkit-animation-timing-function: ease-out;
  }

  7% {
    opacity: 1;
    -webkit-transform: rotate(300deg);
    -webkit-animation-timing-function: linear;
    -webkit-origin: 0%;
  }

  30% {
    opacity: 1;
    -webkit-transform: rotate(410deg);
    -webkit-animation-timing-function: ease-in-out;
    -webkit-origin: 7%;
  }

  39% {
    opacity: 1;
    -webkit-transform: rotate(645deg);
    -webkit-animation-timing-function: linear;
    -webkit-origin: 30%;
  }

  70% {
    opacity: 1;
    -webkit-transform: rotate(770deg);
    -webkit-animation-timing-function: ease-out;
    -webkit-origin: 39%;
  }

  75% {
    opacity: 1;
    -webkit-transform: rotate(900deg);
    -webkit-animation-timing-function: ease-out;
    -webkit-origin: 70%;
  }

  76% {
    opacity: 0;
    -webkit-transform: rotate(900deg);
  }

  100% {
    opacity: 0;
    -webkit-transform: rotate(900deg);
  }
}

@-moz-keyframes orbit {
  0% {
    opacity: 1;
    z-index: 99;
    -moz-transform: rotate(180deg);
    -moz-animation-timing-function: ease-out;
  }

  7% {
    opacity: 1;
    -moz-transform: rotate(300deg);
    -moz-animation-timing-function: linear;
    -moz-origin: 0%;
  }

  30% {
    opacity: 1;
    -moz-transform: rotate(410deg);
    -moz-animation-timing-function: ease-in-out;
    -moz-origin: 7%;
  }

  39% {
    opacity: 1;
    -moz-transform: rotate(645deg);
    -moz-animation-timing-function: linear;
    -moz-origin: 30%;
  }

  70% {
    opacity: 1;
    -moz-transform: rotate(770deg);
    -moz-animation-timing-function: ease-out;
    -moz-origin: 39%;
  }

  75% {
    opacity: 1;
    -moz-transform: rotate(900deg);
    -moz-animation-timing-function: ease-out;
    -moz-origin: 70%;
  }

  76% {
    opacity: 0;
    -moz-transform: rotate(900deg);
  }

  100% {
    opacity: 0;
    -moz-transform: rotate(900deg);
  }
}
</style>

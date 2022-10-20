// import products from '@/data/products';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    cartProductsLoading: false,
    cartProductsLoadingFailed: false,
  },
  mutations: {
    // addProductToCart(state, { productId, amount }) {
    //   const item = state.cartProducts.find((i) => i.productId === productId);
    //   if (item) {
    //     item.amount += amount;
    //   } else {
    //     state.cartProducts.push({
    //       productId,
    //       amount,
    //     });
    //   }
    // },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((i) => i.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((i) => i.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
    updateCartProductsLoading(state, value) {
      state.cartProductsLoading = value;
    },
    updateCartProductsLoadingFailed(state, value) {
      state.cartProductsLoadingFailed = value;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        /* eslint-disable */
        const product = state.cartProductsData.find((p) => p.product.id === item.productId).product;
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount)
        + acc, 0);
    },
    getCartProductsLoading(state) {
      return state.cartProductsLoading;
    },
    getCartProductsLoadingFailed(state) {
      return state.cartProductsLoadingFailed;
    },
  },
  actions: {
    loadCart(context) {
      context.commit('updateCartProductsLoading', true);
      context.commit('updateCartProductsLoadingFailed', false);
      return (new Promise((resolve) => setTimeout(resolve, 2000)))
        .then(() => {
          return axios
            .get(API_BASE_URL.concat('/api/baskets'), {
              params: {
                userAccessKey: context.state.userAccessKey,
              },
            })
            .then((response) => {
              if (!context.state.userAccessKey) {
                localStorage.setItem('userAccessKey', response.data.user.accessKey);
                context.commit('updateUserAccessKey', response.data.user.accessKey);
              }
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            })
            .catch(() => { context.commit('updateCartProductsLoadingFailed', true); })
            .then(() => { context.commit('updateCartProductsLoading', false); });
        });
    },
    addProductToCart(context, { productId, amount }) {
      return (new Promise((resolve) => setTimeout(resolve, 2000)))
        .then(() => {
          return axios
            .post(API_BASE_URL.concat('/api/baskets/products'), {
              productId,
              quantity: amount,
            }, {
              params: {
                userAccessKey: context.state.userAccessKey,
              },
            })
            .then((response) => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            });
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });
      let prom;
      if (amount > 0) {
        prom = axios
          .put(API_BASE_URL.concat('/api/baskets/products'), {
            productId,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((response) => {
            context.commit('updateCartProductsData', response.data.items);
          })
          .catch(() => {
            context.commit('syncCartProducts');
          });
      } else {
        prom = null;
      }
      return prom;
    },
    // { productId, },
    deleteCartProduct(context, productId) {
      context.commit('deleteCartProduct', productId);
      return axios
        .delete(API_BASE_URL.concat('/api/baskets/products'), {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
          data: {
            productId,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
  },
});

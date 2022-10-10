<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a href="#" class="pagination__link pagination__link--arrow" aria-label="Предыдущая страница"
        @click.prevent="paginate(previousPage)" :class="{'pagination__link--disabled': page === 1}">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a href="#" class="pagination__link" @click.prevent="paginate(pageNumber)"
        :class="{'pagination__link--current': pageNumber === page}">
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница"
        @click.prevent="paginate(nextPage)" :class="{'pagination__link--disabled': page == pages}">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
    previousPage() {
      return (this.page - 1 <= 1 ? 1 : this.page - 1);
    },
    nextPage() {
      return (this.page + 1 >= this.pages ? this.pages : this.page + 1);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
  },
};
</script>

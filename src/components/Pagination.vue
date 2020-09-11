<!-------------------- 分頁 ------------------------------>
<template>
    <!--<footerx :cartNum="cartNum" @goTop="top"></footerx>-->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled':!pages.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"
            @click="changePage(pages.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
   <!---------------class加上active，點亮頁數  ------------------------------>
        <li class="page-item" v-for="page in pages.total_pages" :key="page"
          :class="{'active':pages.current_page === page }">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
        <li class="page-item" :class="{'disabled':!pages.has_next}">
          <a class="page-link" href="#" aria-label="Next"
             @click="changePage(pages.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>

    </nav>
</template>
<script>
export default {
  // 定義傳入元件資料
  name: 'Pagination',
  props: ['pages'],
  data() {
    return {
    };
  },
  methods: {
    // $emit可以用來處發實體上的物件v-on:turnPage
    // 第二格可以放入參數
    changePage(page) {
      this.$emit('turnPage', page);
    },
  },
};
</script>

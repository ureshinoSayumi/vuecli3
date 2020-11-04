<template>
    <table class="table mt-4">
        <thead>
            <tr>
            <!-- CSS直接套用bs 但如果想自訂 也可直接修改 -->
            <th width="120">購買時間</th>
            <th width="150">Email</th>
            <th width="200">購買款項</th>
            <th width="100">應付金額</th>
            <th width="100">是否付款</th>
            <th width="80">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in products" :key="item.id">
                    <td>{{ item.create_at | date }}</td>
                    <td>{{ item.user.email }}</td>
                    <td>
                        <ul class="list-unstyled">
                            <li v-for="(product, i) in item.products" :key="i">
                                {{ product.product.title }} 數量：{{ product.qty }}
                                {{ product.product.unit }} 單價 {{ product.product.price | currency}}
                            </li>
                        </ul>
                    </td>
                    <td>
                        {{item.total | currency }}
                    </td>
                    <td>
                        <!-- 產品如果付款完成  -->
                        <span v-if="item.is_paid" class="text-success">付款完成</span>
                        <span v-else>尚未付款</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm"
                        @click="openData(item)">詳細</button>
                    </td>
                </tr>
        </tbody>

        <!-- 載入bt Modal 刪除產品頁面 -->
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
            <div class="my-5 row justify-content-center">
                <form  style="background:white; padding:30px"
                    class="col-md-6" @submit.prevent="payOrder">
                    <table class="table">
                    <thead>
                        <th>品名</th>
                        <th>數量</th>
                        <th>單價</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in productData.products" :key="item.id">
                            <td class="align-middle">{{ item.product.title }}</td>
                            <td class="align-middle">{{ item.qty }}</td>
                            <td class="align-middle text-right">
                                {{ item.product.price | currency }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colspan="2" class="text-right">總計:</td>
                        <td class="text-right">{{ productData.total | currency}}</td>
                        </tr>
                    </tfoot>
                    </table>
                    <table class="table">
                    <tbody>
                        <tr>
                        <th width="100">Email</th>
                        <td>{{  productData.user.email  }}</td>
                        </tr>
                        <tr>
                        <th>姓名</th>
                        <td>{{ productData.user.name }}</td>
                        </tr>
                        <tr>
                        <th>收件人電話</th>
                        <td>{{ productData.user.tel }}</td>
                        </tr>
                        <tr>
                        <th>收件人地址</th>
                        <td>{{ productData.user.address }}</td>
                        </tr>
                        <tr>
                        <th>付款狀態</th>
                        <td>
                            <span v-if="productData.is_paid">付款完成</span>
                            <span v-else>尚未付款</span>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </form>
            </div>
        </div>
    </div>

        <pagination :pages="pagination" @turnPage='getProducts'></pagination>

    </table>
</template>

<script>
import $ from 'jquery';
import Pagination from '../../components/Pagination.vue';
// jQuery是Bootstrap其下的套件 雖然在main.js已經載入Bootstrap
// 如果要使用JQ 必須在這個元件下注入

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      products: [], // 取得所有產品資料
      pagination: {}, // 分頁
      productData: { // 詳細資訊
        user: {},
      },
      isLoading: false, // 讀取資料時是否讀取中
    };
  },
  methods: {
    getProducts(page = 1) {
      // ?page=page 要取得的頁數
      const api = `${process.env.VUE_APP_APIPATH}/API/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true; // 資料讀取中
      vm.$http.get(api).then((response) => {
        vm.isLoading = false; // 資料讀取結束
        vm.products = response.data.orders;
        vm.pagination = response.data.pagination; // 取得資料時把pagination存起來
      });
    },
    openData(item) {
      const vm = this;
      vm.productData = item;
      $('#delProductModal').modal('show');
    },

  },
  created() {
    this.getProducts();
  },
};
</script>

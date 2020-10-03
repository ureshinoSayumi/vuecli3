<template>
    <div class="wrap">
        <loading :active.sync="isLoading"></loading>
        <div class="my-5 row justify-content-center">
            <form class="col-md-6" @submit.prevent="payOrder">
                <table class="table">
                <thead>
                    <th>縮圖</th>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                </thead>
                <tbody>
                    <tr v-for="item in order.products" :key="item.id">
                    <td class="align-middle"><img :src="item.product.imageUrl" ></td>
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle text-right">{{ item.final_total }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                    <td colspan="2" class="text-right">總計</td>
                    <td class="text-right">{{ order.total }}</td>
                    </tr>
                </tfoot>
                </table>
                <table class="table">
                <tbody>
                    <tr>
                    <th width="100">Email</th>
                    <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                    <th>姓名</th>
                    <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                    <th>收件人電話</th>
                    <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                    <th>收件人地址</th>
                    <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                    <th>付款狀態</th>
                    <td>
                        <span v-if="!order.is_paid">尚未付款</span>
                        <span v-else class="text-success">付款完成</span>
                    </td>
                    </tr>
                </tbody>
                </table>
                <div class="text-right" v-if="order.is_paid === false">
                <button class="btn btn-danger">確認付款去</button>
                </div>
                <div class="text-right" v-if="order.is_paid === true">
                <button class="btn btn-danger">
                  <router-link to="/customerOrders">繼續購物</router-link>
                </button>
                </div>
            </form>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              付款成功!
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      order: {
        user: {},
      },
      orderId: '',
      isLoading: false,
    };
  },
  methods: {
    // 取得訂單ID
    getOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.order = response.data.order;
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      vm.$http.post(url).then((response) => {
        // 如果訂單成功結帳，就重新取得資料，讓付款狀態改變
        if (response.data.success) {
          vm.getOrder();
          $('#exampleModal').modal('show');
          setTimeout(() => {
            $('#exampleModal').modal('hide');
          }, 5000);
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId; // 動態取得route上orderId
    this.getOrder();
  },
};
</script>
<style scoped>
img{
  max-width: 100%;
  height: auto;
}
.wrap{
}
.my-5{
  width:100%;
}
.align-middle img{
  width:192.5px;
  height:auto;
}
.text-right button{
  background:#37523d;
  border: 1px solid #37523d;
}
.btn a{
  text-decoration:none;
  color: white;
}
.col-md-6{
}
</style>

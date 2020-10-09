<template>
    <div class="wrap">
      <footerx :cartNum="cartNum" :cart="cart" @goTop="top"></footerx>
        <div class="index">
            <div>
                <a href="#">
                    <router-link to="/">首頁></router-link>
                </a>
                <a href="#">
                    <router-link to="/CustomerOrders">產品列表></router-link>
                </a>
                <a href="#">購物車清單</a>
            </div>
        </div>
        <loading :active.sync="isLoading"></loading>
        <!----------------------------購物車列表---------------------------------->
        <table class="table">
          <thead>
            <th></th>
            <th>縮圖</th>
            <th>品名</th>
            <th>數量</th>
            <th>更改數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm"
                    @click="removeCartItem2(item.id)">
                    <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                <img :src="item.product.imageUrl" >
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
              </td>
              <td class="align-middle">
                {{ item.qty }}/{{ item.product.unit }}
                </td>
                <td class="align-middle">
                  <select name="" class="form-control mt-2"
                    @change="changeCart(item.product.id, num, item.id)" v-model="num">
                      <option :value="num"> {{ item.qty }} {{ item.product.unit }}</option>
                      <option :value="num" v-for="num in 10" :key="num">
                          {{ num  }} {{ item.product.unit }}
                        </option>
                  </select>
                </td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total }}</td>
            </tr>
            <!-----------------折扣價不等於總計時，才顯示折扣價---------------------------->
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input">
          <ValidationProvider rules="required2" v-slot="{ errors }">
            <input type="text" class="form-control"
              v-model="coupon_code" placeholder="請輸入優惠碼(選填)" required2>
              <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary"  type="button" @click="addCouponCode" >
              套用優惠碼
            </button>
          </div>
        </div>
      <div class="my-5 row justify-content-center">
        <form class="col-md-6" @submit.prevent="createOrder">
          <div class="form-group">
            <label for="useremail">Email</label>
            <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">

              <input type="email" class="form-control" name="email" id="useremail"
                v-model="form.user.email" placeholder="請輸入 Email(必填)" required>
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
    <!-----------------透過引用 component 的方式來使用它，rules
        對應的就是我們在main.js自定的規則---------------------------->
    <!-----------------errors[0] 則代表驗證錯誤的話就會顯示該規則底下定義的 messages---------------------------->
    <!-----------------"min:3" 3是傳入的參數，未超過3個字串就顯示錯誤訊息---------------------------->
          <div class="form-group">
            <label for="username">收件人姓名</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input type="text" class="form-control" name="name" id="username"
                v-model="form.user.name" placeholder="請輸入姓名(必填)" required>
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input type="text" class="form-control" id="usertel"
                  v-model="form.user.tel" placeholder="請輸入電話(必填)" required>
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input type="text" class="form-control" name="address" id="useraddress"
                  v-model="form.user.address" placeholder="請輸入地址(必填)" required>
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <ValidationProvider rules="required2" v-slot="{ errors }">
              <label for="comment">留言</label>
              <textarea name="" id="comment" class="form-control" cols="30" rows="10"
                  v-model="form.message" placeholder="請輸入留言(選填)" required2></textarea>
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="text-right">
            <button class="btn btn-danger">送出訂單</button>
          </div>
        </form>
        </div>
          <!-- 彈出式Modal -->
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
              成功刪除產品
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            </div>
          </div>
        </div>
      </div>
          <!-- 彈出式Modal -->
      <div class="modal fade" id="exampleModal2" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              優惠碼錯誤
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 彈出式Modal -->
      <div class="modal fade" id="exampleModal3" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              已更改數量
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
import footerx from '../components/footerx.vue';

export default {
  components: {
    footerx,
  },
  data() {
    return {
      num: '',
      cart: [], // 購物車
      cartNum: '',
      form: { // 送出訂單
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      merge: true,
      isLoading: false, // 是否讀取中(大畫面)
      coupon_code: '',
      status: {
        loadingItem: '', // 儲存item id 確認是否讀取中
      },
    };
  },
  methods: {
    // 取得購物車
    getCart2() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.isLoading = false;
        vm.cart = response.data.data;
        vm.cartNum = response.data.data.carts.length;
      });
    },
    // 取得購物車 並且合併相同產品
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      let qty = 0;
      let id = '';
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.isLoading = false;
        vm.cart = response.data.data;
        vm.cartNum = response.data.data.carts.length;
        vm.cart.carts.forEach((item, index) => {
          vm.cart.carts.forEach((item2, index2) => {
            if (item2.product.title === item.product.title && index !== index2) {
              qty = item.qty + item2.qty;
              vm.removeCartItem(item2.id);
              id = item2.product.id;
              // console.log(id, qty);
            }
            return true;
          });
        });
        if (qty) {
          vm.addtoCart(id, qty);
          qty = 0;
          id = '';
        }
      });
    },
    // 刪除購物車 刪除相同產品
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      vm.$http.delete(url).then(() => {
        vm.getCart2(); // 刪除後，重新取得購物車
        vm.isLoading = false;
      });
    },
    // 刪除購物車
    removeCartItem2(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      vm.$http.delete(url).then(() => {
        vm.getCart2(); // 刪除後，重新取得購物車
        vm.isLoading = false;
        $('#exampleModal').modal('show');
        setTimeout(() => {
          $('#exampleModal').modal('hide');
        }, 2000);
      });
    },
    // 套用優惠卷
    addCouponCode() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      // 套用優惠卷API，參數資料結構
      const coupon = {
        code: vm.coupon_code,
      };
      vm.isLoading = true;
      vm.$http.post(url, { data: coupon }).then((response) => {
        vm.getCart(); // 重新取得購物車
        vm.isLoading = false;
        if (!response.data.success) {
          $('#exampleModal2').modal('show');
          setTimeout(() => {
            $('#exampleModal2').modal('hide');
          }, 2000);
        }
      });
    },
    // 送出訂單
    createOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.isLoading = true;
      vm.$http.post(url, { data: order }).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/CustomerCheckout/${response.data.orderId}`);
        }
        vm.isLoading = false;
      });
    },
    addtoCart(id, qty = 1, id2) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      if (vm.status.loadingItem) {
        return;
      }
      vm.status.loadingItem = id;
      const cart = { // 傳入參數1.物品ID 2.數量
        product_id: id,
        qty,
      };
      vm.$http.post(url, { data: cart }).then(() => {
        vm.status.loadingItem = '';
        if (id2) {
          vm.removeCartItem(id2);
        }
        vm.num = 1;
      });
    },
    // 更改購物車數量
    changeCart(id, qty = 1, id2) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      if (vm.status.loadingItem) {
        return;
      }
      vm.status.loadingItem = id;
      const cart = { // 傳入參數1.物品ID 2.數量
        product_id: id,
        qty,
      };
      vm.$http.post(url, { data: cart }).then(() => {
        vm.status.loadingItem = '';
        if (id2) {
          vm.removeCartItem(id2);
        }
        vm.num = 1;
        $('#exampleModal3').modal('show');
        setTimeout(() => {
          $('#exampleModal3').modal('hide');
        }, 2000);
      });
    },
    top() {
      $('html,wrap').animate({
        scrollTop: 0,
      }, 700);
    },
  },
  created() {
    this.getCart();
    this.top();
  },
};
</script>

<style scoped>
img{
  max-width: 100%;
  height: auto;
}
.btn{
}
.index{
  max-width:910px;
  height:40px;
  margin-left: auto ;
  margin-right: auto;
  padding:10px;
  background: #e7eeea;
  border-radius:10px;
}
.index a{
  color:#37523d;
}
.wrap{
  max-width:1063px;
  margin-left: auto ;
  margin-right: auto;
}
.table{
  max-width:900px;
  margin-left: auto;
  margin-right: auto;
}
.align-middle img{
  width:192.5px;
  height: auto;
}
.text-right button{
  background:#37523d;
  border:1px solid #37523d;
}
.input{
  margin: auto;
  display:flex;
  max-width:320px;
  height:80px;
}
.input input{
  max-width:415px;
}
.input button{
  height:38px;
}
.my-5{
  width:100%;
}
@media(max-width:768px){
  .my-5{
    margin: 0 auto;
  }
}
</style>

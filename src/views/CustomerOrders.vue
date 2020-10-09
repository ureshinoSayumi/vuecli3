<template>
    <div>
      <div class="wrap">
        <footerx class="footerx" :cartNum="cartNum" :cart="cart" @goTop="top"></footerx>
        <div class="leftMenu">
          <ul class="leftMenuUl">
                <li><a class="leftMenuA" :class="{'active':menu.all}"
                  href="#" @click.prevent="search(str);
                  menu.all=true;menu.chair=false;menu.table=false;
                  menu.sofa=false;menu.bad=false;">全部商品</a></li>

                <li><a class="leftMenuA" :class="{'active':menu.chair }"
                  href="#" @click.prevent="search('椅子','category');
                  menu.chair=true;menu.all=false;menu.table=false;
                  menu.sofa=false;menu.bad=false;">椅子</a></li>
                <li><a class="leftMenuA" :class="{'active':menu.table}"
                  href="#" @click.prevent="search('桌子','category');
                  menu.table=true;menu.chair=false;menu.all=false;
                  menu.sofa=false;menu.bad=false;">桌子</a></li>
                <li><a class="leftMenuA" :class="{'active':menu.sofa}"
                  href="#" @click.prevent="search('沙發','category');
                  menu.sofa=true;menu.chair=false;menu.table=false;
                  menu.all=false;menu.bad=false;">沙發</a></li>
                <li><a class="leftMenuA" :class="{'active':menu.bad}"
                  href="#" @click.prevent="search('床','category');
                  menu.bad=true;menu.chair=false;menu.table=false;
                  menu.sofa=false;menu.all=false;">床</a></li>
          </ul>
        </div>
        <div class="leftMenuU"></div>
        <div class="leftMenuFixed">
          <ul>
                <li><a class="leftMenuA" :class="{'active':menu.all}"
                  href="#" @click.prevent="search(str);
                  menu.all=true;menu.chair=false;menu.table=false;
                  menu.sofa=false;menu.bad=false;">全部商品</a></li>

                <li><a class="leftMenuA" :class="{'active':menu.chair }"
                  href="#" @click.prevent="search('椅子','category');
                  menu.chair=true;menu.all=false;menu.table=false;
                  menu.sofa=false;menu.bad=false;">椅子</a></li>
                <li><a class="leftMenuA" :class="{'active':menu.table}"
                  href="#" @click.prevent="search('桌子','category');
                  menu.table=true;menu.chair=false;menu.all=false;
                  menu.sofa=false;menu.bad=false;">桌子</a></li>
                <li><a class="leftMenuA" :class="{'active':menu.sofa}"
                  href="#" @click.prevent="search('沙發','category');
                  menu.sofa=true;menu.chair=false;menu.table=false;
                  menu.all=false;menu.bad=false;">沙發</a></li>
                <li><a class="leftMenuA" :class="{'active':menu.bad}"
                  href="#" @click.prevent="search('床','category');
                  menu.bad=true;menu.chair=false;menu.table=false;
                  menu.sofa=false;menu.all=false;">床</a></li>
          </ul>
        </div>

        <div class="main">
            <!---------------------------- <Navbar></Navbar>---------------------------------->
            <loading :active.sync="isLoading"></loading>
            <div class="search">
              <input @keyup.enter="search(str)" class="form-control"
                id="usertel" v-model="str" placeholder="搜尋">
              <button class="searchButton" style="border:0; padding:8px;"
                type="button" @click="search(str)" >
                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0
                    1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                  <path fill-rule="evenodd"
                    d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5
                    6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                </svg>
              </button>
            </div>
            <div class="products">
                <div class="card1" v-for="item in products" :key="item.id">
                    <a href="#" class="card">
                          <a class="cardMenuA">
                            <div class="cardMenuImg" @click.prevent="getProduct(item.id)"
                              :style="{ backgroundImage: `url(${item.imageUrl})` }">
                            </div>
                          </a>
                          <div class="cardMenu">
                            <div class="cardMenuTitle">
                              <h5>{{ item.title }}</h5>
                            </div>
                            <div class="cardMenuPrice">
                              <h5>NT{{ item.price | currency}} 元</h5>
                            </div>
                          </div>

                          <div class="cardButton">
                            <button @click.prevent="getProduct(item.id)"
                              type="button" class="cardButton1">
                              <i class="fas fa-spinner fa-spin"
                              v-if="status.loadingItem === item.id"></i>
                              查看更多
                            </button>
                            <button
                              @click.prevent="addtoCart(item.id)"
                              type="button" class="cardButton2">
                              <i class="fas fa-spinner fa-spin"
                              v-if="status.loadingItem === item.id"></i>
                              加到購物車
                            </button>
                          </div>
                    </a>
                </div>
            </div>
            <div class="pagination">
              <pagination :pages="pagination" @turnPage='getProducts'></pagination>
            </div>
        </div>
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
              成功加入購物車
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
import Pagination from '../components/Pagination.vue';

export default {
  components: {
    footerx,
    Pagination,
  },
  data() {
    return {
      products: [], // 取得產品資料
      product: {}, // 單一產品資料
      pagination: {}, // 分頁
      str: '', // 搜尋輸入框
      productsBackup: [], // 搜尋備份
      Allpagination: [], // 所有產品資料
      cart: [], // 購物車
      cartNum: '', // 購物車數量
      status: {
        loadingItem: '', // 儲存item id 確認是否讀取中
      },
      form: { // 送出訂單
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      menu: {
        all: true,
        chair: false,
        table: false,
        bad: false,
        sofa: false,
      },
      isTransform: false,
      isLoading: false, // 是否讀取中(大畫面)
      coupon_code: '',
    };
  },
  methods: {
    // 用戶端取得資料API
    getProducts(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.products = response.data.products;
        vm.productsBackup = response.data.products; // 備份用
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      });
    },
    // 取得單一產品API
    getProduct(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/ProductDetails/${response.data.product.id}`);
        }
        vm.product = response.data.product;
        vm.status.loadingItem = '';
      });
    },
    // 加購物車API
    addtoCart(id, qty = 1) {
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
        vm.getCart();
        $('#exampleModal').modal('show');
        setTimeout(() => {
          $('#exampleModal').modal('hide');
        }, 2000);
      });
    },
    // 取得構物車
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.isLoading = false;
        vm.cart = response.data.data;
        vm.cartNum = response.data.data.carts.length;
      });
    },
    // 刪除購物車
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      vm.$http.delete(url).then(() => {
        vm.getCart(); // 刪除後，重新取得購物車
        vm.isLoading = false;
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
      vm.$http.post(url, { data: coupon }).then(() => {
        vm.getCart(); // 重新取得購物車
        vm.isLoading = false;
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
          vm.$router.push(`/customerOrders/${response.data.orderId}`);
        }
        vm.isLoading = false;
      });
    },
    // 搜尋
    search(str, category = 'title') {
      const vm = this;
      // 原有產品資料清空，使用備份的productsBackup，避免二次搜尋時，原有資料被覆蓋
      vm.products = [];
      vm.isLoading = true;
      vm.Allpagination.forEach((item) => {
        // console.log(item);
        // 如果搜尋欄位未輸入值，就重新抓取資料
        if (str === '') {
          vm.products = vm.productsBackup;
          vm.getProducts();
        } else if (item[category].indexOf(str) === -1) { // 如果沒有搜尋到
        } else {
          vm.products.push(item);
        }
      });
      vm.pagination.total_pages = 1;
      vm.isLoading = false;
    },
    getAllProducts() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.Allpagination = response.data.products;
        vm.isLoading = false;
      });
    },
    top() {
      $('html,wrap0').animate({
        scrollTop: 0,
      }, 700);
    },
  },
  created() {
    this.getProducts();
    this.getCart();
    this.getAllProducts();
  },
};
</script>

<style scoped>
ul{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
a{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  text-decoration:none;
  color:black;
}

ol, ul{
list-style: none;
}
.card :hover{
}
.products{
  display:flex;
  /*justify-content:center;*/
  flex-wrap: wrap;
}
.cardMenuImg{
  height: 250px;
  background-size: cover;
  background-position:center;
}
.card1{
  /*margin:0 auto;*/
  padding:10px;
}
.card{
  display:block;
  max-width:333.3px;
}
.cardMenuA :hover{
  transform:scale(1.1,1.1);
}
.cardMenu{
  display:flex;
  justify-content:space-around;
  align-items:center;
  border:1px solid #e7eeea;
}
.cardMenuTitle{
  width:167px;
  border-right:1px solid #e7eeea;
  padding:15px;
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  align-items:center;
}
.cardMenuPrice{
  width:167px;
  padding:15px;
  flex-direction:row;
  display:flex;
  justify-content:space-around;
  align-items:center;
}
.cardButton{
  display:flex;
  justify-content:space-around;
}
.cardButton button{
  width:167px;
  height:62px;
}
.cardButton1{
  border:0;
  background:#e7eeea;
  border-right:1px solid #cccccc;
  color: #37523d;
  font-size:18px;
}
.cardButton2{
  border:0;
  background:#e7eeea;
  color:#37523d;
  font-size:18px;
}
.cardButton button:hover{
  background:#37523d;
  color:white;
}
.index{
    max-width:1063px;
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
  max-width:1430px;
  margin-left: auto ;
  margin-right: auto;
  display:flex;
}
.leftMenu{
  opacity:0;
  margin-top:78px;
  /*height:800px;*/
  background:white;
}
.leftMenuA{
  display: block;
  width: 150px;
  height:58px;
  text-decoration:none;
  border-bottom: 1px solid #cccccc;
  background:#e7eeea;
  text-align: center;
  color:#37523d;
  padding-top: 17px;
  font-size: 15px;
}

.leftMenuFixed{
  position: fixed;
  left: 42px;
  top: 170px;
  z-index:10;
}
.leftMenuU{
  /*width:150px;*/
}
.active{
    display: block;
    /*background:#4EFEB3;*/
    height:58px;
    text-decoration:none;
    border: 1px solid #e7eeea;
    text-align: center;
    color:white;
    background: #37523d;
}
.leftMenuA:hover{
  background: #37523d;
  color:white;
}
.leftMenu p{
    text-align: center;
    padding-top: 17px;
    width: 298px;
    height:58px;
    background: #37523d;
    border: 1px solid #37523d;
    color:white;
}
.main{
  max-width:1063px;
  margin: 0 auto;
}
.col{
  /*width:333.33px*/;
}
/*.card{
  width:333.33px;
  height:376px;
}*/
.search {
  display: flex;
  max-width:1063px;
  margin-top:30px;
};
.searchButton {
  display:block;
  border:0;
  width:150px;
  height:50px;
}
.pagination{
  max-width:135px;
  margin:0 auto;
}
@media(max-width:1225px){
  .card1{
    margin:0 auto;
  }
}
@media(max-width:768px){
  .wrap{
    flex-direction:column;
  }
  .main{
  }
  .leftMenu{
    opacity:1.0;
    margin:0 auto;
  }
  .leftMenu ul{
    display:flex;
    /*flex-wrap:wrap;*/
    max-width:768px;
  }
  .active{
    display: block;
    /*background:#4EFEB3;*/
    height:58px;
    text-decoration:none;
    border: 1px solid #e7eeea;
    text-align: center;
    color:white;
    background: #37523d;
    padding-top: 17px;
  }
  .leftMenuA{
    max-width:100px;
    height:50px;
    font-size: 13px;
  }
  .index{
    display:none;
  }
  .search{
    margin-top:10px;
  }
  .leftMenuFixed{
    display: none;
}
}
@media(min-width: 375px) and (max-width: 650px){
  .leftMenuA{
    max-width:70px;
  }
  .footerx{
    display:none;
  }
}
</style>

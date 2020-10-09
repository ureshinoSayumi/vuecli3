<template>
    <div>
        <footerx class="footerx" :cartNum="cartNum" :cart="cart" @goTop="top"></footerx>
        <loading :active.sync="isLoading"></loading>
        <div class="wrap">
            <div class="index">
                <div>
                    <a href="#">
                        <router-link to="/">首頁></router-link>
                    </a>
                    <a href="#">
                        <router-link to="/CustomerOrders">產品列表></router-link>
                    </a>
                    <a href="#">{{ product.title }}</a>
                </div>
            </div>
            <h3 class="title">【{{ product.title }}】</h3>
            <div class="product">
                <div class="productImg">
                    <img  :src="product.imageUrl" class="img-fluid" alt="">
                    <div class="productRemarks">
                        <h5>商品備註</h5>
                        <ul>
                            <li>物品狀況： 全新</li>
                            <li>物品所在地： 台灣.台北市</li>
                            <li>上架時間： 2019-05-17 15:28:10</li>
                            <li>可能會提前結束販售</li>
                        </ul>
                    </div>
                </div>
                <div class="productManu0">
                    <div class="productManu">
                        <div class="productManu-0">
                            <h6>{{ product.content }}</h6>
                            <h6>{{ product.description }}</h6>
                        </div>
                        <div class="productManu-1">
                            <div class="originPriceX" v-if="!product.price">
                                {{ product.origin_price | currency }} 元</div>
                            <div class="originPrice" v-if="product.price">
                                <h4>原價 {{ product.origin_price | currency }} 元</h4>
                            </div>
                            <div class="price" v-if="product.price">
                                <h4>網路價 {{ product.price | currency }} 元</h4>
                            </div>
                        </div>
                        <div class="productManu-2">
                            <select name="" class="form-control mt-3" v-model="product.num">
                                <option :value="num" v-for="num in 10" :key="num">
                                    選購 {{ num }} {{ product.unit }}
                                </option>
                            </select>
                        </div>
                        <div class="productManu-3">
                            <h6>總計{{ product.num * product.price | currency }}元</h6>
                            <button type="button" class="btn btn-primary"
                                @click="addtoCart(product.id, product.num)">
                            <i class="fas fa-spinner fa-spin"
                                v-if="product.id === status.loadingItem"></i>
                            加到購物車
                            </button>
                        </div>
                    </div>
                    <div class="productManu-4">
                        <p>優惠活動：限時！全館消費免運。</p>
                    </div>
                    <div class="productManu-5">
                        <h6>付款方式:</h6>
                        <ul>
                            <li><img src="https://upload.cc/i1/2020/08/15/Z9u1wK.png">全家取貨付款</li>
                            <li><img src="https://upload.cc/i1/2020/08/15/5cdIyr.png">7-11取貨付款</li>
                            <li>銀行或郵局轉帳</li>
                            <li>貨到付款</li>
                        </ul>
                    </div>
                    <div class="productManu-5">
                        <h6>運送方式:</h6>
                        <ul>
                            <li><img src="https://upload.cc/i1/2020/08/15/Z9u1wK.png">全家取貨付款 60 元</li>
                            <li><img src="https://upload.cc/i1/2020/08/15/5cdIyr.png">7-11取貨付款 60 元</li>
                            <li>宅配/快遞 100 元</li>
                            <li>貨到付款 130 元</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="Popular">
                <h5>熱銷商品</h5>
            </div>
            <div class="center-1-flex" >
                <a href="#" @click="getProduct(products[0].id)">
                    <img :src="products[0].imageUrl" class="d-block w-100" alt="..."
                        v-if="!isLoading">
                    <h6>{{ products[0].title }}</h6>
                </a>
                <a href="#" @click="getProduct(products[1].id)">
                    <img :src="products[1].imageUrl" class="d-block w-100" alt="..."
                        v-if="!isLoading">
                    <h6>{{ products[1].title }}</h6>
                </a>
                <a href="#" @click="getProduct(products[2].id)">
                    <img :src="products[2].imageUrl" class="d-block w-100" alt="..."
                        v-if="!isLoading">
                    <h6>{{ products[2].title }}</h6>
                </a>
                <a href="#" @click="getProduct(products[3].id)">
                    <img :src="products[3].imageUrl" class="d-block w-100" alt="..."
                        v-if="!isLoading">
                    <h6>{{ products[3].title }}</h6>
                </a>
                    <!-- 彈出式Modal -->
                <div class="modal fade" id="exampleModal"
                    tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <button type="button" class="btn btn-secondary"
                            data-dismiss="modal">關閉</button>
                        </div>
                    </div>
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
      id: '',
      product: [],
      products: [
        {
          imageUrl: '',
          title: '',
          id: '',
        },
        {
          imageUrl: '',
          title: '',
          id: '',
        },
        {
          imageUrl: '',
          title: '',
          id: '',
        },
        {
          imageUrl: '',
          title: '',
          id: '',
        },
      ],
      pagination: [],
      cart: [],
      cartNum: '',
      status: {
        loadingItem: '', // 儲存item id 確認是否讀取中
      },
      isLoading: false,
    };
  },
  methods: {
    // 取得資料
    getProducts(page = 1) {
      // ?page=page 要取得的頁數
      const api = `${process.env.VUE_APP_APIPATH}/API/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      // 使用main.js載入的AJAX套件來載入AJAX
      const vm = this;
      vm.isLoading = true; // 資料讀取中
      vm.$http.get(api).then((response) => {
        vm.isLoading = false; // 資料讀取結束
        vm.products = response.data.products;
        vm.pagination = response.data.pagination; // 取得資料時把pagination存起來
      });
    },
    // 取得單一產品API
    getProduct(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/productDetails/${response.data.product.id}`);
        }
        vm.isLoading = false;
        vm.product = response.data.product;
        vm.product.num = 1;
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
        // vm.products = response.data.products;
        vm.isLoading = false;
        vm.cart = response.data.data;
        vm.cartNum = response.data.data.carts.length;
      });
    },
    top() {
      $('html,wrap').animate({
        scrollTop: 0,
      }, 700);
    },
  },
  created() {
    this.id = this.$route.params.id; // 動態取得route上id
    this.getProduct(this.id);
    this.getCart();
    this.getProducts();
    this.top();
  },
};
</script>

<style scoped>
img{
  max-width:100%;
  height:auto;
}
ul, li{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
ol, ul {
  list-style: none;
}
.btn{
  background:#37523d;
  border: 1px solid #37523d;
}
.index{
  height:40px;
  padding:10px;
  background: #e7eeea;
  border-radius:10px;
  margin-bottom:15px;
}
.index a{
  color:#37523d;
}
.wrap{
  max-width:1063px;
  margin-left: auto ;
  margin-right: auto;
}
.product{
  display:flex;
  justify-content:space-around;
  max-width:1063px;
}
.product img{
  width:100%;
}
.productImg{
  width:40%;
  height:auto;
}
.productRemarks{
  margin-top:20px;
}
.productRemarks h5{
  padding-left:10px;
}
.productRemarks li{
  margin-top:10px;
  padding-left:10px;
}
.productManu0{
  width:60%;
}
.productManu{
  margin-left:20px;
  border-radius:10px;
  max-width:600px;
  background: #e7eeea;
  padding:15px;
}
.productManu-0{
  display:flex;
  justify-content:space-between;
}
.productManu-1{
  display:flex;
  justify-content:space-between;
  margin-top:10px;
}
.originPrice{
  text-decoration:line-through;
}
.productManu-2{
  width:150px;
}
.productManu-3{
  display:flex;
  justify-content:flex-end;
  margin-top:20px;
}
.productManu-3 h6{
  margin:10px;
}
.productManu-4{
  margin-left:20px;
  margin-top:10px;
  border-bottom:1px solid #cccccc;
}
.productManu-5{
  display:flex;
  margin-top:20px;
  margin-left:20px;
  max-width:250px;
}
.productManu-5 img{
  width:20px;
  height:20px;
}
.productManu-5 li{
  padding-left:10px;
  margin-bottom:10px;
}
.productManu-5Button{
  margin-left:auto;
  margin-top:auto;
}

.Popular h5{
  margin-top:30px;
  padding-top:15px;
  border-top: 1px solid #cccccc;
  text-align:center;
}
.center-1-flex {
  display:flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
}
.center-1-flex a{
  display:block;
  width:25%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom:50px;
  padding:5px;
}
.center-1-flex h6{
  font-size:13px;
  color:#37523d;
  text-align:center;
}
@media(max-width:768px){
  .product{
    flex-direction:column;
  }
  .title{
    text-align:center;
  }
  .productImg{
    width:57%;
    height:auto;
    margin:0 auto;
    padding-left:20px;
  }
  .productRemarks{
    display:none;
  }
  .productManu h4{
    font-size:17px;
  }
  .productManu h6{
      font-size:13px;
  }
  .productManu0{
    margin:0 auto;
  }
  .productManu-5{
    margin:0 auto;
  }
  .center-1-flex a{
    width:50%;
  }
}
@media(max-width:375px){
  .productImg{
    width:90%;
    margin-left:18px;
  }
  .productManu0{
    width:95%;
  }
  .productManu h4{
    font-size:13px;
  }
  .productManu h6{
    font-size:10px;
  }
  .productManu-0{
      display:none;
  }
  .center-1-flex a{
    width:100%;
  }
  .footerx{
  }
}
</style>

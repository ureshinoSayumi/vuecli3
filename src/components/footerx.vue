<template>
    <div>
        <div class="footer">
            <img @click="top" src="https://upload.cc/i1/2020/08/15/AqLZ9i.png">
            <div>
                <div class="cart">
                    <div class="btn-group dropup">
                        <button type="button" @click="xxx"
                            class="btn btn-secondary dropdown-toggle"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg width="2em" height="2.5em" viewBox="0 0 16 16"
                                class="bi bi-cart-fill" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1
                                    .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5
                                    8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61
                                    2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7
                                    0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0
                                    0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            </svg>
                            <div class="cart-1" v-if="cartNum">
                                <p> {{ cartNum }} </p>
                            </div>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right" id="123">
                            <div class="menuTitle">
                                <h3>購物車清單</h3>
                            </div>
                            <div class="menuMenu" v-for="(item) in cart.carts"
                                :key="item.id">
                                <div class="menuMenuNum0">
                                    {{ item.product.title }}
                                </div>
                                <div class="menuMenuNum1">
                                    {{ item.qty }} {{ item.product.unit }}
                                </div>
                            </div>
                            <router-link to="/shoppingCart">
                                <button type="button" class="btn btn-primary" v-if="cartNum">
                                    查看購物車
                                </button>
                            </router-link>
                            <router-link to="/customerOrders">
                                <button type="button" class="btn btn-primary" v-if="!cartNum">
                                    立即去購物
                                </button>
                            </router-link>
                            <!-- Dropdown menu links -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';

export default {
  // 定義傳入元件資料
  name: 'footerx',
  props: ['cartNum', 'cart'],
  data() {
    return {
      isTransform: false,
      isLoading: false, // 是否讀取中(大畫面)
    };
  },
  methods: {
    xxx() {
      setTimeout(() => {
        $('.dropdown-menu').dropdown('hide');
      }, 5000);
    },
    top() {
      this.$emit('goTop');
    },
  },
  created() {
  },
};
</script>

<style scoped>
.footer2{
    position: fixed;
    right: 50px;
    top: 300px;
    z-index:10;
}
.footer{
    position: fixed;
    height:170px;
    width:80px;
    border-radius:5%;
    background:white;
    right: 20px;
    top: 500px;
    z-index:10;
}
.footer img{
    width: 50px;
    height: 50px;
    margin-top:20px;
    margin-bottom:10px;
    margin-left:15px;
}
.border{
    width:300px;
    border-top:1px solid black;
}

.cart{
    position:relative;
    margin-top:10px;
}
.cart-1{
    width:20px;
    height:20px;
    background:red;
    z-index:9;
    position:absolute;
    top:5px;
    left:30px;
    border-radius:999em;
}
.cart-1 p{
    color:white;
    padding-right:0px;
    font-size:15px;
}
.btn{
    background:#37523d;
    margin:5px;
    border: 1px solid #37523d;
}
.btn2{
    background:#37523d;
    margin:5px;
    border: 1px solid #37523d;
}
.dropdown-menu{
    width:300px;
    padding:15px;
}
.menuTitle{
    border-bottom:1px solid #cccccc;
}
.menuTitle h3{
    font-size:20px;
    text-align:center;
}
.menuMenu{
    display:flex;
    justify-content:space-between;
    border-bottom:1px solid #cccccc;
    padding:5px;
}
.menuMenuNum0{
    width:100px;
}
.menuMenuNum2{
    width:100px;
}
.menuMenuNum1{
    width:50px;
}
</style>

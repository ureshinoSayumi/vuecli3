<template>
  <div>
        <div class="top">
            <router-link to="/">
                <img src="https://upload.cc/i1/2020/09/08/Yvtk7u.jpg" alt="">
            </router-link>
            <ul class="topLi">
                <li>
                    <a href="" target="_blank">
                        <router-link to="/">Home</router-link>
                    </a>
                </li>
                <li>
                    <a href="" target="_blank">
                        <router-link to="/customerOrders">產品列表</router-link>
                    </a>
                </li>
                <li>
                    <a href="" target="_blank">
                        <router-link to="/login">登入</router-link>
                    </a>
                </li>
            </ul>
        </div>
        <router-view></router-view>
        <div class="border"></div>
        <div class="copyright">
            <p>資料、圖片、文章來源皆來自網路，僅用來做為學習用途。</p>
        </div>
        <div class="bottom">
            <div  class="bottomA">
                <router-link to="/">
                    <img src="https://upload.cc/i1/2020/09/08/Yvtk7u.jpg" alt="" class="bottomImg">
                </router-link>
            </div>
            <ul class="bottomCommunity">
                <li>
                    <a href="#">
                        <img src="https://upload.cc/i1/2020/09/10/4Cko89.png">
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="https://upload.cc/i1/2020/09/10/kiD4Rx.png">
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="https://upload.cc/i1/2020/09/10/W4v0CO.png">
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="https://upload.cc/i1/2020/09/10/LYAgjl.png">
                    </a>
                </li>
            </ul>
            <ul class="bottomUl">
                <li>
                    <a href="" target="_blank">
                        <router-link to="/">Home</router-link>
                    </a>
                </li>
                <li>
                    <a href="" target="_blank">
                        <router-link to="/CustomerOrders">產品列表</router-link>
                    </a>
                </li>
                <li>
                    <a href="" target="_blank">
                        <router-link to="/login">登入</router-link>
                    </a>
                </li>
            </ul>
        </div>
  </div>
</template>

<script>
// jQuery是Bootstrap其下的套件 雖然在main.js已經載入Bootstrap
// 如果要使用JQ 必須在這個元件下注入
import $ from 'jquery';

export default {
  components: {
  },
  data() {
    return {
      cart: [], //  購物車
      cartNum: '', //  購物車數量
      isTransform: false,
      isLoading: false, // 是否讀取中(大畫面)
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.isLoading = false;
        vm.cart = response.data.data;
        vm.cartNum = response.data.data.carts.length;
      });
    },
    // 向上滑動
    top() {
      $('html,wrap').animate({
        scrollTop: 0,
      }, 700);
    },
  },

  created() {
  },
};
</script>

<style scoped>
ol, ul {list-style: none;}
.footer{
    position: fixed;
    right: 50px;
    top: 500px;
    z-index:10;
}
.footer img{
    width: 50px;
    height: 50px;
}
.top{
    margin-bottom:20px;
    background:#37523d;
    height:70px;
    display: flex;
    justify-content: space-between;
}
.top img{
    margin-left: 30px;
    margin-top: 5px;
    height: 60px;
}
.top ul{
    font-family:sans-serif;
    display:flex;
    margin: 15px;
}
.top li{
}
.topLi a{
    text-decoration:none;
    font-size: 20px;
    color: white;
    display: block;
    text-align: center;
    padding-top:3px;
    width: 120px;
    height:40px;
}
.topLi a:hover{
    background: #e7eeea;
    color:#37523d;
}
.cart{
    position:relative;
}
.cart-1{
    width:20px;
    height:20px;
    background:red;
    z-index:9;
    position:absolute;
    top:15px;
    right:40px;
    border-radius:999em;
}
.cart-1 p{
    color:white;
    font-size:15px;
}

.border{
    margin:20px;
    border-top:1px #cccccc solid;
}
.bottomCommunity ul{
    display:flex;
}
.bottomCommunity li{
    /*margin-left: auto;
    margin-right: auto;*/
}
.bottomCommunity img{
    width:40px;
    height:40px;
}
.copyright{
    width:400px;
    margin-left: auto;
    margin-right: auto;
}
.copyright p{
}
.bottom{
    display:flex;
    justify-content:space-around;
    margin-top:20px;
    background: #37523d;
    /* width:50px; */
}
.bottom ul{
    display:flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    width: 400px;
    height: 60px;
    /* border: 1px solid black; */
}
.bottom li{
    /* border: 1px solid black; */
    margin:auto;
}
.bottomUl a{
    font-family:sans-serif;
    text-decoration:none;
    text-align: center;
    color: white;
    font-size: 20px;
    display: block;
    width: 100px;
    height: 45px;
    padding-top:5px;
}
.bottomUl a:hover{
    background:#e7eeea;
    color:#37523d;
}
.bottomA{
    display:block;
    width:450px;
}
.bottomImg{
    margin-left:30px;
    margin-top: 15px;
    height: 60px
}
</style>

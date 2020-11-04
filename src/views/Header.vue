<template>
  <div class="wrap" :class="{'active':menu}">
        <nav class="top">
            <router-link to="/">
                <img src="https://upload.cc/i1/2020/09/08/Yvtk7u.jpg" alt="">
            </router-link>
            <header class="menuImg">
                <img src="https://upload.cc/i1/2020/10/17/TKVMSv.png"
                @click="menu = !menu">
            </header>
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
                        <router-link to="/login">後臺登入</router-link>
                    </a>
                </li>
            </ul>
        </nav>
        <router-view></router-view>
        <div class="border"></div>
        <footer class="copyright">
            <p>資料、圖片、文章來源皆來自網路，僅用來做為學習用途。</p>
        </footer>
        <nav class="bottom footer">
            <header class="bottomA">
                <router-link to="/">
                    <img src="https://upload.cc/i1/2020/09/08/Yvtk7u.jpg" alt="" class="bottomImg">
                </router-link>
            </header>
            <ul class="bottomCommunity">
                <li>
                    <a href="#">
                        <img src="https://upload.cc/i1/2020/10/07/q8Kgc6.png">
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="https://upload.cc/i1/2020/10/07/dn6mH0.png">
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="https://upload.cc/i1/2020/10/07/GTiS4z.png">
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="https://upload.cc/i1/2020/10/07/jX0ziN.png">
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
                        <router-link to="/login">後臺登入</router-link>
                    </a>
                </li>
            </ul>
        </nav>
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
      menu: false,
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
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
img{
  max-width: 100%;
  height: auto;
}
ol, ul {list-style: none;}
.btnn{
  background:#37523d;
  width:70px;
  height:70px;
  border-radius:5px;
  border: 1px solid #37523d;
}
.top{
  width:100%;
  margin-bottom:20px;
  background:#37523d;
  height:70px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.top img{
  margin-top: 5px;
  height: 60px;
}
.topLi{
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
.bottomCommunity{
  display:flex;
}
.bottomCommunity img{
  width:40px;
  height:40px;
}
.copyright{
  max-width:400px;
  margin-left: auto;
  margin-right: auto;
}
.bottom{
  width:100%;
  display:flex;
  justify-content:space-around;
  margin-top:20px;
  background: #37523d;
}
.bottom ul{
  display:flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  width: 400px;
  height: 60px;
}
.bottom li{
  margin:auto;
}
.bottomUl a{
  font-family:sans-serif;
  text-decoration:none;
  text-align: center;
  color: white;
  background:#37523d;
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
.menuImg{
  display:none;
}
.menuUl a{
  text-decoration:none;
  font-size: 20px;
  color: white;
  background: #37523d;
  display: block;
  text-align: center;
  padding:10px 20px 10px 20px;
}
.menuUl a:hover{
  background: #e7eeea;
  color:#37523d;
}
@media(max-width:768px){
  .menuImg{
    margin-right:10px;
    display:block;
  }
  .topLi{
    max-height: 0px;
    overflow: hidden;
    transition: max-height 2.3s;
    margin-top: 1px;
    position: absolute;
    z-index: 100;
    top: 65px;
    left: 0;
    right: 0;
    background: #37523d;
    margin: 0px;
    flex-direction:column;
  }
  .topLi li{
    border-bottom:1px dashed white;
  }
  .topLi a{
    text-decoration:none;
    font-size: 20px;
    color: white;
    display: block;
    text-align: center;
    padding:10px;
    width: 100%;
    height: 100%;
    margin: 0 auto
  }
  .active .topLi{
    max-height: 220px
  }
  .bottom{
    padding-right:10px;
    display:flex;
    justify-content:center;
  }
  .bottomA{
    display:none;
  }
  .bottom .bottomUl{
    display:none;
  }
  .copyright{
    margin-left:20px;
    margin-right:20px;
  }
}
@media(max-width:414px){
  .top img{
    margin-left:0px;
  }
}
</style>

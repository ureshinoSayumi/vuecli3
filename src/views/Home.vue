<template>

    <div>
        <!---------------------------載入元件---------------------------------->
        <footerx class="footerx" :cartNum="cartNum" :cart="cart" @goTop="top"></footerx>

        <div class="wrap">
            <!---------------------------最新消息---------------------------------->
            <div class="banner">
                <h4>最新消息</h4>
                <img src="https://upload.cc/i1/2020/08/09/WmSna5.png">
                <h5>開幕優惠! 優惠卷即刻領取，數量有限，要搶要快!</h5>
            </div>

            <div class="center">
                <!---------------------------bs輪播---------------------------------->
                <header id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0"
                          class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active" data-interval="5000">
                        <router-link to="/CustomerOrders">
                          <img src="https://upload.cc/i1/2020/11/04/UcpCRJ.jpg" class="d-block w-100" alt="...">
                          <a href="" class="carousel-item-a">馬上購物→</a>
                        </router-link>
                        </div>
                        <div class="carousel-item" data-interval="5000">
                            <router-link to="/CustomerOrders">
                              <img src="https://upload.cc/i1/2020/11/04/QqAMGV.jpg" class="d-block w-100" alt="...">
                              <a href="" class="carousel-item-a">馬上購物→</a>
                            </router-link>
                        </div>
                        <div class="carousel-item" data-interval="5000">
                            <router-link to="/CustomerOrders">
                              <img src="https://upload.cc/i1/2020/11/04/4PTuCq.jpg" class="d-block w-100" alt="...">
                              <a href="" class="carousel-item-a">馬上購物→</a>
                            </router-link>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls"
                      role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls"
                      role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </header>
            </div>

            <div class="border"></div>
            <!---------------------------熱銷商品---------------------------------->
            <div class="center-1">

                <div>
                    <h2 class="centerTitle">熱銷商品</h2>
                    <p class="centerText">下班休憩好家具，滿足任何型態、任何地點的需求，找到最放鬆的方式，享受舒適的坐臥</p>
                </div>

                <ul class="center-1-flex">
                  <li>
                    <router-link to="/productDetails/-MEgehvtQaiXwxJygsgR">
                        <i class="fas fa-spinner fa-spin fa-10x" v-if="isLoading"></i>
                        <img :src="products[0].imageUrl" class="d-block w-100"
                          alt="..." v-if="!isLoading">
                        <h5>{{ products[0].title }}</h5>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/productDetails/-MEgeY-fpt8JByL8Uw0r">
                        <i class="fas fa-spinner fa-spin fa-10x" v-if="isLoading"></i>
                        <img :src="products[1].imageUrl" class="d-block w-100"
                          alt="..." v-if="!isLoading">
                        <h5>{{ products[1].title }}</h5>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/productDetails/-MEgeI9pvhhvQBAsKrJT">
                        <i class="fas fa-spinner fa-spin fa-10x" v-if="isLoading"></i>
                        <img :src="products[2].imageUrl" class="d-block w-100"
                        alt="..." v-if="!isLoading">
                        <h5>{{ products[2].title }}</h5>
                    </router-link>
                  </li>
                </ul>
            </div>
            <div class="border"></div>

            <!---------------------------北歐風 3 大重點---------------------------------->
            <div>
                <h2 class="centerTitle">北歐風 3 大重點！</h2>
            </div>

            <div class="center-1-explanation">
                <div class="center-1-explanation-text">
                    <h5>寬敞明亮高採光｜放大居家視野</h5>
                    <p>
                        北歐風格對於採光有高度的要求，所以在設計中，
                        除了善用留白空間，大量運用採光也是一大設計重點。
                        運用大片的落地窗納入陽光，營造舒適環境氛圍；高採光空間使之寬敞明亮，
                        帶來清爽、乾淨的舒適空間與無壓力的自在感。
                    </p>
                </div>
                <img src="https://decomyplace.com/img/blog/170424_nordic_4.jpg">
            </div>

            <div class="center-1-explanation pc">
                <img src="https://decomyplace.com/img/blog/170424_nordic_3.jpg">
                <div class="center-1-explanation-text">
                    <h5>木質傢俱最自然｜如沐春風生活</h5>
                    <p>
                        北歐人熱愛大自然，而這一點也充分運用到生活設計中。
                        北歐風格中往往會用到大量的木質裝潢，並適度搭配綠植栽，
                        使居家空間營建出自然、舒服的氣氛。而木頭材質給人溫馨、溫暖的感覺，
                        並適時的運用地毯、布沙發與抱枕等豐富的軟裝，營造北歐風格氛圍，
                        讓你生活在無束縛感的空間。
                    </p>
                </div>
            </div>

            <div class="center-1-explanation rwd">
                <div class="center-1-explanation-text">
                    <h5>木質傢俱最自然｜如沐春風生活</h5>
                    <p>
                        北歐人熱愛大自然，而這一點也充分運用到生活設計中。
                        北歐風格中往往會用到大量的木質裝潢，並適度搭配綠植栽，
                        使居家空間營建出自然、舒服的氣氛。而木頭材質給人溫馨、溫暖的感覺，
                        並適時的運用地毯、布沙發與抱枕等豐富的軟裝，營造北歐風格氛圍，
                        讓你生活在無束縛感的空間。
                    </p>
                </div>
                <img src="https://decomyplace.com/img/blog/170424_nordic_3.jpg">
            </div>

            <div class="center-1-explanation">
                <div class="center-1-explanation-text">
                    <h5>提升空間通透感｜溫暖簡潔設計</h5>
                    <p>
                        北歐風格另一個特點就是營造溫暖、活潑的空間，採用簡潔、開放式格局，
                        善用充足的採光來提升空間通透感。在設計方面，適切的留白並使用跳色牆面，
                        或是使用大地色、文化石牆面，使得空間視野變大。
                    </p>
                </div>
                <img src="https://decomyplace.com/img/blog/170424_nordic_7.jpg">
            </div>
            <div class="border"></div>

            <!---------------------------優惠碼---------------------------------->
            <div class="center-1-coupon">
                <div class="center-1-coupon-flex">
                    <h3>優惠碼:</h3>
                    <h3>XIANHDLDYQ618573184</h3>
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
      products: [
        {
          title: '',
        },
        {
          title: '',
        },
        {
          title: '',
        },
        {
          title: '',
        },
        {
          title: '',
        },
        {
          title: '',
        },
      ],
      cart: [],
      cartNum: '',
      pagination: '',
      xx: [],
      order: {
        user: {},
      },
      orderId: '',
      isLoading: false,
    };
  },
  methods: {
    // 取得資料
    getProducts(page = 1) {
    // ?page=page 要取得的頁數
      const api = `${process.env.VUE_APP_APIPATH}/API/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true; // 資料讀取中
      vm.$http.get(api).then((response) => {
        vm.isLoading = false;// 資料讀取結束
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        vm.xx.push(vm.products[0].imageUrl);
        vm.xx.push(vm.products[1].imageUrl);
        vm.xx.push(vm.products[2].imageUrl);
        vm.xx.push(vm.products[3].imageUrl);
        vm.xx.push(vm.products[4].imageUrl);
        vm.xx.push(vm.products[5].imageUrl);
      });
    },
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
    top() {
      $('html,wrap').animate({
        scrollTop: 0,
      }, 700);
    },
  },
  created() {
    this.getProducts();
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
ol, ul {
  list-style:none;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
.wrap{
  width: 100%;
  background: #ffffff;
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
  margin-top: 10px;
  height: 60px;
}
.top ul{
  font-family:sans-serif;
  display:flex;
  margin: 15px;
}
.top a{
  text-decoration:none;
  font-size: 20px;
  color: white;
  display: block;
  text-align: center;
  padding-top:3px;
  width: 120px;
  height:40px;
}
.top a:hover{
  background: #37523d;
  color:white;
}
.banner{
  max-width:1100px;
  margin-bottom:5px;
  display:flex;
  padding-left:110px;
}
.banner h4{
  font-size:20px;
  color: black;
}
.banner h5{
  font-size:15px;
  font: inherit;
  padding-top:2px;
}
.banner img{
  margin-top:3px;
  height:21px;
  width:21px;
}
.center{
  /* display:flex; */
  max-width:1300px;
  margin-left: auto ;
  margin-right: auto;
  /* background: pink; */
}
.center h2{
  font-family:sans-serif;
  font-size: 25px;
}
.center h3{
  font-family:sans-serif;
  font-size: 22px;
  margin-bottom: 15px;
  margin-top: 15px;
}
.center-1{
  margin-left: auto ;
  margin-right: auto;
}
.centerTitle{
  font-size: 35px;
  padding-bottom:10px;
  text-align: center;
  color:#37523d;
  font-family:cursive;
}
.centerText{
  padding-bottom:10px;
  text-align: center;
  letter-spacing: 1px;
}
.center-1-flex{
  max-width:1250px;
  display:flex;
  flex-wrap: wrap;
  /*background:black;*/
  margin-left: auto;
  margin-right: auto;
}
.center-1-flex li{
  display:block;
  margin-left: auto;
  margin-right: auto;
  width:385px;
}
.center-1-flex img{
  width:385px;
}
.center-1-flex h5{
  color:#37523d;
  text-align:center;
  padding-top:10px;
}
.carousel-item{
  position:relative;
}
.carousel-item-a{
  text-decoration:none;
  display:block;
  text-align:center;
  padding:0.5% 0% 0.5% 0%;
  color:#37523D;
  font-size:30px;
  font-family: cursive;
  width:24%;
  background:white;
  border-radius:50px;
  position:absolute;
  top:79%;
  left:39%;
}
.carousel-item-a:hover{
  background:#37523D;
  color:white;
}
.border{
  margin:40px 20px 40px 20px;
  border-top:1px #cccccc solid;
}
.bottomCommunity{
}
.bottomCommunity h3{
  font-size:20px;
  padding-top:10px;
}
.bottomCommunity ul{
  display:flex;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  height:50px;
}
.bottomCommunity a{
  margin-left: auto;
  margin-right: auto;
}
.bottomCommunity img{
  width:50px;
  height:50px;
}
.center-1-coupon{
  max-width:1250px;
  margin-left: auto;
  margin-right: auto;
  background:#e7eeea;
}
.center-1-coupon-flex{
  display:flex;
  justify-content:center;
  align-items:center;
  padding:30px;
}
.center-1-explanation{
  display:flex;
  max-width:1250px;
  margin-left: auto;
  margin-right: auto;
  background:white;
  margin-bottom:20px;
}
.center-1-explanation img{
  max-width:60%;
  height:auto;
}
.center-1-explanation-text{
  width:40%;
  height:auto;
  padding:20px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  color:#37523d;
}
.rwd{
  display:none;
}

.center-1-explanation-text h5{
  line-height: 24px;
  letter-spacing: 3px;
  padding-bottom:50px;
}
.center-1-explanation-text p{
  line-height: 34px;
  letter-spacing: 1px;
}
@media(max-width:1000px){
  .center-1-explanation{
    flex-direction:column;
  }
  .center-1-explanation img{
    max-width:100%;
    margin-left:auto;
    margin-right:auto;
  }
  .center-1-explanation-text{
    width:100%;
  }
  .pc{
    display:none;
  }
  .rwd{
    display:flex;
  }
}
@media(max-width:768px){
  .carousel-item-a{
    font-size:20px;
  }
  .banner{
    margin-left:20px;
    margin-right:20px;
  }
  .center-1{
    margin-left:20px;
    margin-right:20px;
  }
  .center-1-explanation{
    margin-left:20px;
    margin-right:20px;
  }
  .banner{
    padding:0px;
  }
  .banner h4{
    display:none;
  }
  .banner h5{
    font-size:10px;
    font: inherit;
    padding-top:2px;
  }
  .center-1-coupon-flex{
    flex-direction:column;
  }
  .center-1-coupon{
    margin-left:20px;
    margin-right:20px;
  }
  .footerx{
    display:none;
  }
}
@media(max-width:414px){
  .carousel-item-a{
    font-size:10px;
  }
}
@media(max-width:375px){
  .center-1-coupon-flex h3{
    font-size: 20px;
  }
}
</style>

import Vue from 'vue';
import VueRouter from 'vue-router';
import Admin from '../views/BackEnd/Admin.vue';
import Products from '../views/BackEnd/Products.vue';
import Order from '../views/BackEnd/Order.vue';
import Coupon from '../views/BackEnd/Coupon.vue';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Home2 from '../views/Home2.vue';
import CustomerOrders from '../views/CustomerOrders.vue';
import CustomerCheckout from '../views/CustomerCheckout.vue';
import ProductDetails from '../views/ProductDetails.vue';
import ShoppingCart from '../views/ShoppingCart.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home2',
    component: Home2,
    children: [
      {
        name: 'Home', // 元件呈現的名稱
        path: '/', // 對應的虛擬路徑
        component: Home, // 對應的元件
      },
      {
        name: 'CustomerOrders', // 元件呈現的名稱
        path: 'CustomerOrders', // 對應的虛擬路徑
        component: CustomerOrders, // 對應的元件
      },
      {
        name: 'CustomerCheckout', // 元件呈現的名稱
        path: 'CustomerCheckout/:orderId', // 對應的虛擬路徑
        component: CustomerCheckout, // 對應的元件
      },
      {
        name: 'ProductDetails', // 元件呈現的名稱
        path: 'ProductDetails/:id', // 對應的虛擬路徑
        component: ProductDetails, // 對應的元件
      },
      {
        name: 'ShoppingCart', // 元件呈現的名稱
        path: 'ShoppingCart', // 對應的虛擬路徑
        component: ShoppingCart, // 對應的元件
      },
    ],
  },
  {
    name: 'Login', // 元件呈現的名稱
    path: '/login', // 對應的虛擬路徑
    component: Login, // 對應的元件
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true }, // 導航守衛認證
    children: [
      {
        name: 'products', // 元件呈現的名稱
        path: 'Products', // 對應的虛擬路徑
        component: Products, // 對應的元件
        meta: { requiresAuth: true }, // 導航守衛認證
      },
      {
        name: 'order', // 元件呈現的名稱
        path: 'order', // 對應的虛擬路徑
        component: Order, // 對應的元件
        meta: { requiresAuth: true }, // 導航守衛認證
      },
      {
        name: 'Coupon', // 元件呈現的名稱
        path: 'Coupon', // 對應的虛擬路徑
        component: Coupon, // 對應的元件
        meta: { requiresAuth: true }, // 導航守衛認證
      },
    ],
  },

  {
    path: '/',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;

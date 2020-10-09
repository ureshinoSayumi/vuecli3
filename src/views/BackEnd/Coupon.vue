<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right mt-4">
            <button class="btn btn-primary" data-toggle="modal"
            @click="openModal(true)" >建立新的優惠卷</button> <!--載入bt Button trigger modal -->
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                <!-- CSS直接套用bs 但如果想自訂 也可直接修改 -->
                <th width="130">名稱</th>
                <th width="100">代碼</th>
                <th width="150">到期日</th>
                <th width="100">折扣百分比</th>
                <th width="120">是否啟用</th>
                <th width="80">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in products" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td>{{ item.code }}</td>
                    <td>
                        {{ item.due_date }}
                    </td>
                    <td>
                        {{ item.percent}}
                    </td>
                    <td>
                        <!-- 產品如果為啟用 is_enabled == 1 -->
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm"
                            @click="openModal(false, item)">編輯</button>
                        <button class="btn btn-outline-primary btn-sm"
                            @click="deleteModal(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <pagination :pages="pagination" @turnPage='getProducts'></pagination>

            <!-- 載入bt Modal 新增產品頁面 -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                <span>新增產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                <div class="col-sm-8">
                    <div class="form-group">
                        <label for="title">標題</label>
                        <input type="text" class="form-control" id="title"
                            v-model="tempProduct.title"
                            placeholder="請輸入標題">
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="category">日期</label>
                            <input type="text" class="form-control" id="category"
                            v-model="tempProduct.due_date"
                            placeholder="請輸入日期">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">代碼</label>
                            <input type="unit" class="form-control" id="unit"
                            v-model="tempProduct.code"
                            placeholder="請輸入代碼">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="origin_price">折抵百分比</label>
                            <input type="number" class="form-control" id="origin_price"
                            v-model="tempProduct.percent"
                            placeholder="請輸入折抵百分比">
                        </div>
                    </div>
                    <hr>
                    <div class="form-group">
                    <div class="form-check">
        <!-- is_enabled如果是1 就啟用  所以必須修改 :true-value="1" :false-value="0"-->
                        <input class="form-check-input" type="checkbox"
                            v-model="tempProduct.is_enabled"
                            :true-value="1"
                            :false-value="0"
                            id="is_enabled">
                        <label class="form-check-label" for="is_enabled">
                        是否啟用
                        </label>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary"
                    data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary"
                    @click="updateProduct">確認</button>
            </div>
            </div>
        </div>
        </div>

        <!-- 載入bt Modal 刪除產品頁面 -->
        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                <span>刪除產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary"
                    data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger"
                    @click="confirmDeleteModal"
                >確認刪除</button>
            </div>
            </div>
        </div>
        </div>

    </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '../../components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      products: [], // 取得所有產品資料
      pagination: {}, // 分頁
      tempProduct: {}, // 建立新產品、刪除產品
      isNew: false, // 是否為新資料
      isLoading: false, // 讀取資料時是否讀取中
      status: { // 上傳圖片時是否讀取中
        fileUploading: false,
      },
    };
  },
  methods: {
    // 取得資料
    getProducts(page = 1) {
      // ?page=page 要取得的頁數
      const api = `${process.env.VUE_APP_APIPATH}/API/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      // 使用main.js載入的AJAX套件來載入AJAX
      const vm = this;
      vm.isLoading = true; // 資料讀取中
      vm.$http.get(api).then((response) => {
        vm.isLoading = false; // 資料讀取結束
        vm.products = response.data.coupons;
        vm.pagination = response.data.pagination; // 取得資料時把pagination存起來
      });
    },
    // 打開新增產品選單
    openModal(isNew, item) {
      const vm = this;
      if (isNew) {
        vm.tempProduct = {};
        vm.isNew = true;
      } else {
        // 直接使用this.tempProduct = item;的話，會因傳參考特性，讓兩個物件一樣
        // 使用Object.assign({}) 把item傳進一個空物件，避免參考特性
        vm.tempProduct = { ...item };
        vm.isNew = false;
      }
      $('#productModal').modal('show');
    },
    // 送出建立、編輯API
    updateProduct() {
      let api = `${process.env.VUE_APP_APIPATH}/API/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethpd = 'post';
      // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      const vm = this;
      // 如果不是新資料，就改用修改產品API
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/API/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempProduct.id}`;
        httpMethpd = 'put';
      }
      // 丟入兩個參數 1.API路徑 2.要存進去的資料
      // 存進去的資料格式必須用物件
      vm.$http[httpMethpd](api, { data: vm.tempProduct }).then((response) => {
        // 如果資料新增成功 就關掉選單 並且再次取得資料
        if (response.data.success) {
          $('#productModal').modal('hide');
          vm.getProducts();
        } else {
          $('#productModal').modal('hide');
          vm.getProducts();
        }
      });
    },
    deleteModal(item) {
      const vm = this;
      vm.tempProduct = { ...item };
      $('#delProductModal').modal('show');
    },
    // 確認刪除
    confirmDeleteModal() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/API/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempProduct.id}`;
      const httpMethpd = 'delete';
      vm.$http[httpMethpd](api).then((response) => {
        // 如果資料刪除成功 就關掉選單 並且再次取得資料
        if (response.data.success) {
          $('#delProductModal').modal('hide');
          vm.getProducts();
        } else {
          $('#delProductModal').modal('hide');
          vm.getProducts();
        }
      });
    },
  },
  // 生命週期到created時執行
  created() {
    this.getProducts();
  },
};
</script>

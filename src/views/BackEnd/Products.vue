<template>
  <div>
  <!-- 載入增加使用者體驗 - 讀取中效果製作
  isLoading是true就啟用 反之 -->
    <loading :active.sync="isLoading"></loading>

    <div class="text-right mt-4">
      <button class="btn btn-primary" data-toggle="modal"
        @click="openModal(true)">>建立新的產品</button> <!--載入bt Button trigger modal -->
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
         <!-- CSS直接套用bs 但如果想自訂 也可直接修改 -->
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price | currency}}
          </td>
          <td class="text-right">
            {{ item.price | currency}}
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
    <!-------------------- 分頁 ------------------------------>
    <!--------------------丟入參數pagination------------------------------>
    <pagination :pages="pagination" @turnPage='getProducts'></pagination>

        <!--載入bt Modal 新增產品頁面-->
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
            ...
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結">
                </div>
    <!----------------------- 上傳圖片 只要上傳圖片就會觸發 ---------------------->
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <!------ <i class="fas fa-spinner fa-spin"></i> ---->
<!-----------------------fileUploading為true就顯示讀取icon ---------------------->
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>

                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>

                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" value="0" class="form-control" id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"></textarea>
                </div>
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
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
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
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="confirmDeleteModal"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// jQuery是Bootstrap其下的套件 雖然在main.js已經載入Bootstrap
// 如果要使用JQ 必須在這個元件下注入
import $ from 'jquery';
// 載入分頁元件
import Pagination from '../../components/Pagination.vue';

export default {
  // 載入分頁元件
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
      const api = `${process.env.VUE_APP_APIPATH}/API/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true; // 資料讀取中
      vm.$http.get(api).then((response) => {
        vm.isLoading = false; // 資料讀取結束
        vm.products = response.data.products;
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
        // 9/3改spread
        vm.tempProduct = { ...item };
        vm.isNew = false;
      }
      $('#productModal').modal('show');
    },
    // 取得刪除產品資料
    deleteModal(item) {
      const vm = this;
      // 使用Object.assign({}) 把item傳進一個空物件，避免參考特性
      // 9/3改spread
      vm.tempProduct = { ...item };
      $('#delProductModal').modal('show');
    },
    // 確認刪除
    confirmDeleteModal() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/API/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      const httpMethpd = 'delete';
      vm.$http[httpMethpd](api).then((response) => {
        console.log(response.data);
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
    // 上傳圖片
    uploadFile() {
      console.log('圖片上傳成功');
      // 把圖片檔案取出
      const uploadeFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append('file-to-upload', uploadeFile);
      const url = `${process.env.VUE_APP_APIPATH}/API/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true;// 圖片讀取中就顯示
      vm.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        vm.status.fileUploading = false; // 圖片讀取結束就不顯示
        // 圖片上傳完成，必須對應到"輸入圖片網址"欄位
        if (response.data.success) {
          // vm.tempProduct.imageUrl = response.data.imageUrl;
          // 由於data沒有事先定義資料，這邊在新增imageUrl屬性也無法雙向綁定
          // 所以用$set()將資料寫入
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        }
      });
    },
    // 新增資料到API資料庫
    updateProduct() {
      let api = `${process.env.VUE_APP_APIPATH}/API/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethpd = 'post';
      // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      const vm = this;
      // 如果不是新資料，就改用修改產品API
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/API/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethpd = 'put';
      }
      // 丟入兩個參數 1.API路徑 2.要存進去的資料
      // 存進去的資料格式必須用物件
      vm.$http[httpMethpd](api, { data: vm.tempProduct }).then((response) => {
        console.log(response.data);
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
  },
  // 生命週期到created時執行
  created() {
    this.getProducts();
  },
};
</script>

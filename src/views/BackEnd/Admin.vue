<template>
  <div>
    <div class="container-fluid">
      <Navbar></Navbar>
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';

export default {
  components: {
    Sidebar,
    Navbar,
    // Alert,
    // Pagination,
  },
};
</script>

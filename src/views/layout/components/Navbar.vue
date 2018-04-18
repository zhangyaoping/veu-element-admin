<template>
  <el-menu class="navbar" mode="horizontal">
    <breadcrumb class="breadcrumb-container"></breadcrumb>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  export default {
    data() {
      return {
        screenfull: '全屏'
      }
    },
    components: {
      Breadcrumb
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象以避免错误。
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .breadcrumb-container {
      float: left;
    }
  }
</style>

<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <v-header></v-header>
      <el-main>
        <navbar></navbar>
        <tags-view></tags-view>
        <app-main></app-main>
      </el-main>
    </div>
  </div>
  </div>
</template>

<script>
  import { Navbar, Sidebar, AppMain, TagsView, VHeader } from './components'
  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain,
      TagsView,
      VHeader
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>

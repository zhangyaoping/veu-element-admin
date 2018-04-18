<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened">sssss</hamburger>
    <!--<div class="title">商户管理系统</div>-->
    <div class="right-menu">
      <!--<el-tooltip effect="dark" :content=screenfull placement="bottom">-->
        <!--<screenfull class="screenfull right-menu-item"></screenfull>-->
      <!--</el-tooltip>-->
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <span class="username">你好,&ensp;&ensp;{{roles[0]}}&ensp;&ensp;欢迎您登录！</span>
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import Screenfull from '@/components/Screenfull'
  export default {
    data() {
      return {
        screenfull: '全屏'
      }
    },
    components: {
      Breadcrumb,
      Hamburger,
      Screenfull
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar',
        'roles'
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
    height: 68px;
    .title {
      float: left;
      padding: 0 10px;
      height: 68px;
      line-height: 68px;
      font-size: 22px;
    }
    .hamburger-container {
      float: left;
      padding: 0 10px;
      height: 68px;
      line-height: 78px;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      float: right;
      height: 100%;
      display: flex;
      align-items: center;
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 20px;
      }
      .international {
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .avatar-container {
        margin-right: 30px;
        .avatar-wrapper {
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          .username {
            padding-right: 15px;
          }
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 18px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>

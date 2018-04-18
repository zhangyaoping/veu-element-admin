import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
Vue.use(Router)
/* Layout */
import Layout from '../views/layout/Layout'
/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/
/**
 * hidden: true                   如果“hidden:true”将不会显示在侧边栏(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单，不管它的子路由长度是多少。
 *                                if not set alwaysShow, only more than one route under the children
 *                                它将变为嵌套模式，否则不会显示根菜单。
 * redirect: noredirect           如果“重定向:noredirect”将不会在breadcrumb中重定向。
 * name:'router-name'             这个名字是用的 <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     将控制页面角色(您可以设置多个角色)
    title: 'title'                在子菜单和breadcrumb(推荐设置)中显示名称
    icon: 'svg-name'              图标显示在侧边栏，
    noCache: true                 如果为true，页面将不会被缓存(默认为假)
  }
 **/
export const constantRouterMap = [{
  path: '/login',
  component: _import('login/login'),
  hidden: true
}, {
  path: '/authredirect',
  component: _import('login/authredirect'),
  hidden: true
}, {
  path: '/404',
  component: _import('errorPage/404'),
  hidden: true
}, {
  path: '/401',
  component: _import('errorPage/401'),
  hidden: true
}, {
  path: '',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: _import('dashboard/index'),
    name: 'dashboard',
    meta: {
      title: '首页', icon: 'dashboard', noCache: true
    }
  }]
}]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => (
    {
      y: 0
    }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    meta: {
      title: '权限管理',
      icon: 'lock',
      roles: ['admin', 'editor']
    }, // 可以在根导航中设置角色。
    children: [{
      path: 'index',
      component: _import('permission/index'),
      name: 'permission',
      meta: {
        title: '权限测试页',
        roles: ['admin', 'editor', 'users'] // 或者只能在子导航中设置角色。
      }
    }]
  }, {
    path: '/svg',
    component: Layout,
    redirect: '/svg/svg-icons',
    name: 'svg',
    meta: {
      title: 'svg',
      icon: 'icon',
      roles: ['admin', 'editor']
    },
    children: [{
      path: 'svg-icons',
      component: _import('svg-icons/index'),
      name: 'svg-icons',
      meta: {
        title: 'svg图标',
        roles: ['admin', 'editor']
      }
    }]
  },
  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      title: '组件',
      icon: 'component'
    },
    children: [
      {
        path: 'avatar-upload',
        component: _import('components-demo/avatarUpload'),
        name: 'avatarUpload-demo',
        meta: {
          title: '头像上传'
        }
      },
      {
        path: 'dropzone',
        component: _import('components-demo/dropzone'),
        name: 'dropzone-demo',
        meta: {
          title: '上传图片'
        }
      }, {
        path: 'mixin',
        component: _import('components-demo/mixin'),
        name: 'componentMixin-demo',
        meta: {
          title: '小组件'
        }
      }, {
        path: 'back-to-top',
        component: _import('components-demo/backToTop'),
        name: 'backToTop-demo',
        meta: {
          title: '返回顶部'
        }
      }
    ]
  }, {
    path: '/example',
    component: Layout,
    redirect: '/example/table/complex-table',
    name: 'example',
    meta: {
      title: '表格',
      icon: 'example'
    },
    children: [{
      path: 'complex-table',
      component: _import('example/table/complexTable'),
      name: 'complexTable',
      meta: {
        title: '终合Table'
      }
    }, {
      path: '/example/table',
      component: _import('example/table/index'),
      redirect: '/example/table/complex-table',
      name: 'Table',
      meta: {
        title: '表格',
        icon: 'table'
      },
      children: [{
        path: 'tree-table',
        component: _import('example/table/treeTable/treeTable'),
        name: 'treeTableDemo',
        meta: {
          title: '树形表格'
        }
      }, {
        path: 'custom-tree-table',
        component: _import('example/table/treeTable/customTreeTable'),
        name: 'customTreeTableDemo',
        meta: {
          title: '自定义树表'
        }
      }]
    }]
  }, {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [{
      path: 'export-excel',
      component: _import('excel/exportExcel'),
      name: 'exportExcel',
      meta: {
        title: '输出Excel'
      }
    }, {
      path: 'export-selected-excel',
      component: _import('excel/selectExcel'),
      name: 'selectExcel',
      meta: {
        title: '导出已选Excel'
      }
    }, {
      path: 'upload-excel',
      component: _import('excel/uploadExcel'),
      name: 'uploadExcel',
      meta: {
        title: '上传Excel'
      }
    }]
  }, {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

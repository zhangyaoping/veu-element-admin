<template>
  <div class="app-container">
    <div style="margin-bottom:15px;">角色： {{roles}}</div>
    <div class="radio-box">
      选择角色：
      <el-radio-group v-model="switchRoles" @change="changeHandler">
        <el-radio sizi="mini" class="radio" label="admin" border>超级管理员</el-radio>
        <el-radio sizi="mini" class="radio" label="editor" border>管理员</el-radio>
        <el-radio sizi="mini" class="radio" label="users" border>主管</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'permission',
    data() {
      return {
        switchRoles: ''
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    methods: {
      changeHandler(val) {
        console.log(val)
      }
    },
    watch: {
      switchRoles(val) {
        this.$store.dispatch('ChangeRoles', val).then(() => {
          this.$router.push({ path: '/permission/index?' + +new Date() })
        })
      }
    }
  }
</script>

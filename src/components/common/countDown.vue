<template>
  <!-- 倒计时组件 -->
  <div class="count-down-wraper">
    <input type="button" v-if="!disable" v-model="btnName" class="get-code get-code-off" v-on:click="getCode();"/>
    <input type="button" v-if="disable" v-model="btnName" class="get-code get-code-on" disabled/>
  </div>
</template>
<script>
  export default {
    props: ['username', 'productCode'],
    data() {
      return {
        btnName: '获取验证码',
        disable: false
      }
    },
    name: 'messageCode',
    methods: {
      getCode() {
        if (this.username === 'privateAdmin') {

        } else {
          if (!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/).test(this.username)) {
            this.$message({
              message: '手机号格式不正确，请重新输入！',
              type: 'warning'
            });
            return false;
          }
        }
        let num = 60;
        this.disable = true;
        let timer = setInterval(() => {
          num -= 1;
          this.btnName = num + 's后重试';
          if (num < 1) {
            this.disable = false;
            this.btnName = '获取验证码';
            clearInterval(timer);
            timer = null;
          }
        }, 1000);
        let para = {
          username: this.username,
          productCode: this.productCode
        }
        // console.log('res', para)
        this.Api.postSendMessage(para).then(res => {
          // console.log(res)
          if (res.code == '0000') {
            this.$message({
              message: '发送成功！',
              type: 'success'
            });
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="text/scss">
  .get-code {
    position: absolute;
    right: 10px;
    top: 5px;
    width: 90px;
    height: 30px;
    background: rgba(0, 0, 0, 0.1);
    font-size: 13px;
    border: 1px solid #666;
    border-radius: 6px;
    outline: none;
  }

  .get-code-on {
    color: #b4b4b4;
  }

  .get-code-off {
    color: #ffffff;
    margin-top: 3px;
  }
</style>

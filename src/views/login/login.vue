<template>
  <div class="login">
    <el-card class="login-form-layout">
      <div style="text-align: center">
        <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
      </div>
      <el-form
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
        <h2 class="login-title color-main">登录</h2>
<!--        //用户名输入框-->
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                    v-model="loginForm.username"
                    placeholder="请输入用户名"
                    prefix-icon="el-icon-user-solid">
          </el-input>
        </el-form-item>
<!--        密码输入框-->
        <el-form-item
                      prop="password">
          <el-input name="password"
                    v-model="loginForm.password"
                    placeholder="请输入密码"
                    prefix-icon="el-icon-lock"
                    show-password></el-input>
        </el-form-item>
      </el-form>
<!--      登录按钮-->
      <el-button type="primary" @click="handleLogin" :loading="loading">登录</el-button>
    </el-card>
  </div>
</template>
<script>
  import {setSupport,getSupport,setCookie,getCookie} from '../../utils/support'
  import { login } from '../../api/login'
  export default{

  data(){
    return{
      loginForm: {
        username: 'admin',
        password: 'macro123',
      },
      loginRules: {
        username: [{required: true, trigger: 'blur',message:'用户名不能为空'}],
        password: [{required: true, trigger: 'blur',message:'密码不能为空'}]
      },
      loading:false,
    }
  },
    created() {
      this.loginForm.username = getCookie("username");
      this.loginForm.password = getCookie("password");
      if(this.loginForm.username === undefined||this.loginForm.username==null||this.loginForm.username===''){
        this.loginForm.username = 'admin';
      }
      if(this.loginForm.password === undefined||this.loginForm.password==null){
        this.loginForm.password = '';
      }
    },
  methods:{
    handleLogin(){
      this.$refs.loginForm.validate(valid =>{
            if (valid){
                  // this.loading = true;
                  this.$store.dispatch('Login',this.loginForm).then(() =>{
                  this.loading = false;
                  setCookie("username",this.loginForm.username,15);
                  setCookie("password",this.loginForm.password,15);
                  this.$router.push({path: '/'})
                }).catch(() =>{
                    this.loading =false
                  })
            } else console.log('参数校验不合法')
      })
    }
  }
}
</script>
<style scoped>
.login-form-layout{
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409EFF;
}
  .login-title{
    text-align: center;
  }

</style>

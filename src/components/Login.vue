<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
        <!--登录表单区域-->
      <el-form ref='loginFormRef' :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-icon-test1"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-icon-test" type="password"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary">取消</el-button>
          <el-button type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在2-16个字符之间', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6-15个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击登录按钮，进行登录
    login () {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        fetch('http://localhost:55273/api/Login', {
          method: 'post',
          body: JSON.stringify({
            'user_name': this.loginForm.username,
            'password': this.loginForm.password
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (data) {
          return data.json()
        }).then(data => {
          if (data.Status === 1) {
            // console.log(this)
            // token保存在 sessionStorage
            window.sessionStorage.setItem('token', data.Token)
            // 如果返回数据status为1，进入主页面
            this.$router.push('/home')
          }
          // 如果返回数据status为2，打印出用户名或密码不正确
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form{
    position: absolute;
    bottom: 0px;
    width:100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns{
    display:flex;
    justify-content: flex-end;
}

</style>

<template>
<el-container class="home-container">
  <!-- 头部区域 -->
  <el-header>
  <el-row type="flex"  justify="space-around">
  <el-col :span="17"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="1">
    <div class="grid-content bg-purple">
    <el-button type="text" icon="el-icon-switch-button" size="medium" circle @click="logout">退出登录</el-button>
    </div>
  </el-col>
  </el-row>
</el-header>
  <!-- 页面主体 -->
  <el-container>
  <!-- 侧边栏 -->
    <el-aside :width="isCollapse ?'64px':'200px'">
        <div class="toggle-button" @click="toggle">|||</div>
       <el-menu
      background-color="rgb(1,93,156)"
      text-color="#fff"
      active-text-color="#ffd04b" :unique-opened="true" :collapse="isCollapse" collapse-transition="false">
      <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
         <!-- 一级菜单的模板区域 -->
        <template slot="title">
          <!--图标-->
          <i :class="iconsList[item.id]"></i>
           <!--文本-->
          <span>{{item.name}}</span>
        </template>
        <!--二级菜单-->
        <el-menu-item :index="subItem.id+''" v-for="subItem in item.Data" :key="subItem.id">
         <!-- 二级菜单的模板区域 -->
        <template slot="title">
          <!--图标-->
          <i class="el-icon-user"></i>
           <!--文本-->
          <span>{{subItem.name}}</span>
        </template>
        </el-menu-item>
      </el-submenu>
       <el-menu-item index="3">
          <!--图标-->
          <i class="el-icon-star-on"></i>
           <!--文本-->
          <span>好友动态</span>
      </el-menu-item>
             <el-menu-item index="4">
          <!--图标-->
          <i class="el-icon-s-promotion"></i>
           <!--文本-->
          <span>学生社区</span>
      </el-menu-item>
      <el-menu-item index="5">
          <!--图标-->
          <i class="el-icon-s-data"></i>
           <!--文本-->
          <span>分类统计</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <!-- 右侧内容主体 -->
    <el-main>
      <!--路由占位符-->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsList: {
        '1': 'el-icon-user',
        '2': 'el-icon-school'
      },
      // 左侧面板是否折叠
      isCollapse: false
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList () {
      const { data: res } = await this.$http.post('http://localhost:55273/api/MenuList', {
        'token': window.sessionStorage.getItem('token')
      })
      if (res.Status !== 1) return this.$message.error('获取菜单信息失败')
      this.menulist = res.Data
    },
    // 点击按钮，切换菜单的折叠与展开
    toggle () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
    background-image: url(../assets/导航条.png);
    background-color: rgb(49,72,116);
    display: flex;
    justify-content:center;
    align-items:center;
}
.el-aside {
  .el-menu{
    border-right: none;
  }
    background-color:rgb(1,93,156);
    background-image: url(../assets/侧边栏.png);
    background-position:center;
}
.el-main {
    background-color: white;
     padding: 0px;
}
.el-row {
    width:100%;
}
.toggle-button{
  background-color: rgb(0,142,224);
  font-size:10px;
  line-height:24px;
  color:#fff;
  text-align: center;
  letter-spacing: 0.3em;
  cursor: pointer;

}

</style>

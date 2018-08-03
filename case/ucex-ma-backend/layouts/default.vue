<template>
  <div class="layout-default">
    <i-layout :style="{minHeight: '100vh'}">
      <i-sider :collapsed-width="0" v-model="isCollapsed" collapsible hide-trigger>
        <div class="logo"><u-image type="pic-logo"/></div>
        <i-menu :open-names="['1']" active-name="1-2" theme="dark" width="auto">
          <i-submenu name="1">
            <template slot="title">
              <i-icon type="ios-home"/>
              首页
            </template>
            <i-menuItem name="1-1" to="/">Dashboard</i-menuItem>
          </i-submenu>
          <i-submenu name="2">
            <template slot="title">
              <i-icon type="md-person"/>
              账户管理
            </template>
            <i-menuItem :to="'/user/info'" name="2-1">用户列表</i-menuItem>
          </i-submenu>
          <i-submenu name="3">
            <template slot="title">
              <i-icon type="logo-yen"/>
              资金管理
            </template>
            <i-menuItem name="3-1">配资管理</i-menuItem>
          </i-submenu>
          <i-submenu name="4">
            <template slot="title">
              <i-icon type="md-speedometer"/>
              风控管理
            </template>
            <i-menuItem name="4-1">预警设置</i-menuItem>
          </i-submenu>
        </i-menu>
      </i-sider>
      <i-layout>

        <div class="g-header">
          <div class="slidemenu"@click="shouqi">
            <a class="tgmenu"><u-image type="pic-abbrev"/></a>
          </div>

          <div class="admin">
            <ul>
              <li class="wuser msg"><u-image type="pic-msg"/></li>
              <li class="wuser"><i-dropdown trigger="click" class="loginout">
                <a href="javascript:void(0)">admin<i-icon type="ios-arrow-down"/></a>
                <i-dropdownMenu slot="list">
                  <i-dropdownItem ><span @click="loginOut">退出</span></i-dropdownItem>
                </i-dropdownMenu>
              </i-dropdown></li>
              <li class="wuser"><u-image type="pic-photo" class="photo"/></li>
            </ul>
            <span class="msg"/>
          </div>
        </div>
        <nuxt/>



        <!--<Content :style="{padding: '0 16px 16px'}">
          <Card>

          </Card>
        </Content>-->
      </i-layout>
    </i-layout>
  </div>
</template>
<script>
import UHeader from "~/components/layout/UHeader"
import UNav from "~/components/layout/UNav"
export default {
  components: {
    UHeader,
    UNav
  },
  data() {
    return {
      isCollapsed: false
    }
  },
  computed: {
    urlPath() {
      const matched = this.$route.matched
      const index = matched.map(({ path }) => path).indexOf(this.$route.path)

      return {
        prev: matched[index - 1].path
      }
    }
  },
  methods: {
    shouqi() {
      //收起侧边栏
      this.isCollapsed = !this.isCollapsed
    },
    loginOut() {
      //登出
      console.log("login out")
    }
  }
}
</script>
<style lang="less" >
.layout-con {
  height: 100%;
  width: 100%;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.breadtitle {
  font-size: 20px;
  background-color: #fff;
  padding: 0 0 16px 32px;
  margin-bottom: 15px;
}
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
li {
  list-style: none;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.layout-default {
  display: flex;
  > .nav {
    width: 200px;
  }
}

.g-header {
  background-color: #fff;
  height: 60px;
  padding: 18px 24px 0 35px;
  .slidemenu {
    float: left;
    .tgmenu {
      display: inline-block;
      width: 16px;
      height: 11px;
    }
  }
  .admin {
    float: right;
    ul {
      .wuser {
        float: left;
        margin-left: 10px;
        .loginout {
          font-size: 14px;
        }
      }
      .msg {
        padding-top: 3px;
        margin-right: 10px;
      }
    }
    .photo {
      width: 24px;
      height: 24px;
      -webkit-border-radius: 12px;
      -moz-border-radius: 12px;
      border-radius: 12px;
    }
  }
}
.logo {
  width: 128px;
  height: 60px;
  padding: 20px 47px 0 25px;
}
</style>

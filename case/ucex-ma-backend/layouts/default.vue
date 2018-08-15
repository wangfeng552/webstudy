<template>
<div class="layout-default">
  <i-layout :style="{minHeight: '100vh'}">
    <i-sider :collapsed-width="0" v-model="isCollapsed" collapsible hide-trigger>
      <div class="logo">
        <u-image type="pic-logo"/>
      </div>
      <i-menu :open-names="['1']" active-name="1-2" theme="dark" width="auto">
        <i-submenu name="1">
          <template slot="title">
            <i-icon type="ios-home"/>
            首页
          </template>
          <i-menuItem name="1-1" to="/">Dashboard</i-menuItem>
          <i-menuItem name="1-2" to="/means">我的资产</i-menuItem>
        </i-submenu>
        <i-submenu name="2">
          <template slot="title">
            <i-icon type="md-person"/>
            账户管理
          </template>
          <i-menuItem to="/user" name="2-1">用户列表</i-menuItem>
        </i-submenu>
        <i-submenu name="3">
          <template slot="title">
            <i-icon type="logo-yen"/>
            资金管理
          </template>
          <i-menuItem to="/capital" name="3-1">配资管理</i-menuItem>
        </i-submenu>
        <i-submenu name="4">
          <template slot="title">
            <i-icon type="md-speedometer"/>
            风控管理
          </template>
          <i-menuItem name="4-1" to="/risk/putup">挂单预览</i-menuItem>
        </i-submenu>
      </i-menu>
    </i-sider>
    <i-layout>

      <div class="g-header">
        <div class="slidemenu" @click="shouqi">
          <a class="tgmenu">
            <u-image type="pic-abbrev"/>
          </a>
        </div>
        <div class="admin">
          <ul>
            <li class="wuser msg">
              <u-image type="pic-msg"/>
            </li>
            <li class="wuser pt5">
              <i-dropdown trigger="click" class="loginout">
                <a href="javascript:void(0)">admin
                  <i-icon type="ios-arrow-down"/>
                </a>
                <i-dropdownMenu slot="list">
                  <i-dropdownItem><span @click="loginOut">退出</span></i-dropdownItem>
                </i-dropdownMenu>
              </i-dropdown>
            </li>
            <li class="wuser">
              <u-image type="pic-photo" class="photo"/>
            </li>
          </ul>
          <span class="msg"/>
        </div>
      </div>

      <div class="g-breadcrumb" v-if="isShowbreadcrumb">
        <i-breadcrumb :style="{padding: '16px 0 16px 32px',background: '#fff','border-top':'1px solid #E9EDF1'}">
          <i-breadcrumbItem>{{firstNavTitle.first}}</i-breadcrumbItem>
          <!--<i-breadcrumbItem :to="urlPath.prev">Components</i-breadcrumbItem>-->
          <i-breadcrumbItem>{{firstNavTitle.second}}</i-breadcrumbItem>
        </i-breadcrumb>
        <div class="breadtitle">{{firstNavTitle.second}}</div>
      </div>

      <div class="g-main">
        <nuxt ref="indexlayout"/>
      </div>
    </i-layout>
  </i-layout>
</div>
</template>
<script>
import UHeader from "~/components/layout/UHeader"
import UNav from "~/components/layout/UNav"

export default {
  meta: "test",
  components: {
    UHeader,
    UNav
  },
  data() {
    return {
      isCollapsed: false,
    }
  },
  mounted() {
    console.log(2)
  },
  computed: {
    isShowbreadcrumb(){
      return this.$route.path !='/'
    },
    firstNavTitle() {
      var pathName = this.$route.name

      if (pathName == 'means') {
        return {
          first: '首页',
          second: '我的资产'
        }
      } else if (pathName == 'user') {
        return {
          first: '账户管理',
          second: '用户列表'
        }
      } else if (pathName == 'capital') {
        return {
          first: '资金管理',
          second: '配资管理'
        }
      } else if (pathName == 'risk') {
        return {
          first: '风控管理',
          second: '风控管理'
        }
      } else if (pathName == 'risk-putup') {
        return {
          first: '风控管理',
          second: '挂单预览'
        }
      }
    },
    /*urlPath() {
      const matched = this.$route.matched
      const index = matched.map(({path}) => path).indexOf(this.$route.path)

      return {
        prev: matched[index - 1].path
      }
    },*/

  },
  created() {
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
<style lang="less">
.g-main {
  padding: 0 15px 15px 15px;
}

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
      .pt5{ padding-top: 5px;}
      .msg {
        padding-top: 5px;
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

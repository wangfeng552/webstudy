import Vue from "vue"
import {
  Button,
  Table,
  Layout,
  Menu,
  MenuItem,
  Sider,
  Breadcrumb,
  BreadcrumbItem,
  Icon,
  Submenu,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from "iview"
Vue.prototype.$IVIEW = {}
Vue.component("IButton", Button)
Vue.component("IDropdown", Dropdown)
Vue.component("IDropdownMenu", DropdownMenu)
Vue.component("IDropdownItem", DropdownItem)
Vue.component("IIcon", Icon)
Vue.component("ITable", Table)
Vue.component("ILayout", Layout)
Vue.component("IMenu", Menu)
Vue.component("ISubmenu", Submenu)
Vue.component("IMenuItem", MenuItem)
Vue.component("ISider", Sider)
Vue.component("IBreadcrumb", Breadcrumb)
Vue.component("IBreadcrumbItem", BreadcrumbItem)


// Vue.use(test)
